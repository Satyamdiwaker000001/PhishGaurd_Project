import React from "react";

export default function LandingPage() {
    return (
        <>
            <nav className="flex border-lime-400 border-2 rounded-full justify-between text-lime-400 bg-[#141414]">
                <img src="" alt="logo" className="ml-5" />
                <ul className="flex gap-2 m-3">
                    <li className="">
                        <a href="">About Us</a>
                    </li>
                    <li>
                        <a href="">Contact Us</a>
                    </li>
                </ul>
                <button>
                    <a
                        href="#"
                        className="mr-1 inline-block 
            bg-gradient-to-r from-[#141414] via-black to-black 
            border-[#151510] border-2 border-l-[#141414] 
            rounded-r-full px-6 py-2 text-white
            transition-colors duration-300
            hover:bg-black
            hover:border-gray-500"
                    >
                        Get Started
                    </a>
                </button>
            </nav>
            <header>
                <h1>Landing Page</h1>
            </header>
        </>
    );
}
