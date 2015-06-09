'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _node_modulesMinivaultRestNode_modulesExpress = require('../node_modules/minivault-rest/node_modules/express/');

var _node_modulesMinivaultRestNode_modulesExpress2 = _interopRequireDefault(_node_modulesMinivaultRestNode_modulesExpress);

var _node_modulesMinivaultRestNode_modulesMorgan = require('../node_modules/minivault-rest/node_modules/morgan/');

var _node_modulesMinivaultRestNode_modulesMorgan2 = _interopRequireDefault(_node_modulesMinivaultRestNode_modulesMorgan);

var _node_modulesMinivaultRestNode_modulesBodyParser = require('../node_modules/minivault-rest/node_modules/body-parser/');

var _node_modulesMinivaultRestNode_modulesBodyParser2 = _interopRequireDefault(_node_modulesMinivaultRestNode_modulesBodyParser);

var _minivaultRest = require('minivault-rest');

var _minivaultRest2 = _interopRequireDefault(_minivaultRest);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var PORT = 3000;

var app = (0, _node_modulesMinivaultRestNode_modulesExpress2['default'])();
app.use((0, _node_modulesMinivaultRestNode_modulesMorgan2['default'])('tiny'));
app.use(_node_modulesMinivaultRestNode_modulesBodyParser2['default'].json());
app.use('/api', _minivaultRest2['default']);
app.use(_node_modulesMinivaultRestNode_modulesExpress2['default']['static'](_path2['default'].resolve(__dirname, '..', 'public')));
app.listen(PORT, function () {
  return console.info('Listening on port %d', PORT);
});

(0, _open2['default'])('http://localhost:' + PORT);