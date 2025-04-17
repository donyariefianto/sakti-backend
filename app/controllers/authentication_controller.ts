import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import qs from 'qs'

export default class AuthenticationController {
  async redirectToGoogle({ ally, request, response }) {
    try {
      return ally.use('google').redirect()
    } catch (error) {
      return response.status(500).send({ status: 500, messages: error.messages })
    }
  }

  async handleGoogleCallback({ ally, auth, response, request }) {
    try {
      let { code } = request.all()
      const google = ally.use('google')
      const user = await google.user()
      return user
    } catch (error) {
      return response.status(500).send({ status: 500, messages: error.messages })
    }
  }

  async sendOTP({ request, response }) {
    try {
      let { by, to } = request.all()
      if (!by || !to) {
        return response
          .status(400)
          .send({ status: 400, messages: 'Invalid request parameter [by, to]' })
      }
      const token = `ACe834408aa618306694c43881ac740e7c:2b290f5f7a19728fb9b747ab66a5d4ba`
      let data = qs.stringify({
        Channel: by,
        To: to,
      })
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://verify.twilio.com/v2/Services/VA5199e258950061c750cc6ab6bebf255a/Verifications',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(token).toString('base64'),
        },
        data: data,
      }
      let result = await axios.request(config)
      return response
        .status(200)
        .send({ status: 200, messages: 'OTP sent successfully', data: result.data })
    } catch (error) {
      console.log(error)
      return response.status(500).send({ status: 500, messages: error.messages })
    }
  }

  async verifyOTP({ request, response }) {
    let { code, to } = request.all()
    if (!code || !to) {
      return response
        .status(400)
        .send({ status: 400, messages: 'Invalid request parameter [code, to]' })
    }
    const token = `ACe834408aa618306694c43881ac740e7c:2b290f5f7a19728fb9b747ab66a5d4ba`
    let data = qs.stringify({
      Code: code,
      To: to,
    })
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://verify.twilio.com/v2/Services/VA5199e258950061c750cc6ab6bebf255a/VerificationCheck',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(token).toString('base64'),
      },
      data: data,
    }
    let result = await axios.request(config)
    return response
      .status(200)
      .send({ status: 200, messages: 'OTP verified successfully', data: result.data })
  }
}
