import { Heap } from "heap-js";
const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

const run = (data, minMomentum, maxMomentum) => {
  data = data
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split("").map(Number));

  const customHeatComparator = (a, b) => a.heat - b.heat;
  const heap = new Heap(customHeatComparator);

  heap.init([
    { i: 1, j: 0, heat: 0, dir: DIR.D, momentum: 1 },
    { i: 0, j: 1, heat: 0, dir: DIR.R, momentum: 1 },
  ]);

  const seen = data.map((row) => row.map(() => ({})));
  while (heap.length) {
    // console.log(heap);
    const { i, j, heat, dir, momentum } = heap.pop();
    const key = dir.concat(momentum).join();

    //skip condition: are the coords in the grid AND has memoisation (has this state already been calculated)
    if (!data[i]?.[j] || seen[i][j][key]) {
      continue;
    }
    seen[i][j][key] = 1;

    //end condition: print heat of the bottom right cell
    if (
      i === data.length - 1 &&
      j === data[0].length - 1 &&
      momentum >= minMomentum
    ) {
      console.log(heat + data[i][j]);
      break;
    }

    //Generate next directions: add turning conditions in the switch then if momentum less than maxMomentum add continuing in the same direction
    //note: not sure that moving up and left does not need another direction
    const nextDirs = [];
    switch (momentum >= minMomentum && dir) {
      case DIR.U:
      case DIR.D:
        nextDirs.push(DIR.L);
        nextDirs.push(DIR.R);
        break;
      case DIR.L:
      case DIR.R:
        nextDirs.push(DIR.U);
        nextDirs.push(DIR.D);
    }
    if (momentum < maxMomentum) {
      nextDirs.push(dir);
    }

    for (const nextDir of nextDirs) {
      const [di, dj] = nextDir;
      heap.push({
        i: i + di,
        j: j + dj,
        heat: heat + data[i][j],
        dir: nextDir,
        momentum: 1 + +(dir === nextDir) * momentum,
      });
    }
  }
};

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:4000/fetch-advent-data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  } catch (error) {
    console.error("There has been a problem with the fetch operation: ", error);
  }
};

const main = async () => {
  try {
    // const test =
    // "2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533";
    // const test = "00000\n11110\n22220\n33330\n44440";
    // console.log("test:");
    // run(test, 0, 3);
    run(await fetchData(), 4, 10);
  } catch (error) {
    console.error("Error in the main function:", error);
  }
};

main();
