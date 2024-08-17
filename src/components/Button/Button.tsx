import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
    to?: string;
    href?: string;
    target?: string;
    type?: string;
    name?: string;
    value?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    small?: boolean;
    large?: boolean;
    children?: JSX.Element | string;
    className?: string;
    style?: any;
    leftIcon?: boolean | JSX.Element;
    rightIcon?: boolean | JSX.Element;
    onClick?: () => void;
}

const Button = forwardRef(
    (
        {
            to,
            href,
            target,
            type,
            name,
            value,
            primary = false,
            outline = false,
            text = false,
            disabled = false,
            rounded = false,
            small = false,
            large = false,
            children,
            className,
            style,
            leftIcon = false,
            rightIcon = false,
            onClick,
            ...passProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement>
    ) => {
        let Comp: any = 'button';

        interface propsObject {
            [key: string]: (() => void) | undefined | string;
        }
        const props: propsObject = {
            onClick,
            ...passProps,
        };

        // Remove event listener when button is disabled
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            props.target = target;
            Comp = 'a';
        }

        const classes = cx('wrapper', {
            [className + '']: className,
            primary,
            outline,
            text,
            disabled,
            rounded,
            small,
            large,
        });

        return (
            <Comp
                type={type}
                name={name}
                value={value}
                ref={ref}
                className={classes}
                style={style}
                {...props}
            >
                {leftIcon}
                {children}
                {rightIcon}
            </Comp>
        );
    }
);

export default Button;
