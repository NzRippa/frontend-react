import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1.0/tweets/";

class UserService {
  login(user) {
    return axios.post(BASE_URL + "login", user);
  }

  logout(user) {
    return axios.post(BASE_URL + "logout", user);
  }

  register(user) {
    return axios.post(BASE_URL + "register", user);
  }

  reset(user) {
    return axios.post(BASE_URL + "forgot", user);
  }
}

export default new UserService();
