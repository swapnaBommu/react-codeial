import { createContext } from "react";
import { useProvidePosts } from "../hooks";

const initalstate = {
    posts: [],
    loading: true,
    addPostToState: () => {},
}

export const PostsContext = createContext(initalstate);

export const PostsProvider = ({ children }) => {
    const posts = useProvidePosts();
    return <PostsContext.Provider value={posts}>{ children }</PostsContext.Provider>
}