const nodemailer = require('nodemailer')
require('dotenv').config()


const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'automobidcar@gmail.com',
        pass: process.env.MAIL_PASSWORD
    }
})

const sendMail = async (email, subjects, message)=>{
    const mailOptions = {
        from: 'automobidcar@gmail.com',
        to: email,
        subject: subjects,
        text: message
      };

    transpoter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
        }
        else{
            console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = {sendMail}