import { render } from '@testing-library/preact';

import defaultConfig from '../../config';

import Header from '.';

const props = {
  intro: 'intro',
  title: 'title',
  description: 'description',
};

describe('Header', () => {
  it('can render with props', () => {
    const { getByRole } = render(<Header {...props} />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent(`${props.intro}${props.title}`);
  });

  it('can render without optional props', () => {
    const { getByRole } = render(<Header />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent(
      `${defaultConfig.header.intro}${defaultConfig.header.title}`,
    );
  });

  it('can render without an intro or title', () => {
    const { description } = defaultConfig.header;
    const { queryByRole } = render(<Header intro={null} title={null} description={description} />);

    expect(queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
