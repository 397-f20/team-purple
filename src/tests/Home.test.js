import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import Home from '../screens/Home';

const navigation = { navigate: jest.fn(), setOptions: jest.fn() };

describe('Hello', () => {
  it('renders the correct message', () => {
    const {queryByText} = render(<Home navigation={navigation}/>);
    expect(queryByText('Room Code:')).not.toBeNull();
  });
});
