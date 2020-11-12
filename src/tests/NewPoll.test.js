import React from "react";
import renderer from "react-test-renderer";
import NewPoll from "../screens/NewPoll";

jest.mock('react-dom')

describe("<NewPoll />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<NewPoll />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
