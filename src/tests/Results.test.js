import React from "react";
import { rerender, render, fireEvent, mount } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import renderer, {act} from "react-test-renderer";
import {shallow, configure} from 'enzyme';
import Results from "../screens/Results";
import Adapter from 'enzyme-adapter-react-16';
import 'jest-dom/extend-expect'

configure({ adapter: new Adapter() });

const route = {
  params: { pollId: "-MKq65RirJuEavylaDax", roomCode: "piza", count: 21 },
};

const navigation = { navigate: jest.fn(), setOptions: jest.fn() };

const winner = jest.fn()

const mockedinner = jest.fn(() => [
  {
    title: "option",
    overall: 15,
    labels: ["hi", "byee"],
    criteriaRatings: [2, 4],
    win: true,
  },
]);

jest.mock("../../utils/winner", () => {
  return [
    {
      title: "option",
      overall: 15,
      labels: ["hi", "byee"],
      criteriaRatings: [2, 4],
      win: true,
    },
  ];
});

describe("Hello", () => {
  it("renders the correct message", async () => {
    const { queryByText } = render(
      <Results navigation={navigation} route={route} />
    );
    await expect(queryByText("Pie")).not.toBeNull();
  });
});

shallow

describe("Hello", () => {
  it("renders the shits", async () => {
    const tree = shallow(
      <Results navigation={navigation} route={route} />
    )
    await expect(tree.length).toBe(1);
    expect(tree).toHaveText('Winner')
  });
});


describe("<Results />", () => {

  it("has 1 child", async () => {
    let tree;
    await act(async () => {
      tree = renderer
        .create(<Results navigation={navigation} route={route} />)
        .toJSON();
    });
    expect(tree.length).toBe(1);

    
  });
});
