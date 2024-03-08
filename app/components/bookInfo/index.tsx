'use client'

import React from 'react';
import { generalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import { Book } from '@/types/book';
import { UPDATE, GET_SINGLE, DELETE } from '@/app/api/books/route';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import './bookInfo.scss'

export const BookInfoComponent = () => {

    const router = useRouter();
    const {selectedBookData, setSelectedBookData, isAdmin, books, setBooks} = React.useContext(generalContext);
    const [isEditing, setIsEditing] = React.useState(false);

    const [updatedBook, setUpdatedBook] = React.useState<Book>({
        _id: selectedBookData._id,
        bookTitle: "",
        bookDescription: "",
        thumbnailUrl: selectedBookData.thumbnailUrl,
        price: 0,
    })

    const updateBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await UPDATE(updatedBook, updatedBook._id!);
            const res = await GET_SINGLE(updatedBook._id!);

            // Updated current book
            setSelectedBookData({
                _id: res.data._id,
                bookTitle: res.data.bookTitle,
                bookDescription: res.data.bookDescription,
                thumbnailUrl: res.data.thumbnailUrl,
                price: res.data.price,
            }) 

            // Update books array in state
            const bookToUpdateIndex = books.findIndex((book) => book._id === selectedBookData._id);
            const booksToUpdate = books.map((book, i) => {
            if (i === bookToUpdateIndex) {
                return {
                    ...book,
                    bookTitle: updatedBook.bookTitle,
                    bookDescription: updatedBook.bookDescription
                }
            } else {
                throw new Error("Error happened while updating")
            }
        }) 
        setBooks(booksToUpdate);
        
        setIsEditing(!isEditing);
        router.push("/admin/books")
        } catch (error) {
            console.error(error);
        }
    }

    const handleBookEdit = (e: React.ChangeEvent) => {
        const {name, value} = e.target as HTMLInputElement;
        setUpdatedBook(() => ({
            ...updatedBook,
            [name]: value
        }))
    }

    const openBookEditor = (book: Book) => {
        setIsEditing(!isEditing);
        setUpdatedBook(() => ({
            ...book
        }))
    }

    const deleteBook = async (bookID: string) => {
        try {
            await DELETE(bookID);
            const filteredBooks = books.filter((book) => book._id !== bookID);
            setBooks(filteredBooks);
            router.push("/admin/books")
        } catch (error) {
        console.error(error);
        }
    }

    return (
        <div className="book-info__container">
        <form onSubmit={updateBook}>
        {isAdmin && isEditing ? (
            <div className="book-full-info-wrapper">
                <div className="book-cover-wrapper">
                <Image
                width="450"
                height="500"
                src={selectedBookData.thumbnailUrl}
                alt="Book cover"
                />
                </div>
                <div className="book-full-info">
                    <input  type="text" name="bookTitle" id="" value={updatedBook.bookTitle} onChange={handleBookEdit} />
                    <textarea name="bookDescription" id="" value={updatedBook.bookDescription} onChange={handleBookEdit} />
                    <button type="submit">Update book</button>
                    <button type="button" onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                </div>
            </div>
        ) : (
            <div className="book-full-info-wrapper">
                <div className="book-cover-wrapper">
                <Image
                width="450"
                height="500"
                src={selectedBookData.thumbnailUrl}
                alt="Book cover"
                />
                </div>
                <div className="book-full-info">
                    <span>{selectedBookData.author}</span>
                    <span>{selectedBookData.bookTitle}</span>
                    <p>{selectedBookData.bookDescription}</p>
                    <span>${selectedBookData.price}</span>
                    <button className="buy-btn">Buy</button>
                    {isAdmin ? (
                <>
                    <button type="button" onClick={() => openBookEditor(selectedBookData)}>Edit</button>
                    <button type="button" onClick={() => deleteBook(selectedBookData._id!)}>Delete</button>
                </>
                ) : null
                } 
                </div>
            
            </div>
        )}
        </form>
        </div>
    )
}