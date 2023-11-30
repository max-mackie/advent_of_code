console.log("JavaScript code is running!!")

const processedData = (data) => {
    const groups = data.trim().split('\n\n');
    const numbersGroups = groups.map(group => 
        group.split('\n').map(line => 
            line.trim().split(/\s+/).map(Number)
        )
    )
    return numbersGroups;
};

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
    if(data){
        const dataGroups = processedData(data);
        console.log(dataGroups);
        //Add challenge code here

    }
}

run();