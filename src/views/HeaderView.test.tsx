import React from 'react';
import ReactDOM from 'react-dom';
import HeaderView from './HeaderView';

it('renders a header', () => {
  const header = document.createElement('div');
  ReactDOM.render(<HeaderView name="Brian" />, header);
  ReactDOM.unmountComponentAtNode(header);
});
