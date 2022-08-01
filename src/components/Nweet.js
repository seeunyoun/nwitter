import React, { useState } from 'react';
import { dbService, storageService } from '../Firebase';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      try {
        await deleteDoc(doc(dbService, 'nweets', `${nweetObj.id}`));
        if (nweetObj.attachmentUrl !== '') {
          const attachmentRef = ref(storageService, nweetObj.attachmentUrl);
          await deleteObject(attachmentRef);
        }
      } catch (error) {
        window.alert('Fail to delete nweet');
      }
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
  const timestamp = new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(nweetObj.createdAt);
  return (
    <div className='nweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type='text' onChange={onChange} defaultValue={newNweet} placeholder='Edit your nweet' required />
            <input className='submit-input' type='submit' value='Update Nweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4 className='content'>{nweetObj.text}</h4>
          <div className='time'>{timestamp}</div>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width='50' height='50' alt='' />}
          {isOwner && (
            <div className="btns-wrapper">
              <button onClick={toggleEditing}>Edit Nweet</button>
              <button onClick={onDeleteClick}>Delete Nweet</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Nweet