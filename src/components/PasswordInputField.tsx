import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInputPropType } from "@/types/ComponentPropTypes";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const PasswordInputField = ({ FieldName, label, className = "" }: PasswordInputPropType) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={control}
            name={FieldName}
            render={({ field }) => (
                <FormItem className={`w-full ${className}`}> {/* Apply className here */}
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                className="bg-white w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                            >
                                {showPassword ? (
                                    <Eye className="text-primary" />
                                ) : (
                                    <EyeOff className="text-primary" />
                                )}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PasswordInputField;
