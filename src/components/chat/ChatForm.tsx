import { useState } from "react";

interface chatSubmitProps {
    onSubmit: Function
    userId: string
}

export default function chatForm(props: chatSubmitProps) {
    const { onSubmit, userId } = props;
    const [message, setData] = useState<string>('');

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        onSubmit({content: message, userId});
        setData('');
    }

    const onChange = (e: any) => {        
        setData(e.target.value)
    }

    return(
        <form className="crudform" onSubmit={onSubmitHandler}>
            <textarea className="crudform-textarea" value={message} onChange={onChange} />
            <button className="crudform-button"></button>            
        </form>
    )
}