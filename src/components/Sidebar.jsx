
import "./Sidebar.css";


export const Sidebar = ({ onAddNote, notes, onDeleteNote, onActiveNote, activeNote }) => {

  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return(
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={ onAddNote }>追加</button>
      </div>
      <div className="app-sidebar-notes">
        { 
          sortedNotes.map(note => (
            <div 
              key={ note.id } 
              onClick={ () => onActiveNote(note.id) } 
              className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            >
              <div className="sidebar-note-title">
                <strong>{ note.title }</strong>
                <button onClick={ () => onDeleteNote(note.id) }>削除</button>
              </div>
              <p>{ note.content }</p>
              <small>{ new Date(note.modDate).toLocaleDateString("ja-JP", { hour: "2-digit", minute: "2-digit" }) }</small>
            </div>
          ))
        }
        <div className="app-sidebar-note">
          <div className="sidebar-note-title">
            <strong>タイトル</strong>
            <button>削除</button>
          </div>
          <p>ノートのタイトルです。</p>
          <small>最終週整備:xx/xx</small>
        </div>
      </div>

    </div>
  )
}