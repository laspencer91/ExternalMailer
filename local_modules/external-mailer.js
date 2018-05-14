const nodemailer = require('nodemailer');
const configuration = require('../config/stage-config.json');

var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: configuration.mailAuth.user,
        pass: configuration.mailAuth.pass
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