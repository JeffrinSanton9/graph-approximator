import transform from '@/app/utils/canvas_to_domain.js';
import { transform_x, transform_y } from "@/app/utils/canvas_to_domain.js";

export function zoom_in(anchor, x_domain, y_domain, canvas_domain){
    anchor = transform(x_domain, y_domain, canvas_domain, anchor[0], anchor[1]);

    const x_left = anchor[0] - x_domain[0] 
    const x_right = x_domain[1] - anchor[0]
    const y_left = anchor[1] - y_domain[0]
    const y_right = y_domain[1] - anchor[1]

    if(x_right <= x_left && x_right <= y_left && x_right <= y_right){
        x_domain[0] = anchor[0] - x_right;
        x_domain[1] = anchor[0] + x_right;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
    if(x_left <= x_right && x_left <= y_right && x_left <= y_left){
        x_domain[0] = anchor[0] - x_left;
        x_domain[1] = anchor[0] + x_left;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
    if(y_left <= y_right && y_left <= x_right && y_left <= x_left){
        x_domain[0] = anchor[0] - y_left;
        x_domain[1] = anchor[0] + y_left;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
    if(y_right <= y_left && y_right <= x_left && y_right <= x_right){
        x_domain[0] = anchor[0] - y_right;
        x_domain[1] = anchor[0] + y_right;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
}
export function zoom_out(anchor, x_domain, y_domain, canvas_domain){
    anchor = transform(x_domain, y_domain, canvas_domain, anchor[0], anchor[1]);
    
    const x_left = anchor[0] - x_domain[0] 
    const x_right = x_domain[1] - anchor[0]
    const y_left = anchor[1] - y_domain[0]
    const y_right = y_domain[1] - anchor[1]

    if(x_right >= x_left && x_right >= y_left && x_right >= y_right){
        x_domain[0] = anchor[0] - x_right;
        x_domain[1] = anchor[0] + x_right;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
    if(x_left >= x_right && x_left >= y_right && x_left >= y_left){
        x_domain[0] = anchor[0] - x_left;
        x_domain[1] = anchor[0] + x_left;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
    if(y_left >= y_right && y_left >= x_right && y_left >= x_left){
        x_domain[0] = anchor[0] - y_left;
        x_domain[1] = anchor[0] + y_left;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
    if(y_right >= y_left && y_right >= x_left && y_right >= x_right){
        x_domain[0] = anchor[0] - y_right;
        x_domain[1] = anchor[0] + y_right;
        y_domain[0] = x_domain[0];
        y_domain[1] = x_domain[1];
    }
}
