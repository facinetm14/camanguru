export const confirmationTemplate = (verifyLink: string) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
        </head>
        <body>
            <div class="container m-auto">
                <div class="content">
                  <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
                  <a href="${verifyLink}" class="btn btn-primary">Verify Email</a>
                </div>
                <div class="footer">
                    <p>&copy; 2024 CamagruApp. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
           <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          width: 100px;
          height: auto;
        }
        .content {
          text-align: center;
        }
        .content h1 {
          color: #333333;
        }
        .content p {
          color: #666666;
          margin: 10px 0;
        }
        .button {
          display: inline-block;
          background-color: #007BFF;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #999999;
          font-size: 12px;
        }
    </style>
    `;
};
