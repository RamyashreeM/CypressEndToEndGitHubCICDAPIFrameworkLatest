class CustomerPage
{
    
    
    
    
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

    depositBtn()
    {
        return cy.get("button[type='submit']");
    }

    getDepositSuccessMsg()
    {
        return cy.get(".error.ng-binding");
    }

    getAccountBalance() {
        return new Promise((resolve) => {
            cy.get(".borderM > :nth-child(3) > :nth-child(2)")
            .then(balance => {
                cy.log("Account balance is "+balance.text());
                resolve(balance.text());
                });
        });
    }

    verifyAccountBalance(acctBalance, action, amount)
    {
        cy.log("Inside verifyAccountBalance function acctBalance from web app "+acctBalance);
        cy.log("Inside verifyAccountBalance function amount from JSON "+amount);
        if(action=="deposit")
        {
            expect(acctBalance).to.equal(amount);
        }
        else if(action=="withdraw")
        {
            expect(acctBalance).to.equal(amount);
        }
    }

    transactionsTab()
    {
        return cy.contains("Transactions");
    }

    getAllTableRowsInTransactionTab()
    {
        return cy.get(".table.table-bordered.table-striped").find("tr");
    }

    backBtn()
    {
        return cy.contains("Back");
    }

    getTransactionSuccessfulMsg()
    {
        return cy.get("span[ng-show='message']");
    }
}

export default CustomerPage;