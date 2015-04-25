var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    Minivault = require('minivault-core');

var app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

var router = express.Router();

router.route('/entries/:id')
  .all(function(req, res, next) {
    var secret = req.get('X-Secret');
    if (typeof secret !== 'string' || secret.length === 0) {
      return res.status(401).json({error: 'Invalid secret'});
    }
    req.vault = new Minivault({secret: secret});
    next();
  })
  .get(function(req, res) {
    req.vault.get(req.params.id)
      .then(function(data) {
        res.json(data);
      }, function(err) {
        if (err.code === 'ENOENT') {
          res.sendStatus(404);
        } else {
          res.status(500).json({error: err.message});
        }
      });
  })
  .put(function(req, res) {
    if (req.body === null || typeof req.body !== 'object') {
      return res.status(500).json({error: 'Invalid data'});
    }
    req.vault.put(req.params.id, req.body)
      .then(function() {
        res.json({success: true});
      }, function(err) {
        res.status(500).json({error: err.message});
      });
  });

app.use('/api', router);
app.use(express.static(__dirname + '/public'));

app.listen(3000);
