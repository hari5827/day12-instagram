
import React from 'react'
import "../style/Feed.scss"
import Post from "../components/post";
import {usehook} from "../HOOK/usehook"

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
            
            </div>
        </main>
    )
}

export default Feed