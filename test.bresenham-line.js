import test from 'tape';
import line from './src/bresenham-line';

function buildArray(fn, startPoint, finalPoint){
  const arr = [];

  for (const point of fn(startPoint, finalPoint)) {
    arr.push(point);
  }

  return arr;
}


test('Bresenham\'s line algoritm ', (assert) => {

  [
    {
      start: {
        x: 1,
        y: 1
      },
      final: {
        x: 6,
        y: 2
      },
      expect: [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
        { x: 6, y: 2 }
      ]
    },{
      start: {
        x: -1,
        y: -1
      },
      final: {
        x: -6,
        y: -2
      },
      expect: [
        { x: -1, y: -1 },
        { x: -2, y: -1 },
        { x: -3, y: -1 },
        { x: -4, y: -2 },
        { x: -5, y: -2 },
        { x: -6, y: -2 }
      ]
    }, {
      start: {
        x: 1,
        y: 1
      },
      final: {
        x: 2,
        y: 5
      },
      expect: [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
        { x: 2, y: 5 }
      ]
    }, {
      start: {
        x: 3,
        y: 3
      },
      final: {
        x: 7,
        y: -2
      },
      expect: [
        { x: 3, y: 3 },
        { x: 4, y: 2 },
        { x: 5, y: 1 },
        { x: 5, y: 0 },
        { x: 6, y: -1 },
        { x: 7, y: -2 }
      ]
    }, {
      start: {
        x: 2,
        y: 2
      },
      final: {
        x: 2,
        y: 2
      },
      expect: [
        { x: 2, y: 2 }
      ]
    }
  ].forEach((ele) => {
    const { start, final, expect } = ele;
    const points = buildArray(line, start, final);
    assert.deepEqual(points, expect);
  });

  assert.end();
});
