# Create an editable table

These files can be used as a template for creating an editable table.

# Structure of how it works

* Starts off running the convertHoursInRowsToArray and convertWeekTotalCellsToArray so that the arrays (arrayOfDailyHoursRows and arrayOfWeekTotalCells) needed for the Week Total cell are populated.
* Runs refresh so that the cells are editable as soon as the page loads
* The first date in week 1 is set to always be next Monday. Having a default first row is important because it gets used as a reference in the addNewRow function.
* The user inputs the number of rows they want to add and hit submit. They can continue to add as many rows as they want.


# Explanation of functions

* **convertHoursInRowsToArray**: This creates an array tied to each of the hours cells in each row. So if there are 2 rows, the for loop would create one array of [row1 cell1, row1 cell2, ....] and push that to the global variable arrayOfDailyHoursRows. Then it would create another array [row2 cell1, row2 cell2, ....] and push this. End result will give the arrayOfDailyHoursRows two arrays [[row1 cell1, row1 cell2, ....], [row2 cell1, row2 cell2, ....]].

* **convertWeekTotalCellsToArray**: This creates an array of each Week Total cell. So if there are 2 rows, the variable arrayOfWeekTotalCells will contain [weekTotal1, weekTotal2].

* **updateWeekTotal**: After running the convertHoursInRowsToArray, you now have an array that holds arrays for each row containing the hours in each day. So you can sum the values of the hours in each day for each row using .reduce. With the sum for a specific row, this function then writes that value into the Week Total cell of that row.

* **shortDate**: This takes a date and returns it in a mm/dd/yyyy format

* **getNextMonday**: This takes a date and returns the next Monday from that date. I use this to populate the date cell in the first row.  

* **addDays**: This takes a date and returns the next Monday from that date. I use this to populate every date beyond the first date by adding 7.

* **addNewRow**: This adds a new row by first adding an empty row, then adding cells equal to the number of cells in the first default row. It also populates each cell with the if statement depending on its position.

* **howManyRowsToAdd**: This gets the value of the user input and uses it for the for loop so that it will add rows equal to the user input by running the addNewRow function. After adding the rows, it resets the values of the arrays (arrayOfDailyHoursRows  and arrayOfWeekTotalCells) to avoid pushing the same values multiple times. It then runs the functions convertHoursInRowsToArray and convertWeekTotalCellsToArray so that the new rows are now added to arrayOfDailyHoursRows  and arrayOfWeekTotalCells.

* **userSubmit**: This is tied to the submit button on page. This simply runs others functions.

* **refresh**: The code within the refresh function is responsible for allowing the table to be editable. The video I watched to write this was originally written on its own without being included in a function. This works when the page is first loaded, it lets all the cells initially loaded to be editable but the problem is that any new cells added using my addNewRow function would not be editable. I later realized that this was because the new value of "cells" (which would now include the cells of the new rows) was not accounted for since the code ran when the page first loads but never again. Putting it all within this refresh function allowed me to update the value of cells, then call this function so that it now uses this newer version of cells.

  * **For loop within refresh**: This was mainly copied from youtube video. I will do my best to explain how it works. The for loop runs for the total number of cells in the table. So in each loop, it adds an onclick listener to each cell in the table. When a cell is clicked it adds an attribute "data-clicked". This is used in the first if statement, it pretty much says if this has been clicked do nothing. A new variable called "input" is created and is given a lot of features. This "input" is a HTML element of input, which is the empty text box. So the code creates an empty text box (HTML input) in the cell whenever you click it and replaces the value of the cell with whatever is typed into the box.
