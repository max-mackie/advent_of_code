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
    const processedCards = cards.map(card => {
        const match = card.match(/Card\s*(\d+)/)
        const id = match ? parseInt(match[1], 10) : null
        const parts = card.split("|");
        const winningNums = parts[0].split(":")[1].match(/\d+/g).map(Number)
        const myNums = parts[1].match(/\d+/g).map(Number)
        const matchingNums = myNums.filter(num => winningNums.includes(num))

        // const points = matchingNums.length > 0 ? 2**(matchingNums.length - 1) : 0
        // return points
        return {[id]: matchingNums.length}
    })
    console.log(processedCards)
    const processedCardsObj = Object.assign({}, ...processedCards)
    let count = 0;
    while(processedCards.length > 0){
    // for(let i=0; i<10; i++){
        const card = processedCards.shift()
        const id = parseInt(Object.keys(card)[0], 10)
        const matchingNums = card[id]
        if(matchingNums == 0){
            count++
        }else{
            count++
            for(let i=matchingNums; i>0; i--){
                const newId = id+i
                const newObj = {[newId]: processedCardsObj[newId]}
                processedCards.unshift(newObj)
            }
        }
    }
    
    console.log(count)
    return count
}

run();