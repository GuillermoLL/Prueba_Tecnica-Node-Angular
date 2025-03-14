  const { method, url } = request

  if (method === 'POST' && url === '/users') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(data))
    return
  }

  // Me parece una mala practica usar el metodo POST para filtrar
  // asi que hice lo mismo pero con el metodo GET
  if (method === 'GET' && url === '/users') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(data))
    return
  }

  response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
  response.write('<h1>Page not found</h1>')
}