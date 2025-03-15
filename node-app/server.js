import http from 'node:http'
import { UserController } from './users/user.controller.js'

const server = http.createServer(UserController)
const PORT = process.env.PORT ?? 8080

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
