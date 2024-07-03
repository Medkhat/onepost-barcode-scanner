import { useEffect } from "react"

export const useVhVar = () => {
  useEffect(() => {
    function setVhVariable() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    window.addEventListener("resize", setVhVariable)
    setVhVariable()
  }, [])
}
