export default function Property({ property }) {
    return (
        <li>
            <h2>{property.name}</h2>
            <h4>${property.price} / night</h4>
            <p>{property.rating} &#x2B50;</p>
        </li>
    )
}