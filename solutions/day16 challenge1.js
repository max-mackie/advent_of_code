const pathLight = (matrix, pr, pc, r, c, visited) => {
  if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
    return;
  }
  let pathKey = `${pr},${pc}:${r},${c}`;
  if (visited?.[pathKey]) {
    return;
  }
  visited[pathKey] = true;

  let direction = [r - pr, c - pc];
  switch (matrix[r][c]) {
    case "|":
      pathLight(matrix, r, c, r + 1, c, visited);
      pathLight(matrix, r, c, r - 1, c, visited);
      break;
    case "-":
      pathLight(matrix, r, c, r, c + 1, visited);
      pathLight(matrix, r, c, r, c - 1, visited);
      break;
    case "/":
      if (direction.join(",") === "0,1") {
        pathLight(matrix, r, c, r - 1, c, visited);
      } else if (direction.join(",") === "0,-1") {
        pathLight(matrix, r, c, r + 1, c, visited);
      } else if (direction.join(",") === "1,0") {
        pathLight(matrix, r, c, r, c - 1, visited);
      } else if (direction.join(",") === "-1,0") {
        pathLight(matrix, r, c, r, c + 1, visited);
      }
      break;
    case "\\":
      if (direction.join(",") === "0,1") {
        pathLight(matrix, r, c, r + 1, c, visited);
      } else if (direction.join(",") === "0,-1") {
        pathLight(matrix, r, c, r - 1, c, visited);
      } else if (direction.join(",") === "1,0") {
        pathLight(matrix, r, c, r, c + 1, visited);
      } else if (direction.join(",") === "-1,0") {
        pathLight(matrix, r, c, r, c - 1, visited);
      }
      break;
    default:
      pathLight(matrix, r, c, r + direction[0], c + direction[1], visited);
  }
};

const updateMostVisited = (data, pr, pc, r, c, mostVisited) => {
  let visited = {};
  pathLight(data, pr, pc, r, c, visited);
  const cellsVisited = [
    ...new Set(Object.keys(visited).map((key) => key.split(":")[1])),
  ].length;
  console.log(cellsVisited, mostVisited);
  return Math.max(cellsVisited, mostVisited);
};

const run = (data) => {
  data = data
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
  let visited = {};
  pathLight(data, 0, -1, 0, 0, visited);
  const cellsVisited = [
    ...new Set(Object.keys(visited).map((key) => key.split(":")[1])),
  ].length;
  console.log(cellsVisited);
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

// const test1 = 'rn=1'
// console.log("test1:")
// run(test1)
const main = async () => {
  try {
    // let test =
    //   ".|...\\....\n|.-.\\.....\n.....|-...\n........|.\n..........\n.........\\\n..../.\\\\..\n.-.-/..|..\n.|....-|.\\\n..//.|....";
    // console.log(test);
    // run(test);
    run(await fetchData());
  } catch (error) {
    console.error("Error in the main funciton:", error);
  }
};

main();
