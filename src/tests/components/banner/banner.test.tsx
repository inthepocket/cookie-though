// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { h } from 'preact';
import { shallow } from 'enzyme';
import mockConfig from '../../__mocks__/config';

import Banner from '../../../components/banner';

describe('Banner', () => {
  it('can render without a title and subTitle', () => {
    const { description } = mockConfig.header;
    const wrapper = shallow(<Banner header={{ description }} />);
    expect(wrapper.find('.ct-banner-header').children().exists()).toBeFalsy();
  });

  it('can render with a header', () => {
    const wrapper = shallow(<Banner header={mockConfig.header} />);
    expect(wrapper.find('.ct-banner-header').find('p:not(.ct-banner-title)').text()).toEqual(
      mockConfig.header.subTitle,
    );
    expect(wrapper.find('.ct-banner-header').find('.ct-banner-title').text()).toEqual(
      mockConfig.header.title,
    );
    expect(wrapper.find('.ct-banner-explanation').text()).toEqual(mockConfig.header.description);
  });
});
