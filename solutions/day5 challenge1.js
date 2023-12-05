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
    // Challenge code below:
    const splitArray = (inputArray, delimiter) => {
        let result = []
        let currentSegment = []
        inputArray.forEach( element => {
            if(element === delimiter){
                if(currentSegment.length){
                    result.push(currentSegment)
                    currentSegment = []
                }
            }else{
                currentSegment.push(element)
            }
        });
        if(currentSegment.length){
            result.push(currentSegment)
        }
        return result
    }

    const data = await fetchData();
    const mapData = data.trim().split('\n')
    const mapsRanges = splitArray(mapData, "")

    let seeds = mapsRanges.shift()[0].match(/\d+/g).map(Number)
    let mapObj = {};
    for(let range of mapsRanges){
        const name = range.shift()
        let map = range.map(row => {
            return row.match(/\d+/g).map(Number)
        })
        mapObj[name] = map
    }
    let locations = []

    
    seeds.forEach(seed => {
        let soil
        let fertilizer
        let water
        let light
        let temperature
        let humidity
        let location
        for(let row of mapObj['seed-to-soil map:']){     
            if(seed >= row[1] && seed <= (row[1] + row[2])){
                soil = seed + (row[0] - row[1])
            }
        }
        if(!soil) soil = seed

        for(let row of mapObj['soil-to-fertilizer map:']){
            if(soil >= row[1] && soil <= (row[1] + row[2])){
                fertilizer = soil + (row[0] - row[1])
            }
        }
        if(!fertilizer) fertilizer = soil

        for(let row of mapObj['fertilizer-to-water map:']){
            if(fertilizer >= row[1] && fertilizer <= (row[1] + row[2])){
                water = fertilizer + (row[0] - row[1])
            }
        }
        if(!water) water = fertilizer
        
        for(let row of mapObj['water-to-light map:']){
            if(water >= row[1] && water <= (row[1] + row[2])){
                light = water + (row[0] - row[1])
            }
        }
        if(!light) light = water

        for(let row of mapObj['light-to-temperature map:']){
            if(light >= row[1] && light <= (row[1] + row[2])){
                temperature = light + (row[0] - row[1])
            }
        }
        if(!temperature) temperature = light
        
        for(let row of mapObj['temperature-to-humidity map:']){
            if(temperature >= row[1] && temperature <= (row[1] + row[2])){
                humidity = temperature + (row[0] - row[1])
            }
        }
        if(!humidity) humidity = temperature
        
        for(let row of mapObj['humidity-to-location map:']){
            if(humidity >= row[1] && humidity <= (row[1] + row[2])){
                location = humidity + (row[0] - row[1])
            }
        }
        if(!location) location = humidity
        locations.push(location) 
    })

    console.log(Math.min(...locations))
    return 
}


run();