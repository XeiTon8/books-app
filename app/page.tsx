'use client'
import React from 'react'
import { generalContext } from '@/context/GlobalContext';
import { useNavigation } from './hooks/useNavigation';

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from "next/link";

import styles from "./page.module.scss";

export default function Home() {
  const {isUser, setIsUser, books} = React.useContext(generalContext);
  const {setBookData} = useNavigation();

  const renderNewBooks = () => {
    const booksCopy = [...books];
    console.log(booksCopy);
    return books.reverse().slice(0, 6).map((book) => {
      return (
        <div className={styles.book_card}>
        <Image src={book.thumbnailUrl} alt="Book cover" width={150} height={200} className={styles.book_cover}/>
        <span onClick={() => setBookData(book)} className={styles.FullBookLink}>{book.bookTitle}</span>
        <span>{book.author}</span>
        <span>${book.price}</span>
        </div>

      )
    })
  }
  
  return (
    <main>
      <div className="app__container">
      <h1 className={styles.BookH1}>Find your book</h1>
        <div className={styles.AppBooks}>
          <div className={styles.NewBooksWrapper}> <span className={styles.NewBooks}>New books</span></div> 
          <div className={styles.books_showcase}>
            {renderNewBooks()}
          </div>
          <div className={styles.viewAllBooks__wrapper}>
            <span className={styles.ViewAllBooks}>
              <Link href="/books" onClick={() => setIsUser(!isUser)}>View all books {"->"} </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
