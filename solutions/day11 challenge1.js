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

function expandUniverse(data){
    const lines = data.split('\n').filter(Boolean).map(l => l.split(''))
    let expRows = []
    lines.forEach((row, index) => {
        if(row.every((e) => {
            return e === "."
        })){
            expRows.push(index)            
        }
    })
    let columns = Array.from({length: lines[0].length}, () => [])
    lines.forEach(l => {
        for(let i=0; i<l.length; i++){
            columns[i].push(l[i])
        }
    })

    let expCols = []
    columns.forEach((col, index) => {
        if(col.every((e) => {
            return e === '.'
        })){
            expCols.push(index)
        }
    })
    
    return [expRows, expCols]
}

async function run1(data) {
    // const data = await fetchData();

    const expUni = data.split('\n').filter(Boolean).map(x => x.split(''))
    const [expRows, expCols] = expandUniverse(data)
    //number each gallaxy and record its position coord {num: [x,y]}
    //for each number more than the current number calc shortest path
    //shortest path = difference in x coord + difference in y coord
    //shortest path = abs(x1-x2) + abs(y1-y2)
    
    let galaxies = []
    for(let x=0; x<expUni.length; x++){
        for(let y=0; y<expUni[0].length; y++){
            let element = expUni[x][y];
            if(element === "#") galaxies.push([x,y])
        }
    }
    let total = 0
    for(let i=0; i<galaxies.length-1; i++){
        for(let j=i+1; j<galaxies.length; j++){
            let difference = Math.abs(galaxies[i][0] - (galaxies[j][0])) + Math.abs(galaxies[i][1] - (galaxies[j][1]))
            total += difference
            for(let x of expRows){
                if((x >= galaxies[i][0] && x <= galaxies[j][0]) || (x >= galaxies[j][0] && x <= galaxies[i][0])){
                    total += 1
                }
            }
            for(let y of expCols){
                if((y >= galaxies[i][1] && y <= galaxies[j][1]) || (y >= galaxies[j][1] && y <= galaxies[i][1])){
                    total += 1
                } 
            }
        }
    }
    console.log(total)
    return
}

// const test1 =  "...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#....."
// run1(test1)
run1(await fetchData())