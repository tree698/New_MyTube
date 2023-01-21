import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  return (
    <section>
      <article>
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`https://www.youtube.com/embed/${video.id}`}
          allowFullScreen
          title={title}
          className="rounded-md"
        />
        <div className="p-8">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
      </article>
      <section>
        <h1 className="font-medium text-2xl mt-5 mb-5">📺 Related Videos</h1>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
