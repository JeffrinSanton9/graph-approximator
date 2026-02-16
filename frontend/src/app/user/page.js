import Navigator from "@/app/components/Navigator.js";
import Link from 'next/link';
export default function User(){
    return (
        <>
            <Navigator/>
            <h1>User tab</h1>
            <Link href="/user/create/">Create User</Link>
            
        </>
    );
}
