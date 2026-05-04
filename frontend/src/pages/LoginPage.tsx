import Login from '../components/Login/Login';

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  return <Login onLogin={onLogin} />;
}