const DIR = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const run = (data) => {
  data = data
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(" "));
  const dug = [[0, 0]];
  let [maxR, maxC] = [0, 0];
  for (let i = 0; i < data.length; i++) {
    const dir = data[i][0];
    const [dr, dc] = DIR[dir];
    const steps = +data[i][1];
    for (let j = 0; j < steps; j++) {
      const [r, c] = dug[dug.length - 1];
      const nextR = r + dr;
      const nextC = c + dc;
      dug.push([nextR, nextC]);
      maxR = Math.max(nextR, maxR);
      maxC = Math.max(nextC, maxC);
    }
  }
  // dug.pop();

  let area = 1;

  // if(dug[0][0] !== dug[dug.length-1][0] || dug[0][1] !== dug[dug.length -1][1]){
  //   dug.push(dug[0])
  // }

  for (let i = 1; i < dug.length; i++) {
    let r = dug[i][0];
    let c = dug[i][1];
    let pr = dug[i - 1][0];
    let pc = dug[i - 1][1];

    area += (pc * r - c * pr + 1) / 2;
  }
  area = Math.abs(area);
  console.log(area);
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
    //   "R 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)";
    // run(test);
    run(await fetchData());
  } catch (error) {
    console.error("Error in the main function:", error);
  }
};

main();
