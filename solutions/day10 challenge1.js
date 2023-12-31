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


function dfsIterative(matrix, startRow, startCol, visited, path) {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const stack = [];
    stack.push([startRow, startCol]);
  
    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();
  
      if (currentRow < 0 || currentRow >= rows || currentCol < 0 || currentCol >= cols || matrix[currentRow][currentCol] === "." || visited[currentRow][currentCol]) {
        continue;
      }
  
      visited[currentRow][currentCol] = true;
      path.push([currentRow, currentCol]);
  
      const moves = {
        '|': [[-1, 0], [1, 0]],
        '-': [[0, -1], [0, 1]],
        'L': [[-1, 0], [0, 1]],
        'J': [[-1, 0], [0, -1]],
        '7': [[1, 0], [0, -1]],
        'F': [[1, 0], [0, 1]],
        'S': [], //defined by looking at the data
      };

      if(matrix[currentRow][currentCol] === "S"){
        let above = matrix[currentRow-1][currentCol]
        let left = matrix[currentRow][currentCol-1]
        let right = matrix[currentRow][currentCol+1]
        let below = matrix[currentRow+1][currentCol]
        if( above === "|" || above === "7" || above === "F") moves['S'].push([-1,0])
        if(left === "-" || left === "F" || left === "L") moves['S'].push([0,-1])
        if(right === "7" || right === "-" || right === "J") moves['S'].push([0,1])
        if(below === "|" || below === "L" || below === "J") moves['S'].push([1,-0])
    }
  
      for (const move of moves[matrix[currentRow][currentCol]]) {
        const newRow = currentRow + move[0];
        const newCol = currentCol + move[1];
  
        if (path.length>2 && matrix[newRow] && matrix[newRow][newCol] === "S") {
          console.log('Cycle found');
          return path;
        }
  
        stack.push([newRow, newCol]);
      }
    }
  
    return false;
  }
  
  
  async function run() {
    const input = await fetchData();
    const map = input.split('\n').map(row => row.split(''));
    const sRow = map.findIndex(row => row.includes('S'));
    const sColumn = map[sRow].indexOf('S');
  
    const rows = map.length;
    const cols = map[0].length;
  
    const visited = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
  
    const path = dfsIterative(map, sRow, sColumn, visited, []);
    const furthestPoint = path.length/2
    console.log(furthestPoint)


    if (!path) {
      console.log('No Cycle Found');
    }
  }
  
  run();