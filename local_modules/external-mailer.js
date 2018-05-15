const nodemailer = require('nodemailer');
const configuration = require('../config/stage-config.json');

var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* EXAMPLE:
    sender: 'sender@sender.com',
    to: 'dest@dest.com',
    subject: 'Attachment!',
    body: 'mail content...',
    attachments: [{'filename': 'attachment.txt', 'content': data}]
 */
function sendMail(sender, recipient, subject, body, attachments) {
    transporter.sendMail({ 
        from: sender, 
        to: recipient, 
        subject, 
        text: body,
        attachments
    }, 
    function(err, success) {
        if (err) {
            console.log(err);
        }
    }
)};

module.exports = { sendMail };