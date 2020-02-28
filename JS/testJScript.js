
function tableOfSquares() {
    // Display a prompt with a zero in it
    var num = window.prompt("Enter an integer", "0");
    // this creates the first part of the table, with the class 'border figure'
    var myTable = "<table class='border figure'>";
    var count = 0;
    while(count < num) {
        // Each row of the table is an integer and its square
        myTable = myTable + "<tr><td>" + count + "</td><td>"
            + count*count + "</td></tr>";
        count++;
    }
    // adds the table to the HTML document after executing the instructions
    document.getElementById("tos").innerHTML = myTable + "</table>";
}