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

const registerFormSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .regex(/^[A-Za-zÀ-ÿ]+$/, "First name can only contain letters. Only one name"),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .regex(/^[A-Za-zÀ-ÿ]+$/, "Last name can only contain letters. Only one name"),
    phone: z.string()
        .min(10, "Phone number must be 10 digits")
        .regex(/^07\d{8}$/, "Phone number must be a Sri Lankan phone number starting with 07"),
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
    confirmPassword: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
        )
        .min(1, "Password is required"),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

type UserRegistrationData = z.infer<typeof registerFormSchema>;

type Props = {
    onSave: (userFormData: FormData) => void;
    isLoading: boolean;
    title: string;
}

const UserRegisterForm = ({ onSave, isLoading, title }: Props) => {
    const navigate = useNavigate();

    const form = useForm<UserRegistrationData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {}
    });

    const onSubmit = async (formDataJson: UserRegistrationData) => {
        const formData = new FormData();
        formData.append("email", formDataJson.email);
        formData.append("firstName", formDataJson.firstName);
        formData.append("lastName", formDataJson.lastName);
        formData.append("phone", formDataJson.phone);
        formData.append("password", formDataJson.password);

        try {
            await onSave(formData);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-white px-20 py-20 md:px-40 lg:py-20 lg:px-80 min-h-screen"
            >
                <div className="flex justify-center">
                    <img src={icons.themeIcon} alt="theme icon" className="w-30" />
                </div>
                <div>
                    <h2 className="text-3xl  -mb-4">{title}</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full md:flex-1">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full md:flex-1">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
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
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-full md:flex-1">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                    <PasswordInputField FieldName="password" label="Password" className="w-full md:flex-1" />
                    <PasswordInputField FieldName="confirmPassword" label="Confirm Password" className="w-full md:flex-1" />
                </div>


                {isLoading ? (
                    <LoadingButton/>
                ) : (
                    <Button type="submit" className="bg-primary shadow-slate-400">
                        Create Account
                    </Button>
                )}

                <div className="flex justify-center">
                    <p>Already have an account?</p>
                    <Link to="/login" className="pl-2 font-bold text-primary">Login</Link>
                </div>

            </form>
        </Form>
    )
}

export default UserRegisterForm