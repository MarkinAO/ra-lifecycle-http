import { Message } from "./models";

interface MessagesListProps {
    list: Message[]
    userId: string
}

export default function MessagesList(props: MessagesListProps) {
    const { list, userId } = props;
    return(
        <div className="messages-box">
            {list.map(mes => {
                const mesClass = mes.userId === userId ? 'message my-mes' : 'message anyone-mes';
                return(
                    <div className={mesClass} key={mes.id}>{mes.content}</div>
                )
            })}
        </div>
    )
}