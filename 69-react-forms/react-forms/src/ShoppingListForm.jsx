import { useState } from "react";

export default function ShoppingListForm({ addItem }) {
    const [formData, setFormData] = useState({ product: "", quantity: 0 });

    const handleChange = (evt) => {
        setFormData(currentData => {
            return {
                ...currentData,
                [evt.target.name]: evt.target.value,
            }
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        addItem(formData);
        setFormData({ product: "", quantity: 0 })
    }

    return (
        <form onSubmit={handleSubmit} action="">
            <label htmlFor="product">Product Name</label>
            <input type="text" placeholder="product name" name="product" id="product" onChange={handleChange} value={formData.product} />
            <label htmlFor="quantity">Quantity</label>
            <input type="number" placeholder="quantity" name="quantity" id="quantity" onChange={handleChange} value={formData.quantity} />
            <button>Add Item</button>
        </form>
    )
}