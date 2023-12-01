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
        const map = new Map();
        map.set('one', '1')
            .set('two', '2')
            .set('three', '3')
            .set('four', '4')
            .set('five', '5')
            .set('six', '6')
            .set('seven', '7')
            .set('eight', '8')
            .set('nine', '9')
        
        function findFirstNumber (calc, map, reversed){
            for(let i=0; i <= calc.length; i++){
                for(let [textNum,num] of map){
                    if(reversed) textNum = textNum.split('').reverse().join('');
                    if(calc.substring(i).startsWith(textNum)){
                        return num
                    }
                }
                if(calc[i] >= '1' && calc[i] <= '9'){
                    return calc[i]
                }
            }
            return null
        }
        const firstNumber =  findFirstNumber(calc, map, false)
        let reversedCalc = calc.split('').reverse().join('')
        const lastNumber = findFirstNumber(reversedCalc, map, true)
        
        console.log([firstNumber, lastNumber])
        return parseInt(`${firstNumber}${lastNumber}`);
    })

    const total = nums.reduce((sum, val) => {
        return sum+val
    },0)

    console.log(total)
    return total
}

run();