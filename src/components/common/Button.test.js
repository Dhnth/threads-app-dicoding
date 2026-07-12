import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render button with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('btn-primary');
  });

  it('should render button with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-secondary');

    rerender(<Button variant="outline">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-outline');

    rerender(<Button variant="danger">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-danger');
  });

  it('should render button with different sizes', () => {
    const { rerender } = render(<Button size="sm">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-sm');

    rerender(<Button size="lg">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-lg');
  });

  it('should render full width button', () => {
    render(<Button fullWidth>Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-full');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('should show loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Click me').closest('button')).toBeDisabled();
  });
});