# Create an editable table

These files can be used as a template for creating an editable table.

# Structure of how it works

* Starts off running the convertHoursInRowsToArray and convertWeekTotalCellsToArray so that the arrays needed for the Week Total cell are populated
* Runs refresh so that the cells are editable as soon as the page loads
* The first date in week 1 set to always be next Monday
* The user inputs the number of rows they want to add and hit submit


# Explaination of functions

* **convertHoursInRowsToArray**: This creates an array tied to each of the hours cells in each row. So if there are 2 rows, the for loop would create one array of [row1 cell1, row1 cell2, ....] and push that to the global variable arrayOfDailyHoursRows. Then it would create another array [row2 cell1, row2 cell2, ....] and push this. End result will give the arrayOfDailyHoursRows two arrays [[row1 cell1, row1 cell2, ....], [row2 cell1, row2 cell2, ....]].
* sd
