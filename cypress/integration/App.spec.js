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
  });
});
