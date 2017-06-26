var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send(`
<h2> Drupal with Node.JS</h2>
<li><a href="/article"> Articles </a></li>
<li><a href="/page"> Pages </a></li>
<li><a href="/taco"> Tacos </a></li>
<li><a href="/user"> Users </a></li>
`);
});

module.exports = router;
