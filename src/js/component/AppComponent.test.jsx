import React from 'react';
import { shallow } from 'enzyme';
import AppComponent from './AppComponent';


describe('AppComponent.jsx', () => {
  let target;
  it('Should render', () => {
    target = shallow(<AppComponent posts={[]} />);
    expect(target).toBeTruthy();
  });
});
