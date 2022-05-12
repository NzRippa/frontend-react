import axios from "axios";

const GET_ALL_USERS_TWEET_API_URL =
  "http://tweetapp-lb-1075291419.us-east-1.elb.amazonaws.com/all";
const BASE_URL = "http://tweetapp-lb-1075291419.us-east-1.elb.amazonaws.com";


class TweetService {
  getAllTweets() {
    console.log("Inside axios get api");
    return axios.get(GET_ALL_USERS_TWEET_API_URL, {
      "Access-Control-Allow-Origin": "*",
    });
  }

  postTweet(tweet) {
    return axios.post(BASE_URL + "/add", tweet, {
      "Access-Control-Allow-Origin": "*",
    });
    // return axios.post(BASE_URL + localStorage.getItem("email") + "/add", tweet, {
    //   "Access-Control-Allow-Origin": "*",
    // });
  }

  deleteTweet(id) {
    return axios.delete(BASE_URL + "/delete" + "/" + id, {
      "Access-Control-Allow-Origin": "*",
    });
    // return axios.delete(
    //   BASE_URL + localStorage.getItem("email") + "/delete" + "/" + id,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // );
  }

  updateTweet(id, tweet) {
    return axios.put(BASE_URL + "/update" + "/" + id, tweet, {
      "Access-Control-Allow-Origin": "*",
    });
    // return axios.put(
    //   BASE_URL + localStorage.getItem("email") + "/update" + "/" + id,
    //   tweet,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // );
  }

  likeTweet(id) {
    return axios.put(BASE_URL + "/like" + "/" + id, {
      "Access-Control-Allow-Origin": "*",
    });
    // return axios.put(
    //   BASE_URL + localStorage.getItem("email") + "/like" + "/" + id,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // );
  }

  replyTweet(id, tweet) {
    return axios.post(
      BASE_URL + localStorage.getItem("email") + "/reply" + "/" + id,
      tweet
    );
  }

  updateTweet(id, tweet) {
    return axios.put(
      BASE_URL + localStorage.getItem("email") + "/update" + "/" + id,
      tweet
    );
  }

  searchUserTweets(userName) {
    return axios.get(BASE_URL + userName);
  }
}

export default new TweetService();
