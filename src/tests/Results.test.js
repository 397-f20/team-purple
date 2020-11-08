import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import renderer from "react-test-renderer";
import winner from "../../utils/winner";
import Results from "../screens/Results";

// class router{
//   constructor(id) {
//     this.params = { pollId: id}
//   }
// }

// route = new router('fox');

// const route = () => {
//   return {
//     params: () => {
//       return {
//         pollId: () => {
//           return "fox";
//         },
//       };
//     },
//   };
// };

// const route = () => {
//   return {
//     params: {
//         pollId: "fox",
//     }
//   };
// };

// const route = () => {
//   this.params = () => {
//     return {pollId: "fox"}
//   }
// }

// describe("<Results />", () => {
//   it("has 1 child", async () => {
//     const tree = renderer.create(<Results route={route} />).toJSON();
//     await act(async () => {
//       expect(tree.children.length).toBe(1);
//     });
//   });
// });

const route = {
  params: { pollId: "-MKq65RirJuEavylaDax", roomCode: "piza", count: 21 },
};

const navigation = { navigate: jest.fn(), setOptions: jest.fn() };



import mockedWinner from "../../utils/winner";

const mockedinner = jest.fn(() =>  [{
      title: 'option',
      overall: 15,
      labels: ['hi','byee'],
      criteriaRatings: [2, 4],
      win: true
    }]
 );

 jest.mock("../../utils/winner", () => {
  
    return [{
      title: 'option',
      overall: 15,
      labels: ['hi','byee'],
      criteriaRatings: [2,4],
      win: true
    }];
});



describe("Hello", () => {
  it("renders the correct message", async () => {
    const { queryByText } =  render(
      <Results navigation={navigation} route={route} />
    );
    await expect(queryByText("Pie")).not.toBeNull();
  });
});

describe("<Results />", () => {
  it("has 1 child", async () => {
    const tree = renderer
      .create(<Results navigation={navigation} route={route} />)
      .toJSON();
    await expect(tree.length).toBe(1);
  });
});
