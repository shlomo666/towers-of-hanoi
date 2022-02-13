import produce from 'immer';
import { createStore } from 'redux';
import { phantomValue } from './common/consts';

export interface TowersState {
  towers: number[][];
  hanging: number;
}

// [[0, 1, 2], [3, 4, 5], [6]]

const initialState: TowersState = {
  towers: [[6, 5, 4, 3, 2, 1, 0], [], []],
  hanging: phantomValue
};

function appReducer(state = initialState, action: { type: any; payload: any }) {
  switch (action.type) {
    case 'toggleHanging':
      return produce(state, (draft) => {
        const towerNum = action.payload;
        toggleHangingOnStore(draft, towerNum);
      });
    default:
      return state;
  }
}

const toggleHangingOnStore = (draft: TowersState, towerNum: number) => {
  const { hanging, towers } = draft;
  if (draft.hanging === phantomValue) {
    select(towerNum);
  } else {
    move(towerNum);
  }

  function select(from: number) {
    const val = towers[from].pop();
    draft.hanging = val!;
  }
  function move(to: number) {
    const tower = towers[to];
    const lastRingValue = tower[tower.length - 1];
    const isEmptyTower = !tower.length;
    if (isEmptyTower || hanging < lastRingValue) {
      towers[to].push(hanging);
      draft.hanging = phantomValue;
    }
  }
};

export const toggleHanging = (towerNum: number) => {
  store.dispatch({ type: 'toggleHanging', payload: towerNum });
};

export const store = createStore(appReducer);
