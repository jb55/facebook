
# facebook

  Facebook component

## Installation

  Install with [component(1)](http://component.io):

    $ component install jb55/facebook

## API

```javascript
var facebook = require('facebook')({
  appId: '506040000000000',
  channelUrl : 'http://example.com',
  status     : true, // check login status
  cookie     : true, // enable cookies to allow the server to access the session
  xfbml      : true  // parse XFBML
});

// Get FB context
facebook.FB(function (FB) {
});

facebook.on('login', function(res) {
});
```

## Events

* login - fired when user is logged in
* logout - fired when user logs out
* status - fired when user status changes

## License

  MIT
