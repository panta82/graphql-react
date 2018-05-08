const { PubSub, withFilter } = require("graphql-subscriptions");

const { Channel, Message } = require("./types");

const channels = [
  Channel.create(1, "soccer", [
    Message.create(1, "hi"),
    Message.create(2, "bye")
  ]),
  Channel.create(2, "basketball")
];

let nextChannelId = 3;
let nextMessageId = 3;

function getChannel(id) {
  return channels.find(ch => String(ch.id) === String(id)) || null;
}

const pubSub = new PubSub();

module.exports = {
  Query: {
    channels: () => {
      return channels;
    },

    channel: (root, { id }) => {
      return getChannel(id);
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
    },

    addMessage: (root, { message: { channelId, text } }) => {
      const channel = getChannel(channelId);
      if (!channel) {
        throw new Error(`Channel doesn't exist`);
      }

      const newMessage = Message.create(nextMessageId, text);
      nextMessageId++;
      channel.messages.push(newMessage);

      pubSub.publish(`messageAdded`, {
        messageAdded: newMessage,
        channelId
      });

      return newMessage;
    }
  },

  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(`messageAdded`),
        (payload, variables) => {
          return String(payload.channelId) === String(variables.channelId);
        }
      )
    }
  }
};
