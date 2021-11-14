import { render } from '@testing-library/preact';

import defaultConfig from '../../config';
import Header from '.';

describe('Header', () => {
  it('can render with optional props', () => {
    const { getByRole } = render(<Header {...defaultConfig.header} />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent(
      `${defaultConfig.header.intro}${defaultConfig.header.title}`,
    );
  });

  it('can render without optional props', () => {
    const { description } = defaultConfig.header;
    const { queryByRole } = render(<Header description={description} />);

    expect(queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
