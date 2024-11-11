import { Badge } from "@/components/ui/badge"

type CategotyListPropType = {
    categories: string[];
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
};

const CategotyList = ({ categories, currentCategory, setCurrentCategory }: CategotyListPropType) => {
    return (
        <>
            <div className="flex flex-row flex-wrap space-x-4 pl-3">
                {categories.map((category) => (
                    <Badge
                        className={
                            `text-sm rounded-3xl px-6 py-2 
                            ${currentCategory === category ?
                                'bg-primary hover:bg-primary' :
                                'bg-transparent text-primary border border-primary shadow-none hover:bg-primary hover:text-white'}`}
                        key={category}
                        onClick={() => setCurrentCategory(category)}>{category}</Badge>
                ))}
            </div>
        </>
    )
}

export default CategotyList