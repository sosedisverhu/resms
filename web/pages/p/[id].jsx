import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { firestore } from '../../helpers/firebase';

const getComponentByType = ({ type, settings }) => {
  switch (type) {
    case 'text':
      return <p>{settings.text}</p>;
    case 'list':
      return (
        <ul>
          {settings.options.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      );
    case 'image':
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
        <Link href="/">
          <a>Go to all</a>
        </Link>
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
        <div key={block.id}>{getComponentByType(block)}</div>
      ))}
    </div>
  );
};

MessagePage.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.array,
    }),
  ),
};

MessagePage.defaultProps = {
  content: null,
};

MessagePage.getInitialProps = async (context) => {
  const { id } = context.query;
  let content;

  await firestore
    .collection('pages')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();

      if (data) {
        content = data.content;
      }
    });

  return { content };
};

export default MessagePage;
