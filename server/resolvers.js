class Channel {
  constructor(source) {
    this.id = null;
    this.name = null;

    Object.assign(this, source);
  }

  static create(id, name) {
    return new Channel({ id, name });
  }
}

const channels = [Channel.create(1, "soccer"), Channel.create(2, "basketball")];

module.exports = {
  Query: {
    channels: () => {
      return channels;
    }
  }
};
