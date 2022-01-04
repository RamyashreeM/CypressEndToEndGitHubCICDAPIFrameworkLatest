beforeEach(()=>{
    //let testData;
    cy.fixture('example').then(function (data) {
        //testData = data;
        this.data=data;
        //return testData;
    })
})