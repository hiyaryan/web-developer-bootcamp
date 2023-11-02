import PropTypes from 'prop-types';

export default function ShoppingListItem({ item, qty, completed }) {
    const style =
        completed ?
            {
                color: "gray",
                textDecoration: "line-through"
            } : null;

    return (
        <>
            <li style={style}>{item} - {qty}</li>
        </>
    )
}

ShoppingListItem.propTypes = {
    item: PropTypes.string,
    qty: PropTypes.number,
    completed: PropTypes.bool
}