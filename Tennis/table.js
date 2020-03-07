
function resetTable(){
    if (document.getElementById("main-table") != null){
        document.getElementById('main-table').remove();
    }
}

// JQuery shorthand for window.onLoad
$(function(){
    //variable to store JSON data
    let fileSelect;
    $('#MaleFemale').on('change', function(){
        fileSelect = this.value;
    });


    function getFileSelectValue() {
        fileSelect = $('#MaleFemale').val();
        console.log(fileSelect)
    }

    function tableSkel(tableBody){
        var tableHead = '<tr>' +
            '<th>year<th/> ' +
            '<th>tournament<th/>' +
            '<th>winner<th/>' +
            '<th>runner-up<th/>' +
            '</tr>'
        return '<table>' + tableHead + tableBody + '</table>'

    }

    function tableCol(col1, col2, col3, col4){
        return '<tr>' +
            '<td>' +col1+ '</td>' +
            '<td>' +col2+'</td>' +
            '<td>' +col3+'</td>' +
            '<td>' +col4+ '</td>' +
            '<tr/>'
    }


    $('#submit').on('click', function(){
        getFileSelectValue();
        $.getJSON( fileSelect + '-grand-slam-winners.json',function(result){
            var tableBody = [];
            $.each(result["result"], function(index, string){
                tableBody.push(tableCol(string['year'], string['tournament'], string['winner'], string['runner-up']))
            })
            var table = tableSkel(tableBody.join(""))
            document.getElementById("tableSpace").innerHTML = table;
        });
    })
});

