
var Emitter = require('emitter');
var facebook = require('facebook-script');
var avar = require('avar');

module.exports = Facebook;

function Facebook(opts) {
  if (!(this instanceof Facebook)) return new Facebook(opts);
  var self = this;
  this.opts = opts;
  this.fetching = false;
  this._FB = avar(function(done) {
    facebook(self.opts.appId, self.opts, function (err, FB) {
      if (err) throw new Error("Failed to retrieve FB context", err);
      return done(FB);
    });
  });

  this.subscribe('auth.authResponseChange', function (res) {
    self.emit('status', res.status);
    if (res.status === 'connected') {
      self._readAuthData(res.authResponse);
      self.emit('login', res);
    } else {
      self.emit('logout', res);
    }
  });

  this.on('login',  function() { self.isLoggedIn = true; });
  this.on('logout', function() { self.isLoggedIn = false; });
}

Emitter(Facebook.prototype);

Facebook.prototype.FB = function(cb) {
  this._FB.get(cb);
};

Facebook.prototype.subscribe = function (s, fn) {
  var self = this;
  if (fn) self.on(s, fn);
  this.FB(function(FB){
    FB.Event.subscribe(s, function (response) {
      self.emit(s, response);
    });
  });
};
