import mailgun from "mailgun-js"
import { frontend_url } from "./constant.js"
import dotenv from "dotenv"

dotenv.config()

const mg = mailgun({
    apiKey: process.env.MAILGUN_KEY, 
    domain: process.env.MAIL_PASSWORD
});
 

const sendEmailMessage = (recipient, subject, body,) => {

    const data = {
        from: 'Surpluswap',
        to: recipient,
        subject: subject,
        text: body,
    };

    mg.messages().send(data, function (error, body) {
        console.log(`Mail sending Error-Body: ${body}`);
        console.log(`Mail sending Error: ${error}`);
    });
}

export const sendConfirmationEmail = (email, name, confirmationCode) => {
    try {
        const subject = "SURPLUSWAP: Verify Your Account"
        const body = `<div style= "text-align: center">
                            <h1>Hello ${name} </h1>
                            <p>We are excited to get you started. First you need to verify your email address by clicking the button below </p>
                            <br />
                            <a style="text-decoration: none; color: #fff; background: #A80E0E; padding: 10px 20px; margin: 20px auto; border-radius: 48px" href="${frontend_url}confirm/signinemail/${confirmationCode}">Confirm Email</a> -->
                        </div>`
        sendEmailMessage (email, subject, body,)

    } catch (error) {
        console.log(error)
    }
    
}

export const sendPasswordResetEmail = (email,name, confirmationCode) => {
    try {
        const subject = "SURPLUSWAP: Reset your password"
        const body =  `<div style= "text-align: center">
export const sendPasswordResetEmail = (email,name, confirmationCode) => {
                            <h1>Hy ${name} </h1>
                            <p>Click on the Link below to reset your password </p>
                            <a style="text-decoration: none; color: #fff; background: #A80E0E; padding: 10px 20px; margin: 20px auto; border-radius: 48px" href="${frontend_url}confirm/resetemail/${confirmationCode}">Confirm Email</a> -->
                        </div>`
        sendEmailMessage (email, subject, body,)
    } catch (error) {
        console.log(error)
    }
    
  }