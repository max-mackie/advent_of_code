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
    
    calculations = data.trim().split('\n');
    let nums = calculations.map(calc => {
        let firstNum = null
        let lastNum = null
        for(let i=0; i <= calc.length; i++){
            if(calc[i] >= '1' && calc[i] <= '9' && !firstNum) firstNum=calc[i]
            if(calc[calc.length - i] >= '0' && calc[calc.length - i] <= '9' && !lastNum) lastNum = calc[calc.length - i]
        }
        const number = parseInt(`${firstNum}${lastNum}`) 
        return number
    })
    const total = nums.reduce((acc, val) =>
        acc+val
    , 0
    );
    console.log(total)
    return total
}


run();