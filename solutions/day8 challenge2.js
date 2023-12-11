const fetchData = async () => {
    try{
        const response = await fetch("http://localhost:4000/fetch-advent-data")
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.text()
    }catch(error){
        console.error('There has been a problem with the fetch operation: ', error);
    }
};

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

function findLCM(arr) {
    let lcm = arr[0];
    for (let i = 1; i < arr.length; i++) {
        lcm = (lcm * arr[i]) / gcd(lcm, arr[i]);
    }
    return lcm;
}

async function  run () {
    const input = await fetchData();
    const data = input.split('\n\n')
    const turns = data[0]
    const lines = data[1].split('\n').filter(Boolean)
    const map = {};
    lines.forEach(l => {
        const nodes = l.match(/[A-Z]+/g)
        map[nodes[0]] = {L: nodes[1], R:nodes[2]}
    })
    const curr = Object.keys(map).filter(v => v[2] === 'A')

    let cycles = [];

    for(let loc of curr){
        let count = 0
        while (!loc.endsWith('Z')) {
            loc = map[loc][turns[count % turns.length]];
            count++;
        }
        cycles.push(count)
    }
    
    console.log(findLCM(cycles))
}
    
run();