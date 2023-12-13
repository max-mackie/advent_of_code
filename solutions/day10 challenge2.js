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
const getConnectedPipes = (x,y, pipe) => {
    switch(pipe){
        case '|':
            return [[x-1, y], [x+1,y]];
        case '-':
            return [[x, y-1], [x, y+1]];
        case 'L':
            return [[x -1, y], [x,y+1]];
        case 'J':
            return [[x-1, y], [x,y-1]];
        case '7':
            return [[x+1, y], [x, y-1]];
        case 'F':
            return [[x+1, y], [x, y+1]];
        case 'S':
            return [[x, y], [x, y]];
    }
    return [];
}

async function run1() {
    const input = await fetchData();
    const map = input.split('\n').map(row => row.split(''));
    const initial = [map.indexOf(map.find(row => row.includes('S'))), map.find(row => row.includes('S')).indexOf('S')]
    let loop = new Set([initial.toString()]);
    const dirs = [[0,1], [0, -1], [1, 0], [-1, 0]];
    dirs.forEach(dir => {
        const [x,y] = [initial[0] + dir[0], initial[1] + dir[1]];
        const connected = getConnectedPipes(x,y,map[x][y]).map(coord => coord.toString());
        if(connected.some(coord => coord == initial.toString())){ //to see which are connected to the unknown 'S'
            loop.add(connected[0]);
            loop.add(connected[1]);
        }
    });
    loop.forEach(coord => {
        const [x,y] = coord.split(',').map(coord => parseInt(coord));
        const connected = getConnectedPipes(x, y, map[x][y]).map(coord => coord.toString());
        loop.add(connected[0]);
        loop.add(connected[1])
    })

    let expandedMap = Array.from(Array(map.length*2+1), () => new Array(map[0].length * 2 + 1).fill(1));
    loop.forEach(coord => {
        const [x,y] = coord.split(',').map(coord => parseInt(coord));
        expandedMap[x*2 + 1][y*2 + 1] = 0;
        const [connectedA, connectedB] = getConnectedPipes(x*2+1, y*2+1, map[x][y]);
        expandedMap[connectedA[0]][connectedA[1]] = 0;
        expandedMap[connectedB[0]][connectedB[1]] = 0;
    });

    const outside = new Set(['0,0']);
    outside.forEach(coord => {
        const [x,y] = coord.split(',').map(coord => parseInt(coord));
        expandedMap[x][y] = 0;
        dirs.forEach(dir => {
            if( x + dir[0] >= 0 && x + dir[0] < expandedMap.length && y + dir[1] >= 0 && y + dir[1] < expandedMap[x].length && expandedMap[x + dir[0]][y+dir[1]]){
               outside.add(`${x+dir[0]},${y+dir[1]}`); 
            }
        });
    });
    const total = expandedMap.reduce((total, row, index) => {
        if(index % 2 == 0) return total
        return total + row.reduce((total, cell, index) => {
            if(index % 2 == 0) return total
            return total + cell
        },0)
    },0);
    console.log(total)
    return total
}


run1()