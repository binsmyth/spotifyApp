var request = require('superagent');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let PORT = 4370;
let DEFAULT_RETURN_ON = ['login', 'logout', 'play', 'pause', 'error', 'ap'];
let ORIGIN_HEADER = {'Origin': 'https://open.spotify.com'};

class Spotilocal {

  constructor (oauthToken, csrfToken) {
    this.hostName = this.generateHostname();
  }

  getTokens (oauthToken, csrfToken) {
    return new Promise((resolve, reject) => {
      if (oauthToken && csrfToken) {
        this.oauthToken = oauthToken;
        this.csrfToken = csrfToken;
        return resolve();
      }

      // get tokens
      Promise.all([
        this.getCsrfToken(),
        this.getOauthToken()]
      ).then(resolve, reject);
    });
  }

  getJson (url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .query(params)
        .set(headers)
        .end((err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
    });
  }

  generateHostname () {
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let subdomain = '';
    for (let i = 0; i < 10; i++) {
      subdomain += letters[Math.floor(Math.random()*letters.length)];
    }
    return subdomain + '.spotilocal.com';
  }

  getUrl (url = '') {
    return 'https://'+ this.hostName + ':' + PORT + url;
  }

  getVersion () {
    return this.getJson(
      this.getUrl('/service/version.json'),
      {'service': 'remote'},
      ORIGIN_HEADER
    );
  }

  getOauthToken () {
    return new Promise((resolve, reject) => {
      this.getJson('https://open.spotify.com/token')
        .then(data => {
          this.oauthToken = data['t'];
          resolve(data['t']);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getCsrfToken () {
    return new Promise((resolve, reject) => {
      this.getJson(this.getUrl('/simplecsrf/token.json'), null, ORIGIN_HEADER)
        .then(data => {
          this.csrfToken = data['token'];
          resolve(data['token']);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getStatus (returnAfter = 59, returnOn = DEFAULT_RETURN_ON) {
    let params = {
      'oauth': this.oauthToken,
      'csrf': this.csrfToken,
      'returnafter': returnAfter,
      'returnon': returnOn.join(',')
    };
    return this.getJson(this.getUrl('/remote/status.json'), params, ORIGIN_HEADER);
  }

  pause (pause) {
    if (typeof pause === 'undefined') {
      pause = true;
    } else {
      pause = !pause ? false : true;
    }

    let params = {
      'oauth': this.oauthToken,
      'csrf': this.csrfToken,
      'pause': pause,
    };
    return this.getJson(this.getUrl('/remote/pause.json'), params, ORIGIN_HEADER);
  }

  unpause (pause) {
    return this.pause(false);
  }

  openSpotifyClient () {
    return this.getJson(this.getUrl('/remote/open.json'), null, ORIGIN_HEADER);
  }

  play (spotifyUri) {
    let params = {
      'oauth': this.oauthToken,
      'csrf': this.csrfToken,
      'uri': spotifyUri,
      'context': spotifyUri,
    };
    return this.getJson(this.getUrl('/remote/play.json'), params, ORIGIN_HEADER);
  }
}

let spotify = new Spotilocal();
module.exports = spotify;
