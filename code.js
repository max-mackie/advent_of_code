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

    let lists = data.split(/[\n]*[a-z- ]*:[ ]*/g) // removes the text and splits data into different array
    lists = lists.filter((l) => l) //remove falsy values from lists
    lists = lists.map((l) => {
        return l.trim().split(/[\n]+/g).map((n) => {
            return n.split(/[\n ]/).map((m) => { //splits each line by its spaces (the new line part may be irelavant)
                return parseInt(m, 10)
            })
        })
    })
    
    //finding the maximum possible value that can be returned my the last list of mapping so we can use this as a stoping point in the next for loop
    const maxMap = lists[lists.length-1].reduce((max, map) => { 
            return Math.max(max, map[0] + map[2]) //Look through each mapping to find its highest possible mapping
        }, 0
    )
    console.log(lists[0][0])
    let lowestPost;
    //works backwards through each list identifying the lowest possible number which could be returned by a mapping in that list
    for(let pos = 0; pos < maxMap && isNaN(lowestPost); pos++){ //increasing pos while its less than the maxMap and it hasent been set yet
        let val = pos;
        for(let i = lists.length -1; i>0; i--){ //working our way backwards through the lists of maps
            const map = lists[i].find(m => {
                return val >= m[0] && val < m[0] + m[2] //find the mapping in the list where the value in the range of the mapping
            })
            map && (val = val - map[0] + map[1]) //if a map is found then set val to its value plus the difference between the maps start and finish aka how the mapping translates the value
        }
        
        // once a value passes the tests above we now need to check that it is a seed
        for(let i = 0; i < lists[0][0].length && isNaN(lowestPost); i +=2){
            if(val >= lists[0][0][i] && val < lists[0][0][i] + lists[0][0][i+1]){
                lowestPost  = pos
            }
        }
    }
    console.log(lowestPost)
}


run();