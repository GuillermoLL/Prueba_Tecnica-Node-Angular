// import data from './data.json'
import url from 'node:url'
import { readFile } from 'node:fs/promises'
const file = await readFile('./users/data.json', 'utf-8')
const data = JSON.parse(file)

export async function UserController (request, response) {
  const { method } = request
  const { pathname, query } = url.parse(request.url, true)

  // ? Metodos CRUD
  if (method === 'POST' && pathname === '/users') {
    let bodyChunks = ''
    await request
      .on('data', chunk => {
        bodyChunks += chunk.toString()
      })
      .on('end', () => {
        let body = {}
        try {
          body = JSON.parse(bodyChunks)
        } catch {
          response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
          response.end(JSON.stringify({
            error: 'Json mal formateado'
          }))
        }

        if (!validateEntry(body)) {
          response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
          response.end(JSON.stringify({
            error: 'Falta alguna propiedad obligatoria'
          }))
          return
        }

        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        response.end(JSON.stringify(paginateData(body)))
      })
  }

  // Me parece una mala practica usar el metodo POST para filtrar
  // asi que hice lo mismo pero con el metodo GET utilizando los parametros de query
  if (method === 'GET' && pathname === '/users') {
    if (!validateEntry(query)) {
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      response.end(JSON.stringify(data))
      return
    }
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify(paginateData(query)))
    return
  }

  if (method === 'GET') {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    response.write('<h1>Page not found</h1>')
    response.end()
  }
}

function paginateData (config) {
  let { filter, page, per_page: perPage } = config

  page = parseInt(page)
  perPage = parseInt(perPage)

  const usersBlock = (page - 1) * perPage

  let dataToUse = [...data]
  if (filter) {
    filter = filter.toLowerCase()
    dataToUse = filterData({ filter, page, perPage })
  }
  const pages = Math.ceil(dataToUse.length / perPage)
  const slicedData = dataToUse.splice(usersBlock, usersBlock + perPage)

  return {
    _metadata: {
      total: data.length,
      pages,
      page,
      per_page: perPage,
      filter
    },
    users: slicedData
  }
}

function filterData ({ filter, page, perPage }) {
  const filteredData = data.filter((elm) =>
    elm.name.toLowerCase().includes(filter) ||
    elm.surname1.toLowerCase().includes(filter) ||
    elm.surname2.toLowerCase().includes(filter) ||
    elm.email.toLowerCase().includes(filter)
  )

  return filteredData
}

function validateEntry (objectToValidate) {
  if (objectToValidate.page && objectToValidate.per_page) { return true }

  return false
}
