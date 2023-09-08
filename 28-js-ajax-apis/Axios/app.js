// axios requests using promises
axios.get("https://swapi.dev/api/people/1/")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log("ERROR", err);
    })


// axios request using async functions
const getStarWarsPerson = async () => {
    try {
        const res = await axios.get("https://swapi.dev/api/people/2/");
        console.log(res.data);

        const res2 = await axios.get("https://swapi.dev/api/peopasdasle/3/");
        console.log(res2.data);
    } catch (e) {
        console.log("INTENTIONAL ERROR", e);
    }
}

getStarWarsPerson();


// axios request using async functions refactored
const getVariousStarWarsPerson = async (id) => {
    try {
        const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
        console.log(res.data);
    } catch (e) {
        console.log("ERROR", e);
    }
}

getVariousStarWarsPerson(4);
getVariousStarWarsPerson(5);
getVariousStarWarsPerson(6);


// setting headers
const jokes = document.querySelector("#jokes")

const addNewJoke = async () => {
    // appending a new joke to a list
    const newJoke = await getDadJoke();

    const newLI = document.createElement("li");
    newLI.append(newJoke);

    jokes.append(newLI);
}

document.querySelector("button").addEventListener("click", addNewJoke)

const getDadJoke = async () => {
    try {
        const config = {
            headers: {
                Accept: "application/json"
            }
        }
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        console.log(res.data);

        return res.data.joke;

    } catch (e) {
        console.log("ERROR", e);
        return "NO JOKES AVAILABLE! SORRY :(";
    }
}

