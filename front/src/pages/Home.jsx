import { useState } from 'react'
import { CreatePost } from '../components/CreatePost'
import { PostList } from '../components/PostsList'

export function Home(){
    const [ isNeedReRender, setIsNeedReRender] = useState(false)
    const needReRender = () => {setIsNeedReRender(!isNeedReRender)}
    
    return (
    <>
    <CreatePost needReRender={needReRender} />
    <PostList needReRender={needReRender} />
    </>)
}