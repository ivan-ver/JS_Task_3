let field = {};
let otherSelisOpen = false;
let count = 0;

$(document).ready(function () {
    field = mixing();
});

$('#start').click(function () {
    StartStop();
    $("td[class!=solved]").click(function () {
        let $selectedSell = $('#' + this.id);
        $selectedSell.css('background-color', field[this.id]);
        $selectedSell.addClass('isOpen');
        if (otherSelisOpen) {
            setTimeout('compare()', 700);
        } else {
            otherSelisOpen = true;
        }
    });
});

function compare() {
    let $isOpenSells = $("table").find(".isOpen");
    if (field[$isOpenSells[0].id] !== field[$isOpenSells[1].id]){
        $isOpenSells.css('background-color','white');
        $isOpenSells.removeAttr('class');
    } else {
        $isOpenSells.attr('class','solved')
        count++;
        if (count === 8) {
            StartStop();
            alert("Вы выиграли!!!" + "\n" + "Затраченное время: " + readout)
            location.reload();
        }
    }
    otherSelisOpen = false;
}

function mixing() {
    let colors = [
        'red','blue','green','yellow','brown','orange','gray','black',
        'red','blue','green','yellow','brown','orange','gray','black'
    ];

    let coordinats = [
        '11','12','13','14',
        '21','22','23','24',
        '31','32','33','34',
        '41','42','43','44',
    ];

    for (let i = 0; i < 16; i++) {
        let rColor = Math.round(Math.random()*(i));
        let rCoordinate = Math.round(Math.random()*(i));

        let colorTemt = colors[i];
        colors[i] = colors[rColor];
        colors[rColor] = colorTemt;

        let coordinateTemt = coordinats[i];
        coordinats[i] = coordinats[rCoordinate];
        coordinats[rCoordinate] = coordinateTemt;
    }

    let result = {};

    for (let i = 0; i < 16; i++) {
        result[String(coordinats[i])]=colors[i];
    }

    return result;
}







