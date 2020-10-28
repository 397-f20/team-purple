import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../screens/Home';

describe('<Home />', () => {
    it('renders <RoomCodeEntry />', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.containsMatchingElement(<Child />)).toEqual(true);
    });
  });