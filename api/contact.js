// Simple test version without email functionality
module.exports = async function handler(req, res) {
  try {
    // Set JSON content type first
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        message: 'Method not allowed' 
      });
    }
    
    const { name, email, message } = req.body;
    
    console.log('Received contact form submission:', { name, email, message: message?.substring(0, 50) + '...' });
    
    // Basic validation
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
    
    // For now, just log the data and return success
    console.log('Form data received successfully:', { name, email, message });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message received successfully! (Email functionality disabled for testing)' 
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      success: false, 
      message: `Server error: ${error.message}` 
    });
  }
}
