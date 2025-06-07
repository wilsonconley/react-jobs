import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  bg?: string;
}

function Card({ children, bg = "bg-gray-100" }: Props) {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
}

export default Card;
