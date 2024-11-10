import icons from "@/constants/icons"
import { LogOut } from "lucide-react"

const HomePage = () => {
    return (
        <div>
            <div className='flex justify-between items-center h-16 bg-red-300 px-24'>
                <img src={icons.themeIcon} alt="theme icon" className="w-30" />
                <div>Icons</div>
                <LogOut className="" />
            </div>
        </div>
    )
}

export default HomePage