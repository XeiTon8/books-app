'use client'
import React from 'react';
import { generalContext } from '@/context/GlobalContext';
import { Book } from '@/types/book';
import { useNavigation } from '../hooks/useNavigation';
import Image from 'next/image';
import styles from '../page.module.scss';
import './books.scss'

export default function BooksList() {
    const {books} = React.useContext(generalContext);
    const {setBookData} = useNavigation();

    React.useEffect(() => {
        console.log(books);
    }, [])

    const renderBooks = () => {
        return books.map((book: Book) => {
            return (
                <div className={styles.book_card}>
                <Image src={book.thumbnailUrl} alt="Book cover" width={150} height={200} className={styles.book_cover}/>
                <span>{book.bookTitle}</span>
                <span>{book.author}</span>
                <span>${book.price}</span>
                <button onClick={() => setBookData(book)} className="view-book-btn">View book</button>
                </div>
            )
        })
    }

    return (
        <div className="books-shop__container">
            <div className="books-shop__content-wrapper">
            { books.length == 0 ? (<span>No books available</span>) : (renderBooks()) }
            </div>
        </div>
    )
}