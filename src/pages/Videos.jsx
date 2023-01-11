import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () =>
      axios
        .get(`/videos/${keyword ? 'search' : 'popular'}.json`)
        .then((res) => {
          console.log(res);
          return res.data.items;
        }),
  });
  return (
    <>
      <div>Videos {keyword ? `${keyword}` : '🔥'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
// fetch(`/videos/${keyword ? 'search' : 'popular'}.json`)
//   .then((res) => res.json())
//   .then((data) => data.items),
