function sayHello(){

    document.getElementById("div1").innerHTML = "yes"
}

function addElement(){
    // gets an element with target1 id: ul in this case
    var elem = document.querySelector("#target1");

    //creates a new element with li tag
    var node = document.createElement("li");

    // creates a text node
    var text = document.createTextNode("hello");

    //puts text node as child of li element
    node.appendChild(text);
    node.id = "target2";

    // puts element as child of ul element
    elem.appendChild(node);

}

var deleteElement = function(){
    document.getElementById("delete").remove();

    //getElementById("delete").parentNode.removeChild(document.getElementById("delete"))

}