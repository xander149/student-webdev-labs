// Add your code here

const calculateAge = function logCalculateAge(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    if (isNaN(new Date(birthDateStr))) {
        console.error("Error: Invalid date format");
    }
    else {
        const todayDate = new Date();
        const years = todayDate.getFullYear() - birthDate.getFullYear();
        //Since we're doing age, I check if their birthday has passed yet.
        //If not, I subtract a year from the elapsed years.
        if (todayDate.getMonth() < birthDate.getMonth() || 
        (todayDate.getMonth() == birthDate.getMonth() && 
        todayDate.getDay() < birthDate.getDay())) {
            --years;
        }
        if (years < 0)
        {
            console.error("Error: Birth date cannot be in the future");
        }
        else if (years > 125)
        {
            console.log("Are you sure you are more than 125 years old?")
        }
        else
        {
            console.log(`You are ${years} years old`)
        }
    }
}

console.log(calculateAge('2000-07-01'));
// You are 25 years old
console.log(calculateAge('1988-05-18'));
// You are 38 years old
console.log(calculateAge('2190-01-01'));
// Error: Birth date cannot be in the future
console.log(calculateAge('1800-01-01'));
// Are you sure you are more than 125 years old?
console.log(calculateAge('invalid-date'));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
