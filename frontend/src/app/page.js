import Canvas from "@/app/components/PlotCanvas.js";
import './globals.css';

export default function Home() {
  return (
      <>
    <Canvas expression = {"x^2"}/>
    <input type="range" id="xp-pan" min="0" max="100"></input>
    <input type="range" id="xn-pan" min="0" max="100"></input>
    <input type="range" id="yp-pan" min="0" max="100"></input>
    <input type="range" id="yn-pan" min="0" max="100"></input>
      </>
  );
}
