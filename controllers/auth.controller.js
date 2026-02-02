import {
  sendOtpService,
  verifyOtpService
} from "../services/auth.service.js";

// ---------------- PATIENT ----------------

export const sendPatientOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    await sendOtpService({
      email,
      role: "patient"
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to patient email"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const verifyPatientOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    await verifyOtpService({
      email,
      otp,
      role: "patient"
    });

    return res.status(200).json({
      success: true,
      message: "Patient OTP verified"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// ---------------- DOCTOR ----------------

export const sendDoctorOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    await sendOtpService({
      email,
      role: "doctor"
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to doctor email"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const verifyDoctorOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    await verifyOtpService({
      email,
      otp,
      role: "doctor"
    });

    return res.status(200).json({
      success: true,
      message: "Doctor OTP verified"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};