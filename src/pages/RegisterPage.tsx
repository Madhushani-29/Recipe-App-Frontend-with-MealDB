import { useRegister } from '@/api/UserApi';
import UserRegisterForm from '@/forms/register-form';

const RegisterPage = () => {
  const { isLoading, registerUser } = useRegister();

  return (
    <UserRegisterForm title="Register" onSave={registerUser} isLoading={isLoading} />
  )
}

export default RegisterPage