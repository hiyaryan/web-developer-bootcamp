const multiply = (x, y) => x * y;

const square = x => multiply(x, x);

const isRightTriangle = (a, b, c) => (
    square(a) + square(b) === square(c)
)

/*
isRightTriangle calls square that calls multiply. 

For the first argument (same for the remaining), the full call stack is,

multiply(3,3)
square(3)
isRightTriangle(3,4,5)
*/
isRightTriangle(3, 4, 5);