import io from "socket.io-client";
import { useState, useEffect } from "react"
import { useAuthStore } from "../../hooks";

const socket = io('http://localhost:4000')

export const Chat = () => {

    const { status, checkAuthToken } = useAuthStore();
    const { user } = useAuthStore();

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([{
        body: "",
        from: ""
    }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', message);
        const newMessage = {
            body: message,
            from: user.username
        } 
        setMessages([newMessage, ...messages ])
        setMessage('');
    }

    useEffect(() => {
        const receivedMessage = message => {
            setMessages([ message, ...messages ])
        };
        socket.on('message', receivedMessage)

        return () => {
            socket.off('message', receivedMessage)
        }
    }, [messages])


    return (
        <div className="container-chat">
            <form  className="bg-zinc-900 p-10" onSubmit={ handleSubmit }>
                <h1 className="text-2xl font-bold my-2">Chat Kuepa</h1>
                <input
                name="message"
                type="text"
                placeholder="Escribe tu mensaje..."
                
                className="border-2 border-zinc-500 p-2 w-full text-black"
                autoFocus
                onChange={e => setMessage( e.target.value )}
                value= {message}
                />
                
                <button className="btn-chat">Enviar</button>

                {messages.map((message, index) => (
                    <div key={ index } className="mensaje-chat">
                        <p>{message.from}: &nbsp;&nbsp;   {message.body}</p>
                    </div>
                ))}
            </form>
        </div>
    )
}