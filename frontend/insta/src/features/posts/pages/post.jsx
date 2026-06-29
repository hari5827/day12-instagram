
import React from 'react'
import "../style/Feed.scss"
import Post from "../components/post";
import usePost from '../HOOK/usehook';
import { useEffect } from "react";
import Nav from '../components/nav';
const Feed = ()=>{

const { feed, handleGetFeed,loading, handleLike, handleUnLike } = usePost()

  
    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }

    console.log(feed)






    return (
        <main className="feed-page">
               <Nav/>
            <div className="feed">
             {feed.map(post=>{
                return <Post key={post._id} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike}/>
                    })}
            </div>
        </main>
    )
}

export default Feed