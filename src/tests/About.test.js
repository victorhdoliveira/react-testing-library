import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('teste do componente About', () => {
  it('Verifica se há o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/ });
    expect(title).toBeInTheDocument();
  });
  it('Verifica se há dois parágrafos renderizados', () => {
    renderWithRouter(<About />);

    const firstP = screen.getByText(/This application simulates a Pokédex/);
    const secondP = screen.getByText(/One can filter Pokémons by type/);

    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });
  it('Verifica se a imagem é renderizada corretamente', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
