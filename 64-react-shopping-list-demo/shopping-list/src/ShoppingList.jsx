import ShoppingListItem from "./ShoppingListItem";


export default function ShoppingList({ items }) {
    return (
        <ul>
            {items.map(li => (
                // spread all key-value pairs from items into ShoppingListItem
                <ShoppingListItem key={li.id} {...li} />
            ))}
        </ul>
    )
}