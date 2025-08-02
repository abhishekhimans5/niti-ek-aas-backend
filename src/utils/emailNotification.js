import nodemailer from 'nodemailer';

export const emailNotification = async(value) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use 'host' and 'port' for custom SMTP
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const subject = value.subject;
    const receiver = value.receiver;
    const from = process.env.NODEMAILER_EMAIL;
    const template = value.template || ` 
    <html>
        <body>
            <p>Hello  <span style="color:rgb(13, 64, 117);">${value.username}!</span>,</p>
            <p>
            You have successfully created an account on 
                <span style="color: #007BFF; font-weight: bold;">
                Niti Ek-AAS
                </span>
            </p>
            <p> Please add additional information about you to use Niti more efficiently.</p>
            <br></br>
            <br></br>
            <h3>Warm Regards,</h3>
            <p>Team Niti</p>
        </body>
    </html>`
    ;
    const mailOptions = {
        from: from,
        to: receiver,
        subject: subject,
        html : template,
    };
    await transporter.sendMail(mailOptions);
}

