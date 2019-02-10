import { IQuotesState, IQuotesActions, QuotesActions } from '../types';

const initialState: IQuotesState = {
  quotesList: null,
  activeQuote: 0
};

const quotesReducer = (
  state: IQuotesState = initialState,
  action: IQuotesActions | any
): IQuotesState => {
  switch (action.type) {
    case QuotesActions.GET_ALL_QUOTES:
      if (action.payload.length) {
        return { ...state, quotesList: action.payload };
      } else {
        return state;
      }
    case QuotesActions.UPDATE_QUOTE_INDEX:
      return { ...state, activeQuote: action.payload };
    default:
      return state;
  }
};

export default quotesReducer;
