import TextField from '@mui/material/TextField';

type InputProps = {
    value: string;
    setValue: (arg: string) => void;
    label: string;
};

const Input = ({ value, setValue, label }: InputProps) => {
    return (
        <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            label={label}
        />
    );
};

export default Input;
