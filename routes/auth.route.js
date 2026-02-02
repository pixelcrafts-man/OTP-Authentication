import express from "express";
import {
  sendPatientOtp,
  verifyPatientOtp,
  sendDoctorOtp,
  verifyDoctorOtp
} from "../controllers/auth.controller.js";

const router = express.Router();

// PATIENT PANEL
router.post("/patient/send-otp", sendPatientOtp);
router.post("/patient/verify-otp", verifyPatientOtp);

// DOCTOR PANEL
router.post("/doctor/send-otp", sendDoctorOtp);
router.post("/doctor/verify-otp", verifyDoctorOtp);

export default router;