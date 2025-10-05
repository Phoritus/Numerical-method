import { compile, derivative } from 'mathjs';
var Algebrite = require('algebrite');

const getXL_XR_from_API = async () => {
    try {
        const res = await fetch('/api/function_LR');
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    } catch (err) {
        console.error('Failed to fetch /api/function_LR:', err);
        return [];
    }
}

const func = (fx, X) => {
    var expr = compile(fx); // f(x)
    let scope = { x: parseFloat(X) }; //f(x) ; x=input
    return expr.evaluate(scope);
}
const funcDiff = (fx, X) => {
    var expr = derivative(fx, 'x');
    let scope = {x:parseFloat(X)};
    return expr.evaluate(scope); 
}

const funcDiffDegreeN = (fx, X, degree) => {
    var temp = fx, expr;
    for (var i=1 ; i<=degree ; i++) {
        temp = derivative(temp, 'x')
        expr = temp
    }
    
    let scope = {x:parseFloat(X)}
    return expr.evaluate(scope)
}
const error = (xnew, xold) => {
    return Math.abs((xnew - xold) / xnew);
}
const exactIntegrate = (fx, a, b) => {
    var expr = compile(Algebrite.integral(Algebrite.eval(fx)).toString())
    return expr.evaluate({x:b}) - expr.evaluate({x:a})

}
export { getXL_XR_from_API, func, funcDiff, funcDiffDegreeN, error, exactIntegrate };