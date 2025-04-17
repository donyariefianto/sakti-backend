import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { schema } from '#graphql/schema'
import { graphql } from 'graphql'

export default class GraphqlMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      let { query, variables, operationName } = ctx.request.body()
      if (!query) {
        return ctx.response.status(400).send('Query is required')
      }
      const graphqlResponse = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { request: ctx.request, response: ctx.response },
      })
      if (operationName) {
        if (graphqlResponse.errors) {
          return ctx.response.status(400).send({
            status: false,
            message: 'Error in GraphQL query',
            errors: graphqlResponse.errors,
          })
        }
        ctx.request.data = graphqlResponse?.data
      } else {
        if (graphqlResponse.errors) {
          return ctx.response.status(400).send({
            status: false,
            message: 'Error in GraphQL query',
            errors: graphqlResponse.errors,
          })
        }
        return ctx.response.status(200).send(graphqlResponse)
      }
    } catch (error) {
      return ctx.response.status(500).send(error.message)
    }
  }
}
