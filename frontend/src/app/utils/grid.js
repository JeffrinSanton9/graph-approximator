import transform from './transform.js';
import { transform_x, transform_y } from './transform.js';
export default function grid_printer(ctx, x_domain, y_domain, canvas_domain){
    //rounds off to the nearest 5 multiple
    var cur = x_domain[0] + (5 - (x_domain[0] % 5));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    while(cur < x_domain[1]){
        const x_canvas = transform_x(x_domain, canvas_domain, cur);
        if(cur == 0.0){
            ctx.lineWidth = 4;
        }
        ctx.beginPath();
        ctx.moveTo(x_canvas, 0);
        ctx.lineTo(x_canvas, canvas_domain[1]);
        ctx.stroke();
        if(cur === 0){
            ctx.lineWidth = 1;
        }
        cur += 5;
    }
    cur = y_domain[0] + (5 - (y_domain[0] % 5));
    while(cur < y_domain[1]){
        const y_canvas = transform_y(y_domain, canvas_domain, cur);


        if(cur === 0){
            ctx.lineWidth = 4;
        }
        ctx.beginPath();
        ctx.moveTo(0, y_canvas);
        ctx.lineTo(canvas_domain[0], y_canvas);
        ctx.stroke();

        if(cur === 0){
            ctx.lineWidth = 1;
        }
        cur += 5;
    }
}
        
        


