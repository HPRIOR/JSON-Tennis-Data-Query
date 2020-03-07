
function resetTable(){
    if (document.getElementById("main-table") != null){
        document.getElementById('main-table').remove();
    }
}

// JQuery shorthand for window.onLoad
$(function(){
    //variables to store conditions in Selectors
    let fileCond;
    let nameCond;
    let dateCond;
    let rankCond;
    let tournyCond;
    let playerInput;
    let dateInput;
    let dateInputInt;

    // variables to cache JQ selectors
    let $fileCondSelect = $('#MaleFemale');
    let $nameCondSelect = $('#namecond');
    let $dateCondSelect = $('#datecond');
    let $rankCondSelect = $('#rankcond');
    let $tournyCondSelect = $('#tournycond');
    let $playerInput = $('#playerinput');
    let $dateInput = $('#dateinput');


    // change conditions when they change
    $fileCondSelect.on('change', function(){
        fileCond = this.value;
    });
    $nameCondSelect.on('change', function(){
        nameCond = this.value;
    });
    $dateCondSelect.on('change', function(){
        dateCond = this.value;
    });
    $rankCondSelect.on('change', function(){
        rankCond = this.value;
    });
    $tournyCondSelect.on('change', function(){
        tournyCond = this.value;
    });

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

    function createTable(tableBody){
        return '<table id="main-table"><thead><tr><td><b>Year</b></td><td><b>Tournament</b></td><td><b>Winner</b></td><td><b>Runner-up</b></td></tr></thead><tbody>' + tableBody + '</tbody></table>'
    }

    function tableCol(col1, col2, col3, col4){
        return '<tr>' +
            '<td>' +col1+ '</td>' +
            '<td>' +col2+'</td>' +
            '<td>' +col3+'</td>' +
            '<td>' +col4+ '</td>' +
            '<tr/>'
    }

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

    function checkNameRank(winner, runner){
        if (playerInput === '' || nameCond ==='none'){
            return true
        }
        else{
            if (rankCond === 'either'){
                if (nameCond === 'contains'){
                    return winner.includes(playerInput) || runner.includes(playerInput);
                }
                else if(nameCond === 'equalsname'){
                    return (playerInput === winner || playerInput === runner);
                }
            }
            else if (rankCond === 'winner'){
                if (nameCond === 'contains'){
                    return winner.includes(playerInput);
                }
                else if(nameCond === 'equalsname'){
                    return (playerInput === winner);
                }
            }
            else if (rankCond === 'runner'){
                if (nameCond === 'contains'){
                    return runner.includes(playerInput);
                }
                else if(nameCond === 'equalsname'){
                    return (playerInput === runner);
                }
            }
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



    $('#submit').on('click', function(){
        getValues();
        $.getJSON( fileCond + '-grand-slam-winners.json',function(result){
            let tableBody = [];
            $.each(result["result"], function(index, key){
                if (checkNameRank(key['winner'], key['runner-up']) && checkDates(key['year']) && checkTourny(key['tournament'])){
                    tableBody.push(tableCol(key['year'], key['tournament'], key['winner'], key['runner-up']))
                }
            });
            document.getElementById("tableSpace").innerHTML = createTable(tableBody.join(""));
        });
    })
});

