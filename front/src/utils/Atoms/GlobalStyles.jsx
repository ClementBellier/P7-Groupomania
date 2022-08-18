import { createGlobalStyle } from 'styled-components'
import { useTheme } from '../hooks/useTheme'

const StyledGlobalStyle = createGlobalStyle`
    :root{    
        --primary-color: ${props=> props.isDarkMode ? '#e14323':'#FD2D01'};
        --secondary-color: ${props=> props.isDarkMode ? '#bd7b7b':'#FFD7D7'};
        --tertiary-color: ${props=> props.isDarkMode ? 'white':'#4E5166'};
        --shadow-color: ${props=> props.isDarkMode ? 'rgba(192, 192, 192, 0.336)':'rgba(129, 129, 129, 0.336)'};
        --success-color: #00B06B;
        --background-color: ${props=> props.isDarkMode ? '#292931':'white'};
    }
    body{
        background-color: var(--background-color);
        color: var(--tertiary-color);
    }
`

export function GlobalStyle() {
    const {theme}= useTheme()
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}
