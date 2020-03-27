import { useReducer, useCallback } from 'react';

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
      case 'SEND':
        return { loading: true, error: null, data: null, extra: null };
      case 'RESPONSE':
        return { ...curHttpState, loading: false, data: action.responseData, extra: action.extra };
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
        extra: null,
    });

    const sendRequest = useCallback((url, method, body, reqExtra) => {
        dispatchHttp({ type: 'SEND' });
        fetch(url, {
          method: method,
          body: body,
          headers: {
              'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(responseData => {
            dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra });
        }).catch(error => {
            dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
        });
      }, []);

      return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
      };
};

export default useHttp;