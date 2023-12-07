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

const part1 = async () => {
    const data = await fetchData();
    function identifyHand(hand) {
        // Regular expressions for different combinations
        const fiveOfAKind = /(.)\1\1\1\1/;
        const fourOfAKind = /(.)\1\1\1/;
        const threeOfAKind = /(.)\1\1/;
        const onePair = /(.)\1/;
        
        // Function to check for two pairs
        const hasTwoPairs = (hand) => {
          let matches = hand.match(/(.)\1/g);
          return matches && matches.length === 2 && matches[0][0] !== matches[1][0];
        };
      
        // Sort the hand to make it easier to identify full house
        let sortedHand = hand.split('').sort().join('');
      
        // Check for five of a kind
        if (fiveOfAKind.test(sortedHand)) {
          return 'Five of a Kind';
        }
      
        // Check for full house (Three of a kind and a pair)
        if (threeOfAKind.test(sortedHand) && onePair.test(sortedHand.replace(threeOfAKind, ''))) {
          return 'Full House';
        }
      
        // Check for four of a kind
        if (fourOfAKind.test(sortedHand)) {
          return 'Four of a Kind';
        }
      
        // Check for three of a kind
        if (threeOfAKind.test(sortedHand)) {
          return 'Three of a Kind';
        }
      
        // Check for two pairs
        if (hasTwoPairs(sortedHand)) {
          return 'Two Pair';
        }
      
        // Check for one pair
        if (onePair.test(sortedHand)) {
          return 'One Pair';
        }
      
        return 'No recognized combination';
      }

    const findScore = (type, cards) => {
        const hexMap = {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            'T': 'A',
            'J': 'B',
            'Q': 'C',
            'K': 'D',
            'A': 'E'
        }
        let score = type
        for(let i=0; i<cards.length; i++){
            score = score.concat(hexMap[cards[i]])
        }
        return score
    }

    // Process data to get array (hands) of cards & bid objects
    const lines = data.split('\n').filter(Boolean).map(l => l.split(" "));
    let hands = [];
    for(let i=0; i<lines.length; i++){
        hands.push({cards: lines[i][0], bid: lines[i][1]})
    }

    // calculate a hexadecimal score for each hand
    for(let i=0; i<hands.length; i++){
        let type = identifyHand(hands[i].cards)
        switch(type){
            case 'Five of a Kind':
                hands[i].score = findScore('7', hands[i].cards)
                break
            case 'Four of a Kind':
                hands[i].score = findScore('6', hands[i].cards)
                break
            case 'Full House':
                hands[i].score = findScore('5', hands[i].cards)
                break
            case 'Three of a Kind':
                hands[i].score = findScore('4', hands[i].cards)
                break
            case 'Two Pair':
                hands[i].score = findScore('3', hands[i].cards)
                console.log(hands[i].cards)

                break
            case 'One Pair':
                hands[i].score = findScore('2', hands[i].cards)
                break
            case 'No recognized combination':
                hands[i].score = findScore('1', hands[i].cards)
                break
            default:
                console.log('error switch case not found')
                break
        }
    }

    hands.sort((a,b) => {
        let scoreA = parseInt(a.score, 16)
        let scoreB = parseInt(b.score, 16)
        return scoreA - scoreB
    });

    let totalscore = 0
    for(let i=0; i<hands.length; i++){
        totalscore += parseInt(hands[i].bid,10)*(i+1)
    }

    console.log(totalscore)
}

// const part2 = async () => {
// }

part1();
// part2();