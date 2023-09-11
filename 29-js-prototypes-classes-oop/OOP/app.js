// factory functions
function hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`
}

// hex(255, 100, 25);
// rgb(255, 100, 25);

// a factory function that returns a color object with functions that return the color in rgb or hex
function makeColor(r, g, b) {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function () {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`
    }
    color.hex = function () {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    return color;
}

const firstColor = makeColor(35, 255, 150);
console.log("firstColor:", firstColor);
console.log(`firstColor: ${firstColor.hex()}`);
console.log(`firstColor: ${firstColor.rgb()}`);

const black = makeColor(0, 0, 0);

// different objects from the same factory functions do not use the same functions
console.log("black.hex === firstColor.hex", black.hex === firstColor.hex);
console.log('hi".slice === "bye".slice', "hi".slice === "bye".slice);

// constructor functions
function ColorConstructorFunc(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;

    console.log(this); // returns the window object
}

// adding new functions using the prototype property
ColorConstructorFunc.prototype.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
}

ColorConstructorFunc.prototype.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


ColorConstructorFunc.prototype.rgba = function (a = 1) {
    const { r, g, b } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const color1 = new ColorConstructorFunc(40, 50, 60);
const color2 = new ColorConstructorFunc(0, 0, 0);

console.log("color1.hex === color2.hex", color1.hex === color2.hex);

// classes
class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`
    }

    rgb() {
        const { r, g, b } = this;
        return `rgb(${this.innerRGB()})`;
    }

    rgba(a = 1) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }

    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`
    }

    saturated() {
        let { h, l } = this;
        return `hsl(${h}, 100%, ${l}%)`
    }

    opposite() {
        let { h, s, l } = this;

        h = (h + 180) % 360

        return `hsl(${h}, ${s}%, ${l}%)`
    }

    calcHSL() {
        let { r, g, b } = this;

        // make r, g, b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // find the greatest and smallest channel values
        let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b)

        const delta = cmax - cmin;
        let h = 0;
        let s = 0;
        let l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r)
            // red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // green is max
            h = (b - r) / delta + 2;
        else
            //blue is max
            h = (r - g) / delta + 4

        h = Math.round(h * 60);

        // make negative hues positive behind 360°
        if (h < 0) h += 360;

        // calculate lightness
        l = (cmax + cmin) / 2;

        // calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 2));

        // multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;
    }
}

const red = new Color(255, 67, 89, "red");
console.log("red", red.rgb());
console.log("red", red.rgba(0.5));
console.log("red hex", red.hex());

const white = new Color(255, 255, 255, "white");
console.log("white", white.rgb());
console.log("white", white.rgba(0.5));
console.log("white hex", white.hex());

console.log("red.rgb === white.rgb", red.rgb === white.rgb);
console.log("red.hex === white.hex", red.hex === white.hex);

// `extends` and `super` (inheritance)
class Pet {
    constructor(name, age) {
        console.log("IN PET CONSTRUCTOR");

        this.name = name;
        this.age = age;
    }

    eat() {
        return `${this.name} is eating!`
    }
}

class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        console.log("IN CAT CONSTRUCTOR");

        super(name, age);
        this.livesLeft = livesLeft;
    }

    meow() {
        return "MEOW!"
    }
}

const monty = new Cat('monty', 9);

class Dog extends Pet {
    bark() {
        return "WOOF!"
    }

    eat() {
        return `${this.name} scarfs his food!`
    }
}

const wyatt = new Dog("wyatt", 13);