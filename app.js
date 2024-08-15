import express from 'express';
import cors from 'cors';
const router = express.Router();
import nodemailer from "nodemailer";
import process from 'process';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config(); //for environment variables

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory
app.use('/public', express.static('public'));
app.use("/", router);



router.get('/', (req, res) => {
  res.send('<center><br/><br/><h3>The app is at the <code>/send-email</code> and <code>/newsletter</code> routes</h3><img src="public/images/seashore.png" alt="Seashore Mediclinic Logo" style="display: block; margin: 0 auto; max-width: 10%; height: auto;"></center>');
});

//app.listen(3000, () => console.log("Server Running"));
//console.log(process.env.EMAIL_USER);
//console.log(process.env.EMAIL_PASS);

console.log("Entered in the Server.js file");

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, //environment variable
    pass: process.env.EMAIL_PASS //environment variable
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.get("/send-email", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.send('<center><br/><br/><h3>Unauthorized entry to <code>/send-email</code> route</h3></center>');
  }
});

router.get("/newsletter", (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.send('<center><br/><br/><h3>Unauthorized entry to <code>/newsletter</code> route</h3></center>');
    }
  });

router.post("/send-email", (req, res) => {

  const formData = req.body;
  Object.keys(formData).forEach((key) => {
    formData[key] = formData[key].replace(/\\n/g, '<br/>');
  });

  const { name, email, phone, message } = formData;
  
 
  const mail = {
    from: process.env.EMAIL_USER,
    to: "td.cd.pd@gmail.com",
    subject: "Contact Form Submission - Seashore Mediclinic",
    html: `
        <div style="font-family: Georgia, serif; font-size: 11pt; line-height: 1.6; color: #333; background-color: #f2f2f2; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
         <img src="/images/seashore.png" alt="Seashore Mediclinic Logo" style="display: block; margin: 0 auto; max-width: 20%; height: auto;">
          <h3 style="color: #1eb2a6; margin: 3px auto; text-align: center;">New Contact Form Submission from <a href="https://www.seashoremediclinic.com/" target="_blank" style="color: #1eb2a6; text-decoration: underline;">Seashoremediclinic.com</a></h3>
          <p><strong>Name:</strong> <br/>${name}</p>
          <hr style="border: none; border-top: 2px solid #ccc;">
          <p><strong>Email:</strong> <br/><a href="mailto:${email}" style="color: #0056b3; text-decoration: underline;">${email}</a></p>
          <hr style="border: none; border-top: 2px solid #ccc;">
          <p><strong>Phone:</strong> <br/>${phone}</p>
          <hr style="border: none; border-top: 2px solid #ccc;">
          <p><strong>Message:</strong></p><br>
          <div style="background-color: #f9f9f9; padding: 15px 10px; border-left: 4px solid #1eb2a6; margin-bottom: 20px;">
            ${message}
          </div>
          <hr style="border: none; border-top: 1px solid #ccc;">
          <p style="font-size: 0.9em; color: #666; margin: 1px auto; text-align: center;">This email was sent from the contact form on Seashoremediclinic.com</p>
        </div>
        </div>
        `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent"});
    }
  });
});

router.post("/newsletter", (req, res) => {

    const formData = req.body;
    Object.keys(formData).forEach((key) => {
      formData[key] = formData[key].replace(/\\n/g, '<br/>');
    });
  
    const {email} = formData;
    
   
    const mail = {
      from: process.env.EMAIL_USER,
      to: "td.cd.pd@gmail.com",
      subject: "Newsletter Submission - Seashore Mediclinic",
      html: `
          <div style="font-family: Georgia, serif; font-size: 11pt; line-height: 1.6; color: #333; background-color: #f2f2f2; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
           <img src="/images/seashore.png" alt="Seashore Mediclinic Logo" style="display: block; margin: 0 auto; max-width: 20%; height: auto;">
            <h4 style="color: #1eb2a6; margin: 3px auto; text-align: center;">New email newsletter Submission from <a href="https://www.seashoremediclinic.com/" target="_blank" style="color: #1eb2a6; text-decoration: underline;">Seashoremediclinic.com</a></h4>
            <p><strong>Email:</strong> <br/><a href="mailto:${email}" style="color: #0056b3; text-decoration: underline;">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #ccc;">
            <p style="font-size: 0.9em; color: #666; margin: 1px auto; text-align: center;">This email was sent from the newsletter form on Seashoremediclinic.com</p>
          </div>
          </div>
          `,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ code: 200, status: "Message Sent"});
      }
    });
  });

// Export the express app as a Vercel serverless function
export default app;