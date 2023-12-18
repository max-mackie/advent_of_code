const hashAlg = (str) => {
  let val = 0;
  for (let i = 0; i < str.length; i++) {
    const ascii = +str.charCodeAt(i);
    val += ascii;
    val *= 17;
    val %= 256;
  }
  return val;
};

const run = (data) => {
  data = data.split("\n").filter(Boolean);
  console.log(data);
  let sum = data[0].split(",").reduce((a, c) => a + hashAlg(c), 0);

  console.log(sum);
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

// const test1 =  "O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....";
// console.log("test1:")
// run(test1)

run(await fetchData());
