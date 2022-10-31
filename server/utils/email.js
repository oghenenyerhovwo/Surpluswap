import nodemailer from "nodemailer"
import { frontend_url } from "./constant.js"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    },
  })

const sendEmailMessage = (recipient, subject, body,) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: recipient,
        subject: subject,
        html: body,
      }
    transporter
        .sendMail( mailOptions , function(err, res) {
            if (err) { 
            console.error('there was an error: ', err);
            } else {
            console.log('here is the res: ', res)
            }
        })
}

export const sendConfirmationEmail = (email, fullName, confirmationCode) => {
    try {
        const subject = "DEMANAGER: Verify Your Account"
        const body = `<div style= "text-align: center">
                            <h1>Hello ${fullName} </h1>
                            <p>We are excited to get you started. First you need to verify your email address by clicking the button below </p>
                            <br />
                            <a style="text-decoration: none; color: #fff; background: #A80E0E; padding: 10px 20px; margin: 20px auto; border-radius: 48px" href="${frontend_url}confirm/signinemail/${confirmationCode}">Confirm Email</a> -->
                        </div>`
        sendEmailMessage (email, subject, body,)

    } catch (error) {
        console.log(error)
    }
    
}

export const sendPasswordResetEmail = (email,fullName, confirmationCode) => {
    try {
        const subject = "DEMANAGER: Reset your password"
        const body =  `<div style= "text-align: center">
export const sendPasswordResetEmail = (email,fullName, confirmationCode) => {
                            <h1>Hy ${fullName} </h1>
                            <p>Click on the Link below to reset your password </p>
                            <a style="text-decoration: none; color: #fff; background: #A80E0E; padding: 10px 20px; margin: 20px auto; border-radius: 48px" href="${frontend_url}confirm/resetemail/${confirmationCode}">Confirm Email</a> -->
                        </div>`
        sendEmailMessage (email, subject, body,)
    } catch (error) {
        console.log(error)
    }
    
  }