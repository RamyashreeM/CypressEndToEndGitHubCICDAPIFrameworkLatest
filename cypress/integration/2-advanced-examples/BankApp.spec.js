///<reference types="Cypress" />
import HomePage from "../2-advanced-examples/pageObjects/HomePagePO";

describe("Automation mastery of way2Automation.com", async ()=>{
    it("Navigate to the web app",   async ()=>{

        const homePageObj = new HomePage();

        homePageObj.visit();
        //To click on a button
        //cy.contains("Customer Login").click();
        homePageObj.custLoginBtn().click();

        //drop down
       // cy.get("#userSelect").select('Harry Potter');
        //cy.get("select").select('Harry Potter');
        homePageObj.selectName().select('Harry Potter');
        
        //Click on Login button
        //cy.contains("Login").click();
        homePageObj.loginBtn().click();

        //Verify that Logout button is visible
        //cy.get(".btn.logout").should('be.visible');
        homePageObj.logoutBtn().should('be.visible');
        
        
        //Select account number from the drop down
        //cy.get("#accountSelect").select('1005');
        homePageObj.selectAcctNumber().select('1005');

        //Click on "Withdrawl" button
        //cy.contains("Withdrawl").click();
        homePageObj.withdrawlTab().click();
        
        //Enter the amount to be withdrawn
        //cy.get('input[ng-model="amount"]').type("100");
        homePageObj.enterAmount().type('100');

        //Click on "Withdraw" button
        //cy.get(".btn.btn-default").click();
        homePageObj.withdrawBtn().click();

        //Verify transaction failed message
        /*cy.get(".error.ng-binding").then((transactionFailMsg)=>{
            let failureMsg = transactionFailMsg.text();
            cy.log("FAILURE MESSAGE "+failureMsg);
            expect(failureMsg).to.include("Transaction Failed");
        })*/

        homePageObj.getTransactionFailureMsg().then((transactionFailMsg)=>{
            let failureMsg = transactionFailMsg.text();
            cy.log("FAILURE MESSAGE "+failureMsg);
            expect(failureMsg).to.include("Transaction Failed");
        })

        //Click on deposit button (TAB) and enter the amount to be deposited
        //cy.contains("Deposit").click();
        homePageObj.depositTab().click();
        
        /*function depositAmount()
        {
            //Below wait is a MUST because Deposit text box is taking some time to be loaded     
            cy.wait(2000);
            cy.get("input[ng-model='amount']").type(amtDeposited);
            cy.log("Account balance before deposit is "+acctBalance);
            cy.log("Amount deposited is "+amtDeposited);
            acctBalance = acctBalance + amtDeposited;
            cy.log("Account balance after deposit is "+acctBalance);
        }*/

        //Enter the amount to be deposited
        cy.wait(2000);
        homePageObj.enterAmount().type("25000");

        


        
        //Click on Deposit button
        //cy.get("button[type='submit']").click();
        homePageObj.depositBtn().click();

        //Verify deposit successful message
        homePageObj.getDepositSuccessMsg().then((depositSuccessMsg)=>{
            let depositMessage = depositSuccessMsg.text();
            expect(depositMessage).to.include("Deposit Successful");
        })

        

        //Verify balance 
       // async function getAccountBalance()
      //  {
           /*cy.get(".borderM > :nth-child(3) > :nth-child(2)")
           .then((balance)=>{
           cy.log("Account balance read from web app is "+parseInt(balance.text()));
        })*/

      /*  const storeBalance= await cy.get(".borderM > :nth-child(3) > :nth-child(2)");
        cy.log("Store balance is "+storeBalance);
        return storeBalance;
        }*/

        //getAccountBalance();
        
        //Get the balance 
        var finalBalance = await homePageObj.getAccountBalance();
        cy.log("Final balance is "+finalBalance);

        //============================================
        //Click on Transactions tab and check whether the above deposited amount is reflected in transactions
        //and also verify that the transaction type is Credit
       /* cy.wait(2000);
        cy.contains("Transactions").click();

        //Last transaction is always the last row. Hence, fetch the last row
        cy.wait(2000);
        cy.get(".table.table-bordered.table-striped").find("tr")
        .then((rowCount)=>{
            cy.log("Total number of rows in the table are "+(rowCount.length)-1);
            cy.log("Last row is "+rowCount.last().text());
            expect(rowCount.last().text()).to.include(amtDeposited);
        })

        //Click on Back button 
        cy.contains("Back").click();

        //Click on "Withdrawl" button
        cy.contains("Withdrawl").click();

        //Enter the amount to be withdrawn
        
        let actBal =    getAccountBalance();
        
        cy.log("First check that account balance is greater than 100 too withdrar 100 and account balance is "+actBal);
        //This has to be uncommented Ramya whole IF condition if(actBal>100)
       // {
            cy.get('input[ng-model="amount"]').type("100");
       // }
        
    
        //Click on "Withdraw" button
        cy.get(".btn.btn-default").click();

        //Read the transaction successful message
        cy.get("span[ng-show='message']").then((msg)=>{
            expect(msg.text()).to.equal("Transaction successful");
        })*/

        
    })
})