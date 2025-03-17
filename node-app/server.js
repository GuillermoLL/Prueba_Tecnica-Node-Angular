import http from 'node:http'
import { UserController } from './users/user.controller.js'

const server = http.createServer((request, response) => {
  // ? Middleware - Controla el CORS
  cors(request, response)

  UserController(request, response)
})
const PORT = process.env.PORT ?? 8080

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})

function cors (request, response) {
  if (request.headers.origin) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    return
  }

  response.writeHead(423, { 'Content-Type': 'text/html; charset=utf-8' })
  response.end()
}
