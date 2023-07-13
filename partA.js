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
  }
}

payrollCalculator();
