const DIR = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const run = (data) => {
  data = data.split("\n").filter(Boolean);
  let r = 0;
  let c = 0;
  let area = 1;
  const dug = [[0, 0]];
  let [maxR, maxC] = [0, 0];
  for (let i = 0; i < data.length; i++) {
    let [dir, steps, color] = data[i].split(/[ ()]+/g);
    dir = ["R", "D", "L", "U"][color.at(-1)];
    steps = parseInt(color.slice(1, -1), 16);
    const [dr, dc] = DIR[dir];
    const r0 = r;
    const c0 = c;
    r += dr * steps;
    c += dc * steps;
    area += (r * c0 - r0 * c + steps) / 2;
  }
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
