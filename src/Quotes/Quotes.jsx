import React, { Fragment, useCallback, useEffect, useState } from 'react';
import './Quotes.css';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/quotes');

      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }

      const data = await response.json();
      const quotesData = data.quotes || [];

      const transformedQuotes = quotesData.map(quoteData => ({
        text: quoteData.quote,
        name: quoteData.author
      }));

      setQuotes(transformedQuotes);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching quotes:', error.message);
      setQuotes([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return (
    <Fragment>
      <section className='container'>
        <h1>QUOTIFYHUB</h1>
      </section>
      <section className='button-container'>
        <button className='fetch-button' onClick={fetchQuotes}>Fetch</button>
      </section>
      <section className='quotes-container'>
        {!loading && quotes.length > 0 ? (
          <ul>
            {quotes.map((quote, index) => (
              <div className='quote' key={index}>
                <h2>- {quote.name}</h2>
                <p>" {quote.text} "</p>
              </div>
            ))}
          </ul>
        ) : (
          <p className='loading-message'>{loading ? 'Loading....' : 'Quotes not found'}</p>
        )}
      </section>
    </Fragment>
  );
}

export default Quotes;