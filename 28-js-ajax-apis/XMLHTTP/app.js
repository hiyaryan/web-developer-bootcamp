// making a request with XMLHttpRequest

// "https://swapi.dev/api/people/1/"

const req = new XMLHttpRequest();

// success case
req.onload = function () {
    console.log("IT LOADED!!!");
    const data = JSON.parse(this.responseText);
    console.log(data);
}

// error case
req.onerror = function () {
    console.log("ERROR!!!");
    console.log(this);
}

req.open("GET", "https://swapi.dev/api/people/1/")
req.send();