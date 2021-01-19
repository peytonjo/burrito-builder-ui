describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should have a title on render', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('Should have an input and submit button on render', () => {
    cy.get('input')
    cy.get(':nth-child(15)')
  })

  it('Should take a name into the input field', () => {
    cy.get('input').type('Peyton')
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
    cy.get('button').contains('Submit Order').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You are missing an ingredient or name for the order :)');
    })
  })

  it('Should alert the user if no name is entered', () => {
    cy.get('header')
    cy.get('form')
    cy.get('button').contains('Submit Order').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You are missing an ingredient or name for the order :)');
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
    cy.get('button').contains('Submit Order').click()

    cy.get('section').contains('Peyton')
    cy.get('section').contains('beans')
    cy.get('section').contains('sour cream')
    cy.get('section').contains('hot sauce')
  })

})

