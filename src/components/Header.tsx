import { LogOut } from "lucide-react";
import icons from "@/constants/icons";
import { useLogout } from "@/hooks/useLogout";
import { HeaderPropType } from "@/types/ComponentPropTypes";
import { useNavigate } from "react-router-dom";

const Header = ({ children }: HeaderPropType) => {
    const logout = useLogout();
    const navigate = useNavigate();

    const onClickLogout = () => {
        const confirm = window.confirm("Are you sure want to logout?");
        if (confirm) {
            logout();
        }
    };

    const onClickIcon = () => {
        navigate("/home");
    };

    return (
        <div className="bg-white w-screen py-3 flex justify-between items-center h-full flex-wrap gap-4 px-5 md:px-10 lg:px-24">
            <img
                src={icons.themeIcon}
                alt="theme icon"
                className="w-30"
                onClick={onClickIcon} />
            {children}
            <LogOut onClick={onClickLogout} />
        </div>
    );
};

export default Header;
