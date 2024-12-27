import socketIo from "socket.io";
import Chat from "../models/Chat";

let users: any = {};  // Mudamos para um mapa de users mais flexível

const initSocket = (server: Express.Application) => {
    const io = new socketIo.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New connection");

        socket.on("register", (user_id) => {
            // Se o usuário já estiver registrado, desconecte o socket anterior
            if (users[user_id]) {
                const previousSocket = io.sockets.sockets.get(users[user_id]);
                if (previousSocket) {
                    previousSocket.disconnect(true);  // Desconecta o socket anterior
                }
            }
        
            users[user_id] = socket.id;
            console.log(`User registered: ${user_id} with socket id: ${socket.id}`);
        });

        socket.on("join_chat", (chat_id) => {
            // Adiciona o socket ao "room" do chat
            socket.join(chat_id);
            console.log(`User joined chat: ${chat_id}`);
        });

        socket.on("send_message", async (data) => {
            const { chat_id, message, sender_id, reciver_id } = data;
        
            try {
                const chat = await Chat.findById(chat_id);
                if (!chat) {
                    console.log("Chat not found");
                    socket.emit("send_message_response", { status: "error", message: "Chat not found" });
                    return;
                }
        
                // Adiciona a mensagem ao chat
                chat.messages.push({
                    content: message,
                    user: sender_id,
                });
                await chat.save();
        
                // Envia a mensagem para todos os usuários conectados ao chat (aqui você pode adicionar todos os participantes ao room)
                io.to(chat_id).emit("new_message", {
                    chat_id,
                    message,
                    sender_id,
                });
                socket.emit("send_message_response", { status: "success", message: "Message sent successfully", data: {
                    chat_id,
                    message,
                    sender_id,
                } });
            } catch (err) {
                console.log(err);
                socket.emit("send_message_response", { status: "error", message: "Failed to send message" });
            }
        });

        socket.on("disconnect", () => {
            for (const user_id in users) {
                if (users[user_id] === socket.id) {
                    delete users[user_id];
                    console.log(`User disconnected: ${user_id}`);
                }
            }
        });
    });
};

export default initSocket;
