const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 600,
        height: 500,
        selection:false,
        backgroundColor: 'transparent'
    });
}

const canvas = initCanvas('canvas')


const toggleMode = (mode) => {
    console.log(mode);
    if (mode == models.pan) {
        if(currentMode == models.pan) {
            currentMode = ''
        } else {
            currentMode = models.pan
            canvas.isDrawingMode = false;
            canvas.renderAll()
        }
    } else if (mode == models.drawing) {
        if(currentMode == models.drawing) {
            currentMode = ''
            canvas.isDrawingMode = false;
            canvas.renderAll()
        } else {
            canvas.freeDrawingBrush.width = 10
            canvas.freeDrawingBrush.color = color
            currentMode = models.drawing
            canvas.isDrawingMode = true;
            canvas.renderAll()
        }
    }
    
}


const setPanEvents = (canvas) => {

    canvas.on('mouse:move', (event) => {
        if(mousePressed && currentMode == models.pan){
            canvas.setCursor('grab')
            canvas.renderAll()
            const mEvent = event.e;
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
            canvas.relativePan(delta)
        }
    })
    
    canvas.on('mouse:down', (event) => {
        mousePressed = true;
        if(currentMode == models.pan) {
            canvas.setCursor('grab')
            canvas.renderAll()
        }
    })
    
    canvas.on('mouse:up', (event) => {
        mousePressed = false
        canvas.setCursor('default')
        canvas.renderAll()
    })
    
}

const reader = new FileReader();

let mousePressed = false;

let currentMode;
let models = {
    pan: 'pan',
    drawing: 'drawing'
}
const imgAdded = (e)=> {
    // console.log(e);
    const inputFileEl = document.getElementById('myImg');
    const file = inputFileEl.files[0];
    console.log(file, 'file');
    reader.readAsDataURL(file)

}


let color = '#000';
const setColorListener = () => {
    const picker = document.getElementById('colorPicker');
    console.log('okdd');
    picker.addEventListener('change', (event) => {
        color = event.target.value;
        console.log(color); 
        canvas.freeDrawingBrush.color = color
    })
}

const clearCanvas = (canvas) => {
    canvas.getObjects().forEach((obj) => {
        if(obj !== canvas.backgroundImage) {
            canvas.remove(obj);
        }
    })
}

const inputFile = document.getElementById('myImg');
inputFile.addEventListener('change', imgAdded)

reader.addEventListener("load", () => {
    console.log(reader.result);
    fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToWidth(150);
        img.scaleToHeight(150);
        canvas.add(img)
        canvas.renderAll();
    })
})


setColorListener()
canvas.renderAll();

setPanEvents(canvas)






  var fonts = ["Auther", "LesFruits", "Cucho"];
//   canvas.add(textbox).setActiveObject(textbox);
  fonts.unshift('Times New Roman');
  // Populate the fontFamily select
  var select = document.getElementById("font-family");
  fonts.forEach(function(font) {
    var option = document.createElement('option');
    option.innerHTML = font;
    option.value = font;
    select.appendChild(option);
  });
  




//   ============== TEXT EXECUTE ==============




    function Addtext() { 
        var text = new fabric.IText('Tap and Type', {
            left: 50,
            top: 100,
         });
         canvas.add(text);
        canvas.setActiveObject(text);
        }
        
        document.getElementById('text-bg-color').onchange = function() {
        console.log(canvas.getActiveObject());
        canvas.getActiveObject().set({'textBackgroundColor': this.value})
            canvas.renderAll();
        };

   document.getElementById('text-color').onchange = function() {
    console.log(canvas.getActiveObject());
    canvas.getActiveObject().set({fill: this.value})
    canvas.renderAll();
};

document.getElementById('font-family').onchange = function() {
    console.log( this.value);
    canvas.getActiveObject().set("fontFamily", this.value);
    canvas.renderAll();
};
document.getElementById('text-font-size').onchange = function() {
    canvas.getActiveObject().set("fontSize", this.value);
    canvas.renderAll();
};

document.getElementById('text-stroke-color').onchange = function() {
    canvas.getActiveObject().set("stroke", this.value);
    canvas.renderAll();
};	
document.getElementById('text-stroke-width').onchange = function() {
    canvas.getActiveObject().set("strokeWidth", this.value);
    canvas.renderAll();
};				

radios5 = document.getElementsByName("fonttype");  // wijzig naar button
    for(var i = 0, max = radios5.length; i < max; i++) {
        radios5[i].onclick = function() {
            
            if(document.getElementById(this.id).checked == true) {
                if(this.id == "text-cmd-bold") {
                    canvas.getActiveObject().set("fontWeight", "bold");
                }
                if(this.id == "text-cmd-italic") {
                    canvas.getActiveObject().set("fontStyle", "italic");
                }
                if(this.id == "text-cmd-underline") {
                    canvas.getActiveObject().set("textDecoration", "underline");
                }
				if(this.id == "text-cmd-linethrough") {
                    canvas.getActiveObject().set("textDecoration", "line-through");
                }
				if(this.id == "text-cmd-overline") {
                    canvas.getActiveObject().set("textDecoration", "overline");
                }
                
                
                
            } else {
                if(this.id == "text-cmd-bold") {
                    canvas.getActiveObject().set("fontWeight", "");
                }
                if(this.id == "text-cmd-italic") {
                    canvas.getActiveObject().set("fontStyle", "");
                }  
                if(this.id == "text-cmd-underline") {
                    canvas.getActiveObject().set("textDecoration", "");
                }
				if(this.id == "text-cmd-linethrough") {
                    canvas.getActiveObject().set("textDecoration", "");
                }  
                if(this.id == "text-cmd-overline") {
                    canvas.getActiveObject().set("textDecoration", "");
                }
            }
            
            
            canvas.renderAll();
        }
    }









var imageSaver = document.getElementById('download');
var canvasArea = document.getElementById('canvas');
imageSaver.addEventListener('click', saveImage);



function saveImage() {

    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    console.log(canvas);
    canvas.toBlob(function(blob) {
        saveAs(blob, "myIMG.png");
      });

}