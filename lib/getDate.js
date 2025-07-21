function isoLocalDate() {
  const now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  const year = now.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
}

function toIsoLocalDate(strDate) {
  if (!validateDate(strDate)) {
    console.log("wrong date format!");
    process.exit(1);
  }
  const date = new Date(strDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
}

function toIsoDate(strDate) {
  if (!validateDate(strDate)) {
    console.log("wrong date format!");
    process.exit(1);
  }

  const date = new Date(strDate);
  const isoDate = date.toISOString();
  return isoDate.slice(0, 10);
}

function validateDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function getTomorrow(date) {
  const tomorrow = date ? new Date(date) : new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString();
}

function getYesterday(date) {
  const yesterday = date ? new Date(date) : new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString();
}

module.exports = {
  isoLocalDate,
  toIsoLocalDate,
  toIsoDate,
  validateDate,
  getTomorrow,
  getYesterday,
};
