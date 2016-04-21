# Bresenham's line algorithm

[![npm version](https://img.shields.io/npm/v/bresenham-line.svg)](https://www.npmjs.com/package/bresenham-line)
![License](https://img.shields.io/npm/l/bresenham-line.svg)

[![Build Status](https://travis-ci.org/nquicenob/bresenham-line.svg?branch=master)](https://travis-ci.org/nquicenob/bresenham-line)

## Installation
You can install bresenham-line using npm.

```
npm install --save bresenham-line
```

## Usage
Just require the module.

```javascript
// es5
var line = require('bresenham-line').line;

var genLine = line({
  x: 1,
  y: 1
},
{
  x: 6,
  y: 2
});
console.dir(genLine.next().value); // { x: 1, y: 1 }
console.dir(genLine.next().value); // { x: 2, y: 1 }
console.dir(genLine.next().value); // { x: 3, y: 1 }
// ..
```

```javascript
// es6
import { line } from 'bresenham-line';

const startPoint = {
  x: 1,
  y: 1
};

const finalPoint = {
  x: 6,
  y: 2
};

for (const point of line(startPoint, finalPoint)) {
  console.dir(point); // { x: 1, y: 1 }, { x: 2, y: 1 }, ...
}

```

# License
MIT @ Nicolas Quiceno
