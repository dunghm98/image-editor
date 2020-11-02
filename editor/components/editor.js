import { fabric } from "fabric";
import { useEffect, useCallback, useState } from "react";
import {
    Select,
    TextField,
    Button,
    RangeSlider
} from '@shopify/polaris';

import { saveAs } from 'file-saver';



export default function Editor() {

  var canvas;
  const [fontFamily, setFontFamily] = useState('today');
  const [labelTextColor, setLabelTextColor] = useState('#000');
  const [backgroundTextColor, setBackgroundTextColor] = useState('transparent');
  const [strokeColor, setStrokeColor] = useState('');
  const [strokeWidth, setStrokeWidth] = useState(0);







  const fonts = [
    {label: 'Times New Roman', value: 'Times New Roman'},
    {label: 'Auther', value: 'Auther'},
    {label: 'LesFruits', value: 'LesFruits'},
    {label: 'Cucho', value: 'Cucho'},
  ];


  const handleAddText = useCallback(() => {
    let text = new fabric.IText("Tap and Type", {
        left: 50,
        top: 100,
        fill: labelTextColor
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  }, [])

  
  useEffect(() => {
    const initCanvas = (id) => {
      return new fabric.Canvas(id, {
        width: 600,
        height: 500,
        selection: false,
        backgroundColor: "transparent",
      });
    };
    canvas = initCanvas("canvas");
    canvas.renderAll();



    const reader = new FileReader();
    const inputFile = document.getElementById('myImg');

    inputFile.addEventListener('change', ()=> {
        const file = inputFile.files[0];
        reader.readAsDataURL(file)
    })

    reader.addEventListener("load", () => {
        fabric.Image.fromURL(reader.result, (img) => {
            img.scaleToWidth(200);
            img.scaleToHeight(200);
            canvas.add(img)
            canvas.renderAll();
        })
    })

  }, []);


  const handleFontFamilyChange = useCallback((value) => {
    setFontFamily(value);
    if(canvas.getActiveObject()) {
        canvas.getActiveObject().set("fontFamily", value);
        canvas.renderAll();
    }
  }, []);

  const handleLabelTextColorChange = useCallback((value) => {
    setLabelTextColor(value);
    if(canvas.getActiveObject()){
        canvas.getActiveObject().set("fill", value);
        canvas.renderAll();
    }
}, []);

const handleBackgroundTextColorChange = useCallback((value) => {
    setBackgroundTextColor(value);
    if(canvas.getActiveObject()){
        canvas.getActiveObject().set("textBackgroundColor", value);
        canvas.renderAll();
    }
}, []);

const handleStrokeColorChange = useCallback((value) => {
    setStrokeColor(value);
    if(canvas.getActiveObject()){
        canvas.getActiveObject().set("stroke", value);
        canvas.renderAll();
    }
}, []);

const handleStrokeWidthChange = useCallback((value) => {
    setStrokeWidth(value);
    if(canvas.getActiveObject()){
        canvas.getActiveObject().set("strokeWidth", value);
        canvas.renderAll();
    }
}, []);

    const handleSaveFile = useCallback (() => {
            let canvas = document.getElementById("canvas");
            // let ctx = canvas.getContext("2d");
            canvas.toBlob(function(blob) {
                saveAs(blob, "myCustomLabel.png");
              });
    }, [])

  return (
    <div>
        <div className="editor-wrapper">
            <Button onClick={() => handleAddText()}>Add Text</Button>
            <canvas id="canvas" width="300" height="300"></canvas>
            <div className="buttonWrapper">
                <span className="buttonTitle">Import Image:</span>
                <input type="file" id="myImg" accept="ima" />
                </div>
                <Select
                    label="Font Family"
                    options={fonts}
                    onChange={handleFontFamilyChange}
                    value={fontFamily}
                />
                <TextField
                    label={'Font color'}
                    type={'color'}
                    value={labelTextColor}
                    name={'label_text_color'}
                    onChange={handleLabelTextColorChange}
                />
                <TextField
                    label={'Background Text Color'}
                    type={'color'}
                    value={backgroundTextColor}
                    onChange={handleBackgroundTextColorChange}
                />
                <TextField
                    label={'Stroke Color'}
                    type={'color'}
                    value={strokeColor}
                    onChange={handleStrokeColorChange}
                />
                <RangeSlider
                    label="Stroke width"
                    value={strokeWidth}
                    onChange={handleStrokeWidthChange}
                    min={0}
                    max={10}
                    output
                />

                <Button onClick={() => handleSaveFile()} primary>Save File</Button>
        </div>
    </div>
  );
}

Editor.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
