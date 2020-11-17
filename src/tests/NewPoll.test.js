import React from "react";
import renderer from "react-test-renderer";
import NewPoll from "../screens/NewPoll";

import validatePollForm from "../../utils/pollValidation";

describe("<NewPoll />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<NewPoll />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  const mockPrompt = "";
  const mockOptions = [];
  const mockCriteria = [];

  const handleData = (callback) => {
    const pollEval = validatePollForm(mockPrompt, mockOptions, mockCriteria);
    callback(pollEval);
  };

  const mockCallback = jest.fn((data) => data);

  it("catches empty prompt", () => {
    handleData(mockCallback);
    const errorMessage = mockCallback.mock.results[0].value;
    expect(errorMessage.message).toBe(
      "Prompt should be longer than 5 characters"
    );
  });
});
