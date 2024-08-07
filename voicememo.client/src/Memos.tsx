import { useState } from 'react'

interface Memo {
    name: string;
    text: string;
}

function Memos() {
    const [memos, setMemos] = useState<Array<Memo>>([]);

    //get memos
    //put memo
    //post memo
    //delete memo

    return;
}

export default Memos;