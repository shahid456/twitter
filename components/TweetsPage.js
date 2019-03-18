import React from "react";
import { TWEET_SEARCH } from "../constants/api-endpoints";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TweetsFormat from "./TweetFormat";
class TweetsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <TweetsFormat status={this.props.statuses[0]} />;
        <TweetsFormat status={this.props.statuses[1]} />
      </div>
    );
  }
}

export default TweetsPage;
