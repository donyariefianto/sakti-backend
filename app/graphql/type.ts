import { GraphQLScalarType, Kind } from 'graphql'

export const RawObjectType = new GraphQLScalarType({
  name: 'RawObject',
  description: 'Custom scalar type for raw object',
  parseValue(value) {
    // Menangani input
    return value
  },
  serialize(value) {
    // Menyerialisasi raw object ke bentuk JSON
    return value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        return JSON.parse(ast.value) // Mengonversi string literal menjadi objek
      } catch (e) {
        throw new Error('Input is not valid')
      }
    }
    return {}
  },
})

export const GraphQLDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A custom scalar type for DateTime',
  parseValue(value) {
    return new Date(value) // Mengubah nilai input menjadi objek Date
  },
  serialize(value) {
    return value.toISOString() // Menyerialisasi objek Date ke format ISO string
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value) // Mengubah string literal menjadi objek Date
    }
    return null
  },
})

export const generateText = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    token += characters.charAt(randomIndex) // Tambahkan karakter acak ke token
  }

  return token
}
