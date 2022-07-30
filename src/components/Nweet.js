import React, { useState } from 'react';
import { dbService } from '../Firebase';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')
    if (ok) {
      await deleteDoc(doc(dbService, 'nweets', `${nweetObj.id}`));
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, 'nweets', `${nweetObj.id}`), {
      text: newNweet,
    });
    setEditing(false);
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setNewNweet(value);
  }
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} defaultValue={newNweet} placeholder='Edit your nweet' required />
            <input type='submit' value='Update Nweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Nweet</button>
              <button onClick={onDeleteClick}>Delete Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nweet