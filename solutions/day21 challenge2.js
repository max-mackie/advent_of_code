const findNeighbors = (matrix, loc) => {
  let width = matrix;
  let height = matrix[0];
  let border = 1;
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const [r, c] = loc;
  let neighbors = [];
  for (const dir of dirs) {
    let nr = r + dir[0];
    let nc = c + dir[1];
    let mappedR =
      ((nr % (width + border * 2)) + (width + border * 2)) %
      (width + border * 2);
    let mappedC =
      ((nc % (height + border * 2)) + (height + border * 2)) %
      (height + border * 2);
    let nextLoc;
    if (
      mappedR >= 0 &&
      mappedR <= width - 1 &&
      mappedC >= 0 &&
      mappedC <= height - 1
    ) {
      nextLoc = ".";
    } else {
      nextLoc = matrix[mappedR][mappedC];
    }
    if (nextLoc === "." || nextLoc === "S") neighbors.push([nr, nc]);
  }
  return neighbors;
};

const run = (data) => {
  let start = [null, null];
  const matrix = data
    .split("\n")
    .filter(Boolean)
    .map((row, rIndex) => {
      let cells = row.split("");
      let cIndex = row.indexOf("S");
      if (cIndex !== -1) {
        start = [rIndex, cIndex];
      }
      return cells;
    });
  let q = [{ loc: start, steps: 0 }];
  let visited = new Set();
  let processed = new Set();

  while (q.length > 0) {
    let { loc, steps } = q.shift();
    let locKey = `${loc.toString()},${steps}`;
    if (processed.has(locKey)) continue;
    if (steps === 64) visited.add(locKey);
    if (steps < 64) {
      findNeighbors(matrix, loc).forEach((neighbor) => {
        q.push({ loc: neighbor, steps: steps + 1 });
      });
    }
    processed.add(locKey);
  }
  console.log(matrix, start, visited, visited.size);
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
    const test1 = `...........\n.....###.#.\n.###.##..#.\n..#.#...#..\n....#.#....\n.##..S####.\n.##..#...#.\n.......##..\n.##.#.####.\n.##..##.##.\n...........`;
    run(test1);
    // run(await fetchData());
  } catch (error) {
    console.error("Error in the main function:", error);
  }
};

main();
