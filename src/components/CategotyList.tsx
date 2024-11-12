import { Badge } from "@/components/ui/badge"
import { CategotyListPropType } from "@/types/ComponentPropTypes"

const CategotyList = ({ categories, currentCategory, setCurrentCategory }: CategotyListPropType) => {
    return (
        <>
            <div className="flex flex-row flex-wrap gap-5 mb-10">
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