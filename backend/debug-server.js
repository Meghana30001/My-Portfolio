const express = require('express');
const cors = require('cors');

// Simple debug server to test if backend is working
module.exports = (req, res) => {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  // Debug endpoint to check environment variables
  app.post('/api/contact', async (req, res) => {
    console.log('Request received:', req.body);
    console.log('Environment variables:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set'
    });

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields' 
      });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not set in environment variables');
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error - email not configured' 
      });
    }

    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><em>This message was sent from your portfolio contact form.</em></p>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      
      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        message: `Failed to send email: ${error.message}` 
      });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      message: 'Backend is running',
      env: {
        EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set'
      }
    });
  });

  app(req, res);
};
