export interface IUser {
  name: string;
}

export interface IQuote {
  quoteId: string;
  quote: string;
  author: string;
  tags?: string[];
}
