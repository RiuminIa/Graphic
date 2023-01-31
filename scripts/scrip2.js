var source=new EventSource("http://old.iolab.sk/evaluation/sse/sse.php");
var x1=[];
var y1=[];
var y2=[];
var y1Amp=[];
var y2Amp=[];
var sin=true;
var cos =true;
var finish=false;
var deleted=true;
customElements.define('popup-info',PopUpInfo);
var customElement=document.getElementsByClassName("popup-info");
source.onmessage=function(event){
    if(!finish){
    a=JSON.parse(event.data)
    x1.push(a.x);
    y1.push(a.y1*actualValue);
    y2.push(a.y2*actualValue);
    multiply()
    newSin();
    }
};
function multiply(){
    y1Amp.length=0;
    y2Amp.length=0;
    y1.forEach(val=>{
        y1Amp.push(val);
    })
    y2.forEach(val=>{
        y2Amp.push(val);
    })
}
var config = {responsive: true}
var layout = {xaxis: {title: 'x'},
yaxis: {title: 'y'},
title:"Function sin(x) and cos(x)"};
function newSin(){
    let trace1 = {x:x1, y:y1Amp,name:'sin'};
    let trace2 = {x:x1, y:y2Amp,name:'cos'};
    if(sin && cos){
        layout = {xaxis: {title: 'x'},
yaxis: {title: 'y'},
title:"Function sin(x) and cos(x)"};
    if (deleted){
        Plotly.newPlot("sin", [trace1,trace2], layout,config);
        deleted=false;
        }
        Plotly.update("sin", [trace1,trace2],layout);
    }
    else if(sin){
        y2Amp.length=0;
        layout = {xaxis: {title: 'x'},
yaxis: {title: 'y'},
title:"Function sin(x)"};
        if (deleted){
            Plotly.newPlot("sin", [trace1,trace2], layout,config);
            deleted=false;
        }
        Plotly.update("sin", [trace1],layout);
    }
    else if(cos){
        layout = {xaxis: {title: 'x'},
yaxis: {title: 'y'},
title:"Function cos(x)"};
        if (deleted){
            Plotly.newPlot("sin", [trace1,trace2], layout,config);
            deleted=false;
        }
        y1Amp.length=0;
        Plotly.update("sin", [trace2],layout);
    }
    else{
        if (!deleted){
        y1Amp.length=0;
        y2Amp.length=0;
        layout = {xaxis: {title: 'x'},
yaxis: {title: 'y'},
title:""};
Plotly.update("sin", [0],layout);
        Plotly.deleteTraces('sin', 0);
        deleted=true;
        }
    }
}
var cbs = document.querySelectorAll('.checki');
[].forEach.call(cbs, function (cb) {
    cb.addEventListener("click", function(){
        if(this.checked){
            if(cb.value=="sin"){
                sin=true;
            }
            else{
                cos=true;
            }

        }
        else{
            if (cb.value=="sin"){
                sin=false;
            }
            else{
                cos=false;
            }
        }
        multiply();
        newSin();
    });
});
var button=document.getElementById("myBtn");
button.onclick=function(){
    finish=true;
}
document.addEventListener("input-update", function(event) {
    multiply();
    newSin();
});

window.addEventListener('resize', function(event) {
    
});



