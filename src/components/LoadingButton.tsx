import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { LoadingButtonPropType } from "@/types/ComponentPropTypes";

const LoadingButton = ({ className }: LoadingButtonPropType) => {
    return (
        <Button disabled className={className}>
            <Loader2 className={`mr-2 h-4 w-4 animate-spin ${className ? className : ''}`} />
            Loading
        </Button>
    );
};

export default LoadingButton;