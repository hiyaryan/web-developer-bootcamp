mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: JSON.parse(coordinates), // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(JSON.parse(coordinates))
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${ title }</h3>
            <p>${ campgroundLocation }</p>`
        )
    )
    .addTo(map);