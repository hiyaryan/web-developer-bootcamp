const bcrypt = require("bcrypt");

// salting and hashing on separate lines
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    console.log(password);
    console.log(salt);
    console.log(hash);
}

// salting and hashing on a single line
// const hashPassword = async (password) => {
//     const hash = await bcrypt.hash(password, 12);

//     console.log(password);
//     console.log(hash);
// }

const login = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);

    console.log(password);
    console.log(hashedPassword);

    if (result) {
        console.log("SUCCESSFULLY LOGGED IN!");
    } else {
        console.log("FAILED TO LOGIN!");
    }
}

hashPassword("monkey");

// either has a successful login since bcrypt can identify which part is the salt and which is the hashed value
login("monkey", "$2b$12$VYLNVno9pxmIWRFm7sp7o.s/fy7lhh9hA8A8.ZhcXEQI261sdjZXu");
login("monkey", "$2b$12$wEV4kIKmWFQ0f/LccnvRhuM2q37i4Cf9KB8fShVE/0zQ0pVq.UVyS");

