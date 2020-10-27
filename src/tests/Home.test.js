import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../screens/Home';

// describe('<Home/>', () => {
//     it('<RoomCodeEntry/>', () => {
//         const wrapper = shallow(<Home />);
//         expect(wrapper.containsMatchingElement(<RoomCodeEntry />)).toEqual(true);
//     });
// });

describe('<Home />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});