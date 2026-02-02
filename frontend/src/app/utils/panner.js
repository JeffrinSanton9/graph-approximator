import { transform_x, transform_y } from "@/app/utils/domain_to_canvas.js";
import { transform_x as transform_x_c , transform_y as transform_y_c } from "@/app/utils/canvas_to_domain.js";
export default function pan(x_domain, y_domain, canvas_domain, dx, dy){

    const x_dom = x_domain;
    const y_dom = y_domain;
    return {
        x_dom : [x_dom[0] - dx, x_dom[1] - dx],
        y_dom : [y_dom[0] - dy, y_dom[1] - dy],
    }
}
