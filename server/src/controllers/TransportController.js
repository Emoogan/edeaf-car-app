const nodemailer = require('nodemailer')
const {emailUser, emailPass} = require('../config/config')
var transporter
module.exports = {
    getTransporter: function(){
        return transporter
    },
    createTransporter: function(){
        transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass
        }
      })
    }
}