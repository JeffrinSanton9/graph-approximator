import { transform_x, transform_y } from "@/app/utils/domain_to_canvas.js";
import { transform_x as transform_x_c , transform_y as transform_y_c } from "@/app/utils/canvas_to_domain.js";

//function f
export default function pan(x_domain, y_domain, canvas_domain, dx, dy) {
    const factor = 0.5; 
    return {
    x_dom: [
      x_domain[0] - dx / factor,
      x_domain[1] - dx / factor
    ],
    y_dom: [
      y_domain[0] + dy / factor, 
      y_domain[1] + dy / factor
    ]
    };
}
