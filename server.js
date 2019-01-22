const net = require('net');
// const http = require('http');
const fs = require('fs');


let contentType = "";
let contentLength = 0;
let body = "";
let date = new Date().toUTCString();

function response(date, contentType, body, ) {

  return `HTTP/1.1 200 OK
Server: xminx/1.4.15
Date: ${date}
Content-Type: ${contentType}
Content-Length: ${body.length}

${body}`;

}

// this creates a server
const server = net.createServer(socket => {
  socket.setEncoding('utf8');
  socket.on('data', (data) => {
    // this is the request
    console.log('Data', data);

    let request = data.slice(0, data.indexOf("H") - 1);

    if (request === "GET /index.html") {
      contentType = "text/html; charset=8"
      fs.readFile('./index.html', function read(err, data) {
        if (err) {
          throw err;
        }
        // console.log(response(date, contentType, data, contentLength))
        socket.write(response(date, contentType, data));
        socket.end();
      });
    } else
      if (request === "GET /hydrogen.html") {
        contentType = "text/html; charset=8"
        fs.readFile('./hydrogen.html', function read(err, data) {
          if (err) {
            throw err;
          }
          socket.write(response(date, contentType, data));
          socket.end();
        });
      } else
        if (request === "GET /helium.html") {
          contentType = "text/html; charset=8"
          fs.readFile('./helium.html', function read(err, data) {
            if (err) {
              throw err;
            }
            socket.write(response(date, contentType, data));
            socket.end();
          });
        } else
          if (request === "GET /css/styles.css") {
            contentType = "text/css; charset=8"
            fs.readFile('./styles.css', function read(err, data) {
              if (err) {
                throw err;
              }
              socket.write(response(date, contentType, data));
              socket.end();
            });
          } else
            if (request === "GET /error.html") {
              contentType = "text/html; charset=8"
              fs.readFile('./error.html', function read(err, data) {
                if (err) {
                  throw err;
                }
                socket.write(response(date, contentType, data));
                socket.end();
              });
            }
  });
})
  // handle errors on the server
  .on('error', (err) => {
    console.log(err);
  });

// this starts the server
server.listen(8080, () => {
  console.log('Server is UP');
});