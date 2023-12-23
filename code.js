class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  enqueue(priority, key, currDir, steps) {
    this.nodes.push({ priority, key, currDir, steps });
    this.sort();
  }

  dequeue() {
    return this.nodes.shift();
  }

  sort() {
    this.nodes.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return !this.nodes.length;
  }
}

function getNeighbors(node, maxRow, maxCol, currDir, steps) {
  let [x, y] = node;
  let neighbors = [];

  let directions = [
    [-1, 0], //up    (0)
    [0, 1], //right (1)
    [1, 0], //down  (2)
    [0, -1], //left  (3)
  ];

  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i];
    if (
      (currDir === 0 && i === 2) ||
      (currDir === 1 && i === 3) ||
      (currDir === 2 && i === 0) ||
      (currDir === 3 && i === 1)
    ) {
      continue;
    }
    if (currDir === i && steps >= 3) {
      continue;
    }

    let [dx, dy] = direction;
    let newX = x + dx;
    let newY = y + dy;

    if (newX >= 0 && newX < maxRow && newY >= 0 && newY < maxCol) {
      neighbors.push([[newX, newY], i, currDir === i ? steps + 1 : 0]);
    }
  }
  return neighbors;
}

function dijkstra(grid) {
  let maxRow = grid.length;
  let maxCol = grid[0].length;
  let distances = Array.from({ length: maxRow }, () =>
    Array(maxCol).fill(Infinity)
  );
  let pq = new PriorityQueue();

  let start = [0, 0];
  distances[0][0] = grid[0][0];
  pq.enqueue(grid[0][0], start, 1, 0);

  while (!pq.isEmpty()) {
    let currentNode = pq.dequeue();
    let [x, y] = currentNode.key;
    let direction = currentNode.direction;
    let steps = currentNode.steps;

    let neighbors = getNeighbors([x, y], maxRow, maxCol, direction, steps);
    for (let neighbor of neighbors) {
      let [nx, ny] = neighbor[0];
      let direction = neighbor[1];
      let steps = neighbor[2];
      let newDist = distances[x][y] + grid[nx][ny];

      if (newDist < distances[nx][ny]) {
        distances[nx][ny] = newDist;
        pq.enqueue(newDist, [nx, ny], direction, steps);
      }
    }
  }
  return distances;
}

const run = (data) => {
  data = data
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split("").map(Number));
  const distances = dijkstra(data);
  console.log(distances);
  return;
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
    const test =
      "2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533";
    console.log("test:");
    run(test);
    // run(await fetchData());
  } catch (error) {
    console.error("Error in the main funciton:", error);
  }
};

main();
