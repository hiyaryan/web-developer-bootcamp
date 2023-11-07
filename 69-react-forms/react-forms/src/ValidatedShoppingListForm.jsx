import { useState } from "react";

export default function ShoppingListForm({ addItem }) {
    const [formData, setFormData] = useState({ product: "", quantity: 0 });
    const [productIsValid, setProductIsValid] = useState(false);

    const handleChange = (evt) => {
        if (evt.target.name === "product") {
            evt.target.value.length !== 0 ? setProductIsValid(true) : setProductIsValid(false);
        }

        setFormData(currentData => {
            return {
                ...currentData,
                [evt.target.name]: evt.target.value,
            }
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (productIsValid) {
            addItem(formData);
            setFormData({ product: "", quantity: 0 })
        }
    }

    return (
        <form onSubmit={handleSubmit} action="">
            <label htmlFor="product">Product Name</label>
            <input type="text" placeholder="product name" name="product" id="product" onChange={handleChange} value={formData.product} />
            {!productIsValid && <p style={{ color: "red" }}>Product cannot be empty</p>}
            <label htmlFor="quantity">Quantity</label>
            <input type="number" placeholder="quantity" name="quantity" id="quantity" onChange={handleChange} value={formData.quantity} />
            <button disabled={!productIsValid}>Add Item</button>
        </form>
    )
}