import Property from "./Property";
import "./PropertyList.css"

export default function PropertyList({ properties }) {
    return (
        <ul className="PropertyList">
            {properties.map(property => <Property key={property.id} property={property} />)}
        </ul>
    )
}