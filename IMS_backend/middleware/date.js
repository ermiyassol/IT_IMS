
function getPreviousSevenDates() {
    const date = new Date();
    let dates = [];
    for (let index = 0; index < 7; index++) {
        // const element = array[index];
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - index);
        dates.push(previous.toLocaleDateString())
    }
    return dates;
  }

function getPreviousDate(currentDate = new Date()) {
    const date = new Date(currentDate);
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
  }

function getNextDate(currentDate = new Date()) {
    const date = new Date(currentDate);
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() + 1);
  
    return previous;
  }



module.exports ={
    getPreviousDate, getNextDate, getPreviousSevenDates
}
