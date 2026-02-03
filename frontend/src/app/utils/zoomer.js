import transform from '@/app/utils/canvas_to_domain.js';
import { transform_x, transform_y } from "@/app/utils/canvas_to_domain.js";

export function zoom_in(anchor, x_domain, y_domain, canvas_domain, factor = 3){
    anchor = transform(x_domain, y_domain, canvas_domain, anchor[0], anchor[1]);

    const x_left = anchor[0] - x_domain[0] 
    const x_right = x_domain[1] - anchor[0]
    const y_top = anchor[1] - y_domain[0]
    const y_bottom = y_domain[1] - anchor[1]

    x_domain[0] += x_left   / factor;
    x_domain[1] -= x_right  / factor;
    y_domain[0] += y_top    / factor;
    y_domain[1] -= y_bottom / factor;
    return {
        x_dom : x_domain,
        y_dom : y_domain,
    }
}
export function zoom_out(anchor, x_domain, y_domain, canvas_domain, factor = 3){
    anchor = transform(x_domain, y_domain, canvas_domain, anchor[0], anchor[1]);
    
    const x_left = anchor[0] - x_domain[0] 
    const x_right = x_domain[1] - anchor[0]
    const y_bottom = anchor[1] - y_domain[0]
    const y_top = y_domain[1] - anchor[1]

    x_domain[0] -= x_left   * factor;
    x_domain[1] += x_right  * factor;
    y_domain[0] -= y_top    * factor;
    y_domain[1] += y_bottom * factor;

    return {
        x_dom : x_domain,
        y_dom : y_domain,
    }
    
}
