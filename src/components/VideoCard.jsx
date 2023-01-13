import React from 'react';
import { formatTime } from '../util/date';

export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  return (
    <li>
      <img className="w-full" src={thumbnails.medium.url} alt="" />
      <div>
        <p className="font-sembold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatTime(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
