describe("CREATE TODO",() => {
    it('add 50 todo', () => {
        for(var i = 1 ; i < 51 ; i++){
            cy.seed(i)
        }
        cy.visit("http://localhost:3000/")
    })

    it('add 100 todo', () => {
        for(var i = 1 ; i < 101 ; i++){
            cy.seed(i)
        }
        cy.visit("http://localhost:3000/")
    })

    it.only('add 300 todo', () => {
        for(var i = 1 ; i < 301 ; i++){
            cy.seed(i)
        }
        cy.visit("http://localhost:3000/")
    })

})