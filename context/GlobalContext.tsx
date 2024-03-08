'use client'

import dataSample from '../dataSample.json';
import React from 'react';
import { Book } from '@/types/book';

interface generalContextValues {
    books: Book[];
    setBooks: (val: any) => void;
    isAdmin: boolean;
    setIsAdmin: (val: boolean) => void;
    isUser: boolean;
    setIsUser: (val: boolean) => void;
    apiUrl: string;
    selectedBookData: Book;
    setSelectedBookData: (val: Book) => void;
}


const generalContext = React.createContext({} as generalContextValues);

const GeneralContextProvider: React.FC<{children: any}> = ({children}) => {

    const dataSampleString = JSON.stringify(dataSample);
    const parsedData = JSON.parse(dataSampleString);
    console.log(parsedData);
    const [books, setBooks] = React.useState<Book[]>(parsedData);

    const [selectedBookData, setSelectedBookData] = React.useState<Book>({
        _id: "",
        bookTitle: "",
        bookDescription: "",
        thumbnailUrl: "",
        price: null,
    })

    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isUser, setIsUser] = React.useState(false);
    const apiUrl = "URL";

    return (
        <generalContext.Provider value={{books, setBooks, isAdmin, setIsAdmin, isUser, setIsUser, apiUrl, selectedBookData, setSelectedBookData }}>
            {children}
        </generalContext.Provider>
    )
}

export {generalContext, GeneralContextProvider}