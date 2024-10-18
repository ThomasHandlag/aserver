import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Usicat" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-white"> 

                <div className="max-w-7xl mx-auto p-6 lg:p-8 bg-dots-darker">
                    <div className="text-center p-5 border-4 shadow-lg border-cyan-700 shadow-cyan-400 rounded-md">
                        <h1 className="text-2xl font-semibold p-4 border-2 rounded-md shadow-lg border-cyan-700 shadow-cyan-500 dark:text-cyan-500">
                            Welcome to usicat!
                        </h1>
                        <p className="text-lg p-4">
                            U can close this tab, and open usicat with this <a className="text-blue-800" href="usicat://sign-callback" target="blank">Link</a>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}
