import { THEME } from '../../public/assets/texts/texts'
import { useTheme } from '../utils/hooks/useTheme'

export function Footer() {
    const { theme, toggleTheme } = useTheme()
  return (
    <footer>
      <input
        type="checkbox"
        className="themeInput loginpage-theme-input"
        checked={theme === 'dark'}
        onChange={() => toggleTheme()}
        aria-label={THEME.ARIA_LABEL}
      />
    </footer>
  )
}
