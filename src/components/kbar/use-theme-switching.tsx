import { useTheme } from "next-themes";
import { Action, useRegisterActions } from "kbar"

export const useThemeSwitching = () => {
    const { theme , setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const themeActions: Action[] = [
        {
            id : 'toggleTheme',
            name : 'Toggle Theme',
            shortcut : ['t' , 't'],
            section : 'Theme',
            perform : toggleTheme
        },
        {
            id : 'setLightTheme',
            name : 'set Light Theme',
            section : 'Theme',
            perform : () => setTheme('light')
        },
        {
            id : 'setDarkTheme',
            name : 'set Dark Theme',
            section : 'Theme',
            perform : () => setTheme('dark')
        }
    ] 

    useRegisterActions(themeActions , [theme])
}