var actualValue;
class PopUpInfo extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: "open" });

        let wrapDiv= document.createElement('div');
        wrapDiv.className='wrapDiv';
        wrapDiv.innerHTML=`<style>
        .wrapDiv{
    margin-right: auto;
    margin-left: auto;
    width: 200px;
        }
        </style>`;

        let cPole= document.createElement('input');
        cPole.setAttribute("type", "number");
        cPole.className='cPole';
        cPole.innerHTML = `<style>
        .cPole {
            width:100%;
            margin:0;
            padding:0;
            background: #d3d3d3;
            border-radius:4px;
            height:20px;
        }
        input[type='number']::-webkit-inner-spin-button { 
            opacity: 1;
            position:relative;
           right:-2px;
          }
        </style>`;

        let cRange= document.createElement('input');
        cRange.setAttribute("type", "range");
        cRange.className='cRange';
        cRange.innerHTML=`<style>
        .cRange{
            z-index: 2;
        margin:0;
        padding:0;
        -webkit-appearance: none;
        width: 100%;
        border:solid black 2px;
        outline: none;
        opacity: 0.1;
        height:10px;
        border-radius:4px;
        }
        .cRange::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 50px;
            border:solid black 2px;
            border-radius:4px;
            height: 30px;
            background:#4b4949;
            cursor: pointer;
          }
        </style> 
        `;
        // cRange.innerHTML = `<style>
        // input[type='number']::-webkit-inner-spin-button { 
        //     opacity: 1;
        //     position:relative;
        //    right:-2px;
        //   }
        // </style>`;
        let divval= document.createElement('div');
        divval.id='spanVal';
        divval.style.position='absolute';  
        // divval.innerHTML="A"; 
    //     divval.innerHTML=`A <style> 
    // //     #spanVal{
    // //         cursor: pointer;
    // //         user-select: none;
    // // left: 50%;
    // // position: absolute

    // //     }</style>`  
        let wrapDiv2= document.createElement('div');
        wrapDiv2.className='wrapDiv2';
        wrapDiv2.innerHTML=`<style>
        .wrapDiv2{
            position:relative;
        width:100%
        margin:0;
        padding:0;
        margin-bottom:10px;
        }
        </style>`
        let wrapDiv3= document.createElement('div');
        wrapDiv3.className='wrapDiv3';
        wrapDiv3.innerHTML=`<style>
        .wrapDiv3{
        position:absolute;
        left:25px;
        right:25px;
        margin:0;
        padding:0;
        }
        </style>`
        wrapDiv3.appendChild(divval);
        wrapDiv2.appendChild(wrapDiv3);
        wrapDiv2.appendChild(cRange);
        
        let minimum = this.hasAttribute("min-vala") ? this.getAttribute("min-vals") : 1;
        let maximum = this.hasAttribute("max-vala") ? this.getAttribute("max-vals") : 11;
        cRange.setAttribute("min", minimum);
        cRange.setAttribute("max", maximum);
        cRange.setAttribute("value", minimum);
        setValueElem(minimum);
        wrapDiv.appendChild(wrapDiv2);
        wrapDiv.appendChild(cPole);

        const style =document.createElement('style');
        this.shadowRoot.append(wrapDiv);
        this.inputUpdateFunc = (event) => {
            if(event.target.value>=minimum && event.target.value<=maximum){
            const customEvent = new CustomEvent('input-update', {
                bubbles: true,
                composed: true,
                detail: {value: event.target.value},
            });
            setValueElem(event.target.value);
            this.dispatchEvent(customEvent);
        }
        else{
            cPole.value=actualValue;
        }
        }
        function setValueElem(value) {
            actualValue=value;
            cPole.value=value;
            cPole.setAttribute('max',maximum);
            cPole.setAttribute('min',minimum);
            cRange.value=value;
            divval.innerText = value
            let percent = (value- minimum) / (maximum - minimum) * 100;
            divval.style.left = percent + "%";
        }

        cRange.addEventListener("input", this.inputUpdateFunc);
        cPole.addEventListener("change",this.inputUpdateFunc)
                var elem = document.querySelectorAll('.elements');
       $(elem).change(function(){
        if(this.checked){
            if(this.value=="pole"){
                wrapDiv2.style.display="";
            }
            else{
                cPole.style.display="";
            }

        }
        else{
            if (this.value=="pole"){
                wrapDiv2.style.display="none";
            }
            else{
                cPole.style.display="none";
            }
        }
    });
    
}
}  
     