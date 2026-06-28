
import React from 'react'
import "../style/Feed.scss"
import Post from "../components/post";
import usePost from '../HOOK/usehook';
import { useEffect } from "react";

const Feed = ()=>{

const { feed, handleGetFeed,loading, handleLike, handleUnLike } = usePost()

    useEffect(() => { 
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }

    console.log(feed)






    return (
        <main className="feed-page">
             
            <div className="feed">
             {feed.map(post=>{
                        return <Post user={post.user} post={post} loading={loading} handleLike={handleLike}  handleUnLike={handleUnLike}/>
                    })}
            </div>
        </main>
    )
}

export default Feed