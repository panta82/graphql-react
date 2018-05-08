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

module.exports = {
  Channel,
  Message
};
