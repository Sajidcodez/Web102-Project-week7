const Card = ({ data, title }) => {

    return (
        <div className="flex flex-col text-center justify-between bg-violet-100/20 p-6 pl-8 pr-8 m-2 rounded-xl gap-6 mb-6">
            <p className="text-2xl">{data}</p>
            <p>{title}</p>
        </div>
    )
}

export default Card; 