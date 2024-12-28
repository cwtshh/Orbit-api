import socketIo from "socket.io";
import Chat from "../models/Chat";
import { Expo } from "expo-server-sdk";
import User from "../models/User";

let users: any = {}; 
let expo = new Expo();
let userPushTokens: any = {};

const initSocket = (server: Express.Application) => {
    const io = new socketIo.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New connection");

        socket.on("register", (user_id, push_token) => {
            // Se o usuário já estiver registrado, desconecte o socket anterior
            if (users[user_id]) {
                const previousSocket = io.sockets.sockets.get(users[user_id]);
                if (previousSocket) {
                    previousSocket.disconnect(true);  // Desconecta o socket anterior
                }
            }
        
            users[user_id] = socket.id;
            userPushTokens[user_id] = push_token;
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

                console.log("verificando token...");
                if(userPushTokens[reciver_id]) {
                    console.log("Sending notification to user: ", reciver_id);
                    const pushToken = userPushTokens[reciver_id];

                    if(Expo.isExpoPushToken(pushToken)) {
                        const sender_user = await User.findById(sender_id).select('username name');
                        const push_message = {
                            to: pushToken,
                            sound: 'default',
                            title: 'Nova Mensagem de ' + sender_user?.username,
                            body: message,
                            data: { message },
                            android: {
                                channelId: 'default',
                                priority: 'high',
                                actions: [
                                    {
                                        actionId: 'open', // ID da ação
                                        title: 'Abrir',   // Texto do botão
                                        isDestructive: false,
                                        isAuthenticationRequired: false,
                                    },
                                ],
                            },
                        }

                        try {
                            await expo.sendPushNotificationsAsync([push_message]);
                            console.log("Notification sent successfully to user: ", reciver_id);
                        } catch (err) {
                            console.log("Failed to send notification to user: ", reciver_id);
                        }
                    }
                }
                
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
