describe("Test Creating a New Poll", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("can click the movie bundle to replace criteria values", () => {
    cy.visit("/");
    cy.contains("New Poll").click(); //Navigate to new poll screen
    cy.contains("Movie").click();
    cy.get(`input[value="Soundtrack"]`);
  });

  it("can create a new poll", () => {
    cy.visit("/");
    cy.contains("New Poll").click();
    cy.contains("Tech Stack").click();
    cy.get(`input[placeholder="option #1"]`).type("React js");
    cy.get(`input[placeholder="option #2"]`).type("Vue js");
    //cy.scrollTo(0, 1000);
    cy.contains("Create").click({ force: true });
  });
});
