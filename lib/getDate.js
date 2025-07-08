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

module.exports = {isoLocalDate, toIsoLocalDate};