import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pageCount, setPageCount] = useState('');
 // const [publishYear, setPublishYear] = useState('0000');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [categories, setCategories] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://bookinventory.vercel.app/books/${id}`)
    .then((response) => {
        setAuthor(response.data.authors);
      //  setPublishYear('0000')
        setTitle(response.data.title)
        setPageCount(response.data.pageCount)
        setShortDescription(response.data.shortDescription)
        setThumbnailUrl(response.data.thumbnailUrl)
        setIsbn(response.data.isbn)
        setCategories(response.data.categories)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      //publishYear,
      isbn,
      pageCount,
      thumbnailUrl,
      shortDescription,
      categories
    };
    setLoading(true);
    axios
      .put(`https://bookinventory.vercel.app/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>ISBN</label>
          <input
            type='number'
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Page Count</label>
          <input
            type='number'
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Thumbnail URL</label>
          <input
            type='text'
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Short Description</label>
          <input
            type='text'
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Categories</label>
          <input
            type='text'
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>


        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook