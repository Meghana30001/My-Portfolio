const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

// Vercel serverless function handler
module.exports = (req, res) => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());

  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    try {
      // Create email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself
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

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
  });

  // Handle the request
  app(req, res);
};

// For local development
if (require.main === module) {
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../')));

  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all fields' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    try {
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
      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Portfolio available at: http://localhost:${PORT}`);
  });
}
