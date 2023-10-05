import Client from "./../model/client/model.js";
import Coach from "./../model/coach/model.js";
import Chat from "./../model/chat/model.js";

/**
 * handle socket connection
 * @param {Object} io - The io object
 * @description events: ['send', 'receive']
 * @description 'send' event format: send(msg, toWhom, dbClientId)
 * @description 'receive' event format: receive(msg)
 */

const handleSocket = (io) => {
  // Middleware to the Socket
  io.use(async (socket, next) => {
    const {
      auth: { token, role, chat },
    } = socket.handshake;
    let user;

    if (token && role && role === "coach") {
      user = await Coach.findById(token);
      if (user) {
        user.socketId = socket.id;
        socket.coachId = user._id;
        socket.chatId = chat;
        await user.save();
        next();
      }
    } else if (token && role && role === "client") {
      user = await Coach.findById(token);
      if (user) {
        user.socketId = socket.id;
        socket.clientId = user._id;
        socket.chatId = chat;
        await user.save();
        next();
      }
    } else {
      next(new Error("Not authenticated!"));
    }
  });

  // Handle Socket Events
  io.on("connection", async (socket) => {
    const { clientId, coachId, chatId } = socket;

    socket.on("send", async (msg, otherId) => {
      socket.broadcast.to(otherId).emit("receive", msg);

      let success = await Chat.findOneAndUpdate(
        {
          chatId,
        },
        {
          $push: {
            messages: { message: msg, sender: socket.handshake.auth?.role },
          },
        }
      );
    });

    socket.on("disconnect", async (cause) => {
      console.log(`Disconnecting from ${id}, ${cause}`);
      if (clientId) {
        await Client.findByIdAndUpdate(clientId, {
          $unset: { socketId: null },
        });
      } else if (coachId) {
        await Coach.findByIdAndUpdate(coachId, {
          $unset: { socketId: null },
        });
      }
    });
  });
};

export default handleSocket;
