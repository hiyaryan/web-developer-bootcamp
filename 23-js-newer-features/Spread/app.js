// spread in function calls
const nums = [1, 5, 6, 3, 23, 56, 78, 12, 123, 45]

// old way
let max = Math.max(1, 5, 6, 3, 23, 56, 78, 12, 123, 4)
console.log(max);

// needs spread ...
max = Math.max(nums)
console.log(max);

// new way using spread
max = Math.max(...nums)
console.log(max);

// spreading a string to get individual chars
console.log("hello");
console.log(..."hello");

// same as
console.log('h', 'e', 'l', 'l', 'o');

// spread in array literals
const cats = ["Blue", "Scout", "Rocket"];
const dogs = ["Rusty", "Wyatt"];

const pets = [...cats, ...dogs, "Speedy"]
console.log(pets);

// spread string into an array of chars
const hello = [..."hello"]
console.log(hello);

// spread  in object literals
const feline = { legs: 4, family: "Felidae" };
const canine = { family: "Caninae", furry: true };

// copy an object 
const felineCopy = { ...feline }

// extend and object
const felineExtended = { ...feline, color: "black" }

// overwriting duplicate keys
const catDog = { ...feline, ...canine };

// spreading an array into an object literal
const arrayObject = { ...[2, 4, 5, 8] }

// spreading a string into an object literal
const stringObject = { ..."HIII" }

// using spread on data from a form
const dataFromForm = {
    email: "blueman@gmail.com",
    password: "tobias123!",
    username: "tfunke",
}

// making a copy
const formDataCopy = { ...dataFromForm }

// spreading new data into an existing object
const newUser = { ...dataFromForm, id: 2345, isAdmin: false }