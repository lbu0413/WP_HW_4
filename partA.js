let payroll_btn = document.getElementById("payroll_btn");
let main_div = document.getElementById("main_div");

function payrollCalculator() {
  let hours = []; // hours array containg each employee's hours worked
  let pay = []; // pay array containg each employee's pay roll
  let totalPay = 0;
  let index = 1; // the number of employees starting from 1
  let hourlyRate = 15; // hourly rate is 15 if not worked overtime.

  while (true) {
    let userInput = prompt(
      "Enter hours worked for employee " + index + " (or enter -1 to stop)"
    );

    // If user does not type anything, break.
    if (userInput === null) {
      break;
    }

    let hoursWorked = parseInt(userInput);

    // -1 means no more employees so we stop the prompt.
    if (hoursWorked === -1) {
      break;
    }
    // if an employee worked more than 40 hours per week, hourlyRate is 1.5 times origianl rate
    if (hoursWorked > 40) {
      hourlyRate *= 1.5;
    }

    hours.push(hoursWorked); // each employee's working hours pushed to hours array
    pay.push(hoursWorked * hourlyRate); // each employee's payroll pushed to pay array

    index++;
  }

  let table = document.createElement("table");
  let headerRow = table.insertRow();
  let header1 = headerRow.insertCell();
  let header2 = headerRow.insertCell();
  let header3 = headerRow.insertCell();

  header1.textContent = "Employee";
  header2.textContent = "Hours";
  header3.textContent = "Pay";

  for (let i = 0; i < hours.length; i++) {
    let row = table.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();

    cell1.textContent = i + 1;
    cell2.textContent = hours[i];
    cell3.textContent = pay[i];

    totalPay += pay[i];
  }

  main_div.appendChild(table);

  let summaryLine = document.createElement("p");
  summaryLine.textContent = "Total pay of all employees: " + totalPay;
  main_div.appendChild(summaryLine);
}

payroll_btn.addEventListener("click", payrollCalculator);
