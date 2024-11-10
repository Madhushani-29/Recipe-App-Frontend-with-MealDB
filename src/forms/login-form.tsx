import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import PasswordInputField from "@/components/PasswordInputField";
import icons from "@/constants/icons";
import { Link } from "react-router-dom";

const loginFormSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
        )
        .min(1, "Password is required"),
});

type UserLoginData = z.infer<typeof loginFormSchema>;

type Props = {
    onSave: (userFormData: FormData) => void;
    isLoading: boolean;
    title: string;
}

const UserLoginForm = ({ onSave, isLoading, title }: Props) => {
    const navigate = useNavigate();

    const form = useForm<UserLoginData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {}
    });

    const onSubmit = async (formDataJson: UserLoginData) => {
        const formData = new FormData();
        formData.append("email", formDataJson.email);
        formData.append("password", formDataJson.password);

        try {
            await onSave(formData);
            setTimeout(() => {
                navigate("/home");
            }, 3000);
        } catch (error) {
            console.error("Error login user:", error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-white w-96 py-20 lg:py-20 mx-auto"
            >
                <div className="flex justify-center">
                    <img src={icons.themeIcon} alt="theme icon" className="w-30" />
                </div>
                <div>
                    <h2 className="text-3xl  -mb-4">{title}</h2>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full md:flex-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <PasswordInputField FieldName="password" label="Password" className="w-full md:flex-1" />

                {isLoading ? (
                    <LoadingButton className="w-full"/>
                ) : (
                    <Button type="submit" className="bg-primary w-full text-lg shadow-lg shadow-slate-400">
                        Sign In
                    </Button>
                )}

                <div className="flex justify-center">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="pl-2 font-bold text-primary">Create an account</Link>
                </div>


            </form>
        </Form>
    )
}

export default UserLoginForm;