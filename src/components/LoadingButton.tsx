import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type LoadingButtonProps = {
    className?: string;
}

const LoadingButton = ({ className }: LoadingButtonProps) => {
    return (
        <Button disabled className={className}>
            <Loader2 className={`mr-2 h-4 w-4 animate-spin ${className ? className : ''}`} />
            Loading
        </Button>
    );
};

export default LoadingButton;