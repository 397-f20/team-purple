import React from 'react';

import Home from '../screens/Home';

describe('<Home/>', () => {
    it('<RoomCodeEntry/>', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.containsMatchingElement(<RoomCodeEntry />)).toEqual(true);
    });
  });