var columnNumber = ~.Parameters.Input.ColumnNumber;
var tableClassName = "." + ~.Parameters.Input.DGClassName;
var data = ~.Parameters.Input.Conditions;
var attachtorow = ~.Parameters.Input.AttachToRow;

function styleRows() {
    let arrPageRows = document.querySelectorAll(tableClassName + " tbody tr");
    for (let i = 0; i < arrPageRows.length; i++) {
        let parentEl = arrPageRows[i];
        let cell = parentEl.querySelector("td:nth-child(" + columnNumber + ") div");
        if (cell) {
            for (let i = 0; i < data.length; i++) {
                parentEl.classList.remove(data[i].class);
                cell.parentElement.classList.remove(data[i].class);
                if (pass(cell.innerText, data[i].conditions)) {
                    attachClass(cell, parentEl, data[i].class);
                }
            }
        }
    }
}
function attachClass(td, tr, classname) { 
    if (attachtorow) {
        tr.classList.add(classname);
    } else { 
        td.parentElement.classList.add(classname);
    }
}
function pass(celltext, conds) { 
    celltext = parseFloat(celltext);
    let conditionsString = "";
    let and = "";
    for (let i = 0; i < conds.length; i++) {
        conditionsString += and + celltext + conds[i];
        and = " && ";
    }
    let fn = new Function("return " + conditionsString);
    return fn();
}
var el = document.querySelector(tableClassName + " .table"),
options = {
    characterData: true,
    attributes: false,
    childList: true,
    subtree: true,
    characterDataOldValue: true,
},
observer = new MutationObserver(styleRows);
observer.observe(el, options);