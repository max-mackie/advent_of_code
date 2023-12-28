const run = (data) => {
  let [workflows] = data.split("\n\n");

  const map = {};
  for (const line of workflows.split("\n")) {
    let [name, rules] = line.split(/[{}]/g);
    map[name] = (ranges) => {
      function getCombos(target, ranges) {
        return target === "A"
          ? Object.values(ranges)
              .map(([min, max]) => max - min + 1)
              .reduce((acc, n) => acc * n)
          : target !== "R"
          ? map[target](ranges)
          : 0;
      }

      let sum = 0;
      for (const rule of rules.split(",")) {
        if (rule.includes(":")) {
          let [expr, target] = rule.split(":");
          let op = expr.match(/[\W]/g)[0];
          let [part, val] = expr.split(op);
          val = +val;
          const yesRanges = structuredClone(ranges);
          if (op === ">") {
            yesRanges[part][0] = Math.max(yesRanges[part][0], val + 1);
            ranges[part][1] = Math.min(ranges[part][1], val);
          } else {
            yesRanges[part][1] = Math.min(yesRanges[part][1], val - 1);
            ranges[part][0] - Math.max(ranges[part][0], val);
          }
          sum += getCombos(target, yesRanges);
        } else {
          sum += getCombos(rule, ranges);
        }
      }
      return sum;
    };
  }
  const ranges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };
  console.log(map.in(ranges));
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
    //   "px{a<2006:qkq,m>2090:A,rfg}\npv{a>1716:R,A}\nlnx{m>1548:A,A}\nrfg{s<537:gd,x>2440:R,A}\nqs{s>3448:A,lnx}\nqkq{x<1416:A,crn}\ncrn{x>2662:A,R}\nin{s<1351:px,qqz}\nqqz{s>2770:qs,m<1801:hdj,R}\ngd{a>3333:R,R}\nhdj{m>838:A,pv}\n\n{x=787,m=2655,a=1222,s=2876}\n{x=1679,m=44,a=2067,s=496}\n{x=2036,m=264,a=79,s=2244}\n{x=2461,m=1339,a=466,s=291}\n{x=2127,m=1623,a=2188,s=1013}";
    // run(test);
    run(await fetchData());
  } catch (error) {
    console.error("Error in the main function:", error);
  }
};

main();
