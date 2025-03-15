
interface ICategoryExplorer  {
    id: number;
    color: string;
    title: string;
    description: string;
    icon: string;
}

const CategoryExplorer = ({genre}: {genre: ICategoryExplorer}) => {
    return (
        <div>
            <div
                key={genre.id}
                className={`bg-gradient-to-br ${genre.color} p-6 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer`}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">{genre.title}</h3>
                        <p className="text-sm opacity-90 mt-1">{genre.description}</p>
                    </div>
                    <span className="text-4xl">{genre.icon}</span>
                </div>
            </div>
        </div>
    );
};

export default CategoryExplorer;
