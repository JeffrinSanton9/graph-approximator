"use client"
import Canvas from "@/app/components/PlotCanvas.js";
import {useState} from "react";
import './globals.css';
export default function Home() {

    const math = require("mathjs");
    return (
        <>
            <Canvas expression = {"0.94 * (x ^ 0) + -0.68 * (x ^ 1) + 1.2 * (x ^ 2) + -0.18 * (x ^ 3)"}/>
        </>
    );
}
