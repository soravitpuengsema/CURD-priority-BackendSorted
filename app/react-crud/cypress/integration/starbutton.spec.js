describe("TEST STAR BUTTON",() => {
    beforeEach(() => {
        cy.visit("localhost:3000")
    })

    it("STAR VALUE SHOULD BE ZERO",() => {
        cy.get('.star')
          .first()  
          .should('have.id','black') 
        cy.get('.list-group-item')
          .first()  
          .click()    
        cy.get('.col-md-6')    
          .should('contain','Priority: False')
    })

    it("WHEN CLICK STAR BUTTON VALUE SHOULD CHANGE",() => {
        cy.get('.star')
          .first()  
          .click()  
          .should('have.id','gold')
        cy.get('.list-group-item')
          .first()  
          .click()   
        cy.get('.col-md-6')   
          .should('contain','Priority: True')
    })

    it("WHEN CLICK TODOLIST VALUE SHOULD NOT CHANGE",()=>{
        cy.get('.list-group-item')
          .first()
          .click()  
        cy.get('.star') 
          .should('have.id','gold')   
        cy.get('.col-md-6')
          .should('contain','Priority: True')
    })
})