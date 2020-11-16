import React from "react";
import renderer from "react-test-renderer";
import Entry from "../screens/Entry";

describe("<Entry />", () => {
  it("has 3 child", () => {
    const tree = renderer.create(<Entry />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  let data = {
    count: 8,
    criteria: ["Comfortability", "Package Ecosystem", "Documentation"],
    options: ["React", "Vue"],
    prompt: "Which frontend framework should we use?",
    roomCode: "breathing",
  };
  const handleData = (data, callback) => {
    const mappedCriteria = data.criteria.map(function (key) {
      return [key, 0];
    });
    const valuesObj = Object.fromEntries(mappedCriteria);
    const mappedOptions = data.options.map(function (key) {
      return [key, { ...valuesObj }];
    });
    const optionsObj = Object.fromEntries(mappedOptions);
    callback(optionsObj);
  };

  const mockCallback = jest.fn((data) => data);

  it("organizes data from server", () => {
    handleData(data, mockCallback);
    const state = mockCallback.mock.results[0].value;
    expect(state.React["Comfortability"]).toBe(0);
  });
});
