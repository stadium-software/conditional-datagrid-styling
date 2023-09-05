# Conditional Datagrid Styling
A sample that allows for styling datagrid rows or cells by cell content



<hr>

## Version
1.0

## Sample Parts

1. Database
2. DataGrid
3. Conditions Type
4. Styles
5. Data Type Global Scripts
   1. Number Columns
   2. Text Columns
   3. Date Columns

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

