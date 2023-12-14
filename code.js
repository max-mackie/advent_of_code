function transverseMatrix(matrix){
  let transverse = Array.from({length: matrix.length}, () => [])
  matrix.forEach(line => {
    for(let i=0; i<line.length; i++){
      transverse[i].push(line[i])
    }
  })
  return transverse
}

function letThemRoll(matrix){
  let rolled = matrix.map(column => {
    let lastBlockage = -1;
    for(let i=0; i<column.length; i++){
      if(column[i] === '.') continue
      if(column[i] === '#') lastBlockage = i
      if(column[i] === 'O'){
        if(i === lastBlockage + 1){
          lastBlockage++
          continue
        }else{
          column[lastBlockage+1] = column[i]
          column[i] = "."
          lastBlockage++
        }
      }
    }
    return column
  })
  return rolled
}

function run(data){
  let matrix = data.split('\n').filter(Boolean).map(l => l.split(''))
  
  for(let i=0; i<1; i++){
    console.log(i)
    let transverse = transverseMatrix(matrix)
    matrix = letThemRoll(transverse)
  }



  const total = matrix.reduce((sum, column) => {
    const columnTotal = column.reduce((columnSum, element, rowIndex) => {
      if(element === 'O') return columnSum + 1 * (column.length - rowIndex)
      return columnSum
    }, 0)
    return sum + columnTotal
  },0)
  console.log(total)
}

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

// const test1 =  "O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....";
// console.log("test1:")
// run(test1)

run(await fetchData())
