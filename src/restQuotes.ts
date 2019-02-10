import { API, Auth } from 'aws-amplify';
import { IQuote } from './types';

export const promiseToGetQuotes = (username: string) => {
  return API.get('quotes', `/quotes/${username}`, {});
};

export const promiseToAddQuote = (quote: {}, username: string) => {
  const payload = {
    body: {
      ...quote,
      username
    }
  };
  return API.post('quotes', '/quotes', payload);
};

export const promiseToDeleteQuote = (quote: IQuote, username: string) => {
  return API.del('quotes', `/quotes/object/${username}/${quote.quoteId}`, {});
};

export const promiseToUpdateQuote = (quote: {}, username: string) => {
  const payload = {
    body: {
      ...quote,
      username
    }
  };
  return API.put('quotes', '/quotes', payload);
};

export const promiseToLogOut = () => {
  return Auth.signOut();
};
