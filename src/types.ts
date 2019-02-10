export interface IStoreState {
  quotes: IQuotesState;
  user: IUserState;
  userInterface: { loading: boolean };
}

export interface IQuotesState {
  quotesList: [IQuote] | null;
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
  ADD_QUOTE = 'ADD_QUOTE',
  DELETE_QUOTE = 'DELETE_QUOTE',
  UPDATE_QUOTE_INDEX = 'UPDATE_QUOTE_INDEX',
  GET_ALL_QUOTES = 'GET_ALL_QUOTES'
}

export interface IUserState {
  name: string;
}

export interface IUserActions {
  payload: IUserState;
  type: UserActions;
}

export enum UserActions {
  UPDATE_USER = 'UPDATE_USER'
}

export interface IUserInterfaceState {
  loading: boolean;
}

export enum UserInterfaceActionTypes {
  LOADING = 'LOADING',
  LOADED = 'LOADED'
}

export interface IUserInterfaceActions {
  type: UserInterfaceActionTypes;
}
