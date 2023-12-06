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

function isNum(char){
    return char.match(/[0-9]/);
}

const part1 = async () => {
    const data = await fetchData();
    // Process data to get array of time & distance objects
    let result = 1;
    const lines = data.split('\n')
    const times = lines[0].split(' ').map(Number).filter(Boolean)
    const distances = lines[1].split(' ').map(Number).filter(Boolean)
    let currentWRs = [];
    for(let i=0; i<times.length; i++){
        currentWRs.push({time:times[i], distance: distances[i]});
    }

    for(let i=0; i<currentWRs.length; i++){
        const time = currentWRs[i].time;
        const distance = currentWRs[i].distance;

        const possibleRuns = [];
        for(let j=0; j<time; j++){
            let posButton = j;
            let posBoat = posButton * (time - posButton);
            possibleRuns.push({time: time, distance: posBoat});
        }

        let runsThatBeatWR = 0;
        for(const run of possibleRuns){
            if(run.distance > distance){
                runsThatBeatWR++;
            }
        }

        result *= runsThatBeatWR;
    }
    console.log(result)
}

const part2 = async () => {
    let result = 0;
    const data = await fetchData();
    const lines = data.split('\n');
    const times = lines[0].split('');
    const distances = lines[1].split('')
    let mainTime = '';
    let mainDistance = '';
    for( let i=0; i<times.length; i++){
        if(isNum(times[i])) mainTime += times[i]
    }
    for( let i=0; i<distances.length; i++){
        if(isNum(distances[i])) mainDistance += distances[i]
    }

    mainTime = Number(mainTime);
    mainDistance = Number(mainDistance)

    let currentWRs = [];
    currentWRs.push({time: mainTime, distance: mainDistance});

    let runsThatBeatWR = 0;
    for( let i=0; i<currentWRs.length; i++){
        const time = currentWRs[i].time;
        const distance = currentWRs[i].distance;

        const possibleRuns = [];
        for(let j=0; j<time; j++){
            let posButton = j
            let posBoat = posButton * (time - posButton)
            if(posBoat > distance){
                runsThatBeatWR++;
            }
        }
        result += runsThatBeatWR;
    }
    console.log(result)
}

part1();
part2();