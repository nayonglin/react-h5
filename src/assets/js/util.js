const util = {
  loger: {
      log(tip, data, outputJson) {
      console.log(`%c[LOG-'${tip}]%c`, util.loger.logcss("#009100"), null, data);
    },
    logcss(color) {
      return `color: ${color};font-weight:900;`;
    }
  }
};


module.exports.log = util.loger.log;
