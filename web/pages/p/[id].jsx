import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PAGES_MAP = {
  first: {
    id: 'first',
    content: [
      { type: 'text', settings: { text: 'About page text' } },
      {
        type: 'image',
        props: { src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: 'bridge' },
      },
      { type: 'list', settings: { options: [{ label: '1. One', id: '1' }, { label: '2. Two', id: '1' }, { label: '3. Three', id: '1' }] } },
    ],
  },
  second: {
    id: 'second',
    content: [
      { type: 'image', settings: { src: 'http://donapr.com/wp-content/uploads/2016/03/RRUe0Mo.png', alt: 'bridge' } },
      { type: 'text', settings: { text: 'About page text' } },
      { type: 'list', settings: { options: [{ label: '1. One', id: '1' }, { label: '2. Two', id: '1' }, { label: '3. Three', id: '1' }] } },
    ],
  },
  third: {
    id: 'third',
    content: [
      { type: 'text', settings: { text: 'About page text' } },
      { type: 'list', settings: { options: [{ label: '1. One', id: '1' }, { label: '2. Two', id: '1' }, { label: '3. Three', id: '1' }] } },
      {
        type: 'image',
        settings: { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXFvsYRSdrUQ3KI_zPFCQWGoxXmS2BFEr6Pw8dEbC3xNmC4xk&s', alt: 'bridge' },
      },
    ],
  },
};

const getComponentByType = ({ type, settings }) => {
  switch (type) {
    case ('text'):
      return <p>{settings.text}</p>;
    case ('list'):
      return (
        <ul>
          {settings.options.map((item) => <li key={item.id}>{item.label}</li>)}
        </ul>
      );
    case ('image'):
      return <img src={settings.src} alt={settings.alt} />;
    default:
      return null;
  }
};

getComponentByType.propTypes = {
  type: PropTypes.string,
  settings: PropTypes.shape({
    text: PropTypes.string,
    options: PropTypes.array,
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

getComponentByType.defaultProps = {
  type: '',
  settings: {},
};

const MessagePage = ({ content }) => {
  if (!content) {
    return (
      <div>
        <div>404</div>
        <div>Page not found</div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/">
        <a>Go to all</a>
      </Link>
      {content.map((block) => (
        <div key={block.id}>
          {getComponentByType(block)}
        </div>
      ))}
    </div>
  );
};

MessagePage.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.array,
  })),
};

MessagePage.defaultProps = {
  content: null,
};

MessagePage.getInitialProps = (context) => {
  const { id } = context.query;
  const page = PAGES_MAP[id] || {};

  return { content: page.content };
};

export default MessagePage;
