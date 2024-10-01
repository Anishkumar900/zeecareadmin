import React from 'react';
import MoonLoader from "react-spinners/MoonLoader";

export default function Spinner() {
    return (
        <div className=' fixed inset-0 flex items-center justify-center bg-white opacity-80 z-50'>
            <MoonLoader
                color="#0a17ab"
                cssOverride={{}}
                speedMultiplier={1}
            />
        </div>
    )
}
