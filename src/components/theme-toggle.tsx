"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

  return (
    <Button variant={"outline"} size={'icon'} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <SunIcon className="w-5 h-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <MoonIcon className=" absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export default ThemeToggle