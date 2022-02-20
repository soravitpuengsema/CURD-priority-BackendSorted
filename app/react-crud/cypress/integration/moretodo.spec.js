describe("TEST STAR BUTTON",() => {

    it('click 10 star from 50 todo', () => {
        cy.visit("http://localhost:3000/todo")
            for(var j = 1 ; j < 301 ; j++){
                if (j % 2 == 0) {
                    cy.get(".list-group-item")
                    .contains(j)
                    .find(".star")
                    .click()
                }
            }
        cy.visit("http://localhost:3000/todo")
        //Click remove all
        //cy.get(".btn-danger")
        //.click()
    }) 

    it.only('visit todo', () => {
        cy.visit('http://localhost:3000/todo');
    });

    it('click 10 star from 50 todo', () => {
        cy.visit("http://localhost:3000/todo")
            for(var j = 1 ; j < 301 ; j++){
                if (j % 10 == 0) {
                    const num = j
                    cy.get(".list-group-item")
                    .contains(new RegExp(num, "g"))
                    .find(".star")
                    .click()
                }
            }
        cy.visit("http://localhost:3000/todo")
        //Click remove all
        //cy.get(".btn-danger")
        //.click()
    })    
})