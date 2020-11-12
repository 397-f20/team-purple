import React from "react";
import renderer, { act } from "react-test-renderer";
import { render } from "@testing-library/react-native";

import Entry from "../screens/Entry";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); //removes useNativeDriver error

describe("<Entry />", () => {
  it("has 3 child", () => {
    const tree = renderer.create(<Entry />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  /*let data = {
    count: 8,
    criteria: ["Comfortability", "Package Ecosystem", "Documentation"],
    options: ["React", "Vue"],
    prompt: "Which frontend framework should we use?",
    roomCode: "breathing",
  };
  const handleData = (data, callback) => {
    if (data != null && values == null) {
      const mappedCriteria = data.criteria.map(function (key) {
        return [key, 0];
      });
      const valuesObj = Object.fromEntries(mappedCriteria);
      const mappedOptions = data.options.map(function (key) {
        return [key, { ...valuesObj }];
      });
      const optionsObj = Object.fromEntries(mappedOptions);
      callback(optionsObj);
    }
  };

  const mockCallback = jest.fn((data) => data);
  handleData(data, mockCallback);

  console.log(mockCallback.mock.results[0].value);*/
});
