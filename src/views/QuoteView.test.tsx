import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, ShallowRendererProps } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuoteView, { IState } from './QuoteView';

Enzyme.configure({ adapter: new Adapter() });

describe('Quote View Tests', () => {
  const quotes = [
    {
      quoteId: '1234567',
      quote: 'some quote',
      author: 'brian',
      tags: ['dog', 'cat']
    }
  ];

  const mockGetQuotes = jest.fn();
  const mockDeleteQuote = jest.fn();
  const wrapper = shallow(
    <QuoteView
      quotes={quotes}
      getQuotes={mockGetQuotes}
      deleteQuote={mockDeleteQuote}
    />
  ) as any;

  it('should render a quote view', () => {
    const state = wrapper.state() as IState;
    expect(wrapper.find('div')).not.toBeUndefined();
    expect(state.quoteIndex).toBe(0);
  });
  it('should call the correct method when get new quote is clicked', () => {
    const instance = wrapper.instance();
    instance.getNewQuoteToDisplay = jest.fn();
    instance.forceUpdate();
    wrapper
      .find('Button')
      .at(0)
      .dive('button' as ShallowRendererProps)
      .simulate('click');
    expect(instance.getNewQuoteToDisplay).toBeCalledTimes(1);
  });
});
