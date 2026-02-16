import Navigator from "@/app/components/Navigator.js";
export default async function User({ params }) {
    const { id } = await params;
    return (
        <>
            <Navigator/>
            <h1>User {id}</h1>
        </>
    );
}
