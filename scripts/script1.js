var years=[];
var znamki=[];
var small=false;
    function xmlTojava(){
        $.ajax( {
            type:"GET",
            url:'scripts/xmlDat/z03.xml',
            cache:false,
            dataType:'xml',
            success:function(data) { 
                let roki = data.getElementsByTagName("rok");
                let hodnoti = data.getElementsByTagName("hodnotenie"); 
                for ( var i = 0; i < roki.length; i++ ) 
                { 
                    years.push(roki[i].innerHTML); 
                }
                for ( var i = 0; i < hodnoti.length; i++ ){
                    let a=[];
                     for(var x=0; x< hodnoti[i].childElementCount ;x++){
                        a.push(parseInt(hodnoti[i].childNodes[1+(2*x)].innerHTML));
                     }
                     znamki.push(a);
                }
                plotSomething();
                if(changeCoord){
                    orienPlot='h';
                    if (window.innerWidth<=280){
                        Plotly.relayout('myDiv',{ 'xaxis.autorange':false,
                        'yaxis.autorange':false,'autosize': false,'width':280,'height': 800});
                        small=true;
                    }
                    else{
                Plotly.relayout('myDiv',{ 'xaxis.autorange':false,
                'yaxis.autorange':false,'autosize': true,'height': 800});
                Plotly.relayout('myDiv',{'autosize': true});
                    }
                Plotly.restyle('myDiv',{orientation:orienPlot})
                Plotly.relayout('myDiv3',{ 'width':window.innerWidth,'height': 400});
            Plotly.restyle('myDiv3',{orientation:orienPlot},)
                
        }
        }});
    }

window.addEventListener('resize', function(event) {
    if(window.innerWidth>500){
        if (orienPlot==='h'){
                orienPlot='v';
                  Plotly.relayout('myDiv',{ 'xaxis.autorange':false,'yaxis.title':'Number of people','xaxis.title': 'Evaluation',
                'yaxis.autorange':false,'autosize': true,'height': 500});
                Plotly.relayout('myDiv',{'autosize': true});
                Plotly.restyle('myDiv',{orientation:'v'})
                Plotly.relayout('myDiv3',{ 'autosize': true});
                Plotly.relayout('myDiv3',{ 'autosize': true});
            Plotly.restyle('myDiv3',{orientation:orienPlot},)
        }
    }
    else{
        if (window.innerWidth<=280 && !small){
            Plotly.relayout('myDiv',{ 'xaxis.autorange':false,
            'yaxis.autorange':false,'autosize': false,'width':280,'height': 800});
            Plotly.restyle('myDiv',{orientation:'h'},)

            small=true;
        }
        else if(orienPlot==='v' || (window.innerWidth>300 && small)){
            small=false;
            orienPlot='h';
            Plotly.relayout('myDiv',{ 'xaxis.autorange':false,'xaxis.title':'Number of people','yaxis.title': 'Evaluation',
            'yaxis.autorange':false,'autosize': true,'height': 800});
            Plotly.relayout('myDiv',{'autosize': true});
            Plotly.restyle('myDiv',{orientation:'h'},)
            Plotly.relayout('myDiv3',{ 'width':window.innerWidth,'height': 500});
            Plotly.relayout('myDiv3',{'autosize': true});
            Plotly.restyle('myDiv3',{orientation:orienPlot},)
        }

    }
    
}, true);
var titles=[];
var dats=[];
var orienPlot='v';
const xCoord=['A','B','C','D','E','FX','FN'];
var changeCoord=false;

function makeData2(i){  
    var tracera={
        values: znamki[i],
        labels: xCoord,
        type: 'pie',
        automargin: true,
        textposition: 'auto',
        textinfo: "percent",
        insidetextorientation: "radial"
    };
return tracera;
}
function makeData3(i){
    let pole=[];
    znamki.forEach(value=>{pole.push(value[i])});

    var trace1 = {
        orientation:orienPlot,
        insidetextorientation:'radial',
        x: years,
        y: pole,
        name: xCoord[i],
        type: 'bar',
        textposition: "outside",
        legendwidth:15,
        textfont:{
            size:15
        }
      };
      return trace1;
}
function makeData4(i){
    let pole=[];
    let polecisel=[];
    znamki.forEach(value=>{pole.push(value[i]);
        polecisel.push(value[i]*20);
    });
    var trace1 = {
        x: years,
        y: pole,
        text: pole,
        name: xCoord[i],
        mode: 'markers',
        marker: {
          size: polecisel,
          sizemode: 'area'
        }
      };
      return trace1;
}
if (window.innerWidth<=500){
    changeCoord=true;
}
  var config = {responsive: true}
  var da;
  var layout = [{
    height: 300,
    width: 50
  }]
  function plotSomething(){
    let dataBerchart=[];
    let databuble=[];
    for(let i=0;i<6;i++){
        titles.push({title: years[i],
        font: {size: 10}});
    }  
    for(let i=1;i<7;i++){
        Plotly.newPlot('myDiv2_'+i,[makeData2(i-1)],titles[i-1], config);
        dataBerchart.push(makeData3(i-1));
        databuble.push(makeData4(i-1));
    }
      var layout1 = {
        barmode: 'group',
        xaxis: {title: 'Evaluation'},
        yaxis: {title: 'Number of people'},
        title:"Successful completion of the Webtech1 course"
      };
      var layout2 = {
        barmode: 'group',
        xaxis: {title: 'Evaluation'},
        yaxis: {title: 'Number of people'},
        title:"Successful completion of the Webtech1 course"
      };  
      if(changeCoord){
        layout1.xaxis.title='Number of people';
        layout1.yaxis.title= 'Evaluation';
      }
    dataBerchart.push(makeData3(6));
    databuble.push(makeData4(6));
    Plotly.newPlot('myDiv',dataBerchart,layout1, config);
    Plotly.newPlot('myDiv3',databuble,layout2,config);
    // Plotly.newPlot('berChart', dataBerchart, layout2,config);
}
xmlTojava();

