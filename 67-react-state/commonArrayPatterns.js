// Common patterns for updating arrays in state
const shoppingCart = [
    { id: 1, product: "HDMI Cable", price: 4 },
    { id: 2, product: "Easy Base Oven", price: 28 },
    { id: 3, product: "Peach Pie", price: 6.5 },
];

// Adding to an array
[...shoppingCart, { id: 4, product: "Coffee Mug", price: 7.99 }];

// Removing from an array
shoppingCart.filter((item) => item.id !== 2);

// Updating all elements in an array
shoppingCart.map((item) => {
    return {
        ...item,
        product: item.product.toLowerCase()
    }
});

// Modifying a particular element in an array
shoppingCart.map((item) => {
    if (item.id === 3) {
        return { ...item, price: 10.99 };
    } else {
        return item;
    }
});