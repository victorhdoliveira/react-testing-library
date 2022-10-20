import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('', () => {
  it('Verifica se o card é renderizado com as informações corretas', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/sprite/);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent(/6.0/ && /kg/);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Verifica se há um link de navegação para exibir detalhes do Pokemon ', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
  it('Verifica se a página é redirecionada comrretamente quando clicado em detalhes e se ícone de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const fav = screen.getByRole('checkbox');
    userEvent.click(fav);

    const favStar = screen.getByAltText(/is marked as favorite/);

    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
