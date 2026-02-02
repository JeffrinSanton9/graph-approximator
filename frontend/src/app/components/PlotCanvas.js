"use client"
import { useRef, useEffect, useState } from "react";
import "@/app/globals.css";
import grid_printer from "@/app/utils/grid.js";
import plot_printer from "@/app/utils/plot_printer.js";
import { zoom_out, zoom_in } from "@/app/utils/zoomer.js";
import pan from "@/app/utils/panner.js";
import transform from "@/app/utils/canvas_to_domain.js";
import { transform_x, transform_y } from "@/app/utils/canvas_to_domain.js";

export default function Canvas({ expression }){
    const WIDTH = 500;
    const HEIGHT = 500;
    const [zoomValue, setZoomValue] = useState(0);

    const canvasRef = useRef(null);
    const rangeBar = useRef(null);

    const x_domain = useRef([-100, 100]);
    const y_domain = useRef([-100, 100]);

    const canvas_domain = [WIDTH, HEIGHT];

    //zooming
    useEffect(() =>{
        const canvas = canvasRef.current;
        const onWheel = (e) =>{

            if(e.deltaY < 0){
                const { x_dom, y_dom } = zoom_in([e.clientX, e.clientY], x_domain.current, y_domain.current, canvas_domain);
                x_domain.current = x_dom;
                y_domain.current = y_dom;
            }
            else{
                const { x_dom, y_dom } = zoom_out([e.clientX, e.clientY], x_domain.current, y_domain.current, canvas_domain);
                x_domain.current = x_dom;
                y_domain.current = y_dom;

            }

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            grid_printer(ctx, x_domain.current, y_domain.current, canvas_domain);
            plot_printer(ctx, x_domain.current, y_domain.current, canvas_domain, expression);

        }
        canvas.addEventListener("wheel", onWheel, { passive : false });
        return () => canvas.removeEventListener("wheel", onWheel);

    }, []);
    const startX = useRef(0);
    const startY = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;

        const onMouseDown = (e) => {
            isDragging.current = true;
            startX.current = e.clientX;
            startY.current = e.clientY;
        }

        const onMouseMove = (e) => {
            if(!isDragging.current)
                return ;

            const dx = transform_x(x_domain.current, canvas_domain, e.clientX) - transform_y(y_domain.current, canvas_domain, startX.current);
            const dy = transform_y(y_domain.current, canvas_domain, e.clientY) - transform_y(y_domain.current, canvas_domain, startY.current);
            console.log(dx, dy);
            const { x_dom, y_dom } = pan(x_domain.current, y_domain.current, canvas_domain, dx, dy);

            x_domain.current = x_dom;
            y_domain.current = y_dom;

            startX.current = e.clientX;
            startY.current = e.clientY;

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            grid_printer(ctx, x_domain.current, y_domain.current, canvas_domain);
            plot_printer(ctx, x_domain.current, y_domain.current, canvas_domain, expression);
        }

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
        grid_printer(ctx, x_domain.current, y_domain.current, canvas_domain);
        plot_printer(ctx, x_domain.current, y_domain.current, canvas_domain, expression);
    }, [x_domain, y_domain]);

    const [start, setStart] = useState(false);
    const hover = (e) =>{
    }
    

    return (
        <>
            <canvas id="plot" ref={canvasRef} width={WIDTH} height={HEIGHT} background-color="white"/>
        </>
    );
}
