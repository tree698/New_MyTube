import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import SearchHeader from '../SearchHeader';
import { withRouter } from '../../tests/utils';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with keyword correctly', () => {
    render(
      withRouter(<Route path="/:keyword" element={<SearchHeader />} />, '/bts')
    );

    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  it('navigate to the results page on search button click', () => {
    const searchKeyword = 'faked-keyword';

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search term is ${searchKeyword}`}</p>}
          />
        </>,
        '/home'
      )
    );

    userEvent.type(screen.getByRole('textbox'), searchKeyword);
    userEvent.click(screen.getByRole('button'));

    expect(
      screen.getByText(`Search term is ${searchKeyword}`)
    ).toBeInTheDocument();
  });

  it('navigate to index page when logo is clicked', () => {
    // function NavigatedPage() {
    //   return <p>Navigated Page!</p>;
    // }
    render(
      withRouter(
        <>
          <Route path="/test" element={<SearchHeader />} />
          <Route path="/" element={<p>{'Navigated Page!'}</p>} />
        </>,
        '/test'
      )
    );

    // const link = screen.getByTestId('link');
    userEvent.click(screen.getByRole('heading'));

    expect(screen.getByText('Navigated Page!')).toBeInTheDocument();
  });
});
