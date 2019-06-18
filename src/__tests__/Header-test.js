import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount, render } from 'enzyme'

import Header from '../Header/Header'

describe('Header Component', () => {
    it('renders without crashing', () => {
        const wrapper= mount(
            <MemoryRouter>
                <Header to='/' />
            </MemoryRouter>
            )
        expect(wrapper).toMatchSnapshot()
    });
 
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