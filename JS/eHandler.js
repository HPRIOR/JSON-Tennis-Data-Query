window.onload = function doEvent(){
    //document.getElementById("hello").addEventListener('click', sayHello);
    //document.getElementById("hello").addEventListener('click', addElement);

    document.getElementById("deletebutton").addEventListener('click', deleteElement)


    //$("deletebutton").on('click', deleteElement)

    // as opposed to:
    //document.getElementByID("deletebutton").onclick = deleteElement
}

