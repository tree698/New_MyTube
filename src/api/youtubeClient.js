import axios from 'axios';

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API },
    });
  }
  // search(keyword) {
  //   return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  // }

  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }
}
