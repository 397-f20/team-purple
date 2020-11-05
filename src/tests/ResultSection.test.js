import React from 'react';
import renderer from 'react-test-renderer';

import ResultSection from '../components/02_Molecules/ResultSection';

const mockData = {
  labels: ['pie', 'pizza', 'Total'],
  datasets: [{
    data: [0, 40, 25],
  } ],
} 

describe('<ResultSection />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<ResultSection title="title" data={mockData}/>).toJSON();
    expect(tree.children.length).toBe(3);
  });
}); 