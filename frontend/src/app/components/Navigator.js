import Link from 'next/link';

export default function Navigator(){
    return (
        <>
            <Link href="/">Home</Link>
            <Link href="/user">User</Link>
            <Link href="/session">Session</Link>
            <Link href="/about">About</Link><br/>
        </>
    );
}
