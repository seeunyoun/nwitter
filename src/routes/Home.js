import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../Firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Nweet from '../components/Nweet';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState('');
    useEffect(() => {
        const q = query(collection(dbService, 'nweets'), orderBy('createdAt', 'desc'));

        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr)
        });
    }, []);
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
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept='image/*' onChange={onFileChange} />
                <input type="submit" value='Nweet' />
                {attachment &&
                <div>
                    <img src={attachment} width='50' height='50' />
                    <button onClick={onClearAttachmentClick}>Clear</button>
                </div>
                }
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home