import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { operationNames } from '#graphql/protected'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class JwtMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    let { operationName } = ctx.request.body()
    if (operationNames.includes(operationName)) {
      const authHeader = ctx.request.header('Authorization')
      const token = authHeader?.split(' ')[1]
      if (!token)
        return ctx.response.status(401).json({ status: false, message: 'Unauthorized, No Token' })
      try {
        const jwtSecret = env.get('JWT_SECRET')
        const decoded = jwt.verify(token, jwtSecret)
        ctx.request.user = decoded
        await next()
      } catch (err) {
        return ctx.response.status(401).json({ status: false, message: 'Invalid Token' })
      }
    }
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
