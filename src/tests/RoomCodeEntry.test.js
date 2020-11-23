import React from 'react';
import renderer from 'react-test-renderer';

import RoomCodeEntry from '../components/01_Atoms/RoomCodeEntry';


const mockData = {
  title: "option",
  overall: 15,
  labels: ["hi", "byee"],
  criteriaRatings: [2, 4],
  win: true,
}

const navigation = { navigate: jest.fn(), setOptions: jest.fn() };
const roomCode = "";
const setRoomCode = jest.fn();

describe('<RoomCodeEntry />', () => {
  it('has 3 children', () => {
    const tree = renderer.create(<RoomCodeEntry roomCode={roomCode}
      setRoomCode={setRoomCode}
      navigation={navigation}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
}); 