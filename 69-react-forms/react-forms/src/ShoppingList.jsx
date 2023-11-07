import { useState } from "react"
import ShoppingListForm from "./ShoppingListForm";
import ValidatedShoppingListForm from "./ValidatedShoppingListForm";
import { v4 as uuid } from 'uuid';

export default function ShoppingList() {
    const [items, setItems] = useState([
        { id: uuid(), product: "Bananas", quantity: 8 },
        { id: uuid(), product: "Apples", quantity: 4 },
    ]);

    const addItem = (item) => {
        setItems(currentItems => {
            return [
                ...currentItems,
                { ...item, id: uuid() },
            ]
        })
    }

    return (
        <div>
            <ul>
                {items.map(item => <li key={item.id} style={{ listStyle: "none" }}>{item.product} {item.quantity}x</li>)}
            </ul>
            {/* <ShoppingListForm addItem={addItem} /> */}
            <ValidatedShoppingListForm addItem={addItem} />
        </div>
    )
}