// const abs = Math.abs;
//
// function getSing(num){
//   return num > 0 ? 1 : -1;
// }
//
// function getInitValues(startPoint, finalPoint){
//   const { x: fPointX, y: fPointY } = finalPoint;
//   const diffx = fPointX - startPoint.x;
//   const diffy = fPointY - startPoint.y;
//
//   return {
//     absDiffx: abs(diffx),
//     absDiffy: abs(diffy),
//     signx: getSing(diffx),
//     signy: getSing(diffy),
//     fPointX,
//     fPointY
//   }
// }
//
// function inLoop(sign, currentP, finalP){
//   return sign < 0 ? currentP >= finalP : currentP <= finalP;
// }
//
// export function* bresenhamLine(startPoint, finalPoint) {
//   const {
//     absDiffx, absDiffy,
//     signx, signy,
//     fPointX, fPointY
//   } = getInitValues(startPoint, finalPoint);
//
//   let eps = 0;
//
//   if(absDiffx > absDiffy) {
//     for(var { x, y } = startPoint; inLoop(signx, x, fPointX); x += signx) {
//       yield { x, y };
//       eps += absDiffy;
//       if((eps<<1) >= absDiffx) {
//         y += signy;
//         eps -= absDiffx;
//       }
//     }
//   } else {
//     for(var { x, y } = startPoint; inLoop(signy, y, fPointY); y += signy) {
//       yield { x, y };
//       eps += absDiffx;
//       if((eps<<1) >= absDiffy) {
//         x += signx;
//         eps -= absDiffy;
//       }
//     }
//   }
// };

//
// const abs = Math.abs;
//
// function getSing(num){
//   return num > 0 ? 1 : -1;
// }
//
// function getInitValues(startPoint, finalPoint){
//   const diffx = finalPoint.x - startPoint.x;
//   const diffy = finalPoint.y - startPoint.y;
//
//   return {
//     absDiff: {
//       x: abs(diffx),
//       y: abs(diffy)
//     },
//     sign: {
//       x: getSing(diffx),
//       y: getSing(diffy)
//     }
//   }
// }
//
// function inLoop(sign, currentP, finalP){
//   return sign < 0 ? currentP >= finalP : currentP <= finalP;
// }
//
// function* loopAction(point, absDiff, sign, final, mainCoordinate, coordinate){
//   let eps = 0;
//   for( ; inLoop(sign[mainCoordinate], point[mainCoordinate], final);
//             point[mainCoordinate] += sign[mainCoordinate]) {
//     yield Object.assign({}, point);
//     eps += absDiff[coordinate];
//     if((eps<<1) >= absDiff[mainCoordinate]) {
//       point[coordinate] += sign[coordinate];
//       eps -= absDiff[mainCoordinate];
//     }
//   }
// }
//
// export function* bresenhamLine(startPoint, finalPoint) {
//   const { absDiff, sign } = getInitValues(startPoint, finalPoint);
//   let mainCoordinate, coordinate;
//
//   if(absDiff.x > absDiff.y) {
//     coordinate = 'y';
//     mainCoordinate = 'x';
//   }else{
//     coordinate = 'x';
//     mainCoordinate = 'y';
//   }
//   const finalCord = finalPoint[mainCoordinate];
//   yield* loopAction(startPoint, absDiff, sign, finalCord, mainCoordinate, coordinate);
// };




function getSing(num){
  return num > 0 ? 1 : -1;
}

function getInitValues(startPoint, finalPoint){
  const abs = Math.abs;
  const diffx = finalPoint.x - startPoint.x;
  const diffy = finalPoint.y - startPoint.y;

  return {
    absDiff: {
      x: abs(diffx),
      y: abs(diffy)
    },
    sign: {
      x: getSing(diffx),
      y: getSing(diffy)
    }
  }
}

function inLoop(sign, currentP, finalP){
  return sign < 0 ? currentP >= finalP : currentP <= finalP;
}

function calcMainCoordinates(absDiff){
  return absDiff.x > absDiff.y ? ['x', 'y'] : ['y', 'x'];
}


export function* bresenhamLine(point, finalPoint) {
  const { absDiff, sign } = getInitValues(point, finalPoint);
  const [ mainCoordinate, coordinate ] = calcMainCoordinates(absDiff);

  const final = finalPoint[mainCoordinate];

  const mainSign = sign[mainCoordinate];
  const secondSign = sign[coordinate];

  const mainDiff = absDiff[mainCoordinate];
  const secondDiff = absDiff[coordinate];

  let mainValue = point[mainCoordinate];
  let secondValue = point[coordinate];

  let eps = 0;

  for( ; inLoop(mainSign, mainValue, final); mainValue += mainSign) {
    yield {
      [mainCoordinate]: mainValue,
      [coordinate]: secondValue
    }
    eps += secondDiff;
    if((eps<<1) >= mainDiff) {
      secondValue += secondSign;
      eps -= mainDiff;
    }
  }

};
