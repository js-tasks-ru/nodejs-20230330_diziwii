function sum(...args) {
  return args.reduce((acc, num) => {
    if (typeof num !== 'number') {
      throw new TypeError();
    }

    return acc + num;
  }, 0);
}

module.exports = sum;
