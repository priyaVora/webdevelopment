class Game { 
    constructor() {
    this.current = undefined;    
    document.getElementById('people').addEventListener('click',this.people);
    document.getElementById('starships').addEventListener('click',this.starships);
    document.getElementById('planets').addEventListener('click',this.planets);
    document.getElementById('vehicles').addEventListener('click',this.vehicles);
    document.getElementById('films').addEventListener('click',this.films);
    document.getElementById('species').addEventListener('click',this.species);
}

    makeApiCall = (self, url, max) => { 
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        let randomIndex = Math.floor(Math.random() * Math.floor(max));
        this.current = randomIndex;
        url = proxy + url + randomIndex;
        return fetch(url).then(res=>{
            return { 
                status : res.status, 
                data: res.json(),
                current: randomIndex
            } 
        });
    }

    game = (questions, counter) => { 
        console.log(questions);
        this.next = () => { 
            counter++;
            if(questions[counter] !== undefined) { 
                this.game(questions,counter);
            } else { 
                var node = document.getElementById('game');  
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }             
                var textnode = document.createTextNode("Sweet you are done!");
                node.appendChild(textnode); 
            }
        }
         let question = questions[counter];
            var node = document.getElementById('game');  
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }             
                var textnode = document.createTextNode("Q: " + question);
                node.appendChild(textnode);

                
                var button = document.createElement("button"); 
                var buttonNode = document.createTextNode('Next');
                button.addEventListener('click', this.next);
                // document.getElementById('next').addEventListener('click',this.next);
                button.appendChild(buttonNode);
                node.appendChild(button); 


    
    }

    question = (type, data) =>{ 
        switch(type) { 
            case 'people': 
            let q = [];
                var node = document.getElementById('game');  
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }             
                var textnode = document.createTextNode("Q:");
                node.appendChild(textnode);
                console.log(this.current);


                var keys= [];
                
                for(var k in data) { 
                    keys.push(k);
                    if(typeof data[k] === 'object') { 
                        q.push('How many ' + data['name'] + ' does ' + " have?");
                    } else { 
                        q.push("What is" + data['name'] + "\'s " + k + "?")
                    }
                } 

                this.game(q,0);
               

                break;
            case 'starships': 
                break; 
            case 'planets': 
                break; 
            case 'vehicles': 
                break;  
            case 'films': 
                break;
            case 'species': 
                break;
            default: 
            //
        }
    }

    people = () =>{
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - People";
        let self = this;
            self.makeApiCall(self, 'https://swapi.co/api/people/', 87)
            .then(person => {
                if(person.status !== 200) { 
                    throw new Error(404);
                } else { 
                    self.current = person.current;
                    return person.data;
                }
            }).then(result => {
                console.log(result);
                self.question('people', result);
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
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - Films";
        let self = this;
        self.makeApiCall(self, 'https://swapi.co/api/films/', 7)
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
            self.films();
        });
    }
    
    species =() =>  { 
        document.getElementById('title').innerHTML = "Star Wars Trivia Game - Species";
        let self = this;
        self.makeApiCall(self, 'https://swapi.co/api/species/', 37)
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
            self.films();
        });
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




