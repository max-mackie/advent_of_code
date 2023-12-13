function countArrangements(springs, groups, springIdx = 0, groupIdx=0, memo={}){
    function memoize(result) {
        memo[springIdx] ??= {};
        memo[springIdx][groupIdx] = result;
        return result;
      }
    
      if (memo[springIdx]?.[groupIdx] !== undefined) {
        return memo[springIdx][groupIdx];
      }
    
      if (springIdx >= springs.length) {
        return +(groupIdx === groups.length);
      }
      if (groupIdx === groups.length) {
        return +(springs.indexOf('#', springIdx) === -1);
      }

      let result = 0;
      // moves to the next stringIndex if its a dot because this cant be a permeatation, also if its a question mark as it has a chance of being a dot also and it will be treated as a # next is statement

      if (springs[springIdx] === '.' || springs[springIdx] === '?') {
        result += countArrangements(springs, groups, springIdx + 1, groupIdx, memo);
      }

    if(
        (springs[springIdx] === '#' || springs[springIdx] === '?') &&
        groups[groupIdx] <= springs.length - springIdx &&
        !springs.substring(springIdx, springIdx + groups[groupIdx]).includes('.') &&
        springs[springIdx + groups[groupIdx]] !== '#'
    ){
        result += countArrangements(springs, groups, springIdx + groups[groupIdx] + 1, groupIdx + 1, memo)
    }
    return memoize(result)
}

function run(input, nCopies){
    let sum = 0;
  for (const line of input.split('\n').filter(Boolean)) {
    let [springs, groups] = line.split(' ');
    springs = Array(nCopies).fill(springs).join('?');
    groups = Array(nCopies).fill(groups.split(',')).flat().map(Number);

    const nArrangements = countArrangements(springs, groups);
    sum += nArrangements;
  }
  console.log(sum);
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

const test1 =  "???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1"
// console.log("test1:")
// run(test1, 1)
// run(test1)

run(await fetchData(), 5)