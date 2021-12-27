class HomePage
{

    acctBalance;
    visit()
    {
        return cy.visit("https://www.way2automation.com/angularjs-protractor/banking/#/login");
    }
    
    custLoginBtn()
    {
        return cy.contains("Customer Login");
    }
    
    selectName()
    {
        return cy.get("select");
    }

    loginBtn()
    {
        return cy.contains("Login");
    }

    logoutBtn()
    {
        return cy.get(".btn.logout");
    }

    selectAcctNumber()
    {
        return cy.get("#accountSelect");
    }

    withdrawlTab()
    {
        return cy.contains("Withdrawl");
    }

    enterAmount()
    {
        return cy.get('input[ng-model="amount"]');
    }

    withdrawBtn()
    {
        return cy.get(".btn.btn-default");
    }

    getTransactionFailureMsg()
    {
        return cy.get(".error.ng-binding");
    }

    depositTab()
    {
        return cy.contains("Deposit");
    }

    /*depositAmount()
    {
        //Below wait is a MUST because Deposit text box is taking some time to be loaded     
        cy.wait(2000);
        const depositField = cy.get("input[ng-model='amount']");
        depositField.type("25000");
        cy.log("Account balance before deposit is "+acctBalance);
        cy.log("Amount deposited is "+amtDeposited);
        acctBalance = acctBalance + amtDeposited;
        cy.log("Account balance after deposit is "+acctBalance);
    }*/

    depositBtn()
    {
        return cy.get("button[type='submit']");
    }

    getDepositSuccessMsg()
    {
        return cy.get(".error.ng-binding");
    }

    async getAccountBalance()
    {
      return cy.get(".borderM > :nth-child(3) > :nth-child(2)")
       .then((balance)=>{
       cy.log("Account balance is "+balance.text());
       
       return balance.text();
        })
    }

   /* this.getBalance = function() {
        var storeBalance = readBalance.getText().then(function(balance) {
            return balance;
        });
        return storeBalance;
    }*/

    


    
}

export default HomePage;