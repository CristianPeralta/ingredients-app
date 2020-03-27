import React, { useState, useEffect, useRef } from 'react';

import useHttp from '../../hooks/http';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {
    isLoading,
    data,
    error,
    sendRequest,
    clear,
  } = useHttp();
  const [enteredFilter, setEnteredFilter] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest('https://react-hooks-ingredients-3c991.firebaseio.com/ingredients.json' + query, 'GET');
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
