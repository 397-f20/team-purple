describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("has an input for the room code", () => {
    cy.visit("/");
    cy.get("input").type("Hello, World"); // Type 'Hello, World' into the 'input'
  });

  it("has a button to create a new poll", () => {
    cy.visit("/");
    cy.contains("New Poll").click();
    cy.get(`input[value="Which movie are we watching?"]`).type("Hello, World");
  });


  // it("takes you to entry screen with forms", () => {
  //   cy.visit("/");
  //   cy.coßßntains("New Poll").click();
  //   cy.get(`input[name='prompt']`).type("Hello, World");
  // });
});
