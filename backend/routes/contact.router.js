import express from 'express';
import ContactSubmission from '../models/contactSubmission.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject = '', message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const submission = await ContactSubmission.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully.',
      submission,
    });
  } catch (error) {
    console.error('Contact submission error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;