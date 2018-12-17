export interface IStoreState {
  quotes: IQuotesState;
  user: IUserState;
}

export interface IQuotesState {
  quotesList: [IQuote];
  activeQuote: number;
}

export interface IQuote {
  quoteId: string;
  quote: string;
  author: string;
  tags?: string[];
}

export interface IQuotesActions {
  payload: [IQuotesState];
  type: QuotesActions;
}

export enum QuotesActions {
  ADD_QUOTE,
  DELETE_QUOTE,
  UPDATE_QUOTE_INDEX
}

export interface IUserState {
  name: string;
}

export interface IUserActions {
  payload: IUserState;
  type: UserActions;
}

export enum UserActions {
  UPDATE_USER
}
