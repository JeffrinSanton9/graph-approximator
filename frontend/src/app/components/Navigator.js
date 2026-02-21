import Link from 'next/link';

export default function Navigator(){
    return (
        <nav className="flex gap-6 items-center py-4 px-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-md rounded-lg mb-6">
            <Link href="/" className="font-bold text-blue-700 hover:text-blue-900 transition">Home</Link>
            <Link href="/user" className="font-bold text-purple-700 hover:text-purple-900 transition">User</Link>
            <Link href="/session" className="font-bold text-pink-700 hover:text-pink-900 transition">Session</Link>
            <Link href="/about" className="font-bold text-gray-700 hover:text-black transition">About</Link>
        </nav>
    );
}
