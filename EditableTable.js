// Create editable table
// https://www.youtube.com/watch?v=uPBxzvSGIiA

// Create dynamic table
// https://www.etutorialspoint.com/index.php/11-dynamically-add-delete-html-table-rows-using-javascript

// Wanted Features
// Use arrow keys to move around like excel file
// replace some of the code with jquery




// TO DO LIST
// Make the table dynamic absed on the number of weeks inputed, link above
// read articles on why the for loop is used for events
// I use rowCount many times, should i just turn it into a function? Its so short though so i dont think its worth it
// Go through each line of the for loop that lets the cells become editable and write notes.








let table = document.getElementById("mainTable");
// let cells = table.getElementsByTagName("td");
let cells = document.getElementsByClassName("cells");








// Created a global variable that holds all the daily hours rows and week total cells
let arrayOfDailyHoursRows = [];
let arrayOfWeekTotalCells = [];

// Created an array of daily hours for each row
function convertHoursInRowsToArray() {
  // I named this rowCount2 bc there is another rowCount in addNewRow. I think
  // it would have been fine to name it the same since they are declared within
  // a variable but i wanted to be safe and avoid messing things up
  let rowCount2 = table.rows.length;

  // i is set to 1 here bc i skip the header row
  for (let i = 1; i < rowCount2; i++) {
    // This turns all the hours in days of the week to an array
    let rowNum = document.getElementsByClassName("row" + i);

    // Using the "getElementBy....." gets you an HTMLCollection, not an array. They
    // are similar but not the same. This code below converts it to an array. If I
    // didnt convert it, the reduce function would not work.
    let rowNumArray = [].slice.call(rowNum);
    arrayOfDailyHoursRows.push(rowNumArray);
  }
}

// Created an array of Week Total cells for each row
function convertWeekTotalCellsToArray() {

  let rowCount3 = table.rows.length;

  for (let i = 1; i < rowCount3; i++) {
    let calcWeekTotal = document.getElementsByClassName("weekTotal" + i);
    let calcWeekTotalArray = [].slice.call(calcWeekTotal);
    arrayOfWeekTotalCells.push(calcWeekTotalArray);
  }
}


// Now that i have an array of the daily hours for each week and an array of
// each week total cell for each row, i can sum the daily hours and put that value
// in the week total cell
function updateWeekTotal() {

  convertHoursInRowsToArray();
  convertWeekTotalCellsToArray();

  let rowCount4 = table.rows.length;

  for (let i = 1; i < rowCount4; i++) {
    // Here I use i minus 1 bc i actually want to start at 0. I could change i
    // to 0 but would then have to subtract 1 from rowcount so it doesnt really matter
    let totalHours = arrayOfDailyHoursRows[(i - 1)].reduce(function(accumlator, currentValue) {
      return accumlator + Number(currentValue.innerHTML);
    }, 0);

    arrayOfWeekTotalCells[(i - 1)].forEach(day => day.innerHTML = totalHours)
  }
}



// Dynamically add rows
// https://www.etutorialspoint.com/index.php/11-dynamically-add-delete-html-table-rows-using-javascript
// https://www.w3schools.com/jsref/met_table_insertrow.asp
function addNewRow() {

  let rowCount = table.rows.length;
  let cellCount = table.rows[0].cells.length;
  let row = table.insertRow(rowCount);

  for (let i = 0; i < cellCount; i++) {
    // let newCell = "cell" + i;
    // console.log(newCell);
    let newCell = row.insertCell(i);

    // this creates the cells, their values, and classes
    if (i === 0) {
      newCell.innerHTML = rowCount;
    } else if (i === 1) {
      newCell.innerHTML = "Placeholder for date";
    } else if (i === 9) {
      newCell.className = "weekTotal" + rowCount;
    } else {
      newCell.className = "cells row" + rowCount;
    }

    updateWeekTotal();
  }

  // This is here to update the cells variable since there are now new cells, but
  // the code for the onclick is still not working.
  cells = document.getElementsByClassName("cells");
  refresh();
}





for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = function() {

    console.log("clicled");
  }
}




// It took me a while to figure this out but i had to put the entire for loop into
// this refresh function bc the cells variable would not update as i added new
// rows since it gets ran as soon as the page loads and thats it. This resulted in
// any new cells not being able to edit. Putting it in a function lets me refresh
// the cells variable.
function refresh() {

// This for loop is what lets me click and edit each cell
  for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {

      if (this.hasAttribute("data-clicked")) {
        return;
      }

      this.setAttribute("data-clicked", "yes");
      this.setAttribute("data-text", this.innerHTML);

      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = this.innerHTML;


      // This keeps style of the cell the same when you click it.
      input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px";
      input.style.height = this.offsetHeight - (this.clientTop * 2) + "px";
      input.style.border = "0px";
      input.style.fontFamily = "inherit";
      input.style.fontSize = "inherit";
      input.style.textAlign = "inherit";
      input.style.backgroundColor = "white";
      // End of code that keeps stlye



      input.onblur = function() {
        let td = input.parentElement;
        let orig_text = input.parentElement.getAttribute("data-text");
        let current_text = this.value;

        if (orig_text != current_text) {
          // if there were changes to text
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = current_text;
          console.log(orig_text + " was changed to " + current_text);

          // I need to recalculate the weekly total after a change is made
          updateWeekTotal();


        } else {
          td.removeAttribute("data-clicked");
          td.removeAttribute("data-text");
          td.innerHTML = orig_text;
          console.log("no changes");
        }
      }

      // This waits for the event of pressing enter
      input.onkeypress = function() {
        if (event.keyCode === 13) {
          // this runs the "input.onblur" function above
          this.blur();
        }
      }

      this.innerHTML = "";
      this.style.cssText = "padding: 0px 0px";
      this.append(input);
      this.firstElementChild.select();
    }
  }
}
