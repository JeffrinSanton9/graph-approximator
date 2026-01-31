import evaluator from './evaluate.js';
import transform from './domain_to_canvas.js';

export default function plot_printer(ctx, x_domain, y_domain, canvas_domain, expression){
    var pre = undefined;
    for(let x = x_domain[0]; x < x_domain[1]; x += 0.01){

        const y = evaluator(x_domain, y_domain, canvas_domain, expression, x);
        const canvas_point = transform(x_domain, y_domain, canvas_domain, x, y);

        if(pre === undefined){
            pre = canvas_point;
            continue;
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(pre[0], pre[1]); 
        ctx.lineTo(canvas_point[0], canvas_point[1]); 
        ctx.stroke();
        
        pre = canvas_point;
    }
}
 
