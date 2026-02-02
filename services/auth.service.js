import pool from "../config/database.js";
import sgMail from "../config/sendgrid.js";
import { generateOTP, getExpiryTime } from "../utils/otp.utils.js";

export const sendOtpService = async ({ email, role }) => {
  const otp = generateOTP();
  const expiresAt = getExpiryTime();

  await pool.query(
    `
    INSERT INTO otp_verifications (email, role, otp, expires_at, attempts)
    VALUES ($1, $2, $3, $4, 0)
    ON CONFLICT (email, role)
    DO UPDATE SET
      otp = $3,
      expires_at = $4,
      attempts = 0
    `,
    [email, role, otp, expiresAt]
  );

  await sgMail.send({
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP is ${otp}</h2>
      <p>This OTP is valid for 5 minutes.</p>
    `
  });

  return true;
};

export const verifyOtpService = async ({ email, role, otp }) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM otp_verifications
    WHERE email = $1 AND role = $2
    `,
    [email, role]
  );

  if (!rows.length) {
    throw new Error("OTP not found");
  }

  const record = rows[0];

  if (record.attempts >= 5) {
    throw new Error("Too many wrong attempts. Please resend OTP.");
  }

  if (new Date() > record.expires_at) {
    throw new Error("OTP expired");
  }

  if (record.otp !== otp) {
    await pool.query(
      `
      UPDATE otp_verifications
      SET attempts = attempts + 1
      WHERE email = $1 AND role = $2
      `,
      [email, role]
    );
    throw new Error("Invalid OTP");
  }

  // OTP correct → cleanup
  await pool.query(
    `
    DELETE FROM otp_verifications
    WHERE email = $1 AND role = $2
    `,
    [email, role]
  );

  return true;
};