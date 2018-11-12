const transportController = require('./TransportController')
const { adminList, from, sendEmails } = require('../constants/email')
const { User, Car } = require('../models')

const formatDate = function(dateString) {
  // expected format 2018-11-07T17:45:00.000Z
  return (
    `${dateString.substring(8, 10)}/${dateString.substring(
      5,
      7
    )}/${dateString.substring(0, 4)}` + ` ${dateString.substring(11, 16)}`
  )
}

module.exports = {
  async sendCreatedRequestEmail(req, res) {
    try {
      if (sendEmails) {
        const transporter = transportController.getTransporter()
        const car = await Car.findByPk(req.body.CarId)
        const user = await User.findByPk(req.body.UserId)
        const toList = adminList.concat([user.email])
        // on created email should be sent to both user and admins
        const mailOptions = {
          from: from,
          to: toList,
          subject: `Pending Request for ${user.firstName}`,
          html: ` <br> 
        The following request has been made: 
        <p>
        <br>
        Car: ${car.nickName} <br>
        Dates: ${formatDate(req.body.startTime)} - ${formatDate(
            req.body.finishTime
          )} <br>
        Request Location: ${req.body.location} <br>
        Request Reason: ${req.body.reason} <br> 
        </p>
        <br>
        <br>
        This is an auto-generated email from an unattended mail box. 
        Please do not reply. For assistance contact IT support. `
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
            return res.status(500).send(error)
          }
          console.log('Message sent')
          return res.status(201).send(res.locals.request)
        })
      } else {
        return res.status(201).send(res.locals.request)
      }
    } catch (err) {
      console.log('ERROR', err)
      return res.status(500).send(err)
    }
  },

  async sendActionedRequestEmail(req, res) {
    try {
      if (sendEmails) {
        const transporter = transportController.getTransporter()
        const user = res.locals.request.User
        const car = res.locals.request.Car
        const request = res.locals.request
        var toList = [user.email]
        // if the request is cancelled, let the admins know as well
        if (request.status === 'Cancelled') {
          toList = toList.concat(adminList)
        }
        var requestStatusReason = ''
        if ( request.statusReason && request.statusReason !== null) {
          requestStatusReason = `The request was denied because ${request.statusReason}.`
        }
        // on created email should be sent to both user and admins
        const mailOptions = {
          from: from,
          to: toList,
          subject: `${request.status} Request for ${user.firstName}`,
          html: ` <br> 
        The following request from ${user.firstName} has been <b> ${request.status}</b>. ${requestStatusReason}
        <p>
        <br>
        Car: ${car.nickName} <br>
        Dates: ${(request.startTime.toString())} - ${(request.finishTime.toString())} <br>
        Request Location: ${request.location} <br>
        Request Reason: ${request.reason} <br> 
        </p>
        <br>
        <br>
        This is an auto-generated email from an unattended mail box. 
        Please do not reply. For assistance contact IT support. `
        }


        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
            return res.status(500).send(error)
          }
          console.log('Message sent')
          return res.status(201).send(res.locals.request)
        })
      } else {
        return res.status(201).send(res.locals.request)
      }
    } catch (err) {
      console.log('ERROR', err)
      return res.status(500).send(err)
    }
  }
}
