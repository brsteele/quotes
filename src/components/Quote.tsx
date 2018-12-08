import React, { FunctionComponent } from 'react';
import styles from '../styles/Quote.module.css';
import { IQuote } from '../types';
import Tags from './Tags';
import Button from './Button';

interface IProps {
  quote: IQuote;
}

const Quote: FunctionComponent<IProps> = ({ quote }) => {
  return (
    <>
      <div className={styles.quote}>
        <p>{quote.quote}</p>
        <p className={styles.author}>-{quote.author}</p>
      </div>
      <div className={styles.tagContainer}>
        {quote.tags ? <Tags tags={quote.tags} className={styles.tags} /> : null}
      </div>
    </>
  );
};

export default Quote;
