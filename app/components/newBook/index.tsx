'use client'

import React from 'react';
import { generalContext } from '@/context/GlobalContext';
import { POST, GET_SINGLE } from '@/app/api/books/route';
import { CldUploadButton } from 'next-cloudinary';
import { Book } from '@/types/book';
import { useRouter } from 'next/navigation';
import './newBook.scss'

export const AddNewBook = () => {
    const { setBooks } = React.useContext(generalContext);
    const router = useRouter();

    const [book, setBook] = React.useState<Book>({
        bookDescription: "",
        bookTitle: "",
        thumbnailUrl: "",
        price: 0,
    })

    const handleBookOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBook((book) => ({
            ...book,
            [name]: value
        }))
    }

    const addBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const bookID = await POST(book);
            fetchBook(bookID);
            router.push("/admin/books")
        } catch (error) {
            console.error(error);
        }
    }

    const fetchBook =  async(bookID: string) => {
        try {
            const fetchedBook = await GET_SINGLE(bookID);
            setBooks((books: Book[]) => [...books, fetchedBook]);
        } catch (error) {
            console.error(error);
        }
    }

    const getUrl = (result: any) => {
        console.log(result.info.public_id)
        setBook((book) => ({
        ...book,
        thumbnailUrl: result.info.public_id
        }))
        
    }

    const cancelNewBook = () => {
        router.push("/admin/books")
    }

    return (
        <div className="new-book__container">
            <form onSubmit={addBook}>
                <div className="form-content-wrapper">
                    <label htmlFor="">
                        <span>Title</span>
                        <input type="text" name="bookTitle" id=""  onChange={handleBookOnChange} />
                    </label>
                    <label htmlFor="">
                        <span>Description</span>
                        <input type="text" name="bookDescription" id="" onChange={handleBookOnChange} />
                    </label>
                    <label htmlFor="">
                        <span>Price, $</span>
                        <input type="number" name="price" id="" />
                    </label>
                    <label htmlFor="">
                        <span>Author</span>
                        <input type="text" name="author" id="" placeholder='Add "Unknown" if author is unknown' onChange={handleBookOnChange}/>
                    </label>
                    <span>Upload book cover</span>
                    <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME} onSuccess={getUrl} />
                    <button type="submit">Add new book</button>
                    <button type="button" onClick={() => cancelNewBook()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}