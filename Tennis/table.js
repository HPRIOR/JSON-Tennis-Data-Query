
/*
JQuery shorthand for window.onLoad
 */
$(function(){
    /*
    variables to store conditions in Selectors
     */
    let fileCond;
    let nameCond;
    let dateCond;
    let rankCond;
    let tournyCond;
    let playerInput;
    let dateInput;
    let dateInputInt;

    /*
     variables to cache jQ selectors used multiple times
     */
    let $fileCondSelect = $('#MaleFemale');
    let $nameCondSelect = $('#namecond');
    let $dateCondSelect = $('#datecond');
    let $rankCondSelect = $('#rankcond');
    let $tournyCondSelect = $('#tournycond');
    let $playerInput = $('#playerinput');
    let $dateInput = $('#dateinput');



    /*
     events to change selector conditions when they are changed by user
     */
    $fileCondSelect.on('change', function(){fileCond = this.value;});
    $nameCondSelect.on('change', function(){nameCond = this.value;});
    $dateCondSelect.on('change', function(){dateCond = this.value;});
    $rankCondSelect.on('change', function(){rankCond = this.value;});
    $tournyCondSelect.on('change', function(){tournyCond = this.value;});

    /*
     variables which are used by the event functions
     */
    function getValues() {
        fileCond = $fileCondSelect.val();
        nameCond = $nameCondSelect.val();
        dateCond = $dateCondSelect.val();
        rankCond = $rankCondSelect.val();
        tournyCond = $tournyCondSelect.val();
        playerInput = $playerInput.val();
        dateInput = $dateInput.val();
        // conversion here so only one is made for date search
        dateInputInt = parseInt(dateInput, 10) || 0;

    }

    /*
    returns a column of a html row, where the parameters match the individual columns
     */
    function tableCol(col1, col2, col3, col4){
        return '<tr>' +
            '<td>' +col1+ '</td>' +
            '<td>' +col2+'</td>' +
            '<td>' +col3+'</td>' +
            '<td>' +col4+ '</td>' +
            '<tr/>'
    }

    /*
    compares date given by user to date passed as an argument
     */
    function checkDates(date){
        if (dateInputInt === 0){
            return true;
        }
        else {
            if (dateCond === 'equalsdate'){
                return date === dateInputInt;
            }
            else if (dateCond === 'greaterthan'){
                return date >= dateInputInt;
            }
            else if (dateCond === 'lessthan'){
                return date <= dateInputInt;
            }
        }
    }

    /*
    Returns true or false depending on rank selection
     */
    function checkRank(winner, runner){
        if (playerInput === '' || nameCond ==='none'){
            return true
        }
        else{
            if (rankCond === 'either'){
                return checkName(winner) || checkName(runner)
            }
            else if (rankCond === 'winner'){
                return checkName(winner)
            }
            else if (rankCond === 'runner'){
                return checkName(runner)
            }
        }
    }

    /*
    Returns true of false depending on name selection
    Used inside rank selection method as they are logically dependant on each other
     */
    function checkName(player){
        if (nameCond === 'contains'){
            return player.includes(playerInput);
        }
        else if (nameCond === 'equalsname'){
            return playerInput === player;
        }
    }

    function checkTourny(tourny){
        if (tournyCond === 'anyT'){
            return true;
        }
        else{
            return tourny === tournyCond;
        }
    }

    // returns false if player or date input does not match regex
    let checkWhiteList = () => !playerInput.match(/[^a-zA-Z0-9\- ]/) && !dateInput.match(/[^a-zA-Z0-9\- ]/);

    // for each row this function returns true if all columns match search criteria
    let rowCheck = (key) => checkRank(key['winner'], key['runner-up']) && checkDates(key['year']) && checkTourny(key['tournament']);

    // adds rows to table given as argument, each column selected from key-value array
    let addTableRowTo = (tableBody, key) => tableBody.push(tableCol(key['year'], key['tournament'], key['winner'], key['runner-up']));

    function resetTable() {
        var mainTable = $("#main-table");
        var errorMessage = $('#errormessage');
        if (mainTable != null) mainTable.remove();
        if (errorMessage != null) errorMessage.remove();
    }

    function removeHTMLat(id){
        id = $('#' + id);
        if (id != null) $(id).remove()
    }

    let displayHTML = (message, id, container) => $('#' + container).html( "<h1 id = " + id + ">" + message + "</h1>");

    let createTable = (tableBody) =>
        '<table id="main-table"><thead><tr><td><b>Year</b></td><td><b>Tournament</b></td><td><b>Winner</b></td><td><b>Runner-up</b></td></tr></thead><tbody>' + tableBody + '</tbody></table>';


    /*
     events for clicking submit and reset
     */
    $("#reset").on('click', resetTable);

    $('#submit').on('click', function(){
        // gets the current values as they may have been changed by the user
        getValues();
        //check for whitelisted characters - no symbols allowed
        if (checkWhiteList()) {
            $.getJSON( fileCond + '-grand-slam-winners.json',function(result){
                // array of strings to build table html
                let tableBody = [];
                // loops through JSON list, selects items that match query and appends them to list
                $.each(result["result"], function(index, key){
                    if (rowCheck(key)) addTableRowTo(tableBody, key)
                });
                // checks to see if any results were found and creates HTML table if they were
                if (tableBody.length !== 0){
                    $("#tableSpace").html(createTable(tableBody.join("")));
                    removeHTMLat("errormessage")
                }
                else{
                    resetTable();
                    displayHTML("No matching results", "errormessage", "error")
                }
            });
        }
        // message to display if disallowed characters appear in input fields
        else{
            resetTable();
            displayHTML("Please use only alphanumerical characters", "errormessage", "error")
        }
    })
});

