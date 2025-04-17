import { RawObjectType } from '#graphql/type'
import db from '@adonisjs/lucid/services/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import { v4 as uuidv4 } from 'uuid'
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

const jwtSecret = env.get('JWT_SECRET')
const tokenRefreshExpiry = env.get('JWT_REFRESH_EXPIRY')

export const registerUsers = {
  type: RawObjectType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    users: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, params, { request, response }) => {
    try {
      if (!params.email || !params.password || !params.users) {
        return response.status(400).send({
          status: false,
          message: 'Users, Email and password are required',
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(params.password, salt)
      const user = await db.table('users').returning(['id', 'email', 'username']).insert({
        email: params.email,
        username: params.users,
        password: hashedPassword,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      })
      return response.status(200).send({
        status: true,
        message: 'User created successfully',
        data: user,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error creating user',
        error: error.message,
      })
    }
  },
}
export const loginUsers = {
  type: RawObjectType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, params, { request, response }) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const user = await db.from('users').where('email', params.email).first()
      if (!user) {
        return response.status(404).send({
          status: false,
          message: 'User not found',
        })
      }
      const isMatch = await bcrypt.compare(params.password, user.password)
      if (!isMatch) {
        return response.status(404).send({
          status: false,
          message: 'Invalid credentials',
        })
      }
      const token = jwt.sign({ uid: user.id, email: user.email }, jwtSecret, {
        expiresIn: tokenRefreshExpiry,
      })
      const refreshToken = uuidv4()
      await db.table('refresh_tokens').insert({
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + parseInt('7d') * 24 * 60 * 60 * 1000),
      })
      return response.status(200).send({
        status: true,
        message: 'User logged in successfully',
        data: {
          token,
          refreshToken,
        },
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error login user',
        error: error.message,
      })
    }
  },
}
