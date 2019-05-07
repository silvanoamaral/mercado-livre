import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

import Header from '../Header/Header'

configure({ adapter: new Adapter() })

describe('Header Component', () => {
 
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
        expect(shallow(<Header />).find('form.search__form').exists()).toBe(true)
    })

    it('renders a search input', () => {
        expect(shallow(<Header />).find('#search').length).toEqual(1)
    })
})

describe('Search input', () => {
  
    it('should respond to change event and change the state of the Header Component', () => {     
        const wrapper = shallow(<Header />)
        wrapper.find('#search').simulate('change', {target: {name: 'search', value: 'tenis'}})

        expect(wrapper.state('inputValue')).toEqual('tenis')
    })
})