import { Button as MUIButton } from '@mui/material';

type ButtonProps = {
    text: string;
    disabled?: boolean;
    onClick?: (...args: any) => void;
};

const Button = ({ text, disabled = false, onClick }: ButtonProps) => {
    return (
        <MUIButton
            disabled={disabled}
            onClick={onClick}
            variant="contained"
            size="large"
        >
            {text}
        </MUIButton>
    );
};

export default Button;
