import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ThreadCard from './ThreadCard';

const mockStore = configureMockStore();

describe('ThreadCard Component', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: 'This is a test thread body content that should be displayed in the card.',
    category: 'General',
    createdAt: '2024-01-01T00:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
    upVotesBy: ['user-1'],
    downVotesBy: [],
    totalComments: 5,
  };

  const renderWithProviders = (thread, authUser = null) => {
    const store = mockStore({
      auth: { user: authUser },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadCard thread={thread} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render thread title', () => {
    renderWithProviders(mockThread);
    expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
  });

  it('should render thread owner name', () => {
    renderWithProviders(mockThread);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render thread category', () => {
    renderWithProviders(mockThread);
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should render vote count', () => {
    renderWithProviders(mockThread);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should render comments count', () => {
    renderWithProviders(mockThread);
    expect(screen.getByText('💬 5 comments')).toBeInTheDocument();
  });

  it('should render thread body preview', () => {
    renderWithProviders(mockThread);
    expect(
      screen.getByText('This is a test thread body content that should be displayed in the card.')
    ).toBeInTheDocument();
  });

  it('should have link to thread detail', () => {
    renderWithProviders(mockThread);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/thread/thread-1');
  });
});