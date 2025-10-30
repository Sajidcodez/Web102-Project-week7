import { Link } from 'react-router-dom';


const Header = ({ search, setSearch }) => {
    const handleInputChange = (e) => {
        let text = e.target.value;
        text = text.charAt(0).toUpperCase() + text.slice(1);
        setSearch(text);
    };

    return (
        <div className='flex flex-col gap-8 min-h-screen font-mono bg-violet-100/20 md:pl-10 pl-2 md:pr-2 pr-0  pt-12 ml-4 md:mr-4 mr-0 text-gray-100'>
            <div className="flex gap-2 md:text-2xl text-xl">
                <span className="text-4xl">&#127780;</span>
                <h2>Check Weather</h2>
            </div>
            <nav className='flex flex-col gap-6'>
                <Link to='/'>
                    <div className='flex items-center text-xl gap-3'>
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
                                className="bg-transparent rounded-md pl-2 p-1" 
                            />
                    </div>
                </Link>
                <Link to='/about'>
                    <div className='flex gap-3 text-xl'>
                        <span>&#128160;</span>
                        <h2>About</h2>
                    </div>
                </Link>
            </nav>
        </div>
    );
}


export default Header;
