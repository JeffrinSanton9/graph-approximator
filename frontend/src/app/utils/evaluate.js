import { compile, parse, evaluate } from 'mathjs'

export default function evaluator(x_domain, y_domain, canvas_domain, expression, x){
    const expr = parse(expression); 
    const expr_com = expr.compile();

    
    const res = expr_com.evaluate({x});
    return res;  
}

