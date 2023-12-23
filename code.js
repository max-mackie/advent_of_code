class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  enqueue(priority, key) {
    this.nodes.push({ priority, key });
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

function getNeighbors(node, maxRow, maxCol) {
  let [x, y] = node;
  let neighbors = [];

  let directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  for (let [dx, dy] of directions) {
    let newX = x + dx;
    let newY = y + dy;

    if (newX >= 0 && newX < maxRow && newY >= 0 && newY < maxCol) {
      neighbors.push([newX, newY]);
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
  pq.enqueue(grid[0][0], start);

  while (!pq.isEmpty()) {
    let currentNode = pq.dequeue();
    let [x, y] = currentNode.key;

    let neighbors = getNeighbors([x, y], maxRow, maxCol);
    for (let [nx, ny] of neighbors) {
      let newDist = distances[x][y] + grid[nx][ny];

      if (newDist < distances[nx][ny]) {
        distances[nx][ny] = newDist;
        pq.enqueue(newDist, [nx, ny]);
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
