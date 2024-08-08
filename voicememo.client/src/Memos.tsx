import { useState } from "react";

interface Memo {
  name?: string;
  text?: string;
}

interface MemoProps {
  onPost: (memo: Memo) => void;
  memos: Memo[];
}

function MemoList({ onPost, memos }: MemoProps) {
  const [memo, setMemo] = useState<Memo>({ name: "", text: "" });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setMemo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPost(memo);
    setMemo({ name: "", text: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            type="text"
            value={memo.name}
            placeholder="Memo name"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <input
            name="text"
            type="text"
            value={memo.text}
            placeholder="Enter text here..."
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {memos.map((m, i) => (
          <li key={i}>
            <div>{m.name}</div>
            <div>{m.text}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default function Memos() {
  const [memos, setMemos] = useState<Array<Memo>>([]);

  //post memo
  const postMemo = (memo: Memo) => {
    //post request
    setMemos([...memos, memo]);
  };

  //get memos
  //put memo
  //delete memo

  return <MemoList onPost={postMemo} memos={memos}></MemoList>;
}
