import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "./Main.css";

export const Main = ({ getActiveNote, onUpdateNote }) => {
  if(!getActiveNote){
    return <div className="no-active-note">ノートが選択されていません</div>;
  };

  const onEditNote = (key, value) => {
    onUpdateNote({
      ...getActiveNote,
      [key]: value,  // "title": e.target.value が入ってくる。動的keyという。
      modDate: Date.now(),
    })
  }

  return(
    <div className="app-main">
      <div className="app-main-not-edit">
        <input 
          id="title"
          type="text"
          value={ getActiveNote.title }
          onChange={ (e) => onEditNote("title", e.target.value) }
        />
        <textarea
          id="content"
          value={ getActiveNote.content }
          onChange={ (e) => onEditNote("content", e.target.value) }
          placeholder="ノート内容を記入"
        ></textarea>
      </div>

      <div className="app-main-note-preview">
        <h1 className="preview-title">{ getActiveNote.title }</h1>
          <ReactMarkdown className="markdown-preview">
            { getActiveNote.content }
          </ReactMarkdown>
      </div>
    </div>
  )
}