import Link from "next/link";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

const Button = ({ label, onClick, href }: ButtonProps) => {
  if (href) {
    return (
      <Link href={href} passHref>
        <button onClick={onClick}>{label}</button>
      </Link>
    );
  }
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
