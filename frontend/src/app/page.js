"use client"
import Canvas from "@/app/components/PlotCanvas.js";
import {useState} from "react";
import './globals.css';
export default function Home() {

    const math = require("mathjs");
    return (
        <>
            <Canvas expression = {"e^(-0.1 * x)sin(5x)"}/>
        </>
    );
}
