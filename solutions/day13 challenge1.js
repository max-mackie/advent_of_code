function arraysEqual(a, b){
    for(let i=0; i<a.length; i++){
        if(a[i] !== b[i]){
            return false
        }
    }
    return true
}
function findReflection(matrix){
    let rowsAbove
    for(let i=1; i<matrix.length && isNaN(rowsAbove); i++){
        for(let j=0; j<=i && isNaN(rowsAbove); j++){
            if(i+j > matrix.length-1 || i-1-j < 0){
                rowsAbove = i;
                break
            }
            if(arraysEqual(matrix[i+j], matrix[i-1-j])){
                continue
            }
            break
        } 
    }
    return rowsAbove
}

function run(data){
    let total = 0
    const patterns = data.split('\n\n').filter(Boolean).map(p => p.split('\n').filter(Boolean).map(l => l.split('')))
    for(let pattern of patterns){
        let found = false
        for(let i=0; i<pattern.length && !found; i++){
            for(let j=0; j<pattern[0].length && !found; j++){
                let smudgePattern = pattern
                smudgePattern[i][j] === "#" ? smudgePattern[i][j] = "." : smudgePattern[i][j] = "#"
                console.log(smudgePattern)
                let rowsAbove = findReflection(smudgePattern)
                if(rowsAbove){
                    total += 100*rowsAbove
                    found = true
                    console.log(rowsAbove)
                }
            }
        }
        let transverse = Array.from({length: pattern[0].length}, () => []) 
        pattern.forEach(l => {
            for(let i=0; i<l.length; i++){
                transverse[i].push(l[i])
            }
        })
        for(let i=0; i<pattern.length && !found; i++){
            for(let j=0; j<pattern[0].length && !found; j++){
                let smudgePattern = transverse
                smudgePattern[i][j] === "#" ? smudgePattern[i][j] = "." : smudgePattern[i][j] = "#"
                console.log(smudgePattern)
                let columnsLeft = findReflection(smudgePattern)
                if(columnsLeft){
                    total += columnsLeft
                    found = true
                    console.log(columnsLeft)
                }
            }
        }
    }
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

// const test1 =  "#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#";
// console.log("test1:")
// run(test1)

const findReflectionWithSmudge = (pattern) => {
    for (let i = 1; i < pattern.length; i++) {
      let upperPattern = pattern.slice(0, i).map(line => line.join(''));
      let lowerPatternReversed = pattern.slice(i).map(line => line.join('')).reverse();
      if (upperPattern.length > lowerPatternReversed.length) {
        upperPattern.splice(0, upperPattern.length - lowerPatternReversed.length);
      } else if (upperPattern.length < lowerPatternReversed.length) {
        lowerPatternReversed.splice(0, lowerPatternReversed.length - upperPattern.length);
      }
      const singleDiffs = upperPattern.filter((line, i) => {
        return line.split('').filter((char, j) => {
          return char !== lowerPatternReversed[i].split('')[j];
        }).length == 1;
      }).length;
      const multipleDiffs = upperPattern.filter((line, i) => {
        return line.split('').filter((char, j) => {
          return char !== lowerPatternReversed[i].split('')[j];
        }).length > 1;
      }).length;
      if (singleDiffs == 1 && multipleDiffs == 0) {
        return i;
      }
    }
    return 0
  }

  const part2 = async () => {
    const input = await fetchData()
    const patterns = input.split("\n\n").filter(Boolean).map(pattern =>
      pattern.split("\n").filter(Boolean).map(line => line.split(''))
    );
    let total = patterns.reduce((total, pattern) => {
        console.log(pattern, findReflectionWithSmudge(pattern))
      total += findReflectionWithSmudge(pattern) * 100;
      const transposedPattern = pattern.reduce((prev, next) =>
        next.map((_, i) =>
          (prev[i] || []).concat(next[i])
        ), []);
        console.log(findReflectionWithSmudge(transposedPattern))
      total += findReflectionWithSmudge(transposedPattern);
      return total;
    }, 0)
    console.log(total)
    return total
  };
  

//   part2()
  run(await fetchData())
