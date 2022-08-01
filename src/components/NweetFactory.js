import React, { useState } from 'react';
import { dbService, storageService } from '../Firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        await uploadString(attachmentRef, attachment, 'data_url');
        attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
    }
    const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
    };
    await addDoc(collection(dbService, 'nweets'), nweetObj);
    setNweet('');
    setAttachment('');
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setNweet(value);
  }
  const onFileChange = (e) => {
    const { target: { files } } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        const { currentTarget: { result } } = finishedEvent;
        setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachmentClick = () => setAttachment(null);
  return (
    <form onSubmit={onSubmit}>
      <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input className='input-attachment' type="file" accept='image/*' onChange={onFileChange} />
      <input type="submit" value='Nweet' />
      {attachment &&
      <div className='attachment-wrapper'>
          <img src={attachment} width='50' height='50' alt ='' />
          <button onClick={onClearAttachmentClick}>Clear</button>
      </div>
      }
    </form>
  )
}

export default NweetFactory