
function calculateFalsePositionMethod() {
    const equation = document.getElementById("fmequation").value;
    const decimalPlaces = Number(document.getElementById("fmdecimal-places").value);
    const maxIterations = Number(document.getElementById("fmiteration").value);
    let a = Number(document.getElementById("fmxl").value);
    let b = Number(document.getElementById("fmxr").value);
    let tableBody = document.getElementsByClassName("fmbody")[0];
    tableBody.innerHTML = "";
    let fa, fb, xm, fxm = 0;
    let iterations = 1
    let manualSolving = "";

    function f(x) {
        const equationWithValues = equation.replace(/\^/g, "**").replace(/e(?![\w])/g, Math.E).replace(/[a-zA-Z]/g, x);
        return eval(equationWithValues);
    }-4

    for (iterations; iterations <= maxIterations; iterations++) {
        fa = f(a);
        fb = f(b);
        xm = (b * fa - a * fb) / (fa - fb);
        fxm = f(xm);
         // add the manual solving process to a string variable
        manualSolving += `
            <p><strong>Iteration ${iterations}:</strong></p>
            <ul>
                <li>X<sub>L</sub> = ${a.toFixed(decimalPlaces)}, X<sub>R</sub> = ${b.toFixed(decimalPlaces)}</li>
                <li>f(X<sub>L</sub>) = ${equation.replace(/\b([a-df-zA-DF-Z]|e\*\*?)\b/g, a.toFixed(decimalPlaces))} = ${fa.toFixed(decimalPlaces)}</li>
                <li>f(X<sub>R</sub>) = ${equation.replace(/\b([a-df-zA-DF-Z]|e\*\*?)\b/g, b.toFixed(decimalPlaces))} = ${fb.toFixed(decimalPlaces)}</li>
                <li>X<sub>m</sub> =  (${a.toFixed(decimalPlaces)} + ${b.toFixed(decimalPlaces)}) / 2 = ${xm.toFixed(decimalPlaces)}</li>
                <li>f(X<sub>m</sub>) = ${equation.replace(/\b([a-df-zA-DF-Z]|e\*\*?)\b/g, xm.toFixed(decimalPlaces))} = ${fxm.toFixed(decimalPlaces)}</li>
            </ul>
            <br>
        `;
        let row = tableBody.insertRow();
        row.innerHTML = 
        `<td>${iterations}</td>
        <td>${a.toFixed(decimalPlaces)}</td>
        <td>${b.toFixed(decimalPlaces)}</td>
        <td>${fa.toFixed(decimalPlaces)}</td>
        <td>${fb.toFixed(decimalPlaces)}</td>
        <td>${xm.toFixed(decimalPlaces)}</td>
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
  document.getElementById("manual-solve-fm").innerHTML = manualSolving;
}
