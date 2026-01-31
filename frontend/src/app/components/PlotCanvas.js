"use client"
import { useRef, useEffect, useState } from "react";
import "@/app/globals.css";
import grid_printer from "@/app/utils/grid.js";
import plot_printer from "@/app/utils/plot_printer.js";
import zoom from "@/app/utils/zoomer.js";
import transform from "@/app/utils/canvas_to_domain.js";



export default function Canvas({ expression }){
    const WIDTH = 500;
    const HEIGHT = 500;
    const [zoomValue, setZoomValue] = useState(0);
    const canvasRef = useRef(null);
    const rangeBar = useRef(null);

    var x_domain = [-10, 10];
    var y_domain = [-10, 10];

    const canvas_domain = [WIDTH, HEIGHT];

    useEffect(() =>{

        const canvas = canvasRef.current;

        const onWheel = (e) =>{
            //console.log(e.deltaX, e.deltaY);
            console.log("tranform : ", transform(x_domain, y_domain, canvas_domain, 250, 250));
            //console.log(e.clientX, e.clientY);
    
            zoom([e.clientX, e.clientY], x_domain, y_domain, canvas_domain);
        }

        canvas.addEventListener("wheel", onWheel, { passive : false });


        return () => canvas.removeEventListener("wheel", onWheel);

    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        grid_printer(ctx, x_domain, y_domain, canvas_domain);
        plot_printer(ctx, x_domain, y_domain, canvas_domain, expression);
    }, [x_domain, y_domain]);
    

    return (
        <>
            <canvas id="plot" ref={canvasRef} width={WIDTH} height={HEIGHT} background-color="white"/>
        </>
    );
}
