import React from "react";
import "../index.css";
import { DebounceInput } from "react-debounce-input";
import { TWEET_SEARCH } from "../constants/api-endpoints";
import { NAME_SEARCH } from "../constants/api-endpoints";
import { USERNAME_SEARCH } from "../constants/api-endpoints";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TweetsPage from "./TweetsPage";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      predictions: [],
      userIds: [],
      statuses: [],
      show: false
    };
  }
  search = () => {
    if (this.state.show) {
      this.setState({
        show: false
      });
    } else {
      this.setState({
        show: true
      });
    }
  };

  showTweets = e => {
    let id = e.target.value;
    console.log("id", id);
  };
  getURL = value => {
    let url = "";
    let queryValue = "";
    let query = "";
    if (value[0] == "@") {
      url = USERNAME_SEARCH;
      queryValue = encodeURIComponent(value);
      query = "screen_name=" + queryValue;
    } else if (value[0] == "#") {
      url = TWEET_SEARCH;
      queryValue = encodeURIComponent(value);
      query = "q=" + queryValue + "&include_entites=true";
    } else {
      url = NAME_SEARCH;
      queryValue = encodeURIComponent(value);
      query = "q=" + queryValue;
    }
    return [url, query];
  };

  getPredictions = (data, value) => {
    let predicted = [];
    let predictedIds = [];
    if (value[0] == "@") {
      let name = "@" + data["screen_name"] + " " + data["name"];
      predicted.push(name);
      predictedIds.push(data["id_str"]);
    } else if (value[0] == "#") {
      let len = 0;
      data["statuses"].length > 4 ? (len = 5) : (len = data["statuses"].length);
      for (let k = 0; k < len; k++) {
        predicted.push(data["statuses"][k]["text"]);
        predictedIds.push(data["statuses"][k]["id_str"]);
      }
      this.setState({
        statuses: data["statuses"]
      });
    } else {
      let len = 0;
      data.length > 4 ? (len = 5) : (len = data.length);
      for (let k = 0; k < len; k++) {
        predicted.push(data[k]["name"]);
        predictedIds.push(data[k]["id_str"]);
      }
    }
    return [predicted, predictedIds];
  };
  updateState = value => {
    let urlQuery = this.getURL(value);
    let url = urlQuery[0] + urlQuery[1];
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return null;
        }
        return response.json();
      })
      .then(data => {
        let predicted = this.getPredictions(data, value);
        console.log(data);
        this.setState({
          predictions: predicted[0],
          userIds: predicted[1]
        });
      })
      .catch(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  };
  onChange = e => {
    let value = e.target.value;
    this.setState({
      value: value
    });
    if (value.length > 1) {
      this.updateState(value);
    } else {
      this.setState({
        predictions: [],
        userIds: []
      });
    }
  };
  render() {
    return (
      <div id="search">
        <div id="container1">
          <DebounceInput
            id="searchin"
            minLength={1}
            debounceTimeout={100}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button type="button" id="btnsearch" onClick={this.search}>
            Search
          </button>
          {this.state.show ? (
            <TweetsPage statuses={this.state.statuses} />
          ) : null}
        </div>
        <div id="container2">
          <ul id="list">
            {this.state.predictions.map((item, index) => (
              <li key={index + item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchPage;
