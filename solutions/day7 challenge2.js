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

async function  solve1 () {
    // prettier-ignore
    const input = await fetchData();
    const cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  
    const lines = input.split('\n').filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      let [hand, bid] = lines[i].split(' ');
      hand = hand.split('').map((card) => cards.indexOf(card).toString(16));
      bid = +bid; //convert bid to a number

      const map = {};
      for (const card of hand) {
        map[card] = (map[card] ?? 0) + 1;
      }
      const jacks = parseInt(map['0'])
      if(jacks) delete map['0']
      const counts = Object.values(map).map(v => parseInt(v,10)).sort((a, b) => b - a);
      if(jacks === 5) counts.push(0)
      if(jacks) counts[0] += jacks
      lines[i] = [[counts[0], counts[1] ?? 0, ...hand].join(), bid];
    }
  
    lines.sort(([a], [b]) => a.localeCompare(b));
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
      sum += lines[i][1] * (i + 1);
    }
    console.log(sum);
  }
    


  solve1();