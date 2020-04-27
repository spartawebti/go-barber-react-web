import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputfocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const hadleInputBlur = useCallback(() => {
        setIsFocused(false);

        if (inputRef.current?.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container
            isErrored={!!error}
            isFilled={isFilled}
            isFocused={isFocused}
        >
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputfocus}
                onBlur={hadleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
            {error && (
                <Error>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>
    );
};

export default Input;
