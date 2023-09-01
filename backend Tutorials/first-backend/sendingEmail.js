// https://www.npmjs.com/package/nodemailer
const nodemailer = require("nodemailer")

let myTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"a.m2002nov@gmail.com",
        pass: "utifpouognkzgvdf"
    }
})




function sendAnEmail(to,subject,body)
{

    const mailData = {
        subject: subject,
        text: body,
        to: to,
        from: "a.m2002nov@gmail.com"
    }
    
    myTransporter.sendMail(mailData,(err,data) => {
        if(err)
        {
            console.log("Error occurd while sending mail :",err.message)
        }
        else
        {
            console.log("Mail Sent")
        }
    })
}

sendAnEmail("nandeepkr13@gmail.com","Happy Birtdhay","Greetings from Mentor Kart! Happy Birhtday")