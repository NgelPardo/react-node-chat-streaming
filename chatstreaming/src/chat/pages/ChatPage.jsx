import { Navbar, Chat, Video } from "../"


export const ChatPage = () => {
    return (
        <>
            <Navbar/>
            <div className="d-flex flex-row justify-content-between">
                <Video/>
                <Chat/>
            </div>
        </>
    )
}