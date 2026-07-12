describe('Login Flow E2E', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form fields correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation error when inputs are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.form-error').should('be.visible');
  });
});