module.exports = {
  generateRecentDates(numberOfDay) {
    var today = new Date();
    var dates = [];
    for (let i = 0; i < numberOfDay; i++) {
      dates[i] = new Date(today.getTime() - i * 60 * 60 * 24 * 1000);
      dates[i] = dates[i].toISOString().substring(0, 10);
    }
    return dates;
  },
  generateToday() {
    var today = new Date();
    let result = new Date(today.getTime());
    return result.toISOString().substring(0, 10);
  }
};
