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
const move = (curr, count, map, turns) => {
    while (curr !== 'ZZZ') {
        curr = map[curr][turns[count % turns.length]];
        count++;
    }
    return count;
};

async function  solve1 () {
    // prettier-ignore
    const input = await fetchData();
    const data = input.split('\n\n')
    const turns = data[0]
    const lines = data[1].split('\n').filter(Boolean)
    const map = {};
    lines.forEach(l => {
        const nodes = l.match(/[A-Z]+/g)
        map[nodes[0]] = {L: nodes[1], R:nodes[2]}
    })
    let curr = 'AAA'
    console.log(move(curr, 0, map, turns))
}
    


  solve1();