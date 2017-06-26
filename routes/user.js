var http = require('http');

var blogsURL = "http://local.test-project.com/jsonapi/user/user?_format=api_json";

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
          console.log("user.js: Can't parse JSON")
        }
        var info = '<h2>List of Users</h2>';
        dataArray.forEach(function(item) {
          info += `
        <ul>
        <li>
        <h4>${item.attributes.name}</h4>
        </li>
        UID: ${item.attributes.uid}
        </ul>
          `;
        });
        response.send(`${info}`);
      } else {
        console.log("user.js: Something is wrong")
      }
    });
    req.end();
    req.on('error', function(e) {
      console.error(e);
      response.send(e);
    });
  });
}
