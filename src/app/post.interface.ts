export interface Post {
    id: number;
    title: string;
    category: string;

}


export interface GroupPosts {
    category: string;
    posts: Post[];
}