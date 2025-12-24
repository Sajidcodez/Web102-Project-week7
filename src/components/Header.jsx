import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ search, setSearch, sidebarOpen, setSidebarOpen }) => {
    const handleInputChange = (e) => {
        let text = e.target.value;
        text = text.charAt(0).toUpperCase() + text.slice(1);
        setSearch(text);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className='md:hidden fixed top-4 left-4 z-40 bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-lg transition'
                aria-label='Toggle menu'
            >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
            </button>

            {/* Sidebar */}
            <div className={`${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 z-30 w-64 md:w-auto flex flex-col gap-8 min-h-screen font-mono bg-violet-100/20 md:pl-10 pl-2 md:pr-2 pr-4 pt-16 md:pt-12 md:ml-4 md:mr-4 text-gray-100`}>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className='md:hidden absolute top-4 right-4 text-white hover:text-gray-200 transition'
                    aria-label='Close menu'
                >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>
                
                <div className="flex gap-2 md:text-2xl text-xl">
                    <span className="text-4xl">&#127780;</span>
                    <h2>Check Weather</h2>
                </div>
                <nav className='flex flex-col gap-6'>
                    <Link to='/' onClick={() => setSidebarOpen(false)}>
                        <div className='flex items-center text-xl gap-3 hover:text-violet-300 transition'>
                            <span className='text-3xl'>&#127969;</span>
                            <h2>Dashboard</h2>
                        </div>
                    </Link>
                    <Link to='/search'>
                        <div className='flex items-center gap-3 text-xl'>
                            <span>&#128269;</span>
                            <input 
                                type="text" 
                                placeholder='Search...' 
                                value={search} 
                                onChange={handleInputChange}
                                onKeyDown={handleSearchKeyDown}
                                className="bg-transparent rounded-md pl-2 p-1 w-40 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" 
                            />
                        </div>
                    </Link>
                    <Link to='/about' onClick={() => setSidebarOpen(false)}>
                        <div className='flex gap-3 text-xl hover:text-violet-300 transition'>
                            <span>&#128160;</span>
                            <h2>About</h2>
                        </div>
                    </Link>
                </nav>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className='fixed inset-0 bg-black/50 z-20 md:hidden'
                />
            )}
        </>
    );
}

export default Header;
