import Form from "./components/Form"
import { useEffect, useMemo } from "react"
import ActivityList from "./components/ActivityList"
import CaloriesTracker from "./components/CaloriesTracker"
import { useActivity } from "./hook/useActivity"

function App() {
  const {state, dispatch } = useActivity()
  useEffect(() => localStorage.setItem('activities', JSON.stringify(state.activities)),[state.activities])
  return (
    <>
      <header 
      className=" bg-slate-800 py-4"
      >
        <div
        className=" max-w-4xl mx-auto flex justify-between"
        >
            <h1
            className=" text-white flex flex-col justify-center"
            ><strong>Contado de calorias</strong></h1>

            
            <button
            disabled={ useMemo(() => !(state.activities.length > 0),[state.activities]) }
            onClick={() => dispatch({type : 'restart-app'})}
            className=" bg-slate-200 p-2 rounded-lg text-black disabled:opacity-10 disabled:cursor-not-allowed transition-all"
            >Reiniciar App</button>
        </div>
      </header>
      <section
      className=" bg-slate-700 py-20 px-5"
      >
        <div className=" max-w-4xl mx-auto">
          <Form/>
        </div>
      </section>
      <section className=" bg-slate-800 py-10 w-full">
        <div className=" max-w-4xl mx-auto">
          <CaloriesTracker/>
        </div>
      </section>
      <section className=" max-w-4xl py-20  mx-auto">
        {state.activities.length ? (
            <ActivityList/>
        ) : (
            <h2 className=" text-4xl text-center font-bold opacity-45">Aun no tienes actividades...</h2>
        )}

      </section>
    </>
  )
}

export default App
