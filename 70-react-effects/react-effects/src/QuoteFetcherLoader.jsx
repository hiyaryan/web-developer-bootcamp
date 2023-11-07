import { useEffect } from "react";
import { useState } from "react";
import "./QuoteFetcherLoader.css"

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

export default function QuoteFetcherLoader() {
    const [quote, setQuote] = useState({ text: "", author: "" });
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAndSetQuote() {
            const response = await fetch(RANDOM_QUOTE_URL);
            const jsonResponse = await response.json();
            const randomQuote = jsonResponse.quote;
            setQuote(randomQuote);
            setLoading(false)
        }

        fetchAndSetQuote();
    }, []);

    return (
        <div>
            <p className="Loader" style={{ opacity: isLoading ? "1" : "0" }}>Loading...</p>
            <h3>{quote.text}</h3>
            <h5>{quote.author}</h5>
        </div>
    )
}