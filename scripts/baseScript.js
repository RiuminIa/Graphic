var hambugerButton=document.getElementById("hamburgerButton");

var click=false;
hambugerButton.addEventListener("click",function(){ 
    click=!click;
    let graph=document.getElementById("graph1");
    let graph2=document.getElementById("graph2");
    if (click){
        try{
            graph.style.top="100px";
        }
        catch(error){
            graph2.style.position="relative";
            graph2.style.top="63px";
            return;
        }
    }
    else{
        try{
        graph.style.top="29px"
        }
        catch(error){
        graph2.style.top="29px";
            return;
        }
    }
});
window.addEventListener('resize', function(event) {
    if(window.innerWidth>500){
        if(click){
            hambugerButton.click();
        }
    }
}, true);


























function p (text){
    console.log(text);
}