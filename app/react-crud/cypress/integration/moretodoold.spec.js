describe("TEST STAR BUTTON",() => {

    it('add todo', () => {
        for(var i = 1 ; i < 101 ; i++){
            cy.seed(i)
        }
        cy.visit("localhost:3000")
    })

    it('click star', () => {
        cy.visit("localhost:3000/todo")
        for(var j = 1 ; j < 101 ; j++){
            cy.get(".star")
              .eq(j-1)
              .click()
        }
        cy.get(".btn-danger")
        .click()
    })
})