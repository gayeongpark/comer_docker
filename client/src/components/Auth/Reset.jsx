import React, { useState } from 'react';
import AuthNav from './AuthNav';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reset() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { token } = useParams();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = {
      token,
      password,
      password2,
    };
    await axios.post('/auth/resetPassword', response, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    navigate('/login');
  };
  return (
    <div>
      <div>
        <AuthNav />
        <div className='isolate bg-white py-24 px-6 sm:py-32 lg:px-8'>
          <div className='mx-auto max-w-xl text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Reset password
            </h1>
          </div>

          <form
            className='mx-auto mt-5 max-w-xl sm:mt-5'
            onSubmit={handleSubmit}
          >
            <div className='grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2'>
              <div className='sm:col-span-2' id='email'>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='relative mt-2.5'>
                  <input
                    type={open === false ? 'password' : 'text'}
                    name='password'
                    id='password'
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700'
                    required
                  />
                  <div className='text-2xl absolute top-2 right-5 text-gray-300'>
                    {open === false ? (
                      <BiHide onClick={toggle} />
                    ) : (
                      <BiShow className='text-gray-900' onClick={toggle} />
                    )}
                  </div>
                </div>
              </div>
              <div className='sm:col-span-2' id='email'>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold leading-6 text-gray-900'
                >
                  Password Confirmation
                </label>
                <div className='relative mt-2.5'>
                  <input
                    type={open === false ? 'password' : 'text'}
                    name='password2'
                    id='password2'
                    autoComplete='off'
                    onChange={(e) => setPassword2(e.target.value)}
                    className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700'
                    required
                  />
                 <div className='text-2xl absolute top-2 right-5 text-gray-300'> 
                    {open === false ? (
                      <BiHide onClick={toggle} />
                    ) : (
                      <BiShow className='text-gray-900' onClick={toggle} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <button
                type='submit'
                className='block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
