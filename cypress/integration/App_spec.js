describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Should have an input and submit button on render', () => {
    cy.get('input')
    cy.get(':nth-child(15)')
  })

  it('should display all order card on render', () => {
    cy.get('section')
    cy.get('section > :nth-child(1)')
    cy.get('section > :nth-child(2)')
    cy.get('section > :nth-child(3)')
  })

  it('Should have order cards that contain a name and ingredients', () => {
    cy.get('section')
    cy.get('section > :nth-child(1)')
    cy.get(':nth-child(1) > h3').contains('Pat')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').contains('beans')
  })

  it('should display an error when no ingredients have been selected', () => {
    cy.contains('Nothing selected')
  })

  it('Should alert the user when clicking the submit button with no selected ingredients', () => {
    cy.get('header')
    cy.get('form')
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You need to select at least one ingredient to place an order! ');
    })
  })

  it('Should add ingredients to the order when buttons are clicked', () => {
    cy.get('header')
    cy.get('form')
    cy.get('button').contains('beans').click()
    cy.get('button').contains('hot sauce').click()
    cy.get('button').contains('sour cream').click()

    cy.get('p').contains('beans, hot sauce, sour cream')
  })

  it('Should add a new card on submit', () => {
    cy.get('header')
    cy.get('form')

    cy.get('input').type('Peyton')

    cy.get('button').contains('beans').click()
    cy.get('button').contains('hot sauce').click()
    cy.get('button').contains('sour cream').click()
    cy.get(':nth-child(15)').contains('Submit Order').click()

    cy.get('section').contains('Peyton')
    cy.get('section').contains('beans')
    cy.get('section').contains('sour cream')
    cy.get('section').contains('hot sauce')
  })

})

