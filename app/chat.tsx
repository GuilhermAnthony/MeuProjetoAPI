import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import socket from "../socket";

export default function chat() {
    const roomPrefix = 'chat';
    const [room, setRoom] = useState('defaut');

    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    
    const [receivedMessage2, setReceivedMessage2] = useState('');
    const [message2, setMessage2] = useState('');

    useEffect (() => {
        socket.emit('join_room', room);

        socket.on('receive_message', (response: any) => {
            if (response.room == 'chat-1') {
                setReceivedMessage(response.msg);
            } else {
                setReceivedMessage2(response.msg);
            }
            console.log(response);
        });

        return () => {
            socket.off('receive_message')
        }
    }, [room]);

    const sendMessage = (chat: string) => {
        setRoom(`${roomPrefix}-${chat}`);

        let msg = room == 'chat-1' ? message : message2;

        socket.emit('send_message', {room, msg});
        setMessage(''); setMessage2('');
    }

    return (
        <View>
            {/* Form 1 */}
            <View>

                <Text>Canal: chat 1</Text>
                <TextInput
                    placeholder="Digite sua mensagem"
                    value={message}
                    onChangeText={setMessage}
                />

                <Pressable onPress={() => sendMessage('1')}>
                    <Text>Enviar mensagem</Text>
                </Pressable>

                <Text>Mensagem recebida</Text>
                <Text>Nenhuma mensagem recebida</Text>
            </View>

        </View>
    );
}