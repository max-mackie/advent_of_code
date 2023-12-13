function findMatch(string, groups, total = 0) {
    if (groups.length === 0) return total;
    if (!string.includes("?")) return total;

    let group = groups.shift();
    let regex = new RegExp("[\\?#]{" + group + "}");
    let modifiedStr = string.replace(regex, (match) => {
        if (match) {
            total += group; // Increase total by the length of the replaced group
            return '#'.repeat(group);
        } else {
            return match;
        }
    });

    // If no replacement occurred, replace the first '?' with '.'
    if (modifiedStr === string) {
        modifiedStr = string.replace("?", ".");
        groups.unshift(group); // Put the group size back for retry
    }

    // Recursive call to process the remaining groups
    return findMatch(modifiedStr, groups, total);
}


function run(data) {
    const lines = data.split('\n').filter(Boolean).map(l => l.split(" ")).map(l => [l[0], l[1].split(',').map(Number)])
    console.log(lines)
    lines.forEach(l => {
        let groups = l[1]
        let string = l[0]
        let total = findMatch(string, groups)
        console.log(total)
    })
    return
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
console.log("test1:")
run(test1)
// run(await fetchData())