import nodemailer from 'nodemailer';

const sendEmail = async () => {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aadityadesai09@gmail.com',
      // Replace this with an app-specific password from Google Account settings
      pass: 'mvin ukln rwip njec'

    }
  });

  // Define email options
  const mailOptions = {
    from: '"Weather Bot" <aadityadesai09@gmail.com>',
    to: 'aadityadesai09@gmail.com',
    subject: 'Daily Weather Reminder',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f8ff;">
        <h1 style="color: #4169e1;">⛅ Daily Weather Alert! ☔</h1>
        <p style="font-size: 18px;">Hey there! Just a friendly reminder:</p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #4169e1;">🌧️ Don't forget your umbrella today! 🌂</h2>
          <p style="font-size: 16px;">Stay dry and have a great day!</p>
        </div>
        <p style="color: #666666; font-size: 14px;">Your friendly neighborhood Weather Bot 🤖</p>
      </div>
    `,
    text: 'Take your umbrella today!' // Plain text fallback
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendEmail();
