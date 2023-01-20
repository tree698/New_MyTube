import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { formatAgo } from '../../util/date';
import { fakeVideo as video } from '../../tests/videoData';
import { withRouter } from '../../tests/utils';
import renderer from 'react-test-renderer';

describe('VideoCard', () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it('renders grid type correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders list type correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path="/" element={<VideoCard video={video} type={'list'} />} />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders video item', () => {
    render(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    // render(
    //   <MemoryRouter>
    //     <VideoCard video={video} />
    //   </MemoryRouter>
    // );

    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it('navigate to detailed video page with video state when clicking a video card', () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );
    // render(
    //   <MemoryRouter initialEntries={['/']}>
    //     <Routes>
    //       <Route path="/" element={<VideoCard video={video} />} />
    //       <Route
    //         path={`/videos/watch/${video.id}`}
    //         element={<LocationStateDisplay />}
    //       />
    //     </Routes>
    //   </MemoryRouter>
    // );

    const card = screen.getByRole('listitem');
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
