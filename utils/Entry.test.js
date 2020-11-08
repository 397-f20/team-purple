import React from "react";
import renderer from "react-test-renderer";

import Entry from "../screens/Entry";

describe("<Entry />", () => {
  it("has 3 child", () => {
    const tree = renderer.create(<Entry />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
