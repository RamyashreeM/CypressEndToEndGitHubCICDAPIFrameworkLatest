class HomePage
{
    visit()
    {
        return cy.visit("https://www.way2automation.com/angularjs-protractor/banking/#/login");
    }

    custLoginBtn()
    {
        return cy.contains("Customer Login");
    }

}

export default HomePage;