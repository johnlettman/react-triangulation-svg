/*
  △ React.js Triangulation SVG
  Author: John Lettman <jlettman@redzone.com>
*/

export function getProcessVariables(options={ width: 500, height: 500, size: 50 }) {
  const { width, height, size } = options;

  const trianglePointsX = Math.ceil(width   / size);
  const trianglePointsY = Math.ceil(height  / size);

  const triangleWidth   = Math.ceil(width   / (trianglePointsX - 1));
  const triangleHeight  = Math.ceil(height  / (trianglePointsY - 1));

  const triangleMaxX    = triangleWidth   * (trianglePointsX - 1);
  const triangleMaxY    = triangleHeight  * (trianglePointsY - 1);

  const pointsCount     = trianglePointsX * trianglePointsY;

  return {
    trianglePointsX, trianglePointsY,
    triangleWidth, triangleHeight,
    triangleMaxX, triangleMaxY,
    pointsCount
  };
}

export function getRandom(seed) {
  if (!!seed) {
    let s = seed;
    return (min=0, max=1) => {
      s = (s * 9301 + 49297) % 233280;
      let rng = s / 233280;
      return min + rng * (max - min);
    }
  }
  else {
    return Math.random;
  }
}

export function initializeSync(options = { width: 500, height: 500, buffer: false, size: 50 }) {
  const { width, height, buffer, size, seed } = options;

  const {
    trianglePointsX, trianglePointsY,
    triangleWidth, triangleHeight,
    triangleMaxX, triangleMaxY,
    pointsCount
  } = getProcessVariables(options);

  const random = getRandom(seed);
  let points    = buffer ? new Uint32Array(pointsCount) : [];
  let triangles = buffer ? new Uint32Array() : [];

  for (let y = 0; y < trianglePointsY; y++) {
    for (let x = 0; x < trianglePointsX; x++) {
      if (buffer) {
        points[(y * trianglePointsX) + x] = (triangleWidth  * x);
        points[(y * trianglePointsX) + x + 1] = (triangleHeight * y);
      }
      else {
        points.push([(triangleWidth  * x), (triangleHeight * y)]);
      }
    }
  }

  for (let pointIdx = 0; pointIdx < pointsCount; pointIdx++) {
    let x = points[pointIdx][0];
    let y = points[pointIdx][1];

    if (x < triangleMaxX && y < triangleMaxY) {
      let topLeft      = pointIdx;
      let topRight     = pointIdx + 1;
      let bottomLeft   = pointIdx + trianglePointsX;
      let bottomRight  = pointIdx + trianglePointsX + 1;

      let randomization = Math.floor(random() * 2);

      for (let n = 0; n < 2; n++) {
        let triangle = randomization === 0 ?
          (n === 0 ? [ topLeft, bottomLeft, bottomRight ] : [ topLeft, topRight, bottomRight ]) :
          (n === 0 ? [ topLeft, bottomLeft, topRight ] : [ bottomLeft, topRight, bottomRight ]);

        triangles.push(triangle);
      }
    }
  }

  return { points, triangles };
}

export function initialize(options = { width: 500, height: 500, buffer: false, size: 50 }, callback) {
  return new Promise((resolve, reject) => {
    try {
      const result = initializeSync(options);
      resolve(result);

      if (typeof callback === 'function') {
        callback(null, result);
      }
    }
    catch (error) {
      reject(error);

      if (typeof callback === 'function') {
        callback(error);
      }
    }
  });
}

export function resolve(triangle, points) {
  return triangle.map(point => points[point]);
}

export function getRandomAngle(random=Math.random) {
  return random() * Math.PI * 2;
}

export function waveSync(options = { width: 500, height: 500, buffer: false, size: 50, uniform: false }) {
  const { uniform, points, seed, size } = options;

  const {
    trianglePointsX, trianglePointsY,
    triangleWidth, triangleHeight,
    triangleMaxX, triangleMaxY,
    pointsCount
  } = getProcessVariables(options);

  if (!Array.isArray(points) || points.length !== pointsCount) {
    throw new Error('Invalid or missing original points');
  }

  const random = getRandom(seed);
  let pointsNew = new Array(pointsCount);

  for (let pointIdx = 0; pointIdx < pointsCount; pointIdx++) {
    // Allocate an array to hold an (X,Y) point at the current index within
    // the new points array
    pointsNew[pointIdx] = new Array(2);

    // Extract the original (X,Y) point at the current index within the
    // original points array
    let x = points[pointIdx][0]; // extract original X
    let y = points[pointIdx][1]; // extract original Y

    if (x !== 0 && x !== triangleMaxX) {
      if (uniform) {
        pointsNew[pointIdx][0] = x + Math.cos(getRandomAngle(random)) * (triangleWidth / 4);
      }
      else {
        pointsNew[pointIdx][0] = x + random() * (triangleWidth / 2);
      }
    }
    else {
      pointsNew[pointIdx][0] = x;
    }

    if (y !== 0 && y !== triangleMaxY) {
      if (uniform) {
        pointsNew[pointIdx][1] = y + Math.sin(getRandomAngle(random)) * (triangleHeight / 4);
      }
      else {
        pointsNew[pointIdx][1] = y + random()  * (triangleHeight / 2);
      }
    }
    else {
      pointsNew[pointIdx][1] = y;
    }
  }

  return pointsNew;
}

export function wave(options = { width: 500, height: 500, buffer: false, size: 50, uniform: false }, callback) {
  return new Promise((resolve, reject) => {
    try {
      const result = waveSync(options);

      resolve(result);

      if (typeof callback === 'function') {
        callback(null, result);
      }
    }
    catch (error) {
      reject(error);

      if (typeof callback === 'function') {
        callback(error);
      }
    }
  });
}
