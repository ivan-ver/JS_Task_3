let base = 60;
let clocktimer,dateObj,dm,ds;
let readout='';
let m=1,tm=1,s=0,ts=0,ms=0,init=0;

function ClearСlock() {
    clearTimeout(clocktimer);
    m=1;tm=1;s=0;ts=0;ms=0;
    init=0;
    readout='00:00.00';
    $('#stopWatch').html(readout);
}

function StartTIME() {
    let cdateObj = new Date();
    let t = (cdateObj.getTime() - dateObj.getTime())-(s*1000);
    if (t>999) { s++; }
    if (s >= (m*base)) {
        ts=0;
        m++;
    } else {
        ts = parseInt((ms/100)+s);
        if(ts >= base) { ts = ts-((m-1)*base); }
    }
    if (m>(60*base)) {
        tm=1;
    } else {
        tm=parseInt((ms/100)+m);
        if(tm>=base) { tm=tm-((60-1)*base); }
    }
    ms = Math.round(t/10);
    if (ms>99) {ms=0;}
    if (ms===0) {ms='00';}
    if (ms>0&&ms<=9) { ms = '0'+ms; }
    if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; }
    dm=tm-1;
    if (dm>0) {
        if (dm<10) {
            dm = '0'+dm;
        }
    } else {
        dm = '00';
    }

    readout = dm + ':' + ds + '.' + ms;
    $('#stopWatch').html(readout);
    clocktimer = setTimeout("StartTIME()",1);
}

function StartStop() {
    if (init===0){
        ClearСlock();
        dateObj = new Date();
        StartTIME();
        init=1;
    } else {
        clearTimeout(clocktimer);
        init=0;
    }
}