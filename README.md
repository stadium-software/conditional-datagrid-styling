# Conditional Datagrid Styling
A sample that allows for styling datagrid rows or cells by cell content

https://github.com/stadium-software/conditional-datagrid-styling/assets/2085324/5fc39d42-332c-4f52-afb4-efee9e5aef54

<hr>

## Version
1.0

<hr>

## Components

1. [Database](#Database)
2. [Datagrid](#Datagrid)
3. [Conditions Type](#Conditions-Type)
4. [CSS Styles](#CSS-Styles)
5. [Global Scripts](#Global-Scripts)
   1. [Date Column Script](#DateColumnsStyler)
   2. [Number Column Script](#NumberColumnsStyler)
   3. [Text Column Script](#TextColumnsStyler)

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

![Conditions-Type](https://github.com/stadium-software/conditional-datagrid-styling/assets/2085324/d9274b0a-78db-4f01-9125-bfa86fd7f5f5)


### CSS Styles
Paste the CSS below into the application *Stylesheet*

```
/*row selector*/
.watched.data-grid-container .table-striped > tbody { 
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

## Global Scripts

The sample caters for three data types

| Script name | 
| -------- | 
| [DateColumnsStyler](#DateColumnsStyler) | 
| [NumberColumnsStyler](#NumberColumnsStyler) |
| [TextColumnsStyler](#TextColumnsStyler) | 

<hr>

### DateColumnsStyler

1. Create a Global Script and call it DateColumnsStyler
2. Add the input parameters below to the script

<table><tr><th>Parameters</th><th>Notes</th></tr><tr><td>AttachToRow</td><td> A boolean</td></tr><tr><td>ColumnHeading</td><td>Headings might contain spaces</td></tr><tr><td>Conditions</td><td>A List of type *Conditions*</td></tr><tr><td>DGClassName</td><td>Add this to the DG</td></tr></table>

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

1. Create a Global Script and call it NumberColumnsStyler
2. Add the input parameters below to the script

<table><tr><th>Parameters</th><th>Notes</th></tr><tr><td>AttachToRow</td><td> A boolean</td></tr><tr><td>ColumnHeading</td><td>Headings might contain spaces</td></tr><tr><td>Conditions</td><td>A List of type *Conditions*</td></tr><tr><td>DGClassName</td><td>Add this to the DG</td></tr></table>

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

1. Create a Global Script and call it TextColumnsStyler
2. Add the input parameters below to the script

<table><tr><th>Parameters</th><th>Notes</th></tr><tr><td>AttachToRow</td><td>A boolean</td></tr><tr><td>ColumnHeading</td><td>Headings might contain spaces</td></tr><tr><td>CellClassNames</td><td>a List of type *Any*</td></tr><tr><td>DGClassName</td><td>Add this to the DG</td></tr></table>

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

In order to apply styles to a DataGrid row or column, the corresponding script must be executed in the Page.Load event handler. 

### Date Column Styling

1. Add a List of type *Conditions*
2. Open the *Items Editor* on the *Value* property
   1. Add the name of a CSS class (e.g. black-bg)
   2. Open the *Items Editor* on the *conditions* property
      1. Enter the first condition (e.g. ">='2020/01/01'" for greater than or equals to first of Jan 2020)
      2. Enter a second condition (e.g. "<'2021/01/01'" for smaller than Jan first 2021)
   3. All dates MUST be enclosed in single quotes
   4. All conditions will be chained using *&&* operators (AND)
   5. Check out the [supported Javascript comparison operators](#Supported-Operators)

https://github.com/stadium-software/conditional-datagrid-styling/assets/2085324/e5f195de-572d-46d3-a8e6-ccc6f8393d23

3. Drag the DateColumnsStyler script under the List
4. Provide the input parameters as per the table below

| Parameter | Value |
|---------|-------------|
| DGClassName | *watched* |
| Column Heading | Copy the heading from the DataGrid |
| Conditions | The above mentioned list of conditions |
| AttachToRow | A boolean to indicate if the row or cell will be styled |

5. Drag in the query and SetValue to populate the DataGrid as per usual

### Number Column Styling

1. Add a List of type *Conditions*
2. Open the *Items Editor* on the *Value* property
   1. Add the name of a CSS class (e.g. black-bg)
   2. Open the *Items Editor* on the *conditions* property
      1. Enter the first condition (e.g. ">0" for greater than 0)
      2. Enter a second condition (e.g. "<6" for smaller than 6)
   3. All conditions will be chained using *&&* operators (AND)
   4. Check out the [supported Javascript comparison operators](#Supported-Operators)

https://github.com/stadium-software/conditional-datagrid-styling/assets/2085324/6203032b-580f-4157-9045-c95f0c43dca9

3. Drag the NumberColumnsStyler script under the List
4. Provide the input parameters as per the table below

| Parameter | Value |
|---------|-------------|
| DGClassName | *watched* |
| Column Heading | Copy the heading from the DataGrid |
| Conditions | The above mentioned list of conditions |
| AttachToRow | A boolean to indicate if the row or cell will be styled |

5. Drag in the query and SetValue to populate the DataGrid as per usual

### Text Column Styling

Text columns are styled by adding CSS classes to the stylesheet that correspond with the values in the datagrid.

Some examples:

| Column Text | CSS Class | Stylesheet |
|--------|-----------|------------|
| Meat Products | meat_products | .meat_products { color: red; } |
| Dairy Products | dairy_products |.dairy_products { color: yellow; } |
| Seafood and Fish | seafood_and_fish | .seafood_and_fish { color: blue; } |

1. Add a List of type *Any*
2. Open the *Items Editor* on the *Value* property
   1. Add the names of all CSS classes you have added to your stylesheet
   2. All classes must have a corresponding value in the datagrid
   3. All values MUST be lowercase
   4. Spaces in the datagrid value must be replaced with underscores

https://github.com/stadium-software/conditional-datagrid-styling/assets/2085324/6e6b94ed-da47-4d32-9353-e5fc15ac168b

3. Drag the TewtColumnsStyler script under the List
4. Provide the input parameters as per the table below

| Parameter | Value |
|---------|-------------|
| DGClassName | *watched* |
| Column Heading | Copy the heading from the DataGrid |
| CellClassNames | The above mentioned list of class names |
| AttachToRow | A boolean to indicate if the row or cell will be styled |

5. Drag in the query and SetValue to populate the DataGrid as per usual

### Supported Operators

| Operator | Description |
|--------|----------|
| == | equals |
| != | not equal |
| > | greater than |
| < | less than |
| >= | greater than or equal to |
| <= | less than or equal to |

