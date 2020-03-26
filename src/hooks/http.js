import { useReducer, useCallback } from 'react';

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
      case 'SEND':
        return { loading: true, error: null };
      case 'RESPONSE':
        return { ...curHttpState, loading: false };
      case 'ERROR':
        return { loading: false, error: action.errorMessage };
      case 'CLEAR':
        return { ...curHttpState, error: null };
      default:
        throw new Error('Should not be reached!');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data: null,
    });

    const sendRequest = useCallback((url, method, body, error) => {
        dispatchHttp({ type: 'SEND' });
        fetch(url, {
          method: method,
          body: body,
          headers: {
              'Content-Type': 'application/json',
          }
        }).then(response => {
        }).catch(error => {
        });
      }, []);
};

export default useHttp;