'use client'

import { useTheme } from './ThemeProvider'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span className="material-icons">dark_mode</span>
      ) : (
        <span className="material-icons">light_mode</span>
      )}
    </button>
  )
}
