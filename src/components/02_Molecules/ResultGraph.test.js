import React from 'react';
import renderer from 'react-test-renderer';

import ResultGraph from './ResultGraph';

const mockData = {
  labels: ['pie', 'pizza', 'Total'],
  datasets: [{
    data: [0, 40, 25],
  } ],
} 

describe('<ResultGraph />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<ResultGraph title="title" data={mockData}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});