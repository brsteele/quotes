import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, ShallowRendererProps } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderView from './HeaderView';

Enzyme.configure({ adapter: new Adapter() });

it('renders a header', () => {
  const header = document.createElement('div');
  const mockFn = jest.fn();
  ReactDOM.render(<HeaderView name="Brian" logoutClicked={mockFn} />, header);
  ReactDOM.unmountComponentAtNode(header);
});

describe('should render a logout button', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<HeaderView name="Brian" logoutClicked={mockFn} />);
  wrapper
    .find('Button')
    .dive('button' as ShallowRendererProps)
    .simulate('click');
  expect(wrapper.find('Button')).toHaveLength(1);
  expect(mockFn).toBeCalledTimes(1);
});
