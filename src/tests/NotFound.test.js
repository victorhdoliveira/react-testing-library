import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('teste do componente App', () => {
  it('Verifica se a página é renderizada com o título correto', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(title).toBeInTheDocument();
  });
  it('Verifica se imagem é renderizada corretamente', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/crying/);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
