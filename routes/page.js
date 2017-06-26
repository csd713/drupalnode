var express = require('express');
var router = express.Router();
var http = require('http');
var app = express();

var blogsURL = "http://local.test-project.com/jsonapi/node/page?_format=api_json";

exports.getData = function(request, response) {

  var req = http.get(blogsURL, function(res) {

    var result = '';
    var dataArray = '';

    res.on('data', function(chunk) {
      result += chunk;
    });

    res.on("end", function() {
      if (response.statusCode === 200) {
        try {
          data = JSON.parse(result.toString().trim());
          dataArray = data.data;
        } catch (error) {
          console.log("Pages.js: Can't parse JSON!")
        }
        var info = '<h2>List of Pages</h2>';
        dataArray.forEach(function(item) {
          info += `
                   <ul>
                   <li>
                   <h4>Title: ${item.attributes.title}</h4>
                   </li>
                   NID: ${item.attributes.nid}
                   <br>Body: ${item.attributes.body.value}
                   </ul>
                     `;
        });
        response.send(`${info}`);
      } else {
        console.log("Pages.js: Something is wrong")
      }
    });
    req.end();
    req.on('error', function(e) {
      console.error(e);
      response.send(e);
    });
  });
}
