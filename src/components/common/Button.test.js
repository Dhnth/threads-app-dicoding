/* global describe, it, expect, jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  it('should render button text correctly', () => {
    render(<Button>Simpan</Button>);
    expect(screen.getByText('TombolSalah')).toBeInTheDocument();
  });

  it('should handle click event properly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Klik</Button>);
    fireEvent.click(screen.getByText('Klik'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled props is true', () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render loading text when loading props is true', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});