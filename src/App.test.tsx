import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders editor components', () => {
  render(<App />);

  // Check for both editor headings
  expect(screen.getByText('Controlled Editor')).toBeInTheDocument();
  expect(screen.getByText('Uncontrolled Editor')).toBeInTheDocument();

  // Check for toolbar presence
  expect(
    screen.getByRole('toolbar', { name: /text formatting toolbar/i })
  ).toBeInTheDocument();
});
