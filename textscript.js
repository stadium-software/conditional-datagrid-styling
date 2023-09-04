var columnNumber = ~.Parameters.Input.ColumnNumber;
var tableClassName = "." + ~.Parameters.Input.DGClassName;
var attachtorow = ~.Parameters.Input.AttachToRow;
var cellclassnames = ~.Parameters.Input.CellClassNames;

function styleRows() {
    let arrPageRows = document.querySelectorAll(tableClassName + " tbody tr");
    for (let i = 0; i < arrPageRows.length; i++) {
        let parentEl = arrPageRows[i];
        let cell = parentEl.querySelector("td:nth-child(" + columnNumber + ") div");
        for (let i = 0; i < cellclassnames.length; i++) {
            parentEl.classList.remove(cellclassnames[i]);
            cell.parentElement.classList.remove(cellclassnames[i]);
        }
    }
    for (let i = 0; i < arrPageRows.length; i++) {
        let parentEl = arrPageRows[i];
        let cell = parentEl.querySelector("td:nth-child(" + columnNumber + ") div");
        if (cell) {
            attachClass(cell, parentEl, cell.innerText.toLowerCase());
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