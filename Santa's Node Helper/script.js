const fs = require('fs');
//1 - What floor does Santa end up on?
//C --> should go UP 1 floor
//) --> should go Down 1 floor


function floorSantaEndsUpOn() { 
    console.time("q = 1 santa-time");
    fs.readFile('./data.txt', (err, data) => {
        const directions = data.toString();
        const directionsArray = directions.split('');
        const answer = directionsArray.reduce((acc, currentValue) => { 
            if(currentValue === '(') { 
                return acc += 1
            } else if(currentValue === ')') { 
                return acc -=1
            }
        }, 0)
        console.timeEnd('q = 1 santa-time');
        console.log('Floor:', answer);
    })
}




 floorSantaEndsUpOn();


//2 - When does Santa first enter the basement?
function whenSantaFirstEntersBasement() { 
    console.time('q = 2 santa-time');
    fs.readFile('./data.txt', (err, data) => {
        const directions = data.toString();
        const directionsArray = directions.split('');
        let accumalator = 0
        let counter = 0
        const answer = directionsArray.some((currentItem) => { 
            if(currentItem === '(') { 
                accumalator += 1
            } else if(currentItem === ')') { 
                accumalator -=1
            }
            counter ++
            return accumalator < 0;
        })
        console.timeEnd('q = 2 santa-time');
        console.log('basement entered at: ',counter);
    })
}

whenSantaFirstEntersBasement();