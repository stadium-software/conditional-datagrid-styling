# Conditional Datagrid Styling
A sample that allows for styling datagrid rows or cells by cell content

https://github.com/stadium-software/conditional-datagrid-styling/assets/2085324/5fc39d42-332c-4f52-afb4-efee9e5aef54

<hr>

## Version
1.0

<hr>

## Components

1. Database
2. Datagrid
3. Conditions Type
4. CSS Styles
5. Global Scripts
   1. Number Column Script
   2. Text Column Script
   3. Date Column Script

<hr>

## Setup instructions
These instructions apply to Stadium 6 only.

<hr>

### Database
Create the MSSQL database by running the SQL script in the Database folder of this repo. 

### DataGrid

1. Add a Database connector to the Database you created in the step above 
2. Add a query to select the data for the DataGrid
```
select * from MyData
```
3. Add a DataGrid Control to a page
4. Add a class entitled "watched" to the DataGrid classes property
5. Define DataGrid columns in the *Columns* property of the DataGrid
6. Open the StartPage.load event handler
7. Drag the query in the StartPage.Load event handler of the page
8. Drag a SetValue function under the query in the StartPage.load event handler
9. Assign the data returned by the query to the DataGrid

<hr>

### Conditions Type

1. Add a new type by clicking the *Type* button in the top toolbar of the Stadium Designer
2. Name the type "Conditions"
3. Add two properties to the type as per the table below

| Property Name | Property Type |
| -------- | ------- |
| class | Any |
| conditions | List |

### CSS Styles
Paste the CSS below into the application *Stylesheet*

```
/*row selector*/
.mygrid.data-grid-container .table-striped > tbody { 
	.orange-bg {
		background-color: rgba(152, 237, 107, .5);
		color: black;
	}
	.grey-bg {
		background-color: rgba(209, 214, 86, .5);
	}
	.black-bg {
		background-color: rgba(0, 77, 54, .5);
		color: white;
	}
	.green-bg {
		background-color: rgba(86, 214, 112, .5);
		color: black;
	}
	.bold-font {
		font-weight: bold;
	}
	.yellow-bg {
		background-color: rgba(247, 223, 99, .5);
	}
	.subscribed {
		background-color: rgba(0, 77, 54, .5);
		color: white;
	}
	.unsubscribed {
		background-color: rgba(247, 42, 99, .5);
		color: white;
	}
	.no_data {
		background-color: rgba(214, 170, 86, .5);
	}
}
```

### Global Scripts
Add three global scripts to your application as per the table below for three data types

| Script name | 
| -------- |
| [DateColumnsStyler](#DateColumnsStyler) | 
| NumberColumnsStyler |
| TextColumnsStyler | 

<hr>

## DateColumnsStyler

1. Define the input parameters below
|AttachToRow (boolean) || ColumnHeading (might contain spaces) || Conditions (a List of type *Conditions*) || DGClassName (add this to the DG)|
2. Drag a Javascript action into the script and paste the Javascript below unaltered into the action
```
var columnHeading = ~.Parameters.Input.ColumnHeading;
var tableClassName = "." + ~.Parameters.Input.DGClassName;
var data = ~.Parameters.Input.Conditions;
var attachtorow = ~.Parameters.Input.AttachToRow;

function styleRows() {
    let columnNumber = getColumnNumber(columnHeading);
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
    let conditionsString = "";
    let and = "";
    for (let i = 0; i < conds.length; i++) {
        conditionsString += and + "'" + celltext + "'" + conds[i];
        and = " && ";
    }
    let fn = new Function("return " + conditionsString);
    return fn();
}
function getColumnNumber(title) { 
    let arrHeadings = document.querySelectorAll(tableClassName + " thead th a");
    let colNo = 0;
    for (let i = 0; i < arrHeadings.length; i++) {
        if (arrHeadings[i].innerText.toLowerCase() == title.toLowerCase()) { 
            colNo = i + 1;
        }
    }
    return colNo;
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
```

#### NumberColumnsStyler

1. Define the input parameters below
|AttachToRow (boolean) || ColumnHeading (might contain spaces) || Conditions (a List of type *Conditions*) || DGClassName (add this to the DG)|
2. Drag a Javascript action into the script and paste the Javascript below unaltered into the action
```
var columnHeading = ~.Parameters.Input.ColumnHeading;
var tableClassName = "." + ~.Parameters.Input.DGClassName;
var data = ~.Parameters.Input.Conditions;
var attachtorow = ~.Parameters.Input.AttachToRow;

function styleRows() {
    let columnNumber = getColumnNumber(columnHeading);
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
function getColumnNumber(title) { 
    let arrHeadings = document.querySelectorAll(tableClassName + " thead th a");
    let colNo = 0;
    for (let i = 0; i < arrHeadings.length; i++) {
        if (arrHeadings[i].innerText.toLowerCase() == title.toLowerCase()) { 
            colNo = i + 1;
        }
    }
    return colNo;
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
```

#### TextColumnsStyler

1. Define the input parameters below
| AttachToRow (boolean) || CellClassNames (a List of type *Any*) || ColumnHeading (might contain spaces) || DGClassName (add this to the DG) |
2. Drag a Javascript action into the script and paste the Javascript below unaltered into the action
```
var columnHeading = ~.Parameters.Input.ColumnHeading;
var tableClassName = "." + ~.Parameters.Input.DGClassName;
var attachtorow = ~.Parameters.Input.AttachToRow;
var cellclassnames = ~.Parameters.Input.CellClassNames;

function styleRows() {
    let columnNumber = getColumnNumber(columnHeading);
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
            let cellText = cell.innerText.toLowerCase();
            attachClass(cell, parentEl, cellText.replace(" ","_"));
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
function getColumnNumber(title) { 
    let arrHeadings = document.querySelectorAll(tableClassName + " thead th a");
    let colNo = 0;
    for (let i = 0; i < arrHeadings.length; i++) {
        if (arrHeadings[i].innerText.toLowerCase() == title.toLowerCase()) { 
            colNo = i + 1;
        }
    }
    return colNo;
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
```

<hr>

## Page.Load Event Handlers

