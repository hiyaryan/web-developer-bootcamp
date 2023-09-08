const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const searchTerm = form.elements.query.value;

    // adding the query using a template literal
    // const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);

    // adding a query using the config params property
    const config = { params: { q: searchTerm }, headers: {} }
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);

    console.log(res.data);
    makeImages(res.data);

    form.elements.query.value = "";
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}