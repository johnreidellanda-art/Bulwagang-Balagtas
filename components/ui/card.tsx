import { CardProps } from "@/types/auth";

export const Card = ({children, className = ''} : CardProps) => {
    return (
        <div className={`card bg-base-100 shadow ${className}`}>
            {children}
        </div>
    );
}

export const CardBody = ({children, className = ''} : CardProps) => {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    );
}