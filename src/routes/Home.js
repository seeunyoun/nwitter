import React, { useState, useEffect } from 'react';
import { dbService } from '../Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, 'nweets'));
        dbNweets.forEach(doc => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            }
            setNweets(prev => [nweetObj, ...prev]);
        })
    }
    useEffect(() => {
        getNweets();
    }, [])
    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, 'nweets'), {
            nweet,
            createdAt: Date.now()
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
                        <h4>{nweet.nweet}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home