const Card = ({ data, title }) => {

    return (
        <div className="flex flex-col text-center justify-between bg-violet-100/20 p-4 md:p-6 lg:pl-8 lg:pr-8 m-1 md:m-2 rounded-xl gap-4 md:gap-6">
            <p className="text-lg md:text-2xl font-semibold break-words">{data}</p>
            <p className="text-sm md:text-base text-gray-300">{title}</p>
        </div>
    )
}

export default Card; 