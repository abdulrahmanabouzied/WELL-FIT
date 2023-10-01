import ClientRepository from "./../model/client/repo.js";
import CoachRepository from "./../model/coach/repo.js";
import Chat from "./../model/chat/model.js";

/**
 * handle socket connection
 * @param {Object} io - The io object
 * @description events: ['send', 'receive']
 * @description 'send' event format: send(msg, toWhom, dbClientId)
 * @description 'receive' event format: receive(msg)
 */

const handleSocket = (io) => {
  io.on("connection", async (socket) => {
    const {
      id,
      handshake: { auth, query },
    } = socket;
    const remoteId = query?._id;
    let result;
    console.log(`Socket connection: ${id}, ${remoteId}`);

    /* TODO: if error occured : disconnnect */

    if (query?.role === "coach") {
      result = await CoachRepository.updateById(remoteId, {
        socketId: id,
      });
      console.log(`Coach Connection: ${result.data.email}`);
    } else if (query?.role === "client") {
      result = await ClientRepository.updateById(remoteId, {
        socketId: id,
      });
      console.log(`Client Connection: ${result.data.email}`);
    }

    socket.on("send", async (msg, otherId, client) => {
      socket.broadcast.to(otherId).emit("receive", msg);

      let success = await Chat.findOneAndUpdate(
        {
          client,
        },
        {
          $push: {
            messages: { message: msg, sender: query?.role },
          },
        }
      );
    });

    socket.on("disconnect", async (cause) => {
      console.log(`Disconnecting from ${id}, ${cause}`);
      if (query?.role === "coach") {
        const result = await CoachRepository.updateById(remoteId, {
          socketId: null,
        });
      } else if (query?.role === "client") {
        const result = await ClientRepository.updateById(remoteId, {
          socketId: null,
        });
      }
    });
  });
};

export default handleSocket;
