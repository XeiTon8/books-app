import axios from 'axios';
import { Book } from '@/types/book';

const apiUrl = "URL";

export const POST = async (book: Book) => {
  try {
    const res = await axios.post(`${apiUrl}/books`, book);
    const bookID = res.data._id;
    return bookID;
  } catch (error) {
    console.error(error)
  }
    
}

export const GET_ALL = async () => {
  try {
    const res = await axios.get(`${apiUrl}/books`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const GET_SINGLE = async (bookID: string) => {
  try {
    const res = await axios.get(`${apiUrl}/books/${bookID}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const DELETE = async (bookID: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/books/${bookID}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const UPDATE = async (book: Book, bookID: string) => {
  try {
    const res = await axios.put(`${apiUrl}/books/${bookID}`, book);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}