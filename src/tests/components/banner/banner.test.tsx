import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Banner from '../../../components/banner';

describe('Banner', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Banner />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
