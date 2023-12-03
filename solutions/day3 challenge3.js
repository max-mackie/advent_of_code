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

const run = async () => {
    const data = await fetchData();
    // Challenge code below:
    const rows = data.trim().split('\n')
    console.log(rows)
    let prev = []
    let curr = []
    let next = []
    let parts = []
    for(let i = 0; i < rows.length; i++){
        let match;
        console.log(i)
        numPattern = /\*/g;
        let gears = []

        while((match = numPattern.exec(rows[i])) !== null){
            gears.push(match.index)
        }
        
        curr = [];
        let currPattern = /\d+/g;
        while((match = currPattern.exec(rows[i])) !== null){
            curr.push({num: match[0], start: match.index, end: match.index + match[0].length- 1})
            
        }
        next = [];
        if(i + 1 < rows.length){
            let nextPattern = /\d+/g;
            while((match = nextPattern.exec(rows[i+1])) !== null){
                next.push({num: match[0], start: match.index, end: match.index + match[0].length- 1})
            }
        }
        
        let temp = [...curr]
        gears.forEach(gear => {
            let connectedPrev = prev.filter(obj => {
                return gear >= obj.start -1 && gear <= obj.end + 1 
            })
            let connectedCurr =curr.filter(obj => gear >= obj.start -1 && gear <= obj.end + 1 )
            let connectedNext =next.filter(obj => gear >= obj.start -1 && gear <= obj.end + 1 )
            const connectedParts = [...connectedPrev.map(obj => obj.num), ...connectedCurr.map(obj => obj.num), ...connectedNext.map(obj => obj.num)  ]

            if(connectedParts.length === 2){
                // console.log(connectedParts)
                // console.log(i, ":", parseInt(connectedParts[0],10)*parseInt(connectedParts[1], 10))
                parts.push(parseInt(connectedParts[0],10)*parseInt(connectedParts[1], 10))
            }
        });


        prev = temp

    }
    console.log(parts)
    const total = parts.reduce((total, id) => total + parseInt(id, 10), 0)
    console.log(total)
    return total
}

run();