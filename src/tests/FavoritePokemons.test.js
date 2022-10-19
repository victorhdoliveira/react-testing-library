import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('teste do componente FavoritePokemons', () => {
  it('Verifica se é exibida a mensagem corretamente, caso não haja Pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  it('Verifica se Pokemons são salvos corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /details/i });
    userEvent.click(moreDetails);

    const fav = screen.getByRole('checkbox');
    userEvent.click(fav);

    act(() => {
      history.push('/favorites');
    });

    const img = screen.getByAltText(/is marked as favorite/);
    expect(img).toBeInTheDocument();
  });
});
