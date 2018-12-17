import { IQuotesState, IQuotesActions } from '../types';

const initialState: IQuotesState = {
  quotesList: [{ quoteId: '', quote: '', author: '' }],
  activeQuote: 0
};

const quotesReducer = (
  state: IQuotesState = initialState,
  action: IQuotesActions | any
): IQuotesState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default quotesReducer;
