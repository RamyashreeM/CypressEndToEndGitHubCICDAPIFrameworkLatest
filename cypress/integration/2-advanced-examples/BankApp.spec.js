///<reference types="Cypress" />
import HomePage from "./pageObjects/HomePagePO";
import CustomerPage from "./pageObjects/CustomerPagePO";

describe("Automation mastery of way2Automation.com", async ()=>{
    
   let testData;
        before(function () {
            cy.fixture('example').then(function (data) {
                testData = data;
                return testData;
            })
          })
    
    
    it("Navigate to the web app", async ()=>{

        const homePageObj = new HomePage();
        const customerPageObj = new CustomerPage();

        homePageObj.visit();
        
        //Click on Customer Login Button
        homePageObj.custLoginBtn().click();

        //Select "Harry Potter" from drop down
        customerPageObj.selectName().select(testData.customerName);
        
        //Click on Login button
        customerPageObj.loginBtn().click();

        //Verify that Logout button is visible
        customerPageObj.logoutBtn().should('be.visible');
        
        //==========
        //Select account number from the drop down
        customerPageObj.selectAcctNumber().select(testData.accountNumber);
        
        //Click on "Withdrawl" tab
        customerPageObj.withdrawlTab().click();
        
        //Enter the amount to be withdrawn
        customerPageObj.enterAmount().type(testData.amtToBeWithdrawn);

        //Click on "Withdraw" button
        customerPageObj.withdrawBtn().click();

        //Verify transaction failure message because withdraw action was done 
        //but there was insufficient balance in the account.
        customerPageObj.getTransactionFailureMsg().then((transactionFailMsg)=>{
            let failureMsg = transactionFailMsg.text();
            cy.log("FAILURE MESSAGE "+failureMsg);
            expect(failureMsg).to.include(testData.transactionFailureMsg);
        })

        //Get account balance before despositing the amount
        var accountBalance =  await customerPageObj.getAccountBalance();
        cy.log("Initial balance of the account is "+accountBalance);

        //Click on deposit button (TAB) and enter the amount to be deposited
        customerPageObj.depositTab().click();

        //Enter the amount to be deposited
        cy.wait(2000);
        customerPageObj.enterAmount().type(testData.amtToBeDeposited);

        //Click on Deposit button
        customerPageObj.depositBtn().click();

        //Verify deposit successful message
        customerPageObj.getDepositSuccessMsg().then((depositSuccessMsg)=>{
            let depositMessage = depositSuccessMsg.text();
            expect(depositMessage).to.include(testData.depositSuccessfulMsg);
        })

        //Get account balance after deposit
        accountBalance =  await customerPageObj.getAccountBalance();
        cy.log("Account Balance After Deposit Is "+accountBalance);

        //Verify balance after deposit
        customerPageObj.verifyAccountBalance(accountBalance,"deposit", testData.amtToBeDeposited);
        
        
        //Click on Transactions tab and check whether the above deposited amount 
        //is reflected in transactions and also verify that the transaction type is Credit
        cy.wait(2000);
        customerPageObj.transactionsTab().click();

        //Last transaction is always the last row. 
        //Hence, fetch the last row
        cy.wait(2000);
        customerPageObj.getAllTableRowsInTransactionTab()
        .then((rowCount)=>{
            cy.log("Total number of rows in the table are "+(rowCount.length)-1);
            cy.log("Last row is "+rowCount.last().text());
            expect(rowCount.last().text()).to.include(testData.amtToBeDeposited);
            expect(rowCount.last().text()).to.include(testData.creditTransactionType);
        })

        //Click on Back button 
        customerPageObj.backBtn().click();

        //Click on "Withdrawl" tab
        customerPageObj.withdrawlTab().click();

        //Get account balance
        var accountBalanceBeforeWithdraw = await customerPageObj.getAccountBalance();
        cy.log("Account balance before withdrawing is "+accountBalanceBeforeWithdraw);

        if(accountBalanceBeforeWithdraw>testData.amtToBeWithdrawn)
        {
            customerPageObj.enterAmount().type(testData.amtToBeWithdrawn);
        }
        
        //Click on "Withdraw" button
        customerPageObj.withdrawBtn().click();

        //Read the transaction successful message
        customerPageObj.getTransactionSuccessfulMsg().then((msg)=>{
            expect(msg.text()).to.equal(testData.transactionSuccessfulMsg);
        })


        //Click on Transactions tab and check whether the above withdrawn amount 
        //is reflected in transactions and also verify that the transaction type is Debit
        cy.wait(2000);
        customerPageObj.transactionsTab().click();

        //Last transaction is always the last row. 
        //Hence, fetch the last row
        cy.wait(2000);
        customerPageObj.getAllTableRowsInTransactionTab()
        .then((rowCount)=>{
            cy.log("Total number of rows in the table are "+(rowCount.length)-1);
            cy.log("Last row is "+rowCount.last().text());
            expect(rowCount.last().text()).to.include(testData.amtToBeWithdrawn);
            expect(rowCount.last().text()).to.include(testData.debitTransactionType);
        })

        //Click on Back button 
        customerPageObj.backBtn().click();

        //Get account balance after withdraw
        var accountBalanceAfterWithdraw =  await customerPageObj.getAccountBalance();
        cy.log("Account Balance After Withdrawing Is "+accountBalanceAfterWithdraw);

        var currentBalance = accountBalanceBeforeWithdraw - testData.amtToBeWithdrawn;
        
        //Account balance that is read from web app is string.
        //Hence, even "currentBalance" should be of string type to pass the assertion.
        currentBalance = currentBalance.toString();
        //Verify balance after withdraw
        customerPageObj.verifyAccountBalance(accountBalanceAfterWithdraw,"withdraw", currentBalance);

        
    })
})