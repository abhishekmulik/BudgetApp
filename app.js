//Budget Controller
var budgetController=(function(){
    
})();


//UI controller
var UIController=(function(){

})();




//Global App controller
var controller=(function(budgetCtrl,UICtrl){
    
    var ctrlAddItem = function(){
        //1 get field input data 

        //2 add the item to budget to budget controller

        //3. add the item to UI 

        //4. calc the budegt

        //5.display the budget on /ui
        console.log('Works ');
    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){
        if (event.keyCode===13 ||event.which===13){
            ctrlAddItem();
        }
    });

})(budgetController,UIController);

 