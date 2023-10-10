import Header from "./components/header"
import { useEffect } from "react"

export default function App() {

  const headerProps = {
    title: 'It\'s a CRApp!'
  }

  useEffect(() => {
    console.log('App component mounted');
    
  });

  return (
    <>
      <Header {...headerProps} />
    </>
  )
}