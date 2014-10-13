window.onload=function(){
  "use strict";

  var seats=document.querySelectorAll('#seats li');
  var dragElements=document.querySelectorAll('#dnd-names li');
  var dndlist = document.querySelector('#dnd-names');

  var elementDragged=null;
  for(var i=0;i<dragElements.length;i++){
    dragElements[i].addEventListener('dragstart',function(e){
      console.log('in person dragstart');
      e.dataTransfer.effectAllowed='move';
      e.dataTransfer.setData('text',this.innerHTML);
      console.log("set " + this.innerHTML)
      elementDragged=this;
    });
    dragElements[i].addEventListener('dragend',function(e){
      elementDragged=null;
    });
  };


  document.body.addEventListener('dragover', function(e) {
    console.log('in body dragover');
    if(e.preventDefault)e.preventDefault();
    return false;
  })
  document.body.addEventListener('drop', function(e) {
    console.log('in body drop');
    if(e.preventDefault)e.preventDefault();
    if(e.stopPropagation)e.stopPropagation();

    dndlist.appendChild(elementDragged);
  });


  for (var i=0;i<seats.length;i++) {
    seats[i].addEventListener('dragover',function(e){
      if(e.preventDefault){
        e.preventDefault();
      }
      e.dataTransfer.dropEffect='move';
      return false;
    });
    seats[i].addEventListener('dragenter',function(e){this.className="over";});
    seats[i].addEventListener('dragleave',function(e){this.className="";});
    seats[i].addEventListener('drop',function(e){
      if(e.preventDefault)e.preventDefault();
      if(e.stopPropagation)e.stopPropagation();
      this.className="";
      this.innerHTML=e.dataTransfer.getData('text');

      this.setAttribute('draggable', 'true');

      this.addEventListener('dragend', function() {
        console.log('dragend');
        for(i=0;i<this.parentNode.children.length;i++) {
          if (this.parentNode.children[i] == this) {
            this.innerHTML = "Seat " + (i + 1);
            break;
          }
        }
        
        this.removeAttribute('draggable');
      });
      this.addEventListener('dragstart', function(e){
        console.log('dragstart');
        e.dataTransfer.effectAllowed='move';
        e.dataTransfer.setData('text',this.innerHTML);
        var newLi = document.createElement('li');
        newLi.setAttribute('draggable', 'true');
        var newLiInner = document.createTextNode(this.innerHTML);
        newLi.appendChild(newLiInner);
        elementDragged=newLi;
      });


      dndlist.removeChild(elementDragged);
      elementDragged=null;
      return false;
    });
  }
}
