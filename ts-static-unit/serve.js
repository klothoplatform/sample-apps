 /**
 * @klotho::static_unit {
 *   id = "static-unit"
 *   index_document = "index.html"
 *   static_files = ["js/*", "serve.js"]
 * }
 */

  var static = require('node-static');
  var file = new static.Server('./');
  
  require('http').createServer(function (request, response) {
      request.addListener('end', function () {
          file.serve(request, response);
      }).resume();
  }).listen(4200);
  
  console.log('Serving on http://localhost:4200/');
