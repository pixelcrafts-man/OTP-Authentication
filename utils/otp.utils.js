export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getExpiryTime = () => {
  const expiry = new Date();
  expiry.setMinutes(
    expiry.getMinutes() + Number(process.env.OTP_EXPIRY_MINUTES || 5)
  );
  return expiry;
};