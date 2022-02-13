import { useMemo } from 'react';
import '../App.css';
import { randColor } from './common/utils';
import { Poll } from './components/Poll';
import { Ring } from './components/Ring';
import { phantomValue, emptyList, max, widthBase, pollWidth, pollHeight, height } from './common/consts';
import { moveTower } from './moveTower';
import { Provider, useSelector } from 'react-redux';
import { store, toggleHanging, TowersState } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <AppLogic />
    </Provider>
  );
}

function AppLogic() {
  const towers = useSelector<TowersState, number[][]>((state) => state.towers);
  const hanging = useSelector<TowersState, number>((state) => state.hanging);

  const onShowSolution = () => moveTower(1, 3, max);

  return (
    <div className="App">
      <div>
        <button onClick={onShowSolution}>Show Solution</button>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%'
        }}
      >
        <Hanging hanging={hanging} />
        {Towers(towers)}
      </div>
    </div>
  );
}

function Hanging({ hanging }: { hanging: number }) {
  if (hanging === phantomValue) {
    return null;
  }

  return <div style={{ paddingBottom: 60 }}>{getRingByValue(hanging)}</div>;
}

function Towers(towers: number[][]) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {towers.map((tower, i) => (
        <Tower arr={tower} idx={i} key={tower.join(',') + i} />
      ))}
    </div>
  );
}

function Tower({ arr, idx }: { arr: number[]; idx: number }) {
  const valuesOfTower = useMemo(() => {
    return [...arr, ...emptyList].reverse().slice(-max);
  }, [arr]);

  return (
    <div
      onMouseUp={() => toggleHanging(idx)}
      style={{
        position: 'relative',
        minWidth: max * widthBase,
        maxWidth: max * widthBase
      }}
    >
      <Poll width={pollWidth} height={pollHeight} />
      {valuesOfTower.map((n, i) => (
        <div key={i}>{getRingByValue(n)}</div>
      ))}
      <div style={{ padding: 10, fontSize: 30, color: 'blue' }}>{idx + 1}</div>
    </div>
  );
}

function getRingByValue(val: number) {
  return <Ring width={(val + 1) * widthBase} height={height} color={val === phantomValue ? 'none' : randColor(val)} />;
}
