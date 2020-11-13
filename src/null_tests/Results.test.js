import React from "react";
import { rerender, render, fireEvent, mount } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import renderer, {act} from "react-test-renderer";
import {shallow, configure} from 'enzyme';
import Results from "../src/screens/Results";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const route = {
  params: { pollId: "-MKq65RirJuEavylaDax", roomCode: "piza", count: 21 },
};

const navigation = { navigate: jest.fn(), setOptions: jest.fn() };

const winner = jest.fn()

const mockedinner  = [
  {
    title: "option",
    overall: 15,
    labels: ["hi", "byee"],
    criteriaRatings: [2, 4],
    win: true,
  },
];



describe("Hello", () => {
  it("renders the correct message", async () => {
    const { queryByText } = render(
      <Results navigation={navigation} route={route} />
    );
    await expect(queryByText("Pie")).not.toBeNull();
  });
});


// describe('MyComponent', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<Results navigation={navigation} route={route} />);
  
//     // expect(component).toMatchSnapshot();
//     expect(component.text()).to.contain('winner')
//   });
// });
