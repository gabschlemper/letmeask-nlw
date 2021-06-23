import { ButtonHTMLAttributes } from "react";
import {ButtonStyle} from "./style"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyle {...props}/>
  )
}