//Budget Controller
var budgetController=(function(){
        
})();

//UI controller
var UIController=(function(){
   
    var DOMstrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputBtn:'.add__btn'
    };

    return {
      getinput:function(){
          return {
            type: document.querySelector(DOMstrings.inputType).value,//inc or exp 
          description : document.querySelector(DOMstrings.inputDescription).value,
          value : document.querySelector(DOMstrings.inputValue).value,
          };
      }, 
      getDomstrings: function(){
          return DOMstrings;
      }
    };
})();

//Global App controller
var controller=(function(budgetCtrl,UICtrl){
    
    var setupEventListeners=function() {
        var DOM=UICtrl.getDomstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function (event){
        if (event.keyCode===13 ||event.which===13){
            ctrlAddItem();
        }
        });
    };

    var ctrlAddItem = function(){
        //1 get field input data 
        var input=UICtrl.getinput();
    
        //2 add the item to budget to budget controller

        //3. add the item to UI 

        //4. calc the budegt

        //5.display the budget on /ui
        
    };

    return{
        init: function(){
            console.log('appli has started');
            setupEventListeners();
        }
    }

})(budgetController,UIController);
controller.init();
