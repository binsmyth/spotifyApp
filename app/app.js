/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */``

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var requestpromise = require('request-promise');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var spotify = require('./public/lib/spotify.js');

var client_id = 'fb255c97e8894be4ad4a234e3a7ac7ec'; // Your client id
var client_secret = 'a28baddadfe2498897f72169c092b7d7'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/search',function(req,res){
    var query = req.param('query');
    
    requestpromise({url:'https://api.spotify.com/v1/search?q= '+ query + ' +&type=playlist,artist',
        json:true})
      .then(function(data){
        res.send(data)
      })
      .catch(function(err){
        console.log(err);
      })
  })

app.get('/play',function(req,res){
  var id = req.param('id');
  spotify.getTokens().then(() => {
    return spotify.play(id);
  }).then(console.log, console.error)
});

app.get('/call', function(req,res){
  console.log("now");
  var token = req.param('token');
  var option = {
    url:'https://api.spotify.com/v1/browse/categories/chill/playlists/',
    headers:{
          'Authorization': 'Bearer ' + token
        }
  };

  requestpromise(option)
    .then(function(data){
      var playlistdata = JSON.parse(data);
      var playlisthref = [];
      var playlistimageurl = [];
      playlistdata.playlists.items.forEach(function(items,index){
        playlisthref.push(items.href);
        items.images.forEach(function(imgurl,index){
          playlistimageurl.push(imgurl.url);
        })
      });
      getPlaylistData(playlisthref,playlistimageurl);
    })
    .catch(function(err){
      console.log(err);
    });

  function getPlaylistData(href,imgurl){
    var urllength = href.length;
    href.forEach(function(href,index){
      var option = {
        url:href,
        headers:{
          'Authorization': 'Bearer ' + token
        }
      };
      console.log("image url = ", imgurl[0]);
      
      requestpromise(option)
      .then(function(playlistdata){
        playlistdata = JSON.parse(playlistdata);
        var playlisttracksobject = playlistdata.tracks;
        console.log(playlisttracksobject.items[0]);
      })
      .catch(function(err){
        console.log(err);
      })
    })
  }
})
console.log('Listening');
app.listen(process.env.PORT);