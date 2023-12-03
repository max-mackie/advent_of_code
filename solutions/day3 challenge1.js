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
        numPattern = /\d+/g;
        let nums = []

        while((match = numPattern.exec(rows[i])) !== null){
            nums.push({partNum: match[0], start: match.index, end: match.index + match[0].length- 1})
        }
        
        curr = [];
        let currPattern = /[^0-9.]/g;
        while((match = currPattern.exec(rows[i])) !== null){
            curr.push(match.index)
        }
        next = [];
        if(i + 1 < rows.length){
            let nextPattern = /[^0-9.]/g;
            while((match = nextPattern.exec(rows[i+1])) !== null){
                next.push(match.index)
            }
        }
        console.log(rows[i])
        console.log(nums)
        console.log(prev)
        console.log(curr)
        console.log(next)
        console.log("-------------")
        nums.forEach(num => {
            if([...prev, ...curr, ...next].some(index => index >= num.start -1 && index <= num.end + 1 )){
                parts.push(num.partNum)
            }
        });

        prev = [...curr]

    }
    console.log(parts)
    const total = parts.reduce((total, id) => total + parseInt(id, 10), 0)
    console.log(total)
    return total
}

run();