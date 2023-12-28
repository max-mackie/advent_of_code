const run = (data) => {
  const [wfData, pData] = data.split("\n\n");
  let workflows = wfData
    .split("\n")
    .map((row) => [row.split("{")[0], row.split("{")[1].split("}")[0]]);
  let parts = pData
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      const regex = /([a-z]+)=([0-9]+)/g;
      let match;
      let numbers = {};
      while ((match = regex.exec(row)) !== null) {
        numbers[match[1]] = +match[2];
      }
      return numbers;
    });

  let parsedWorkflows = {};
  workflows.forEach((wf) => {
    parsedWorkflows[wf[0]] = wf[1].split(",").map((rule) => rule.split(":"));
  });

  for (let part of parts) {
    let workflow = parsedWorkflows.in;
    let wf = "in";
    let result;
    while (workflow) {
      for (let rule of workflow) {
        if (rule[1]) {
          let [variable, operator, value] = rule[0]
            .match(/([a-z])([<>=])(\d+)/)
            .slice(1);
          value = +value;
          let variableValue = part[variable];
          switch (operator) {
            case ">":
              result =
                variableValue > value ? (result = true) : (result = false);
              break;
            case "<":
              result =
                variableValue < value ? (result = true) : (result = false);
              break;
            default:
              console.log(
                operator,
                "add this condition to the switch case statement"
              );
          }
          if (result) {
            result = rule[1];
            workflow = parsedWorkflows[rule[1]];
            wf = rule[1];
            break;
          }
        } else {
          result = rule[0];
          workflow = parsedWorkflows[rule[0]];
          wf = rule[0];
        }
      }
    }
    part["accepted"] = result;
  }
  let total = 0;
  parts.forEach((part) => {
    if (part.accepted === "A") {
      total = total + part.x + part.m + part.a + part.s;
    }
  });
  console.log(parts, total);
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
    // const test =
    //   "px{a<2006:qkq,m>2090:A,rfg}\npv{a>1716:R,A}\nlnx{m>1548:A,A}\nrfg{s<537:gd,x>2440:R,A}\nqs{s>3448:A,lnx}\nqkq{x<1416:A,crn}\ncrn{x>2662:A,R}\nin{s<1351:px,qqz}\nqqz{s>2770:qs,m<1801:hdj,R}\ngd{a>3333:R,R}\nhdj{m>838:A,pv}\n\n{x=787,m=2655,a=1222,s=2876}\n{x=1679,m=44,a=2067,s=496}\n{x=2036,m=264,a=79,s=2244}\n{x=2461,m=1339,a=466,s=291}\n{x=2127,m=1623,a=2188,s=1013}";
    // run(test);
    run(await fetchData());
  } catch (error) {
    console.error("Error in the main function:", error);
  }
};

main();
