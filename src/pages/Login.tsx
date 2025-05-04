import {LoginForm} from "@/components/ui/login-form.tsx";

export default function Login() {
    return (
        <div className="flex w-full items-center justify-center p-6 md:p-10 h-150">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}