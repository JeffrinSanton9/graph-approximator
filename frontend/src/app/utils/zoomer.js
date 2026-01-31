import transform from '@/app/utils/domain_to_canvas.js';
export default function zoom(anchor, x_domain, y_domain, canvas_domain){
    anchor = transform(x_domain, y_domain, canvas_domain, anchor[0], anchor[1]);
    console.log(x_domain, y_domain);
    const x_left = anchor[0] - x_domain[0] 

    const x_right = x_domain[1] - anchor[0]
    const y_left = anchor[1] - y_domain[0]
    const y_right = y_domain[1] - anchor[1]
    console.log(x_left, x_right, y_left, y_right);
    if(x_right > x_left){
        x_domain[0] = x_left;
        x_domain[1] = x_left;
    }
    if(x_left > x_right){
        x_domain[0] = x_right;
        x_domain[1] = x_right;
    }
    if(y_right > y_left){
        y_domain[0] = y_left;
        y_domain[1] = y_left;
    }
    if(y_left > y_right){
        y_domain[0] = y_right;
        y_domain[1] = y_right;
    }
    console.log(x_domain, y_domain);

}
