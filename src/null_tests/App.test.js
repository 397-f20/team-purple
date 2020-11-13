import React from "react";
import renderer, { act, create } from "react-test-renderer";
import App from "../../App";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("<App />", () => {
  jest.useFakeTimers();
  let tree;
  it("renders ", async () => {
    await act(async () => {
      tree = renderer.create(<App />);
    });
  });
});
