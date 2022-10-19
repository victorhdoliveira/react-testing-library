import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste do componente App', () => {
  it('Verifica se o todo da aplicação possui um conjunto fixo de links', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link', { name: /home/i && /about/i && /favorite/i });
    expect(links).toBeDefined();
  });
  it('Verifica se a página é redirecionada para Home ao clicar no seu link', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Verifica se a página é redirecionada para About ao clicar no seu link', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Verifica se a página é redirecionada para Pokémons Favoritados ao clicar no seu link', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Verifica se a página é redirecionada para Pokémons Not Foud ao inserir um endereço errado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/erroerro');
    });

    const notFound = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(notFound).toBeInTheDocument();
  });
});
