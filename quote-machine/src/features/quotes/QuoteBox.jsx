import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuotes, pickRandomQuote } from "./quotesSlice";

export default function QuoteBox() {
  const dispatch = useDispatch();
  const { currentQuote, currentColor } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(pickRandomQuote());
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${currentQuote.quote}" — ${currentQuote.author}`
  )}`;

  return (
    <div
      id="quote-box"
      style={{
        "--quote-color": currentColor,
      }}
    >
      <p id="text">"{currentQuote.quote}"</p>
      <p id="author">— {currentQuote.author}</p>
      <button id="new-quote" onClick={handleNewQuote}>
        New Quote
      </button>
      <a
        id="tweet-quote"
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet
      </a>
    </div>
  );
}
