import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste do componente Pokedex', () => {
  it('Verifica se é renderizado o título correto', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });
  it('Verifica se quando clicado no botão, o próximo pokemon é renderizado', () => {
    const pokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    renderWithRouter(<App />);

    const btn = screen.getByRole('button', { name: /próximo/i });

    pokemons.forEach((poke) => {
      const pokemonName = screen.getByText(poke);
      userEvent.click(btn);
      expect(pokemonName).toBeInTheDocument();
    });
  });
  it('Verifica se é renderizado um Pokemon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });
  it('Verifica se os botões de filtro estão corretos', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');

    buttons.forEach((btn, index) => {
      expect(btn).toHaveTextContent(types[index]);
    });

    userEvent.click(buttons[1]);
    const pokemonFire = screen.getByText('Charmander');
    expect(pokemonFire).toBeInTheDocument();
  });
  it('Verifica se há o botão All', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
  });
});
