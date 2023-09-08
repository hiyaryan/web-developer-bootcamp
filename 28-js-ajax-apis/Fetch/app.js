// fetch using promises
fetch("https://swapi.dev/api/people/1")
    .then(res => {
        console.log("RESOLVED", res);

        // promises are resolved before fetch receives headers so the json() method on the resolved object reveals the data once it is received
        return res.json();
    })
    .then(data => {
        console.log(data);

        // making a second request
        return fetch("https://swapi.dev/api/people/2");
    })
    .then(res => {
        console.log(res);

        // retrieving the data from the second response
        return res.json();
    })
    .then(data => {
        // printing the data from the second response
        console.log(data);
    })
    .catch(err => {
        console.log("ERROR", err);
    });


// fetch using async functions
const loadStarWarsPeople = async () => {
    try {
        const res = await fetch("https://swapi.dev/api/people/3");
        const data = await res.json();
        console.log(data);

        const res2 = await fetch("https://swapi.dev/api/aqdfasdf/4");
        const data2 = await res2.json();
        console.log(data2);
    }
    catch (e) {
        console.log("INTENTIONAL ERROR!", e);
    }
}

loadStarWarsPeople();