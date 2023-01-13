import { createContext, useContext } from 'react';
import FakeYoutubeClient from '../api/fakeYoutubeClient';
import YoutubeClient from '../api/youtubeClient';
import Youtube from '../api/youtube';

export const YoutubeApiContext = createContext();

const apiClient = new FakeYoutubeClient();
// const apiClient = new YoutubeClient();
const youtube = new Youtube(apiClient);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
