function sum(...args) {
  return args.reduce((acc, num) => {
    if (typeof num !== 'number') {
      throw new TypeError('arg not a number');
    }

    return acc + num;
  }, 0);
}

module.exports = sum;
