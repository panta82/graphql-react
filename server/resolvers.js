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
let nextId = 3;

module.exports = {
  Query: {
    channels: () => {
      return channels;
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      // Use for testing optimistic writes
      //throw new Error("Test error");

      const newChannel = Channel.create(nextId, args.name);
      channels.push(newChannel);
      nextId++;
      return newChannel;
    }
  }
};
