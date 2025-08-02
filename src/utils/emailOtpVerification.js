import { otpTemplate} from "../emailTemplate/otpTemplate.js";
import { emailNotification } from "./emailNotification.js";

export const generateOtp = async() => {
    const otp = Math.random().toFixed(6).split('.')[1];

    const otp_Template = otpTemplate({
            username : 'Abhishek',
            purpose : 'Email verification',
            otp : otp
        });
    emailNotification({
        receiver : 'himanshuabhishek957@gmail.com',
        subject : 'Niti - OTP verification',
        username : 'Abhishek',
        template : otp_Template
    })
}

export const verifyOtp = (otp) => {

}