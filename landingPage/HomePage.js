import React from "react";
import oauthSignature from "oauth-signature";
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.getPredictions = this.getPredictions.bind(this);
  }

  getPredictions(e) {
    let value = "9878687jkjkmk";
    let time_stamp = Math.round(new Date().getTime() / 1000);
    console.log(time_stamp);
    let url = "https://api.twitter.com/1.1/search/tweets.json?";
    let parameter = {
      oauth_consumer_key: "Zr540mnkTTdJKKE2Y5KRXdfCo",
      oauth_nonce: "1hello432r5321msytrh6ajl4k23mksadfas11223",
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: time_stamp,
      oauth_token: "346873261-PkUFS5x57TEyLNnrdNqWzMNmaYpDPgMQkni9l0LU",
      oauth_version: "1.0",
      q: value
    };
    let signature = oauthSignature.generate(
      "GET",
      url,
      parameter,
      "wMs0aQSYGbXftDiZ1oZbrnAQN4lJCHsFPCAOLhgBkRXrqojtPO",
      "Wr8eo4XlQYY2M5CgmdwW1q7ILrNulh4UX28Bl47yhKtsX",
      {
        encodedSignature: true
      }
    );
    console.log(signature);
    let temp =
      'OAuth oauth_consumer_key="Zr540mnkTTdJKKE2Y5KRXdfCo",oauth_token="346873261-PkUFS5x57TEyLNnrdNqWzMNmaYpDPgMQkni9l0LU",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' +
      time_stamp +
      '",oauth_nonce="hello432r5321msadfjlkmdsajl4k23mksadfas122",oauth_version="1.0",oauth_signature="' +
      signature +
      '"';
    console.log(temp);
    fetch("https://cors-anywhere.herokuapp.com/" + url + "q=" + value, {
      headers: {
        Authorization:
          'OAuth oauth_consumer_key="Zr540mnkTTdJKKE2Y5KRXdfCo",oauth_token="346873261-PkUFS5x57TEyLNnrdNqWzMNmaYpDPgMQkni9l0LU",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' +
          time_stamp +
          '",oauth_nonce="1hello432r5321msytrh6ajl4k23mksadfas11223",oauth_version="1.0",oauth_signature="' +
          signature +
          '"'
      }
    })
      .then(r1 => r1.json())
      .then(data => console.log(data["statuses"][0].text));
  }

  render() {
    return (
      <div>
        <button onClick={this.getPredictions}>click me</button>
      </div>
    );
  }
}

export default LandingPage;
