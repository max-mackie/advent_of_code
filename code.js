function run(data){
  let csv = data.split('\n').filter(Boolean)[0].split(',')
  console.log(csv)
  let values = []
  csv.forEach(string => {
    let currentValue = 0
    for(let i=0; i<string.length; i++){
      currentValue = ((currentValue + string[i].charCodeAt(0))*17) % 256
    }
    values.push(currentValue)
  })
  console.log(values.reduce((a,b) => a+b, 0)) 
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

// console.log("test1:")
// const test = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
// run(test)
run(await fetchData())
