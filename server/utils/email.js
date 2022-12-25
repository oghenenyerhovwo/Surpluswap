import { frontend_url } from "./constant.js"
import { CourierClient } from "@trycourier/courier";
import dotenv from "dotenv"
import fetch from 'node-fetch';

dotenv.config()

const courier = CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN });

const sendEmailMessage = async (recipientEmail, subject, body, name, btnLink, btnText) => {

  let isMessageSent = false

    try {

      const courier = CourierClient({ authorizationToken: "pk_test_YPBK1XQHKF4RWWJXTZDHKQTB6W58" });

      const { requestId } = await courier.send({
        message: {
          to: {
            email: recipientEmail,
          },
          template: "EBGRRNVVX3M87RMHXDRFSFDPGW99",
          data: {
            email: recipientEmail,
            subject: subject,
            body: body,
            name: name,
            btnLink: btnLink,
            btnText: btnText,
          },
        },
      });

      if(requestId){
        isMessageSent = true
      }

    } catch (error) {
      console.log(error)
    }   
    return { isMessageSent }
      
}

export const sendConfirmationEmail = async (email, name, confirmationCode) => {
  let isEmailVerificationMessageSent;
    try {
        const subject = "SURPLUSWAP: Verify Your Account"
        const body = "We are excited to get you started. First you need to verify your email address by clicking the button below"
        const btnLink = `${frontend_url}user/confirm/token/${confirmationCode}/?type=email_verify`
        const btnText = "Verify Email"
        const { isMessageSent } = await sendEmailMessage (email, subject, body, name, btnLink, btnText )
        isEmailVerificationMessageSent = isMessageSent

    } catch (error) {
        console.log(error)
        isEmailVerificationMessageSent = false
    }
    return { isMessageSent: isEmailVerificationMessageSent }
}

export const sendPasswordResetEmail = async (email,name, confirmationCode) => {
  let isPasswordMessageSent;
    try {
      const subject = "SURPLUSWAP: Reset your password"
        const body = "It is very common for users to forget their passwords. Click on the button below to reset your password"
        const btnLink = `${frontend_url}user/confirm/token/${confirmationCode}/?type=password_reset`
        const btnText = "Reset Password"
        const { isMessageSent } = await sendEmailMessage (email, subject, body, name, btnLink, btnText )

        isPasswordMessageSent = isMessageSent
    } catch (error) {
        console.log(error)
        isPasswordMessageSent = false
    }
    return { isMessageSent: isPasswordMessageSent }
  }