import { FC, ReactHTMLElement } from "react"

function merge(classNames:string | undefined, sufix: string){
    return classNames + ' ' + sufix
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{}
const Button: FC<ButtonProps> = ({ className, children, ...props}) => {
    return <button {...props} className={merge(className, "px-10")}>{children}</button>
}

interface GreyButtonProps extends ButtonProps{}
export const GreyButton: FC<GreyButtonProps> = () => {
    return <Button className="bg-slate-50 rounded-md px-2 py-2">my blue button</Button>
}


export const RedButton = () => {
    return <Button className="bg-red-400 rounded-md px-2 py-2">my blue button</Button>
}
