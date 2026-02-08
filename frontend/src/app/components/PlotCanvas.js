"use client"
import { useRef, useEffect, useState } from "react";
import "@/app/globals.css";
import grid_printer from "@/app/utils/grid.js";
import plot_printer from "@/app/utils/plot_printer.js";
import { zoom } from "@/app/utils/zoomer.js";
import pan from "@/app/utils/panner.js";
import transform from "@/app/utils/canvas_to_domain.js";
import { transform_x, transform_y } from "@/app/utils/canvas_to_domain.js";
import { compile, parse } from 'mathjs'

export default function Canvas({ expression }){
    const WIDTH = 500;
    const HEIGHT = 500;
    const [zoomValue, setZoomValue] = useState(0);
    const spacing_values = [[0.1, -10000], [0.1, -30], [0.2, -20], [0.5, -10], [1, 0], [2, 2], [5, 10], [10, 15], [20, 25], [50, 35], [50, 10000]]
    var index = 4;
    var count = 2; 
    const expr = parse(expression); 
    const expr_com = expr.compile();

    const canvasRef = useRef(null);
    const rangeBar = useRef(null);

    const x_domain = useRef([-10, 10]);
    const y_domain = useRef([-10, 10]);

    const canvas_domain = [WIDTH, HEIGHT];

    const startX = useRef(0);
    const startY = useRef(0);
    const isDragging = useRef(false);

    //zooming
    useEffect(() =>{
        console.log(index);
        const canvas = canvasRef.current;
        const onWheel = (e) =>{
            if(e.deltaY < 0){
                if(count <= spacing_values[index][1]){
                    index -= 1;
                }
                count -= 1;
                const { x_dom, y_dom } = zoom(
                    [e.clientX, e.clientY], 
                    x_domain.current, 
                    y_domain.current, 
                    canvas_domain,
                    0.9
                );
                x_domain.current = x_dom;
                y_domain.current = y_dom;
            }
            else{
                if(count === spacing_values[index + 1][1]){
                    index += 1;
                }
                count += 1;
                const { x_dom, y_dom } = zoom(
                    [e.clientX, e.clientY], 
                    x_domain.current, 
                    y_domain.current, 
                    canvas_domain, 
                    1.1
                );
                x_domain.current = x_dom;
                y_domain.current = y_dom;

            }
            console.log("index: ", index, "count: ", count);

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            grid_printer(ctx, x_domain.current, y_domain.current, canvas_domain, spacing_values[index][0]);
            plot_printer(ctx, x_domain.current, y_domain.current, canvas_domain, expr_com);

        }
        canvas.addEventListener("wheel", onWheel, { passive : false });
        return () => canvas.removeEventListener("wheel", onWheel);

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        const onMouseDown = (e) => {
            isDragging.current = true;
            startX.current = e.clientX;
            startY.current = e.clientY;
        }


        const onMouseMove = (e) => {
          if (!isDragging.current) return;

          const dx = e.clientX - startX.current;
          const dy = e.clientY - startY.current;

          const { x_dom, y_dom } =
            pan(x_domain.current, y_domain.current, canvas_domain, dx, dy);

          x_domain.current = x_dom;
          y_domain.current = y_dom;

          // Update start positions to current mouse position
          startX.current = e.clientX;
          startY.current = e.clientY;

          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
          grid_printer(ctx, x_domain.current, y_domain.current, canvas_domain, spacing_values[index][0]);
          plot_printer(ctx, x_domain.current, y_domain.current, canvas_domain, expr_com);
        };
        const onMouseUp = (e) => {
            isDragging.current = false;
        }

        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);

        return () => {
            canvas.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mousedown", onMouseDown);
        }
    }, []);



    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        grid_printer(ctx, x_domain.current, y_domain.current, canvas_domain, spacing_values[index][0]);
        plot_printer(ctx, x_domain.current, y_domain.current, canvas_domain, expr_com);
    }, [x_domain, y_domain]);

    

    return (
        <>
            <canvas id="plot" ref={canvasRef} width={WIDTH} height={HEIGHT} background-color="white"/>
        </>
    );
}
