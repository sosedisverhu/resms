import PropTypes from 'prop-types';
import Link from 'next/link';

const PAGES_MAP = {
    first: {
        content: [
            { type: 'text', settings: { text: 'About page text' } },
            {
                type: 'image',
                props: { src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: 'bridge' }
            },
            { type: 'list', settings: { options: ['1. One', '2. Two', '3. Three'] } }
        ]
    },
    second: {
        content: [
            { type: 'image', settings: { src: 'http://donapr.com/wp-content/uploads/2016/03/RRUe0Mo.png', alt: 'bridge' } },
            { type: 'text', settings: { text: 'About page text' } },
            { type: 'list', settings: { options: ['1. One', '2. Two', '3. Three'] } }
        ]
    },
    third: {
        content: [
            { type: 'text', settings: { text: 'About page text' } },
            { type: 'list', settings: { options: ['1. One', '2. Two', '3. Three'] } },
            {
                type: 'image',
                settings: { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXFvsYRSdrUQ3KI_zPFCQWGoxXmS2BFEr6Pw8dEbC3xNmC4xk&s', alt: 'bridge' }
            }
        ]
    }
};

const getComponentByType = ({ type, settings }) => {
    switch (type) {
    case ('text'):
        return <p>{settings.text}</p>;
    case ('list'):
        return <ul>
            {settings.options.map((item, i) => <li key={i}>{item}</li>)}
        </ul>;
    case ('image'):
        return <img src={settings.src} alt={settings.alt} />;
    default:
        return null;
    }
};

getComponentByType.propTypes = {
    type: PropTypes.string,
    settings: PropTypes.object
};

getComponentByType.defaultProps = {
    type: '',
    settings: {}
};

const MessagePage = props => {
    if (!props.content) {
        return <div>
            <div>404</div>
            <div>Page not found</div>
        </div>;
    }

    return (
        <div>
            <Link href='/'>
                <a>Go to all</a>
            </Link>
            {props.content.map((block, i) => <div key={i}>
                {getComponentByType(block)}
            </div>)}
        </div>
    );
};

MessagePage.propTypes = {
    content: PropTypes.array
};

MessagePage.getInitialProps = async function (context) {
    const { id } = context.query;
    const page = PAGES_MAP[id] || {};

    return { content: page.content };
};

export default MessagePage;
