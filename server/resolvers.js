class Channel {
  constructor(source) {
    this.id = null;
    this.name = null;
    this.messages = [];

    Object.assign(this, source);
  }

  static create(id, name, messages = []) {
    return new Channel({ id, name, messages });
  }
}

class Message {
  constructor(source) {
    this.id = null;
    this.text = null;

    Object.assign(this, source);
  }

  static create(id, text) {
    return new Message({ id, text });
  }
}

const channels = [
  Channel.create(1, "soccer", [
    Message.create(1, "hi"),
    Message.create(2, "bye")
  ]),
  Channel.create(2, "basketball")
];

let nextChannelId = 3;
let nextMessageId = 3;

module.exports = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find(ch => String(ch.id) === String(id));
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      // Use for testing optimistic writes
      //throw new Error("Test error");

      const newChannel = Channel.create(nextChannelId, args.name);
      channels.push(newChannel);
      nextChannelId++;
      return newChannel;
    }
  }
};
