import { IQuotesState, IQuote, IQuotesActions, QuotesActions } from '../types';
import Quote from '../components/Quote';

export const updateQuotesLoaded = (loaded: boolean) => {
  return {
    type: QuotesActions.UPDATE_LOADING_QUOTES,
    payload: loaded
  };
};

export const newQuoteIndex = (index: number) => {
  return {
    type: QuotesActions.UPDATE_QUOTE_INDEX,
    payload: index
  };
};

export const updateQuotes = (quotes: [IQuote]) => {
  return {
    type: QuotesActions.GET_ALL_QUOTES,
    payload: quotes
  };
};
