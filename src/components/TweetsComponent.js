import React, { Component } from "react";
import tweetservice from "../services/tweetservice";
import HeaderComponent from "./HeaderComponent";

class TweetsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      replies: [],
      tweetMessage: "",
      tweetReply: "",
      tweetUpdate: "",
    };
    // this.addTweet = this.addTweet.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.replyTweet = this.replyTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.likeTweet = this.likeTweet.bind(this);
    this.updateTweet = this.updateTweet.bind(this);
  }

  // addTweet() {
  //   this.props.history.push("/add");
  // }

  postTweet() {
    let tweet = {
      description: this.state.tweetMessage,
      email: localStorage.getItem("email"),
    };
    console.log("tweet ->" + JSON.stringify(tweet));
    tweetservice.postTweet(tweet).then(() => {
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  postTweetHandler = (event) => {
    this.setState({ tweetMessage: event.target.value });
  };

  replyTweet(id) {
    let tweet = {
      description: this.state.tweetReply,
    };
    console.log("tweet ->" + JSON.stringify(tweet));
    tweetservice.replyTweet(id, tweet).then(() => {
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  replyTweetHandler = (event) => {
    this.setState({ tweetReply: event.target.value });
  };

  deleteTweet(id) {
    console.log(id);
    tweetservice.deleteTweet(id).then(() => {
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  likeTweet(id) {
    tweetservice.likeTweet(id).then(() => {
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  updateTweet(id) {
    let tweet = {
      description: this.state.tweetUpdate,
    };
    console.log("tweet ->" + JSON.stringify(tweet));
    tweetservice.updateTweet(id, tweet).then(() => {
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  updateTweetHandler = (event) => {
    this.setState({ tweetUpdate: event.target.value });
  };

  componentDidMount() {
    tweetservice.getAllTweets().then((res) => {
      this.setState({ tweets: res.data });
    });
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="container" style={{ width: "70%", float: "left" }}>
          <h2>ALL TWEETS</h2>
          {this.state.tweets.map((tweet) => (
            <div className="list-group" style={{ width: "20 px" }}>
              <a
                href="#"
                className="list-group-item list-group-item-info"
                aria-current="true"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{tweet.email}</h5>
                  <small>Posted On: {tweet.date.substring(0, 10)}</small>
                </div>

                <div className="container">
                  <div style={{ width: "50%", float: "left" }}>
                    <h5>{tweet.description}</h5>
                  </div>
                  <div style={{ width: "50%", float: "right" }}>
                    <textarea
                      rows="1"
                      cols="1"
                      placeholder="Type your tweet here ..."
                      name="tweetUpdate"
                      className="form-control"
                      onChange={this.updateTweetHandler}
                    />
                    <button
                      className="btn btn-info"
                      disabled={
                        localStorage.getItem("email") === tweet.email
                          ? false
                          : true
                      }
                      onClick={() => this.updateTweet(tweet.id)}
                    >
                      Update Tweet
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div style={{ width: "50%", float: "left" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.likeTweet(tweet.id)}
                    >
                      Like {tweet.likes}
                    </button>
                  </div>

                  <div style={{ width: "50%", float: "right" }}>
                    <button
                      className="btn btn-danger"
                      disabled={
                        localStorage.getItem("email") === tweet.email
                          ? false
                          : true
                      }
                      onClick={() => this.deleteTweet(tweet.id)}
                    >
                      Delete Tweet
                    </button>
                  </div>
                </div>
              </a>

              <div className="list-group-item">
                <div className="container">
                  <h3>Reply </h3>
                  <form>
                    <div className="form-group">
                      <textarea
                        rows="1"
                        cols="20"
                        placeholder="Type your tweet here ..."
                        name="tweetReply"
                        className="form-control"
                        onChange={this.replyTweetHandler}
                      />
                    </div>
                  </form>
                  <br></br>
                  <button
                    className="btn btn-success"
                    onClick={() => this.replyTweet(tweet.id)}
                  >
                    Reply
                  </button>
                </div>
                <h3>Replies:</h3>
                {tweet.replies.map((reply) => (
                  <div className="container">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{reply.email}</h5>
                        <small>Posted On: {reply.date.substring(0, 10)}</small>
                      </div>
                      <h6>{reply.description}</h6>
                      {<br />}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <br></br>
        </div>
        <div className="container" style={{ width: "30%", float: "right" }}>
          <h2>Post tweet</h2>
          <form>
            <div className="form-group">
              <textarea
                rows="10"
                cols="20"
                placeholder="Type your tweet here ..."
                name="tweetMessage"
                className="form-control"
                onChange={this.postTweetHandler}
              />
            </div>
          </form>
          <br></br>
          <button className="btn btn-success" onClick={this.postTweet}>
            Post Tweet
          </button>
        </div>
      </div>
    );
  }
}

export default TweetsComponent;
