function getAccountBalance() 
{
  cy.get(".borderM > :nth-child(3) > :nth-child(2)")
    .then((balance) => 
    {
    cy.log("Account balance is" + balance.text());
    });
}

getAccountBalance();
