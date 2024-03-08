export interface Book {
    _id?: string;
    thumbnailUrl: string | any;
    bookTitle: string;
    bookDescription: string;
    price: number | null;
    author?: string;
}