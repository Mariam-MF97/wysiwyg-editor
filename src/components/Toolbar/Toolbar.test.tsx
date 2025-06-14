import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Toolbar from './Toolbar';

describe('Toolbar basic functionality (no 3rd-party)', () => {
  it('should trigger BOLD onToggle when B button is clicked', () => {
    const mockToggle = jest.fn();
    render(<Toolbar onToggle={mockToggle} />);

    fireEvent.mouseDown(
      screen.getByRole('button', { name: /format text bold/i })
    );
    expect(mockToggle).toHaveBeenCalledWith('BOLD');
  });

  it('should open text color palette and call onToggle when color clicked', () => {
    const mockToggle = jest.fn();
    render(<Toolbar onToggle={mockToggle} />);

    const textColorButton = screen.getByRole('button', { name: /text color/i });
    fireEvent.mouseDown(textColorButton);

    const redColorButton = screen.getByRole('menuitem', {
      name: /set text color to red/i,
    });
    fireEvent.mouseDown(redColorButton);

    expect(mockToggle).toHaveBeenCalledWith('RED');
  });
});
