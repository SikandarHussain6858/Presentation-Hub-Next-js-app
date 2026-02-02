import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendPresentationCode(email, presentationName, courseName, uniqueCode) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Your Presentation Code - ${presentationName}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .code-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
                    .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 4px; font-family: 'Courier New', monospace; }
                    .info { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
                    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">Presentation Uploaded Successfully! 🎉</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>Your presentation has been successfully uploaded to Presentation Hub. Here are the details:</p>
                        
                        <div class="info">
                            <strong>Presentation Name:</strong> ${presentationName}<br>
                            <strong>Course:</strong> ${courseName}
                        </div>
                        
                        <div class="code-box">
                            <p style="margin: 0 0 10px 0; color: #6b7280;">Your Access Code</p>
                            <div class="code">${uniqueCode}</div>
                        </div>
                        
                        <p><strong>Important:</strong> This code is valid for 24 hours. Share this code with students so they can access and download your presentation.</p>
                        
                        <p>Students can access your presentation by:</p>
                        <ol>
                            <li>Visiting the Classroom page</li>
                            <li>Entering the code: <strong>${uniqueCode}</strong></li>
                            <li>Downloading the presentation</li>
                        </ol>
                        
                        <div class="footer">
                            <p>Thank you for using Presentation Hub!</p>
                            <p style="font-size: 12px; color: #9ca3af;">This is an automated message, please do not reply.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', email);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
