import nodemailer from 'nodemailer';
import he from 'he'; // For decoding HTML entities in the API response

interface TriviaResponse {
  response_code: number;
  results: [{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }];
}

const getRandomQuestion = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
    );
    const data: TriviaResponse = await response.json();
    
    if (data.response_code !== 0 || !data.results.length) {
      throw new Error('Failed to fetch question from Trivia API');
    }

    const result = data.results[0];
      const options = [
      result.correct_answer,
      ...result.incorrect_answers
    ].map(option => he.decode(option))
     .sort(() => Math.random() - 0.5);

    return {
      question: he.decode(result.question),
      options: options,
      correctAnswer: he.decode(result.correct_answer),
      category: result.category,
      difficulty: result.difficulty
    };
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

const sendEmail = async () => {
  try {
    // Get a random question from Trivia API
    const randomQuestion = await getRandomQuestion();
    
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aadityadesai09@gmail.com',
        pass: 'mvin ukln rwip njec'
      }
    });

    // Define email options
    const mailOptions = {
      from: '"Daily Quiz Bot" <aadityadesai09@gmail.com>',
      to: 'aadityadesai09@gmail.com',
      subject: `Daily Quiz Question! 🎯 [${randomQuestion.category}]`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f8ff;">
          <h1 style="color: #4169e1;">🤔 Daily Quiz Question! 📝</h1>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <div style="margin-bottom: 15px;">
              <span style="background-color: #e6e6fa; padding: 5px 10px; border-radius: 15px; font-size: 14px;">
                Category: ${randomQuestion.category}
              </span>
              <span style="background-color: #ffe4e1; padding: 5px 10px; border-radius: 15px; font-size: 14px; margin-left: 10px;">
                Difficulty: ${randomQuestion.difficulty.charAt(0).toUpperCase() + randomQuestion.difficulty.slice(1)}
              </span>
            </div>
            
            <h2 style="color: #4169e1;">Today's Question:</h2>
            <p style="font-size: 18px;">${randomQuestion.question}</p>
            
            <div style="margin: 20px 0;">
              ${randomQuestion.options.map((option, index) => `
                <div style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                  ${String.fromCharCode(65 + index)}. ${option}
                </div>
              `).join('')}
            </div>

            <p style="font-size: 16px; color: #666666;">
              Reply to this email with your answer (A, B, C, or D)!
            </p>
          </div>
          <p style="color: #666666; font-size: 14px;">Your friendly Quiz Bot 🤖</p>
          
          <!-- Hidden correct answer for reference -->
          <div style="display: none;">${randomQuestion.correctAnswer}</div>
        </div>
      `,
      text: `
        Daily Quiz Question!
        
        Category: ${randomQuestion.category}
        Difficulty: ${randomQuestion.difficulty}
        
        ${randomQuestion.question}
        
        ${randomQuestion.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n')}
        
        Reply with your answer (A, B, C, or D)!
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("Quiz email sent successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
};

sendEmail();
