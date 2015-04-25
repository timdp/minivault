(function() {

var dom = {
  secret: document.getElementById('inp-secret'),
  retrieve: {
    id: document.getElementById('inp-retrieve-id'),
    data: document.getElementById('ta-retrieve-data'),
    button: document.getElementById('btn-retrieve'),
  },
  store: {
    id: document.getElementById('inp-store-id'),
    data: document.getElementById('ta-store-data'),
    button: document.getElementById('btn-store'),
  },
  remove: {
    id: document.getElementById('inp-remove-id'),
    button: document.getElementById('btn-remove')
  }
};

var onXhrResponse = function(xhr, cb) {
  var body = null;
  var bodyError = null;
  try {
    body = JSON.parse(xhr.responseText);
  } catch (err) {
    bodyError = new Error('Failed to parse body: ' + err);
  }
  if (xhr.status === 200) {
    if (bodyError) {
      cb(bodyError, null);
    } else {
      cb(null, body);
    }
  } else {
    if (bodyError || !body.error) {
      cb(new Error('HTTP ' + xhr.status), null)
    } else {
      cb(new Error(body.error), null);
    }
  }
};

var request = function(verb, secret, id, data, cb) {
  var uri = '/api/entries' + (id.length ? '/' + id : '');
  var xhr = new XMLHttpRequest();
  xhr.open(verb, uri, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      onXhrResponse(xhr, cb);
    }
  };
  xhr.setRequestHeader('X-Secret', secret);
  if (verb === 'PUT') {
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
};

var getSecret = function() {
  return dom.secret.value;
};

var onDataChange = function() {
  dom.retrieve.data.value = '';
};
dom.retrieve.id.addEventListener('change', onDataChange);
dom.retrieve.id.addEventListener('keypress', onDataChange);

dom.retrieve.button.addEventListener('click', function() {
  dom.retrieve.id.readonly = true;
  dom.retrieve.button.disabled = true;
  request('GET', getSecret(), dom.retrieve.id.value, null, function(err, data) {
    if (err) {
      alert('ERROR: ' + err.message);
    } else {
      dom.retrieve.data.value = JSON.stringify(data, null, 2);
    }
    dom.retrieve.id.readonly = false;
    dom.retrieve.button.disabled = false;
  });
});

dom.store.button.addEventListener('click', function() {
  var data = null;
  try {
    data = JSON.parse(dom.store.data.value);
  } catch(err) {
    alert('JSON parse error: ' + err);
    return;
  }
  dom.store.id.readonly = true;
  dom.store.data.readonly = true;
  dom.store.button.disabled = true;
  request('PUT', getSecret(), dom.store.id.value, data, function(err, data) {
    if (err) {
      alert('ERROR: ' + err.message);
    } else {
      alert('Successfully stored!');
    }
    dom.store.id.readonly = false;
    dom.store.data.readonly = false;
    dom.store.button.disabled = false;
  });
});

dom.remove.button.addEventListener('click', function() {
  dom.remove.id.readonly = true;
  dom.remove.button.disabled = true;
  request('DELETE', getSecret(), dom.remove.id.value, null, function(err, data) {
    if (err) {
      alert('ERROR: ' + err.message);
    } else {
      alert('Successfully removed!')
    }
    dom.remove.id.readonly = false;
    dom.remove.button.disabled = false;
  });
});

dom.retrieve.button.disabled =
  dom.store.button.disabled =
  dom.remove.button.disabled = false;

})();
