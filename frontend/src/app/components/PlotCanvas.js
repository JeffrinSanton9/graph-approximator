"use client"
import { useRef, useEffect, useState } from "react";
import "@/app/globals.css";
import grid_printer from "@/app/utils/grid.js";
import plot_printer from "@/app/utils/plot_printer.js";
import { zoom_out, zoom_in } from "@/app/utils/zoomer.js";
import transform from "@/app/utils/canvas_to_domain.js";

export default function Canvas({ expression }){
    const WIDTH = 500;
    const HEIGHT = 500;
    const [zoomValue, setZoomValue] = useState(0);
    const canvasRef = useRef(null);
    const rangeBar = useRef(null);

    var x_domain = [-100, 100];
    var y_domain = [-100, 100];

    const canvas_domain = [WIDTH, HEIGHT];

    useEffect(() =>{
        const canvas = canvasRef.current;
        const onWheel = (e) =>{
            console.log("Before", "x domain : ", x_domain, "y domain :", y_domain);
            console.log(e.deltaX, e.deltaY);
            if(e.deltaY < 0){
                zoom_in([e.clientX, e.clientY], x_domain, y_domain, canvas_domain);
            }
            else{
                zoom_out([e.clientX, e.clientY], x_domain, y_domain, canvas_domain);
            }
            console.log("after", "x domain : ", x_domain, "y domain :", y_domain);
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            grid_printer(ctx, x_domain, y_domain, canvas_domain);
            plot_printer(ctx, x_domain, y_domain, canvas_domain, expression);
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
