function calculateBisectionMethod() {
    const equation = document.getElementById("equation").value;
    const decimalPlaces = Number(document.getElementById("decimal-places").value);
    const maxIterations = Number(document.getElementById("iteration").value);
    let a = Number(document.getElementById("xl").value);
    let b = Number(document.getElementById("xr").value);
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    let fa, fb, xm, fxm = 0;
    let iterations = 1
    let manualSolving = "";

    function f(x) {
        const equationWithValues = equation.replace(/\^/g, "**").replace(/e(?![\w])/g, Math.E).replace(/[a-zA-Z]/g, x);
        return eval(equationWithValues);
    }

    for (iterations; iterations <= maxIterations; iterations++) {
        xm = (a + b) / 2;
        fxm = f(xm);
        fa = f(a);
        fb = f(b);
         // add the manual solving process to a string variable
        manualSolving += `
            <p><strong>Iteration ${iterations}:</strong></p>
            <ul>
                <li>X<sub>L</sub> = ${a}, X<sub>R</sub> = ${b}</li>
                <li>X<sub>m</sub> =  (${a} + ${b}) / 2 = ${xm}</li>
                <li>f(X<sub>L</sub>) = ${equation.replace(/\b([a-df-zA-DF-Z]|e\*\*?)\b/g, a)} = ${fa.toFixed(decimalPlaces)}</li>
                <li>f(X<sub>R</sub>) = ${equation.replace(/\b([a-df-zA-DF-Z]|e\*\*?)\b/g, b)} = ${fb.toFixed(decimalPlaces)}</li>
                <li>f(X<sub>m</sub>) = ${equation.replace(/\b([a-df-zA-DF-Z]|e\*\*?)\b/g, xm)} = ${fxm.toFixed(decimalPlaces)}</li>

            </ul>
            </ul>
            <br>
        `;
        let row = tableBody.insertRow();
        row.innerHTML = 
        `<td>${iterations}</td>
        <td>${a}</td>
        <td>${b}</td>
        <td>${fa.toFixed(decimalPlaces)}</td>
        <td>${fb.toFixed(decimalPlaces)}</td>
        <td>${xm}</td>
        <td>${fxm.toFixed(decimalPlaces)}</td>`;
        if (fxm > 0) {
            a = xm;
        } else {
            b = xm;
        }
        if (Math.abs(fxm) <= Math.pow(10, -decimalPlaces)) {
            break;
        }
    }
    
  // display the manual solving process in the HTML
  document.getElementById("manual-solve-bisec").innerHTML = manualSolving;
}

