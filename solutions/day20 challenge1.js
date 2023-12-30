class Module {
  constructor(name, destinations, modules) {
    this.name = name;
    this.destinations = destinations;
    this.modules = modules;
  }

  receivePulse(pulse) {
    throw new Error("receivePulse method should be implemented by subclasses");
  }
}

class BroadcastModule extends Module {
  receivePulse(pulse, queue) {
    this.destinations.forEach((destination) => {
      queue.push({ name: destination, type: pulse.type, source: this.name });
    });
  }
}

class FlipFlopModule extends Module {
  constructor(name, destinations, modules) {
    super(name, destinations, modules);
    this.isOn = false;
  }

  receivePulse(pulse, queue) {
    if (pulse.type === "low") {
      this.isOn = !this.isOn;
      const newPulse = this.isOn ? "high" : "low";
      this.destinations.forEach((destination) => {
        queue.push({
          name: destination,
          type: newPulse,
          source: this.name,
        });
      });
    }
  }
}

class ConjunctionModule extends Module {
  constructor(name, destinations, modules, incoming) {
    super(name, destinations, modules);
    this.memory = new Map();
    incoming.forEach((source) => {
      this.memory.set(source, "low");
    });
  }

  receivePulse(pulse, queue) {
    this.memory.set(pulse.source, pulse.type);
    const allHigh = Array.from(this.memory.values()).every(
      (type) => type === "high"
    );
    const newPulse = allHigh ? "low" : "high";

    this.destinations.forEach((destination) => {
      queue.push({ name: destination, type: newPulse, source: this.name });
    });
  }
}

function createModules(data, modules) {
  let incomingConnections = {};
  data
    .split("\n")
    .filter(Boolean)
    .forEach((line) => {
      const parts = line.split("->");
      const type = parts[0].trim();
      const name = type.replace(/[&%]/g, "");
      const destinations = parts[1].split(",").map((d) => d.trim());

      destinations.forEach((destination) => {
        if (!incomingConnections[destination]) {
          incomingConnections[destination] = [];
        }
        incomingConnections[destination].push(name);
      });

      if (type.startsWith("%")) {
        modules[name] = new FlipFlopModule(name, destinations, modules);
      } else if (type.startsWith("&")) {
        modules[name] = new ConjunctionModule(
          name,
          destinations,
          modules,
          incomingConnections[name] || []
        );
      } else {
        modules[name] = new BroadcastModule(name, destinations, modules);
      }
    });
}

const run = (data) => {
  let modules = {};
  createModules(data, modules);
  let pulses = [0, 0];
  for (let i = 0; i < 1000; i++) {
    let queue = [{ name: "broadcaster", type: "low", source: "button" }];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.name === "rx" || current.name === "output") {
        console.log(current);
        current.type === "low"
          ? (pulses[0] = pulses[0] + 1)
          : (pulses[1] = pulses[1] + 1);
      } else {
        console.log(current);
        current.type === "low"
          ? (pulses[0] = pulses[0] + 1)
          : (pulses[1] = pulses[1] + 1);
        modules[current.name].receivePulse(
          { type: current.type, source: current.source },
          queue
        );
      }
    }
  }
  console.log(pulses);
  console.log(pulses[0] * pulses[1]);
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
    // const test1 = `broadcaster -> a, b, c\n%a -> b\n%b -> c\n%c -> inv\n&inv -> a`;
    // const test2 =
    //   "broadcaster -> a\n%a -> inv, con\n&inv -> b\n%b -> con\n&con -> output";
    // run(test1);
    run(await fetchData());
  } catch (error) {
    console.error("Error in the main function:", error);
  }
};

main();
