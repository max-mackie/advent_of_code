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
    const maxBlues = 14;
    const maxGreens = 13;
    const maxReds = 12;
    const games = data.trim().split('\n')
    const possibleIds = games.map(game => {
        console.log(game)
        const idMatch = game.match(/Game (\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : 0;
        const blues = [...game.matchAll(/(\d+)\s*blue/g)].some(match => parseInt(match[1], 10) > maxBlues)
        const greens = [...game.matchAll(/(\d+)\s*green/g)].some((match) => parseInt(match[1], 10 ) > maxGreens)
        const reds = [...game.matchAll(/(\d+)\s*red/g)].some((match) => parseInt(match[1], 10) > maxReds)
        const possible = (!blues && !greens && !reds)
        console.log(possible, ": blue-", blues, " green-", greens, " red-", reds)
        if(possible) return id
        return 0
    })
    const total = possibleIds.reduce((total, id) => total + id, 0)
    console.log(total)
    
    return total
}

run();