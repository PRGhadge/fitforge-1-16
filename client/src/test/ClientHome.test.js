import renderer from 'react-test-renderer';
import React from 'react';
import ClientHome from 'ClientHome';

it('testing the testing feature', () => {
    const tree = renderer.create(<ClientHome />).toJSON();
    expect(tree).toMatchSnapshot();
});