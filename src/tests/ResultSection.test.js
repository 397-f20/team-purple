import React from 'react';
import renderer from 'react-test-renderer';

import ResultSection from '../components/02_Molecules/ResultSection';

const mockData = {
  title: "option",
  overall: 15,
  labels: ["hi", "byee"],
  criteriaRatings: [2, 4],
  win: true,
}

describe('<ResultSection />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<ResultSection title="title" data={mockData}/>).toJSON();
    expect(tree.children.length).toBe(3);
  });
}); 