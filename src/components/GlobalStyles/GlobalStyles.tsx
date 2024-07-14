import './GlobalStyles.module.scss';

interface GlobalStylesProps {
    children: JSX.Element;
}

const GlobalStyles = ({ children }: GlobalStylesProps) => {
    return children;
};

export default GlobalStyles;
