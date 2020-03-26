import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};
const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const {isLoading, data, error, sendRequest} = useHttp();
  // const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  // const [userIngredients, setUserIngredients] = useState([]);
  /* const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); */

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientsHandler = useCallback(ingredient => {
    // setIsLoading(true);
    /* dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-ingredients-3c991.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(responseData => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' });
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient }});
    })
    .catch(error => {
      // setError('Something went wrong!');
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    }); */
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://react-hooks-ingredients-3c991.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE');
  }, [sendRequest]);

  const clearError = useCallback(() => {
    // setError(null);
    // setIsLoading(false);
    // dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler} />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError} >{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientsHandler} isLoading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
