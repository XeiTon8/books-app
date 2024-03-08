'use client'

import React from 'react';
import { generalContext } from '@/context/GlobalContext';
import { Book } from '@/types/book';
import { GET_ALL } from '@/app/api/books/route';
import { useNavigation } from '@/app/hooks/useNavigation';
import Link from 'next/link';
import './admin-books.scss'

export default function Dashboard () {
    const {books, setBooks} = React.useContext(generalContext);
    const {setBookData} = useNavigation();

    React.useEffect(() => {

        const fetchData = async () => {
            const res = await GET_ALL();
            if (res.length > 0) {
                setBooks(res);
                console.log(books);
            } else { return; }
        }
        fetchData();
    }, [])

    const renderBooks = () => {
        return books.map((book: Book) => {
            return (
                <>
                <div className="book-card-short" key={book._id}>
                    <div className="book-card-short__content-wrapper">
                        <span>{book.bookTitle}</span>
                        <p>{book.bookDescription}</p>
                    </div>
                    <div className="book-card-short__btn-wrapper">
                        <button onClick={() => setBookData(book)}>View book</button>
                    </div>
                </div>
                </> 
            )
        })
    }

    return (
        <div className="">
            <div className="link-wrapper">
                <Link href="/admin/books/new-book">Add new book</Link>
            </div>
            <>
            {books.length == 0 ? (
            <span>No books yet.</span>
            ) : (
            renderBooks()
            )}
            </>
        </div>
    )
}