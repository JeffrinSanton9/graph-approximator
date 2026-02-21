import Navigator from "@/app/components/Navigator.js";
import './globals.css';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <Navigator/>
            <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Graph Approximator</h1>
                <h2 className="text-xl font-mono text-purple-700 mb-4">Approximate and Visualize</h2>
                <p className="text-md text-gray-700 mb-2">This is the home page of Graph Approximator. Here you can understand what the website does and easily navigate through the whole website.</p>
            </div>
        </div>
    );
}
