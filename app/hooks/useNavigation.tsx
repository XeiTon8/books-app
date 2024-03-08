import React from 'react';
import { useRouter } from 'next/navigation';
import { generalContext } from '@/context/GlobalContext';
import { Book } from '@/types/book';

export const useNavigation = () => {

    const {selectedBookData, setSelectedBookData, isAdmin} = React.useContext(generalContext);
    const router = useRouter();

    const setBookData = (book: Book) => {
        setSelectedBookData({
            bookTitle: book.bookTitle,
            author: book.author,
            bookDescription: book.bookDescription,
            thumbnailUrl: book.thumbnailUrl,
            _id: book._id,
            price: book.price,
        })
        if (isAdmin) {
            router.push(`/admin/books/${book._id}`)
        } else {
            router.push(`/books/${book._id}`)
        }
        
    }
    return {selectedBookData, setBookData};
}