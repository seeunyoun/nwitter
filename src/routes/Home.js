import React, { useState, useEffect } from 'react';
import { dbService } from '../Firebase';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
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
        await addDoc(collection(dbService, 'nweets'), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet('');
    }
    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value='Nweet' />
            </form>
            <div>
                {nweets.map(nweet =>
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home