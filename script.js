let hexInput = document.getElementById('hex');
let rgbInput = document.getElementById('rgb');

window.onload = () => {
    hexInput.value = "";
    rgbInput.value = "";
}

function valid(element){
    element.style.color = "#202040";
}

function invalid(element, otherElement){
    element.style.color = "#f04624";
    otherElement.value = 0;
}

function toRgb(){
    let hexCode = hexInput.value;
    let rgbarr = [];

    if(/^#?[A-Fa-f0-9]{6}$/.test(hexCode)){
        valid(hexInput);
        hexCode = hexCode.split("#")[1] || hexCode;

        for(let i = 0; i < hexCode.length; i += 2){
            rgbarr.push(parseInt(hexCode[i] + hexCode[i + 1], 16));
        }

        rgbInput.value = `rgb(${rgbarr})`;
        document.body.style.backgroundColor = `rgb(${rgbarr})`;

    }else{
        invalid(hexInput,rgbInput)
    }
}

function toHex(){
    let rgbCode = rgbInput.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/;
    let hex = '#'
    
    if(rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)){
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");

        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });
        if(condition){
            valid(rgbInput);
            rgbCode.forEach(value => {
                value = parseInt(value).toString(16);
                hex += value.length == 1 ? "0"+value : value;
            });
            hexInput.value = hex;
            document.body.style.backgroundColor = hex;
        }else{
            invalid(rgbInput,hexInput);
            console.log("2");
        }
    }else{
        invalid(rgbInput,hexInput);
        console.log("1");
    }
}