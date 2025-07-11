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

function toIsoLocalDate(strDate) {
    if (!validateDate(strDate)) {
        console.log('wrong date format!');
        process.exit(0);
    }
    const date = new Date(strDate);
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

function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return(tomorrow.toISOString());
}

module.exports = {isoLocalDate, toIsoLocalDate, validateDate, getTomorrow};