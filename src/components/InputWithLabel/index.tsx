import React, { useEffect, useRef } from 'react';

/**
 * InputWithLabel component
 * 
 * @param {Object} props:
 *      id - unique id for label to reference input,
 *      value - initial value,
 *      type - defaults to 'text',
 *      onInputChange - change handler,
 *      isFocused - focus flag for inputelement,
 *      children 
 * @returns InputWithLabel component
 */

type InputWithLabelProps = {
    id: string;
    value: string;
    type?: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isFocused?: boolean;
    children: React.ReactNode;
};

const InputWithLabel = ({
    id,
    value,
    type='text',
    onInputChange,
    isFocused,
    children
}: InputWithLabelProps) => {
    const inputRef = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id} className='label'>{children}</label>
            &nbsp;
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
                className='input'
            />
        </>
    );
};

export default InputWithLabel;