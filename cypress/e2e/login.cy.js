/// <reference types="cypress" />

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('h2').should('contain', 'Welcome Back');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.form-error').should('contain', 'Email is required');
    cy.get('.form-error').should('contain', 'Password is required');
  });

  it('should show validation error for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.form-error').should('contain', 'Please enter a valid email address');
  });

  it('should show error for invalid credentials', () => {
    // Intercept API request
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Invalid credentials',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wrong@test.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.get('.auth-error').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    // Intercept API request
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'fake-token-123',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@test.com',
            avatar: 'https://example.com/avatar.jpg',
          },
        },
      },
    }).as('profileRequest');

    cy.get('input[name="email"]').type('john@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');

    // Should redirect to home page
    cy.url().should('include', '/');
    cy.get('.nav-user-name').should('contain', 'John Doe');
  });

  it('should have link to register page', () => {
    cy.get('a[href="/register"]').should('exist');
  });
});