import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, ShallowRendererProps } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewQuoteView, { INewQuote } from './NewQuoteView';

Enzyme.configure({ adapter: new Adapter() });
const firstQuote = false;
const mockFn = jest.fn();

describe('New Quote View Tests', () => {
  const wrapper = shallow(
    <NewQuoteView firstQuote={firstQuote} addQuote={mockFn} />
  );
  it('should create a new quote view', () => {
    expect(wrapper.find('div')).not.toBeUndefined();
  });

  it('should update the quote state when text is entered', () => {
    const event = { target: { name: 'text', value: 'updated' } };
    wrapper.find('textarea[name="text"]').simulate('change', event);
    const stateObj = wrapper.state('quote') as {
      author: string;
      quote: string;
      tags: string;
    };
    expect(stateObj.quote).toBe('updated');
  });

  it('should update the author state when text is entered', () => {
    const event = { target: { name: 'author', value: 'brian' } };
    wrapper.find('input[name="author"]').simulate('change', event);
    const stateObj = wrapper.state('quote') as {
      author: string;
      quote: string;
      tags: string;
    };
    expect(stateObj.author).toBe('brian');
  });

  it('should correctly parse tags with commas and update the state accordingly', () => {
    const event = { target: { name: 'tags', value: 'dog, cat, bird' } };
    wrapper.find('input[name="tags"]').simulate('change', event);
    const stateObj = wrapper.state('quote') as {
      author: string;
      quote: string;
      tags: string;
    };
    expect(stateObj.tags).toBe('dog, cat, bird');
  });

  it('should call the correct method when the add quote button is clicked', () => {
    wrapper
      .find('Button')
      .dive('button' as ShallowRendererProps)
      .simulate('click');
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should pass the state to the handleAddQuoteClicked method when add quote is clicked', () => {
    expect(mockFn).toBeCalledWith({
      author: 'brian',
      quote: 'updated',
      tags: expect.any(Array),
      quoteId: expect.any(String)
    });
  });
});
