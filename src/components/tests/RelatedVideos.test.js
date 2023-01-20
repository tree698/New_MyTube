import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { fakeVideos } from '../../tests/videoData';
import RelatedVideos from '../RelatedVideos';

describe('RelatedVideos', () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it('renders correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    const { asFragment } = renderRelatedVideos();

    await waitForElementToBeRemoved(() => screen.queryAllByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders related video correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith('id');
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    );
  });

  it('renders loading', () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);
    renderRelatedVideos();

    // await waitFor(() => screen.getByText('Loading...'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error('error');
    });
    renderRelatedVideos();
    // await waitFor(() =>
    //   expect(() =>
    //     screen.getByText('Something is wrong 😖')
    //   ).toBeInTheDocument()
    // );
    await waitFor(() =>
      expect(screen.getByText('Something is wrong 😖')).toBeInTheDocument()
    );
  });

  function renderRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );
  }
});
