function getSing(num) {
  return num > 0 ? 1 : -1;
}

function getInitValues(startPoint, finalPoint) {
  const abs = Math.abs;
  const diffx = finalPoint.x - startPoint.x;
  const diffy = finalPoint.y - startPoint.y;

  return {
    absDiff: {
      x: abs(diffx),
      y: abs(diffy),
    },
    sign: {
      x: getSing(diffx),
      y: getSing(diffy),
    },
  };
}

function getBreakFn(sign) {
  return sign < 0 ?
    (current, final) => current >= final
    : (current, final) => current <= final;
}

function calcMainCoordinates(absDiff) {
  return absDiff.x > absDiff.y ? ['x', 'y'] : ['y', 'x'];
}

export default function* line(point, finalPoint) {
  const { absDiff, sign } = getInitValues(point, finalPoint);
  const [mainCoordinate, coordinate] = calcMainCoordinates(absDiff);

  const final = finalPoint[mainCoordinate];

  const mainSign = sign[mainCoordinate];
  const secondSign = sign[coordinate];

  const mainDiff = absDiff[mainCoordinate];
  const secondDiff = absDiff[coordinate];

  const breakFn = getBreakFn(mainSign);

  let mainValue = point[mainCoordinate];
  let secondValue = point[coordinate];

  let eps = 0;

  for (; breakFn(mainValue, final); mainValue += mainSign) {
    yield {
      [mainCoordinate]: mainValue,
      [coordinate]: secondValue,
    };
    eps += secondDiff;
    if ((eps << 1) >= mainDiff) {
      secondValue += secondSign;
      eps -= mainDiff;
    }
  }
}
