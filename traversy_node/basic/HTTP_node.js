import http from 'http';

const host = 'localhost';
const port = 8000;

const todos = [
  { id: 1, text: 'Todo One' },
  { id: 2, text: 'Todo Two' },
  { id: 3, text: 'Todo Three' },
];

const server = http.createServer((req, res) => {
  // res.statusCode = 404
  // res.setHeader('Content-Type', 'application/json')
  // res.setHeader('X-Powered-By', 'Node.js')

  const { method, url } = req;
  console.log(url);
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    let status = 404;
    const response = {
      success: false,
      data: null,
      error: null
    };

    if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos;
    } else if (method === 'POST' && url === '/todos') {
      const { id, text } = JSON.parse(body);

      if (!id || !text) {
        status = 400;
        response.error = 'Please add id and text'
      } else {
        todos.push({ id, text });
        status = 201;
        response.success = true;
        response.data = todos;
      }
    }

    // Equivalent to: (this is the response header from the server)
    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js',
    });

    res.end(JSON.stringify(response));
  });
});

// console.log(req.headers.authorization)

server.listen(port, host, () => {
  console.log(`Server running on $${host} ${port}`);
});

// ---> nodemon package helps in auto restart of the server which can be very useful
