import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste do componente PokemonDetails', () => {
  it('Verifica se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const title = screen.getByRole('heading', { level: 2, name: /details/i });
    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    const text = screen.getByText(/This intelligent Pokémon/);

    expect(title).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  it('Verifica se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const title = screen.getByRole('heading', { level: 2, name: /Game Locations of/i });
    const maps = screen.getAllByAltText(/location/);

    expect(title).toBeInTheDocument();
    expect(maps).toHaveLength(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Verifica a label do pokwmon favoritado', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const fav = screen.getByLabelText('Pokémon favoritado?');
    expect(fav).toBeInTheDocument();
  });
});
