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
        

        var data={
            allItems :{
                exp: [],
                inc: []
            },
            totals:{
                exp:0,
                inc:0
            }
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
        expensesContainer:'.expenses__list'
    };

    return {
      getinput:function(){
          return {
            type: document.querySelector(DOMstrings.inputType).value,//inc or exp 
          description : document.querySelector(DOMstrings.inputDescription).value,
          value : document.querySelector(DOMstrings.inputValue).value,
          };

      }, 

      addListItem: function(obj,type){
          var html,newHtml,element; 
        //create html string with placeholer text
        if (type==='inc'){
            element=DOMstrings.incomeContainer;
            html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }else if(type==='exp'){
            element=DOMstrings.expensesContainer;
            html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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
        var input,newItem
        
        //1 get field input data 
        input=UICtrl.getinput();
        
        //2 add the item to budget to budget controller
        newItem=budgetCtrl.addItem(input.type,input.description,input.value);
        
        //3. add the item to UI 
        UICtrl.addListItem(newItem,input.type); 

        //4. clear the fields
        UICtrl.clearFields();

        //5. calc the budegt

         
        //6.display the budget on /ui
    };

    return{
        init: function(){
            console.log('appli has started');
            setupEventListeners();
        }
    }

})(budgetController,UIController);
controller.init();
