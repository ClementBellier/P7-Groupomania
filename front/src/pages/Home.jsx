import { CreatePost } from '../components/CreatePost'
import { Header } from '../components/Header'
import { PostList } from '../components/PostsList'

export function Home(){

    return (
    <>
    <Header />
    <CreatePost />
    <PostList />
    </>)
}