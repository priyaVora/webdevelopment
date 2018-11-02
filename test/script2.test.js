const fetch = require('node-fetch');
const swapi = require('./script2');

//instead of done in the parameter of the test just return
it("calls swapi api to get people", ()=> {
  expect.assertions(1)
  return swapi.getPeople(fetch).then(data => {
    expect(data.count).toEqual(87)
  //  done();
  })
})



it("calls swapi api to get people with a promise", ()=> {
  expect.assertions(2)
    return swapi.getPeoplePromise(fetch).then(data => {
    expect(data.count).toEqual(87)
    expect(data.results.length).toBeGreaterThan(5)
  })
})
