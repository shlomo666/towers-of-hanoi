import produce from 'immer';
import { useMemo, useState } from 'react';
import '../App.css';
import { randColor } from './utils';
import { Poll } from './components/Poll';
import { Ring } from './components/Ring';
import { phantomValue, emptyList, max, widthBase, pollWidth, pollHeight, height } from './consts';

let onMouseUpGlobal: { (arg0: number): void; (towerNum: number): void };

export default function App() {
  // const [towers, setTowers] = useState([[0, 1, 2], [3, 4, 5], [6]]);
  const [towers, setTowers] = useState([[6, 5, 4, 3, 2, 1, 0], [], []]);
  const [hanging, setHanging] = useState(phantomValue);

  const onMouseUp = (onMouseUpGlobal = (towerNum: number) => {
    if (hanging === phantomValue) {
      select(towerNum);
    } else {
      move(towerNum);
    }
  });

  function select(towerNum: number) {
    const newTowers = produce(towers, (towers) => {
      const val = towers[towerNum].pop();
      setHanging(val!);
    });
    setTowers(newTowers);
  }
  function move(dest: number) {
    const tower = towers[dest];
    const lastRingValue = tower[tower.length - 1];
    const isEmptyTower = !tower.length;
    if (isEmptyTower || hanging < lastRingValue) {
      const newTowers = produce(towers, (towers) => {
        towers[dest].push(hanging);
      });
      setHanging(phantomValue);
      setTowers(newTowers);
    }
  }

  return (
    <div className="App">
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%'
        }}
      >
        <Hanging hanging={hanging} />
        {Towers(towers, onMouseUp)}
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

function Towers(towers: number[][], onMouseUp: (towerNum: number) => void) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {towers.map((tower, i) => (
        <Tower arr={tower} idx={i} key={tower.join(',') + i} onMouseUp={onMouseUp} />
      ))}
    </div>
  );
}

function Tower({ arr, idx, onMouseUp }: { arr: number[]; idx: number; onMouseUp: (towerNum: number) => void }) {
  const valuesOfTower = useMemo(() => {
    console.log(1);
    return [...arr, ...emptyList].reverse().slice(-max);
  }, [arr]);

  return (
    <div
      onMouseUp={() => onMouseUp(idx)}
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

// (async function steps() {
//   await moveTower(1, 3, 7);
// })();

async function moveTower(from: number, to: number, n: number) {
  if (n === 1) {
    await step(from, to);
  } else {
    const other = 6 - from - to;
    await moveTower(from, other, n - 1);
    await step(from, to);
    await moveTower(other, to, n - 1);
  }
}

async function step(from: number, to: number) {
  await action(from);
  await action(to);
}

function action(n: number) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      onMouseUpGlobal(n - 1);
      resolve();
    }, 200)
  );
}
