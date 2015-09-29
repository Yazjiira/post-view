var http = require('http');
var dispatcher = require('httpdispatcher');
var PORT=5309;
var fs = require('fs');
var server;

var PUBLIC_DIR = './public';
var RES_DIR = 'public/resources';
var API_PREFIX = 'api/posts'

//Declare resources, need to explicity setStaticDirname to './'
//There is an issue w/ the httpdispatcher module, where if this is
//not set explicity, you can end up w/ require('path').join errors.
dispatcher.setStatic(RES_DIR);
dispatcher.setStaticDirname('./');

//Handle the index
dispatcher.onGet("/", function(req, res) {
  fs.readFile('./public/index.html', function(error, content) {
    if (error) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Could not find the stuff');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(content, 'utf-8');
    }
  });
});

//Filter out requests to root and resources, everything else we'll 404 for
//this app. 
dispatcher.beforeFilter(/\//, function(req, res, chain) {
  var docContent = 'Could Not Find';
  var contentType = 'text/plain';

  //if we are requesting root or a resource move to the next part of the chain
  //for this example we have a soft requirement that the RES_DIR is contained
  //within the req.url string. In a more complicated build, we might not want to
  //be as presumptious.
  if ((req.url === '/') || (req.url.indexOf(RES_DIR) > -1) || (req.url.indexOf(API_PREFIX) > -1)) {
    chain.next(req, res, chain);
    return;
  };

  //try to serve 404 file first
  fs.readFile('./public/errors/404.html', function(error, content) {
    if (!error) {
      contentType = 'text/html';
      docContent = content;
    }

    res.writeHead(404, {'Content-Type': contentType});
    res.end(docContent, 'utf-8');
  });
});

server = http.createServer(function(req, res) {
  try {
    console.log('request for: ' + req.url);
    dispatcher.dispatch(req, res);
  } catch (err) {
    console.log(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, function() {
  console.log('app listening at port: ' + PORT);
});
