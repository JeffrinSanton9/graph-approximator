import Navigator from "@/app/components/Navigator.js";
export default async function User({ params }) {
    const { id } = await params;
    return (
        <>
            <h1>User id {id}</h1>
        </>
    );
}
