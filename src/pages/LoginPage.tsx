import { useLogin } from '@/api/UserApi';
import UserLoginForm from '@/forms/login-form';

const LoginPage = () => {
  const { isLoading, loginUser } = useLogin();
  return (
    <UserLoginForm title="Login" onSave={loginUser} isLoading={isLoading} />
  )
}

export default LoginPage