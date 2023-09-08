// describe('template spec', function() {
//   it('passes', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains('Blogs')
//   })

//   it('not passes when the wrong component is selected', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains('okok')
//   })
// })

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "root",
      username: "root",
      password: "sekret",
    };

    const secondUser = {
      name: "hehe",
      username: "hehe",
      password: "haha",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", secondUser);
    cy.visit("http://localhost:3000");
  });

  it("Basic components of the log in page", function () {
    cy.contains("Blogs");
  });

  it.skip("failed login if wrong credentials entered", function () {
    // cy.contains('Log in').click()
    cy.get("#username").type("root");
    cy.get("#password").type("sads");
    cy.get("#login-button").click();
    cy.contains("Wrong credentials");
  });

  it("User can log in", function () {
    // cy.contains('Log in').click()
    cy.get("#username").type("root");
    cy.get("#password").type("sekret");
    cy.get("#login-button").click();
    cy.contains("Logged in as root");
  });

  describe("When logged in", function () {
    describe("A blog exists", function () {
      beforeEach(function () {
        // cy.contains('Log in').click()
        // cy.get('#username').type('root')
        // cy.get('#password').type('sekret')
        // cy.get('#login-button').click()
        // cy.request('POST', 'http://localhost:3003/api/login', {
        //   username: 'root', password: 'sekret'
        // }).then(response => {
        //   localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        // })
        cy.login({ username: "root", password: "sekret" });
        cy.contains("Create").click();
        cy.get(".title").type("dasads");
        cy.get(".author").type("cassa");
        cy.get(".url").type("dasadasdass");
        cy.get(".create").click();
      });

      it("The blog is saved", function () {
        cy.contains("dasads");
        cy.get("#view").click();
        cy.contains("cassa");
        cy.contains("dasadasdass");
      });

      it("User can like the blog", function () {
        cy.get("#view").click();
        cy.get("#like-button").click();
        cy.contains(String(1));
      });

      it("User can delete a blog", function () {
        cy.get("#view").click();
        cy.get("#delete-button").click();
        cy.get("html").should("not.contain", "dasadasdass");
        cy.contains("dasadasdass").should("not.exist");
      });

      describe("Only creator can see Delete button", function () {
        beforeEach(function () {
          cy.get("#logout-button").click();
          cy.login({ username: "hehe", password: "haha" });
          cy.get("#view").click();
          cy.contains("Create").click();
          cy.get(".title").type("deded");
          cy.get(".author").type("weqe");
          cy.get(".url").type("rwqewqweq");
          cy.get(".create").click();
          cy.wait(5000);
          cy.get(".blog:last").find("button:first").click({ multiple: true });
        });

        it("Only creator can see delete button", function () {
          cy.contains("dasads")
            .parent()
            .find("#delete-button")
            .should("not.exist");
          cy.contains("deded").parent().find("#delete-button");
        });

        it.only("Blogs are ordered by the number of likes", function () {
          cy.contains("deded").parent().find("#like-button").click();
          cy.wait(1000);
          cy.contains("deded").parent().find("#like-button").click();
          cy.wait(1000);
          cy.contains("deded").parent().find("#like-button").click();
          cy.wait(1000);
          cy.contains("dasads").parent().find("#like-button").click();
          cy.wait(1000);
          cy.contains("dasads").parent().find("#like-button").click();
          cy.wait(1000);
          cy.get(".blog").eq(0).should("contain", "dasads");
          cy.get(".blog").eq(1).should("contain", "deded");
        });
      });
    });
  });
});
