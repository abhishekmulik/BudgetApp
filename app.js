//Budget Controller
var budgetController=(function(){
        var Expense=function(id,description,value){
            this.id=id;
            this.description=description;
            this.value=value;
        };

        var Income=function(id,description,value){
            this.id=id;
            this.description=description;
            this.value=value;
        };
        
        var claculateTotal=function(type){
            var sum=0;
            data.allItems[type].forEach(function(cur){
                sum+=cur.value; 
            });
            data.totals[type]=sum;
        };

        var data={
            allItems :{
                exp: [],
                inc: []
            },
            totals:{
                exp:0,
                inc:0
            },
            budget:0,
            percentage: -1
        };

        return {
            addItem : function(type,des,val){
                var newItem;
                //id=last id+1
                
                //create new id
                if (data.allItems[type].length>0){
                    ID=data.allItems[type][data.allItems[type].length-1].id+1;
                }else{
                    ID=0;
                }
                

                //recreate new item based on inc or exp
                if (type==='exp'){
                    newItem=new Expense(ID,des,val);
                } else if (type==='inc'){
                    newItem=new Income(ID,des,val);
                }
                
                //push it into our data structure
                data.allItems[type].push(newItem);
                
                //return the new elemnt
                return newItem;

            },

            calculateBudget:function(){

                //calculate total income and expenses
                claculateTotal('exp');
                claculateTotal('inc');
                
                //calculate the budget: income-expnses
                data.budget=data.totals.inc - data.totals.exp;

                //calculate the per of imcome that we spent
                if (data.totals.inc>0){
                    data.percentage=Math.round(100*(data.totals.exp/data.totals.inc));
                }else{
                    data.percentage=-1;
                }
                

            },
            getBudget: function(){
                return {
                    budget: data.budget,
                    totalInc: data.totals.inc,
                    totalExp: data.totals.exp,
                    percentage: data.percentage
                }
            },

            testing: function(){
                console.log(data);
            }
        }
})();

//UI controller
var UIController=(function(){
   
    var DOMstrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: ".budget__income--value",
        expensesLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
    };

    return {
      getinput:function(){
          return {
            type: document.querySelector(DOMstrings.inputType).value,//inc or exp 
          description : document.querySelector(DOMstrings.inputDescription).value,
          value : parseFloat(document.querySelector(DOMstrings.inputValue).value), 
          };

      }, 

      addListItem: function(obj,type){
          var html,newHtml,element; 
        //create html string with placeholer text
        if (type==='inc'){
            element=DOMstrings.incomeContainer;
            html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }else if(type==='exp'){
            element=DOMstrings.expensesContainer;
            html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        
        //replace the placeholder text with some actual data
        newHtml=html.replace('%id%',obj.id);
        newHtml=newHtml.replace('%description%',obj.description);
        newHtml=newHtml.replace('%value%',obj.value);

        //insert html in dom
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
      },

      clearFields: function(){
          var fields,fieldsArr;
            fields=document.querySelectorAll(DOMstrings.inputDescription +', '+DOMstrings.inputValue);

            fieldsArr=Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current,index,array){
                current.value="";
            });
            fieldsArr[0].focus(); 
      },
      displayBudget: function(obj){
        document.querySelector(DOMstrings.budgetLabel).textContent=obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent=obj.totalInc;
        document.querySelector(DOMstrings.expensesLabel).textContent=obj.totalExp;
        

        if(obj.percentage>0){
            document.querySelector(DOMstrings.percentageLabel).textContent=obj.percentage+"%";
        }else{
            document.querySelector(DOMstrings.percentageLabel).textContent='---';
        }
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
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };

    var updateBudget=function(){
        //1. calc the budegt
        budgetCtrl.calculateBudget();
        //2. return the budget
        var budget=budgetCtrl.getBudget();

        //3.  display the budget on ui
        UICtrl.displayBudget(budget);
    }
    

    var ctrlAddItem = function(){
        var input,newItem
        
        //1 get field input data 
        input=UICtrl.getinput();
        if (input.description !=="" && !isNaN(input.value) && input.value>0){ 
        
        //2 add the item to budget to budget controller
        newItem=budgetCtrl.addItem(input.type,input.description,input.value);
        
        //3. add the item to UI 
        UICtrl.addListItem(newItem,input.type); 

        //4. clear the fields
        UICtrl.clearFields();

        //5. calculate and update budget
        updateBudget();
        }    
    };

    var ctrlDeleteItem=function(event){
        var itemID,splitID,type,ID;
        itemID=event.target.parentNode.parentNode.parentNode.parentNode.id; 
        if (itemID){
            //inc-1
            splitID=itemID.split('-');
            type=splitID[0];
            ID=splitID[1]; 

            //1. delete Item from data structure

            //2. delete item from UI

            //3.updae n show new budget


        }
    };

    return{
        init: function(){
            console.log('appli has started');
            UICtrl.displayBudget({
        
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
        });
            setupEventListeners();
        }
    }

})(budgetController,UIController);
controller.init();
