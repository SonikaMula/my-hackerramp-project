const User = require('../models/userModel');
const nodemailer = require('nodemailer');

exports.signup = async (req, res) => {
    const { name, email } = req.body;
    const uniqueCode = Math.random().toString(36).substring(2, 15);

    try {
        const newUser = new User({ name, email, uniqueCode });
        await newUser.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Signup Successful',
            text: `Thank you for signing up! Your unique code is: ${uniqueCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'User registered successfully', uniqueCode });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
