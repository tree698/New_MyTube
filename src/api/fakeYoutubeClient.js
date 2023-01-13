import axios from 'axios';

export default class FakeYoutubeClient {
  constructor() {}
  // search(keyword) {
  //   return keyword ? this.#searchByKeyword() : this.#mostPopular();
  // }

  async search() {
    return axios.get(`/videos/search.json`);
  }

  async videos() {
    return axios.get(`/videos/popular.json`);
  }
}
