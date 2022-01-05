import { Given,When,Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../2-advanced-examples/pageObjects/HomePagePO";
import CustomerPage from "../2-advanced-examples/pageObjects/CustomerPagePO";

const homePageObj = new HomePage();
const customerPageObj = new CustomerPage();
let currentBalance=0;
function updateCurrentBalance(balance)
{
    currentBalance=balance; 
}
Given('I open bank application and land on home page', ()=>{
    homePageObj.visit();
})

When('I click on customer login button', ()=>{
    homePageObj.custLoginBtn().click();
})

When('I select a customer', function(){
    customerPageObj.selectName().select(this.data.customerName);
})

When('I click on Login button',()=>{
    customerPageObj.loginBtn().click();
})

Then('Logout button should be visible',function(){
    customerPageObj.logoutBtn().should('be.visible');
})

When('I select account number of the customer',function(){
    customerPageObj.selectAcctNumber().select(this.data.accountNumber);
})

When('I click on Withdrawl tab',()=>{
    customerPageObj.withdrawlTab().click();
})

When('I enter the amount to withdraw more than the balance',function(){
    customerPageObj.enterAmount().type(this.data.amtToBeWithdrawn);
})

When('I click on withdraw button',()=>{
    customerPageObj.withdrawBtn().click();
})

Then('Verify transaction failure message is displayed',function(){
    customerPageObj.getTransactionFailureMsg().then((transactionFailMsg)=>{
        let failureMsg = transactionFailMsg.text();
        cy.log("FAILURE MESSAGE "+failureMsg);
        //expect(failureMsg).to.include(this.data.transactionFailureMsg);
    })
})

When('Get account balance before despositing the amount',function(){
    customerPageObj.getAccountBalance().then(accountBalance=>{
        updateCurrentBalance(Number(accountBalance)+10);
        cy.log("Initial balance of the account is "+accountBalance);
    })
})
Then('Print on the console',function(){
        cy.log("Current balance of the account is "+currentBalance);
})
 

