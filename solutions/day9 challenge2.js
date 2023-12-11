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

const makeDifferenceArray = (arr) => {
    let newArr = []
    for(let i=0; i<arr.length-1; i++){
        newArr[i] = arr[i+1] - arr[i]
    }
    return newArr
}

async function  run () {
    const input = await fetchData();
    const data = input.split('\n').filter(Boolean).map(n => n.split(' ').filter(Boolean).map(n => parseInt(n, 10)))
    let difArrs = []
    for(let array of data){
        let difs = [[...array]]
        let pos = 0
        while(!difs[pos].every(e => e === 0)){
            difs.push(makeDifferenceArray(difs[pos]))
            pos++
        }
        difArrs.push(difs)
    }
    console.log(difArrs)

    for(let difs of difArrs){
        difs[difs.length-1].unshift(0)
        for(let i=difs.length-2; i>=0; i--){
            difs[i].unshift(difs[i][0] - difs[i+1][0])
        }
        console.log(difs)
    }
    console.log(difArrs.reduce((total, curr) => {
        return total + curr[0][0]
    },0))

}
    
run();