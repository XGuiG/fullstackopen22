describe("Blog-list app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "secret",
    };

    const user2 = {
      name: "big jun",
      username: "small gui",
      password: "1234",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user1);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
    // cy.contains('Copyright (c) 2023 XGuiG All Rights Reserved')
  });
  it("login form is shown", function () {
    cy.contains("Login to applicaiton");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();

      cy.get(".message").contains("Matti Luukkainen logged in successfully");
      cy.contains("Matti Luukkainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login");
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "'Matti Luukkainen' logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "secret" });
    });

    it("blog form is shown", function () {
      cy.contains("blogs");
      cy.contains("user 'Matti Luukkainen' logged in");
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();

      cy.get("#newTitle").type("a blog created by cypress");
      cy.get("#newAuthor").type("cypress");
      cy.get("#newUrl").type("http://localhost:3003");
      cy.get("#create-button").click();

      cy.get(".message").contains(
        `a new blog 'a blog created by cypress' by 'cypress' added`
      );
      cy.contains("a blog created by cypress: cypress");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
        });
        cy.createBlog({
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 1,
        });
        cy.createBlog({
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 8,
        });
      });

      it("likes can be added", function () {
        cy.contains("Type wars").contains("view").click();
        cy.contains("like").click();

        cy.contains("Likes: 2");
      });

      it("the user who created the blog can delete it", function () {
        cy.contains("Type wars").contains("view").click();
        cy.contains("remove").click();

        cy.get(".message").contains(
          `Removed blog 'Type wars' by 'Robert C. Martin'`
        );
        cy.wait(5000);
        cy.get("html").should("not.contain", "Type wars");
      });

      it("other users can not see the remove button", function () {
        cy.contains("logout").click();
        cy.login({ username: "small gui", password: "1234" });

        cy.contains("Type wars")
          .contains("view")
          .click()
          .should("not.contain", "remove");
      });

      it("the blogs are ordered according to likes", function () {
        cy.get(".BlogDefault").eq(0).should("contain", "TDD harms architecture");
        cy.get(".BlogDefault")
          .eq(1)
          .should("contain", "Go To Statement Considered Harmful");
        cy.get(".BlogDefault").eq(2).should("contain", "Type wars");
      });
    });
  });
});
