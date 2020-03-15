const nodemailer = require('nodemailer');
const emailHosts = require("./emailHosts");

module.exports = {
    isLive: (req, res) => {
        res.json({
          api: true,
          builtBy: "Blakio"
        })
    },
    sendIP: (req, res) => {
        res.send(req.ip)
    },
    sendMail: (req, res) => {

        const { params, host } = req.body;
        const {
            emailENV,
            passwordENV,
            template
        } = emailHosts[host];
      
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env[emailENV],
            pass: process.env[passwordENV]
          }
        });
      
        var mailOptions = {
          from: process.env[emailENV],
          to: process.env[emailENV],
          subject: template.subject,
          text: template.body(params)
        };
      
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.json({
              mailSent: false,
              error,
              meta: {
                auth: {
                  user: process.env[emailENV]
                }
              }
            })
          } else {
            res.json({ mailSent: true })
          }
        });
    }
}