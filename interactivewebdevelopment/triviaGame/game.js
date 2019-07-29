class Game { 
    constructor() {
    document.getElementById('people').addEventListener('click',this.people);
    document.getElementById('starships').addEventListener('click',this.starships);
    document.getElementById('planets').addEventListener('click',this.planets);
    document.getElementById('vehicles').addEventListener('click',this.vehicles);
}

    makeApiCall = (self, url, max) => { 
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        let randomIndex = Math.floor(Math.random() * Math.floor(max));
        url = proxy + url + randomIndex;
        return fetch(url).then(res=>{
            return { 
                status : res.status, 
                data: res.json()
            } 
        });
    }

    people = () =>{
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - People";
        let self = this;
            self.makeApiCall(self, 'https://swapi.co/api/people/', 87)
            .then(person => {
                if(person.status !== 200) { 
                    throw new Error(404);
                } else { 
                    return person.data;
                }
            }).then(result => {
                console.log(result);
            })
            .catch(err => {   
            self.people();
            });
    } 

    starships = () =>{ 
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - Starships";
        let self = this;
        self.makeApiCall(self, 'https://swapi.co/api/starships/', 37)
        .then(ships => {
            if(ships.status !== 200) { 
                throw new Error(404);
            } else { 
                return ships.data;
            }
        }).then(result => {
            console.log(result);
        })
        .catch(err => { 
            self.starships();
        });
    }
    
    planets = () => { 
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - Planets";
        let self = this;
        self.makeApiCall(self, 'https://swapi.co/api/planets/', 61)
        .then(planets => {
            if(planets.status !== 200) { 
                throw new Error(404);
            } else { 
                return planets.data;
            }
        }).then(result => {
            console.log(result);
        })
        .catch(err => { 
            self.planets();
        });
    }
    
    vehicles = () => { 
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - Vehicles";
        let self = this;
        self.makeApiCall(self, 'https://swapi.co/api/vehicles/', 39)
        .then(planets => {
            if(planets.status !== 200) { 
                throw new Error(404);
            } else { 
                return planets.data;
            }
        }).then(result => {
            console.log(result);
        })
        .catch(err => { 
            self.vehicles();
        });

    }   
    
    films = () => { 
        console.log('Films');
    }
    
    species =() =>  { 
        console.log('Species');
    }
    
    randomCategory() { 
        switch(Math.floor(Math.random() * Math.floor(6))) { 
            case 0: 
                people();
                break;
            case 1: 
                starships();
                break;
            case 2: 
                planets();
                break;
            case 3: 
                vehicles();
                break;
            case 4: 
                films();
                break;
            case 5: 
                species();
                break;
            default: 
                //code block
                people();
        }
    }
}

let game = new Game();




