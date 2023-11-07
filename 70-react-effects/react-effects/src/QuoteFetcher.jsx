import { useEffect } from "react";
import { useState } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

export default function QuoteFetcher() {
    const [quote, setQuote] = useState({ text: "", author: "" });

    useEffect(() => {
        fetchAndSetQuote();
    }, []);

    async function fetchAndSetQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        setQuote(randomQuote);
    }

    return (
        <div>
            <h3>{quote.text}</h3>
            <h5>{quote.author}</h5>
            <button onClick={fetchAndSetQuote}>Get Quote</button>
        </div>
    )
}