import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import axios from 'axios'
import { RawObjectType } from '#graphql/type'

export const newsPortal = {
  type: RawObjectType,
  args: {
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    offset: { type: new GraphQLNonNull(GraphQLInt) },
    sort: { type: GraphQLString },
    search: { type: GraphQLString },
  },
  resolve: async (root, params, { request, response }) => {
    let query_params = ''
    if (params.limit) {
      query_params += 'limit=' + params.limit
    }
    if (params.offset) {
      query_params += 'offset=' + params.offset
    }
    if (params.sort) {
      query_params += 'sort=' + params.sort
    }
    if (params.search) {
      query_params += 'search=' + params.search
    }
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://admin.kaltimprov.go.id/items/berita?${query_params}`,
      headers: {},
    }
    try {
      let data = await axios.request(config)
      return response.status(200).send({
        status: true,
        message: 'Data found',
        data: data.data.data,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error fetching data portal',
        error: error.message,
      })
    }
  },
}

export const newsByIdPortal = {
  type: RawObjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, params, { request, response }) => {
    if (!params.id) {
      return response.status(400).send({
        status: false,
        message: 'ID is required',
      })
    }
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://admin.kaltimprov.go.id/items/berita/${params.id}`,
      headers: {},
    }
    try {
      let data = await axios.request(config)
      return response.status(200).send({
        status: true,
        message: 'Data found',
        data: data.data.data,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error fetching data portal',
        error: error.message,
      })
    }
  },
}

export const headerHighlightPortal = {
  type: RawObjectType,
  args: {
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    offset: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (root, params, { request, response }) => {
    let data = JSON.stringify({
      query: `query Header_highlight {
        header_highlight(limit: ${params.limit}, offset: ${params.offset}) {
            user_created
            date_created
            user_updated
            date_updated
            nama
            deskripsi
            sort_highlight
            sort_popup
            id
        }
    }`,
      variables: {},
    })
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
      url: `https://admin.kaltimprov.go.id/graphql/`,
      data: data,
    }
    try {
      let data = await axios.request(config)
      return response.status(200).send({
        status: true,
        message: 'Data found',
        data: data.data.data,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error fetching data portal',
        error: error.message,
      })
    }
  },
}

export const headerHighlightByIdPortal = {
  type: RawObjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, params, { request, response }) => {
    let data = JSON.stringify({
      query: `query Header_highlight {
        header_highlight_by_id(id: "${params.id}") {
          id
          user_created
          date_created
          user_updated
          date_updated
          nama
          deskripsi
          sort_highlight
          sort_popup
        }
    }`,
      variables: {},
    })
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
      url: `https://admin.kaltimprov.go.id/graphql/`,
      data: data,
    }
    try {
      let data = await axios.request(config)
      return response.status(200).send({
        status: true,
        message: 'Data found',
        data: data.data.data,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error fetching data portal',
        error: error.message,
      })
    }
  },
}

export const contentHighlightPortal = {
  type: RawObjectType,
  args: {
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    offset: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (root, params, { request, response }) => {
    let data = JSON.stringify({
      query: `query Content_highlight {
        content_highlight(limit: ${params.limit}, offset: ${params.offset}) {
          id
          user_created
          date_created
          user_updated
          date_updated
          nama_tab
          content
          sort_tab
          in_page_content
        }
    }`,
      variables: {},
    })
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
      url: `https://admin.kaltimprov.go.id/graphql/`,
      data: data,
    }
    try {
      let data = await axios.request(config)
      return response.status(200).send({
        status: true,
        message: 'Data found',
        data: data.data.data,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error fetching data portal',
        error: error.message,
      })
    }
  },
}

export const contentHighlightByIdPortal = {
  type: RawObjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, params, { request, response }) => {
    let data = JSON.stringify({
      query: `query Content_highlight_by_id {
        content_highlight_by_id(id: "${params.id}") {
          user_created
          date_created
          user_updated
          date_updated
          nama_tab
          content
          sort_tab
          in_page_content
        }
    }`,
      variables: {},
    })
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
      url: `https://admin.kaltimprov.go.id/graphql/`,
      data: data,
    }
    try {
      let data = await axios.request(config)
      return response.status(200).send({
        status: true,
        message: 'Data found',
        data: data.data.data,
      })
    } catch (error) {
      return response.status(500).send({
        status: false,
        message: 'Error fetching data portal',
        error: error.message,
      })
    }
  },
}