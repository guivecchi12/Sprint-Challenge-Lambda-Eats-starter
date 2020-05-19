describe("Name test", function(){
    it('get name and type into it', function(){
        cy.visit("index.html");

        cy.get('#name').type("Coder").should("have.value", "Coder");
        cy.get('#size').select('medium').should("have.value", "medium");
        cy.get('#sauce').select('red').should("have.value", "red");
        cy.get(".submit").click();

        cy.get('#name').clear();
        cy.get('[for="name"] > div > .error').should("be.visible");
    })
})