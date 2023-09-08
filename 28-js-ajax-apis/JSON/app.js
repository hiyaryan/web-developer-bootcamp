// string to json
let data = `{"symbol":"BTC-USD","price_24h":25753.19,"volume_24h":54.70962179,"last_trade_price":26211.35}`;
console.log(data);

data = JSON.parse(data);
console.log(data);

// json to string
let dog = { breed: "lab", color: "black", isAlive: true, owner: undefined };
console.log(dog);

dog = JSON.stringify(dog)
console.log(dog);

