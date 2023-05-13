var form = document.getElementById("zeform")
var adder = document.getElementById("adder")

form.addEventListener('submit',addexpense);

function addexpense(e){
    e.preventDefault()
    var expense = document.getElementById("expense").value;
    var desc = document.getElementById("description").value;
    var cat = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
    
    data={
        ex:expense,
        des:desc,
        cate:cat
    }
    let data_serialized = JSON.stringify(data);

    localStorage.setItem(expense,data_serialized);

    var object = localStorage.getItem(expense);
    object=JSON.parse(object)
    
    var li= document.createElement("li");
    li.className="list-group-item text-center"
    var data = document.createTextNode(`${object.ex} - ${object.des} - ${object.cate}`);
     
    li.appendChild(data);
    var dltbtn = document.createElement("button");
   var editbtn = document.createElement('button');
   editbtn.appendChild(document.createTextNode("Edit"));
   dltbtn.appendChild(document.createTextNode("Delete"));
   dltbtn.id="delete"
   editbtn.id="edit"
   editbtn.className="btn btn-outline-dark btn-sm float-right delete";

   dltbtn.className="btn btn-danger btn-sm float-right delete  mx-4";
   
   dltbtn.addEventListener('click',(event)=>{
    deletion(event,object)
   });
   editbtn.addEventListener('click',(event)=>{
    edition(event,object)
   });
   li.appendChild(dltbtn);
   li.appendChild(editbtn);

   adder.appendChild(li);

   
   document.getElementById("expense").value="";
   document.getElementById("description").value="";
   document.getElementById("category").options[document.getElementById("category").selectedIndex=0];
    

};

function deletion(e,object){
    if(e.target.id=="delete"){
        if(confirm("Are you sure you want to delete this "+object.ex+" expense on "+object.des+" ?")){
            var li=e.target.parentElement;
            localStorage.removeItem(object.ex);
            adder.removeChild(li);
        }
    }


};

function edition(e,object){
    if(e.target.id=="edit"){
        var li = e.target.parentElement;
        document.getElementById("expense").value=object.ex;
        document.getElementById("description").value=object.des;
        var array = document.getElementById("category").options;
        var Arr = Array.from(array);
        var Arrs = Object.keys(Arr);
        let index = 0;
        Arrs.forEach((arr)=>{
            
            if(Arr[arr].textContent==object.cate){
               index=arr
            }
            
            


        });
        

        
        document.getElementById("category").options[document.getElementById("category").selectedIndex=index];
        localStorage.removeItem(object.ex);
        adder.removeChild(li);
    }
}