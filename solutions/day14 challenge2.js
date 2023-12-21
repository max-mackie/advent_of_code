function run(data){
    const platform = data.split('\n').filter(Boolean).map(line => line.split(''))
    
    const move = (platform, x, y, nx, ny) => {
      const c = platform[y][x];
      const nc = platform[ny] ? platform[ny][nx] : undefined;
      if (c === 'O' && nc === '.') {
        platform[ny][nx] = c;
        platform[y][x] = '.';
        return 1;
      }
      return 0;
    }
    
    const NORTH = { x: 0, y: -1, start: _ => 0, next: v => v + 1 };
    const WEST = { x: -1, y: 0, start: _ => 0, next: v => v + 1 };
    const SOUTH = { x: 0, y: 1, start: p => p.length - 1, next: v => v - 1 };
    const EAST = { x: 1, y: 0, start: p => p.length - 1, next: v => v - 1 };
    
    const tilt = (platform, dir) => {
      let moves = 1;
      while (moves) {
        moves = 0;
        for (let y = dir.start(platform); y >= 0 && y < platform.length; y = dir.next(y)) {
          for (let x = dir.start(platform); x >= 0 && x < platform[y].length; x = dir.next(x)) {
            moves += move(platform, x, y, x + dir.x, y + dir.y);
          }
        }
      };
    };
    
    const load = (platform) => 
      platform.map((line, y) => line.map(c => c !== 'O' ? 0 : platform.length - y) // calculate distance from bottom
          .reduce((a, b) => a + b, 0) // sum all distances for line
        ).reduce((a, b) => a + b, 0); // sum all lines
  
    const cycle = (platform) => {
      const maps = new Map(); // detect cycles
      for(let i=0; i< 1000_000_000; i++){
        tilt(platform, NORTH);
        tilt(platform, WEST);
        tilt(platform, SOUTH);
        tilt(platform, EAST);
        const mapId = platform.map(line => line.join('')).join('\n');
        if(maps.get(mapId)){
          const cycleLength = i - maps.get(mapId);
          const remaining = 1000_000_000 - i;
          console.log(i)
          i += Math.floor(remaining/cycleLength) * cycleLength
          console.log(i)
          maps.clear();
        }
        maps.set(mapId, i)
      }
    }
    
    cycle(platform)
    console.log(`part2: ${load(platform)}`);
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
  // run(test)
  run(await fetchData())