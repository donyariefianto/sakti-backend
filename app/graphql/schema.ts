import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { findUsers, usersProfile } from '#graphql/query/users'
import {
  newsPortal,
  newsByIdPortal,
  headerHighlightPortal,
  headerHighlightByIdPortal,
  contentHighlightPortal,
  contentHighlightByIdPortal,
} from '#graphql/query/portal'
import { registerUsers, loginUsers } from '#graphql/mutation/users'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    findUsers: findUsers,
    usersProfile: usersProfile,
    newsPortal: newsPortal,
    newsByIdPortal: newsByIdPortal,
    headerHighlightPortal: headerHighlightPortal,
    headerHighlightByIdPortal: headerHighlightByIdPortal,
    contentHighlightPortal: contentHighlightPortal,
    contentHighlightByIdPortal: contentHighlightByIdPortal,
  },
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    loginUsers: loginUsers,
    registerUsers: registerUsers,
  },
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  // subscription: SubscriptionType,
})
