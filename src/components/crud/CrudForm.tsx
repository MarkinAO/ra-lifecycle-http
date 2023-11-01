import { useState } from "react";

interface CrudSubmitProps {
    onSubmit: Function
}

export default function CrudForm(props: CrudSubmitProps) {
    const { onSubmit } = props;
    const [note, setData] = useState<string>('');

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        onSubmit(note);
        setData('');
    }

    const onChange = (e: any) => {        
        setData(e.target.value)
    }

    return(
        <form className="crudform" onSubmit={onSubmitHandler}>
            <div>New Note</div>
            <textarea className="crudform-textarea" value={note} onChange={onChange} />
            <button className="crudform-button"></button>            
        </form>
    )
}