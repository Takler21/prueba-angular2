export interface Datos
{
    title: string;
    category: string;
}

export interface Varios {
    estado: boolean;
}

export interface Post {
    id?: number;
    datos: Datos;
    varios: Varios;
}


export interface GroupPosts {
    category: string;
    posts: Post[];
}