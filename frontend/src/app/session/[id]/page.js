import Navigator from "@/app/components/Navigator.js";
export default async function Session({ params }) {
    const { id } = await params;
    return (
        <>
            <Navigator/>
            <h1>Session {id}</h1>
        </>
    );
}
