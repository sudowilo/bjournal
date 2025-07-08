function isoLocalDate() {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    const year = now.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return (year + '-' + month + '-' + day);

}

function toIsoLocalDate(date) {
    if (!validateDate(date)) {
        console.log('wrong date format!');
        process.exit(0);
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return (year + '-' + month + '-' + day);
}

function validateDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

module.exports = {isoLocalDate, toIsoLocalDate, validateDate};