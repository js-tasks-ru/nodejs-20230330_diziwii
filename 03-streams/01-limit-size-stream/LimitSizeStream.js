const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    const bytesCount = Buffer.byteLength(chunk);

    if (this.limit >= bytesCount) {
      callback(null, chunk.toString());
      this.limit = this.limit - bytesCount;
    } else {
      callback(new LimitExceededError(), null);
    }
  }
}

module.exports = LimitSizeStream;
