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
    const newtonRaphsonMethod = (t,d, initialGuess = 1) => {
        const tolerance = 0.001
        let s = initialGuess

        for(let i=0; i<100; i++){
            let f = s * (t-s) -d; //f(s)
            let fPrime = t-2*s    //f'(s)
            if(Math.abs(f) < tolerance){
                return s;
            }
            s = s-f / fPrime
        }
    }
    const findMostCommonNumbers = (arr) => {
        const frequencyMap = {};
        arr.forEach(num => {
            frequencyMap[num] = (frequencyMap[num]|| 0) + 1;
        });

        const sortedByFrequency = Object.entries(frequencyMap).sort((a,b)=> b[1] - a[1])
        const mostCommon = sortedByFrequency.slice(0,2).map(el => parseInt(el[0]))
        return mostCommon
    }

    const lists = data.split(/\n*[A-Za-z]*:[ ]*/g).filter(l => (l)).map(l => l.trim().split(/\n/g).map(l=>l.split(" ").filter(f => f)))
    console.log(lists)
    const roots = []
    for(let i=0; i<lists[0][0].length; i++){
        let time = lists[0][0][i]
        let distance = lists[1][0][i]
        let root = []
        console.log(time, distance)
        for(let j = 0; j<=time; j++){
            root.push(Math.ceil(newtonRaphsonMethod(time, distance, j)))
        }
        console.log(root)
        roots.push(findMostCommonNumbers(root))
    }
    console.log(roots.map(s=>s[1]-s[0]).reduce((total, val) => total*val, 1))

}



run();