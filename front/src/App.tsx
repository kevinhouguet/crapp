import Header from "./components/header"
import { useEffect } from "react"
import Calendar from "./components/calendar/calendar.container";
import ReportFormContainer from "./components/reportForm/reportForm.container";

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
      <ReportFormContainer />
      <Calendar />
    </>
  )
}