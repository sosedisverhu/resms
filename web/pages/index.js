import Link from 'next/link';

const messages = [
    {
        text: 'Message #1',
        pageId: 'first'
    },
    {
        text: 'Message #2',
        pageId: 'second'
    },
    {
        text: 'Message #3',
        pageId: 'third'
    }
];

const Index = () => (
    <div>
        { messages.map(message => <div key={message.pageId}>
            <div>{message.text}</div>
            <Link href="/p/[id]" as={`/p/${message.pageId}`}>
                <a>Link</a>
            </Link>
        </div>) }
    </div>
);

export default Index;
