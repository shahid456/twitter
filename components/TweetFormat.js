import React from "react";
import "../index.css";
class TweetFormat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <img src={this.props.status["user"]["profile_image_url"]} />
          <div class="profile-name">
            <h3>{this.props.status["user"]["name"]}</h3>
            <h4>{this.props.status["user"]["screen_name"]}</h4>
          </div>
          <div class="follow-btn">
            <button>Follow</button>
          </div>
        </header>
        <div id="inner">
          <p>{this.props.status["text"]}</p>
          <span class="date">{this.props.status["created_at"]}</span>
          <hr />
        </div>
        <footer>
          <div class="stats">
            <div class="Retweets">
              <strong>{this.props.status["retweet_count"]}</strong> Retweets
            </div>
            <div class="likes">
              <strong>{this.props.status["favorite_count"]}</strong> Likes
            </div>
          </div>
          <div class="cta">
            <button class="share-btn">Share</button>
            <button class="retweet-btn">Retweet</button>
            <button class="like-btn">Like</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default TweetFormat;
