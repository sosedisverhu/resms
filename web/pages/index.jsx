import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import random from 'lodash/random';

import { firestore } from '../helpers/firebase';

const PAGES = [
  {
    content: [
      { type: 'text', settings: { text: 'About page text' }, id: '0' },
      {
        type: 'image',
        settings: {
          src:
            'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          alt: 'bridge',
        },
        id: '1',
      },
      {
        type: 'list',
        settings: {
          options: [
            { label: '1. One', id: '1' },
            { label: '2. Two', id: '2' },
            { label: '3. Three', id: '3' },
          ],
        },
        id: '2',
      },
    ],
  },
  {
    content: [
      {
        type: 'image',
        settings: {
          src: 'http://donapr.com/wp-content/uploads/2016/03/RRUe0Mo.png',
          alt: 'bridge',
        },
        id: '0',
      },
      { type: 'text', settings: { text: 'About page text' }, id: '1' },
      {
        type: 'list',
        settings: {
          options: [
            { label: '1. One', id: '1' },
            { label: '2. Two', id: '2' },
            { label: '3. Three', id: '3' },
          ],
        },
        id: '2',
      },
    ],
  },
  {
    content: [
      { type: 'text', settings: { text: 'About page text' }, id: '0' },
      {
        type: 'list',
        settings: {
          options: [
            { label: '1. One', id: '1' },
            { label: '2. Two', id: '2' },
            { label: '3. Three', id: '3' },
          ],
        },
        id: '1',
      },
      {
        type: 'image',
        settings: {
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXFvsYRSdrUQ3KI_zPFCQWGoxXmS2BFEr6Pw8dEbC3xNmC4xk&s',
          alt: 'bridge',
        },
        id: '2',
      },
    ],
  },
];

const Index = ({ pages: initialPages }) => {
  const [pages, setPages] = useState(initialPages);
  const handleClick = () => {
    const randomPage = PAGES[random(0, 2)];
    const id = +new Date();

    firestore.doc(`pages/${id}`).set(randomPage);
  };

  useEffect(
    () => firestore.collection('pages').onSnapshot((querySnapshot) => {
      const newPages = [];

      querySnapshot.forEach((doc) => {
        newPages.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPages(newPages);
    }),
    [],
  );

  return (
    <div>
      {pages.map((page) => (
        <div key={page.id}>
          <Link href="/p/[id]" as={`/p/${page.id}`}>
            <a>Link</a>
          </Link>
        </div>
      ))}
      <button type="button" onClick={handleClick}>
        Add new random page
      </button>
    </div>
  );
};

Index.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.array,
    }),
  ),
};

Index.defaultProps = {
  pages: [],
};

Index.getInitialProps = async () => {
  const pages = [];
  await firestore
    .collection('pages')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        pages.push({
          ...doc.data(),
          id: doc.id,
        });
      });
    });

  return { pages };
};

export default Index;
