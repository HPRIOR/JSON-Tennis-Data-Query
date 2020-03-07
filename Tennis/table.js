function table() {
    var myTable = `<table id=main-table> <tr><th>Year</th><th>Tournament</th><th>Winner</th><th>Runner-up</th></tr>`;
    document.getElementById("tableSpace").innerHTML = myTable + '</table>';
}

function resetTable(){
    if (document.getElementById("main-table") != null){
        document.getElementById('main-table').remove();
    }
}

function onClickSubmit() {
    getJsonTable();

}

function getJsonTable(){
    // returns a jQ object with JSon File
    var fileSelect = $('#MaleFemale').val();
    $.getJSON( fileSelect + '-grand-slam-winners.json', function(result){
        $.each(result, function(data){
            JSON.stringify(data)
        })
        }
)}
