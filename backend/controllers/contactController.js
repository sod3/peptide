import Contact from '../models/Contact.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message sent successfully! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.'
    });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
};
