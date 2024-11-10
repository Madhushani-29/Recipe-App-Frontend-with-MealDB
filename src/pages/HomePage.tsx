import icons from "@/constants/icons"
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react"

const HomePage = () => {
    const logout = useLogout();
    const onClickLogout = () => {
        const confirm = window.confirm("Are you sure want to logout?");
        if (confirm) {
            logout();
        }
    }
    return (
        <div>
            <div className='flex justify-between items-center h-16 bg-red-300 px-24'>
                <img src={icons.themeIcon} alt="theme icon" className="w-30" />
                <div>Icons</div>
                <LogOut onClick={onClickLogout} />
            </div>
        </div>
    )
}

export default HomePage