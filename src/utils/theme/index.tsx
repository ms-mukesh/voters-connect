import React from 'react';
import { themes } from './themeColorPlate';
import { useColorScheme } from 'react-native';

const initialState = {
    dark: false,
    theme: themes.light,
    toggle: () => {},
};
const ThemeContext = React.createContext(initialState);
const ThemeProvider = (props: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [dark, setDark] = React.useState(isDarkMode); // Default theme is light
    const toggle = () => {
        setDark(!dark);
    };
    const theme = dark ? themes.dark : themes.light;
    return (
        <ThemeContext.Provider value={{ theme, dark, toggle }}>
            {props.children}
        </ThemeContext.Provider>
    );
};
export { ThemeProvider, ThemeContext };
