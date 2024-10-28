import Mailjet from 'node-mailjet';

const sendEmail = async () => {
  const apiKey = '7e69a780c0200c8a4864d6b7d59e885f';
  const apiSecret = '0a9933a7d640c0ab84fe2b48fb6565f4';
  const mailjetClient = new Mailjet({ apiKey, apiSecret });

  const request = mailjetClient.post("send", { version: 'v3.1' }).request({
    Messages: [
      {
        From: { Email: "aadityadesai19@gmail.com", Name: "Weather Bot" },
        To: [{ Email: "aadityadesai19@gmail.com" }],
        Subject: "Daily Weather Reminder",
        TextPart: "Take your umbrella today!",
      },
    ],
  });

  try {
    await request;
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendEmail();
