"use client"
import { useRef, useEffect } from "react";
import "@/app/globals.css";
import grid_printer from "@/app/utils/grid.js";
import plot_printer from "@/app/utils/plot_printer.js";

export default function Canvas({ expression }){
    const WIDTH = 500;
    const HEIGHT = 500;
    
    const canvasRef = useRef(null);

    var x_domain = [-20, 20];
    var y_domain = [-20, 20];

    const canvas_domain = [WIDTH, HEIGHT];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        grid_printer(ctx, x_domain, y_domain, canvas_domain);
        plot_printer(ctx, x_domain, y_domain, canvas_domain, expression);
    }, [x_domain, y_domain]);

    return <canvas id="plot" ref={canvasRef} width={WIDTH} height={HEIGHT}/>
}


