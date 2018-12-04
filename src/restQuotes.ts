import { API } from 'aws-amplify';
import { IQuote } from './types';

export const getQuotes = (username: string) => {
  return API.get('quotes', `/quotes/${username}`, {});
};

export const addQuote = (quote: {}, username: string) => {
  const payload = {
    body: {
      ...quote,
      username
    }
  };
  return API.post('quotes', '/quotes', payload);
};

export const deleteQuote = (quote: IQuote, username: string) => {
  const payload = {
    body: {
      ...quote,
      username
    }
  };
  return API.del('quotes', `/quotes/object/${username}/${quote.quoteId}`, {});
};

export const updateQuote = (quote: {}, username: string) => {
  const payload = {
    body: {
      ...quote,
      username
    }
  };
  return API.put('quotes', '/quotes', payload);
};
