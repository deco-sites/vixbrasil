import LoginButton from "../../components/header/LoginButton.tsx";

interface LoginButtonProps {
  variant: string;
}

export default function Island(props: LoginButtonProps) {
  return <LoginButton {...props} />;
}
