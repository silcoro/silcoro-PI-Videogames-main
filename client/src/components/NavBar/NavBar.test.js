import React from 'react'
import NavBar from './NavBar';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';


describe('components <NavBar/>', ()=>{
    // 
    const component = <Provider store={store}><BrowserRouter><NavBar /></BrowserRouter></Provider>

    it('un link deberia tener el texto Home', ()=>{
        render(component);
        const linkElement = screen.getByText(/Home/i)
        expect(linkElement).toBeInTheDocument()
        // expect('Home').toMatch(/Home/)
    })

    it('un link deberia tener el texto Buscar VideoGames', ()=>{
        render(component);
        const linkElement = screen.getByText(/Buscar VideoGames/i)
        expect(linkElement).toBeInTheDocument()
    })

    it('un link deberia tener el texto Crear VideoGames', ()=>{
        render(component);
        const linkElement = screen.getByText(/Crear VideoGames/i)
        expect(linkElement).toBeInTheDocument()
    })

    
})

