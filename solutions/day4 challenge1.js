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
    const cards = data.trim().split('\n')
    const cardPoints = cards.map(card => {
        // const match = card.match(/Card\s*(\d+)/)
        // const id = match ? parseInt(match[1], 10) : null
        const parts = card.split("|");
        const winningNums = parts[0].split(":")[1].match(/\d+/g).map(Number)
        const myNums = parts[1].match(/\d+/g).map(Number)
        const matchingNums = myNums.filter(num => winningNums.includes(num))
        const points = matchingNums.length > 0 ? 2**(matchingNums.length - 1) : 0
        console.log(card)
        console.log(winningNums)
        console.log(myNums)
        console.log(matchingNums)
        console.log(matchingNums.length)
        console.log(points)
        return points
    }) 
    
    
    const total = cardPoints.reduce((total, val) => total + val, 0)
    console.log(total)
    return total
}

run();