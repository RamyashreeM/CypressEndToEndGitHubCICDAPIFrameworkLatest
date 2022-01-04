Feature: This feature talks about all customer related actions like deposit, transaction view, withdraw, checking account balance 

 @customerActions
  Scenario: Perform deposit, withdraw, check previous transactions and check account balance for customer
    Given I open bank application and land on home page
    When I click on customer login button
    And I select a customer
    And I click on Login button
    Then Logout button should be visible 
    When I select account number of the customer
    And I click on Withdrawl tab
    And I enter the amount to withdraw more than the balance
    And I click on withdraw button
    Then Verify transaction failure message is displayed
    When Get account balance before despositing the amount


