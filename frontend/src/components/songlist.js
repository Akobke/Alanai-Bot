import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Songlist(){

    const api = axios.create({
        baseURL: `http://localhost:8080`
    });
    const [playlist, setPlaylist] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        api.get('/servers').then((res) => {
            const playlistt = res.data
            setPlaylist({playlistt});
            
        });
    }, []);

    if (!playlist) return null;
    console.log(JSON.stringify(playlist))

    return(
        <div>
            {
                playlist.playlistt.server.map((index, i) => 
                <>
                <li key={i}>{JSON.stringify(index.Queue.replace(/['"]+/g, ''))}</li>
                <img src={index.QueueThumbnail} height="90" width="160"/>
                </>
                )
            }
            
        </div>
    );

}
export default Songlist;