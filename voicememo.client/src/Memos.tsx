import { useState, useEffect } from "react";
interface Memo {
  title: string;
  content: string;
}

interface MemoProps {
  onPost: (memo: Memo) => void;
  memos: Memo[];
}

function MemoList({ onPost, memos }: MemoProps) {
  const [memo, setMemo] = useState<Memo>({ title: "", content: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMemo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPost(memo);
    setMemo({ title: "", content: "" });
  };

  return (
    <>
      {memos.map((m, i) => (
        <div key={i} className="memo-item">
          <div>{m.title}</div>
          <div>{m.content}</div>
        </div>
      ))}
      <div className="memo-item">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="title"
              type="text"
              value={memo.title}
              placeholder="Memo name"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <textarea
              name="content"
              value={memo.content}
              placeholder="Enter text here..."
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
export default function Memos() {
  const [memos, setMemos] = useState<Array<Memo>>([]);

    //get memos
    useEffect(() => {
        getMemo();
    }, []);

    const getMemo = async () => {
        try {
            const response = await fetch('api/MemoItems');
            const data = await response.json();
            if (response.ok) {
                setMemos(data);
            }
        }
        catch (e) {
            console.log(e);
        }
    };
  //post memo
  const postMemo = async (memo: Memo) => {
      try {
          const response = await fetch('api/MemoItems', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(memo)
          });
          if (!response.ok) {
              throw new Error(response.statusText)
          }
          const data = await response.json();
          setMemos([...memos, data]);
      }
      catch (e) {
          console.log(e)
      }
  };

  //put memo

  //delete memo

  return <MemoList onPost={postMemo} memos={memos}></MemoList>;
}
