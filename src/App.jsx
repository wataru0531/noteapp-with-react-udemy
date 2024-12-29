
import { useEffect, useState } from "react";
import uuid from "react-uuid";

import './App.css';


import { Main } from './components/main';
import { Sidebar } from './components/Sidebar';

function App() {
  // ノートの配列
  const [ notes, setNotes ] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  // ハイライト表示
  const [ activeNote, setActiveNote ] = useState(false);

  // ハイライト表示を切り替え
  const onActiveNote = (id) => {
    setActiveNote(id);
  };

   // ローカルストレージにノートを保存する
  useEffect(() => {

    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
  }, [])

  // 追加
  const onAddNote = () => {
    console.log("新しくノートが追加されました");

    const newNote = {
      id: uuid(), // ランダムなidを生成
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    
    setNotes([ ...notes, newNote ]);

    // console.log(notes)
  };

  // 削除
  const onDeleteNote = (id) => {
    // クリックしたノートのidとは一致しないノートだけを新しい配列に追加していく。
    const newNotes = notes.filter(note => {
      return note.id !== id;
    });

    setNotes(newNotes);
    // console.log("ノートを削除しました", notes);
  };

  // idに見合うノートのオブジェクトを取得
  const getActiveNote = () => {
    // ノート全ての中からクリックされたノートを取得
    // find()...配列の中で一番最初に見つかった要素を取得する。
    return notes.find((note) => note.id === activeNote);
  };

  // 編集
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map(note => {
      // 
      if(note.id === updatedNote.id){
        return updatedNote;
      } else {
        note;
      }
    });

    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar 
        onAddNote={ onAddNote } 
        notes={ notes } 
        onDeleteNote={ onDeleteNote }
        activeNote={ activeNote }
        onActiveNote={ onActiveNote }
      />
      <Main 
        getActiveNote={ getActiveNote() }
        onUpdateNote={ onUpdateNote }
      />
    </div>
  )
}

export default App
