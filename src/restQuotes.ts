import { API } from 'aws-amplify';

export const getQuotes = (username: string) => {
  return API.get('quotes', `/quotes/${username}`, {});
};

export const addQuote = (quote: {}, username: string) => {
  const payload = {
    body: {
      ...quote,
      userId: username
    }
  };
  return API.post('quotes', '/quotes', payload);
};
