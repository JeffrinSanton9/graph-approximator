import transform from './transform.js';
import { transform_x, transform_y } from './transform.js';
import grid_printer from './grid.js';
import plot_printer from './plot_printer.js';

function plotter() {
    const WIDTH = 500;
    const HEIGHT = 500;

    const canvas = document.getElementById("plot");
    const ctx = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var x_domain = [-40, 40];
    var y_domain = [-40, 40];

    const canvas_domain = [WIDTH, HEIGHT]
    grid_printer(ctx, x_domain, y_domain, canvas_domain);
    plot_printer(ctx, x_domain, y_domain, canvas_domain, "x^2"); 

    const xp_pan_slider = document.getElementById('xp-pan');
    const xn_pan_slider = document.getElementById('xn-pan');
    const yp_pan_slider = document.getElementById('yp-pan');
    const yn_pan_slider = document.getElementById('yn-pan');


    xn_pan_slider.addEventListener('input', function() {
       x_domain[0] = -this.value;
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       grid_printer(ctx, x_domain, y_domain, canvas_domain);
    })
    yn_pan_slider.addEventListener('input', function() {
       y_domain[0] = -this.value;
       y_domain[1] = this.value;
       console.log(this.value);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       grid_printer(ctx, x_domain, y_domain, canvas_domain);
    })
    xp_pan_slider.addEventListener('input', function() {
       x_domain[1] = this.value;
        y_domain[1] = this.value;
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       grid_printer(ctx, x_domain, y_domain, canvas_domain);
    })
    yp_pan_slider.addEventListener('input', function() {
       y_domain[1] = this.value;
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       grid_printer(ctx, x_domain, y_domain, canvas_domain);
    })
}
plotter();
    
