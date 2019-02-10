import React, { FunctionComponent } from 'react';
import styles from '../styles/Quote.module.css';
import { IQuote } from '../types';
import Tags from './Tags';
import { checkPropTypes } from 'prop-types';
import { PresignedPost } from 'aws-sdk/clients/s3';

interface IProps {
  quote: IQuote;
  handleDelete: (quote: IQuote) => void;
}

interface IState {
  flipped: boolean | null;
}

class Quote extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      flipped: null
    };
    this.flip = this.flip.bind(this);
  }
  public render() {
    const { quote, handleDelete } = this.props;
    const { flipped } = this.state;
    let flippingClass = '';
    if (flipped !== null) {
      flippingClass = flipped ? styles.flipped : styles.unflipped;
    }
    return (
      <div className={`${styles.cardContainer} ${flippingClass}`}>
        <CardFront
          quote={quote}
          flipFn={this.flip}
          handleDelete={handleDelete}
        />
        <CardBack tags={quote.tags} flipFn={this.flip} />
      </div>
    );
  }

  private flip() {
    const flipped = this.state.flipped === null ? true : !this.state.flipped;
    this.setState({ flipped });
  }
}

interface ICardFrontProps {
  quote: IQuote;
  flipFn: () => void;
  handleDelete: (quote: IQuote) => void;
}

interface ICardBackProps {
  tags?: string[];
  flipFn: () => void;
}

const CardFront: FunctionComponent<ICardFrontProps> = ({
  quote,
  flipFn,
  handleDelete
}) => {
  return (
    <div className={styles.quote + ' ' + styles.cardFront} onClick={flipFn}>
      <div className={styles.delete}>
        <span
          onClick={evt => {
            handleDelete(quote);
            evt.stopPropagation();
          }}
        >
          Delete
        </span>
      </div>
      <p>{quote.quote}</p>
      <p className={styles.author}>-{quote.author}</p>
    </div>
  );
};
const CardBack: FunctionComponent<ICardBackProps> = ({ tags, flipFn }) => {
  return (
    <div
      className={styles.tagContainer + ' ' + styles.cardBack}
      onClick={flipFn}
    >
      {tags ? <Tags tags={tags} className={styles.tags} /> : 'No Tags'}
    </div>
  );
};

export default Quote;
