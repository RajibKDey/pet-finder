import React from 'react';
import { shallow } from 'enzyme';

import Homepage from './Homepage';

describe('Testing the Homepage Component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<Homepage />);
    })

    afterEach(() => jest.clearAllMocks());

    it('should render the component without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should allow limit change', () => {
        wrapper.find('.limit').hostNodes().simulate('change', { target: { value: 20 } });
        expect(wrapper.state('limit')).toEqual(20);
    });

    it('should allow search', () => {
        wrapper.find('.search').hostNodes().simulate('change', {target: { value: 'search'}});
        expect(wrapper.state('name')).toEqual('search');
    });

    it('should allow sort change', () => {
        wrapper.find('.sort').hostNodes().simulate('change', {target: { value: 'name'}});
        expect(wrapper.state('sortBy')).toEqual('name');
    });

    it('should allow result in descending order', () => {
        wrapper.find('.order').hostNodes().simulate('click');
        expect(wrapper.state('order')).toEqual('desc');
    });

    it('should allow result in ascending order', () => {
        wrapper.setState({order: 'desc'});
        wrapper.find('.order').hostNodes().simulate('click');
        expect(wrapper.state('order')).toEqual('asc');
    });

    it('should allow next page', () => {
        wrapper.setState({petList: [{}]})
        wrapper.find('.right').hostNodes().simulate('click');
        expect(wrapper.state('page')).toEqual(2);
    });

    it('should allow previous page', () => {
        wrapper.setState({page: 2})
        wrapper.find('.left').hostNodes().simulate('click');
        expect(wrapper.state('page')).toEqual(1);
    });
});