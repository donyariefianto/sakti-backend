import { RawObjectType } from '#graphql/type'
import db from '@adonisjs/lucid/services/db'
import { middleware } from '#start/kernel'
import { GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'

export const findUsers = {
  type: GraphQLBoolean,
  args: {
    identity: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, params, { request, response }) => {
    try {
      const user = await db
        .from('users')
        .orWhere('email', params.identity)
        .orWhere('phone', Number(params.uid))
        .first()
      if (user) {
        return response.status(200).send({
          status: true,
          message: 'User found',
          data: {
            id: user.id,
            email: user.email,
          },
        })
      } else {
        return response.status(404).send({
          status: false,
          message: 'User not found',
        })
      }
    } catch (error) {
      console.log(error)

      return response.status(500).send({
        status: false,
        message: error.message,
      })
    }
  },
}
export const usersProfile = {
  type: RawObjectType,
  args: {},
  resolve: async (root, params, { request, response }) => {
    let uid = request.user.uid
    try {
      const user = await db.from('users').where('id', uid).where('status', 1).first()
      if (user) {
        return response.status(200).send({
          status: true,
          message: 'User found',
          data: user,
        })
      } else {
        return response.status(404).send({
          status: false,
          message: 'User not found',
        })
      }
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'error.message',
      })
    }
  },
}
