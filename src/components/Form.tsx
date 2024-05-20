import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/db"
import { activityType } from "../types"
import { useActivity } from "../hook/useActivity"


//Estado inicial para evitar codigo duplicado de este
const initialState : activityType = {
    id : uuidv4(),
    category : 1,
    name: '',
    calories: 0
}

export default function Form() {
    const [activity, setActivity] = useState<activityType>(initialState)
    const {state, dispatch} = useActivity()

    useEffect(()=> {
        if(state.activeId){
            const activitySelected = state.activities.filter((activity) => activity.id === state.activeId)[0]
            setActivity(activitySelected)
        }
    },[state.activeId])

    function handleChange (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>){
        const isNumberField = ['calories', 'category'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }
    const isValidActivity = () => {
        const {calories, name} = activity
        return name.trim() !== '' && calories > 0
    }
    //codigo de submit de formulario
    function handleSubmit( e  : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        //usando useReducer con tipado especifico
        dispatch({type : "save-activity", payload : {newActivity : activity}})
        setActivity({...initialState, id:uuidv4()})
    }
    return (
        <form 
        onSubmit={handleSubmit}
        className=" space-y-5 bg-white rounded-lg p-10 shadow-2xl">
            <div className=" grid grid-cols-1 gap-1">
                <label className=" font-bold" htmlFor="category">Categoria:</label>
                <select name="tipo" id="category" 
                className=" border-2 rounded-lg border-slate-300 p-2 w-full bg-white hover:shadow-md hover:border-slate-950 transition-all"
                value={activity.category}
                onChange={handleChange}
                >
                    {categories.map(categoria => (
                        <option 
                        key={categoria.id}
                        value={categoria.id}
                        >{categoria.name}</option>
                    ))}
                </select>
            </div>
            <div className=" grid grid-cols-1 gap-1">
                <label className=" font-bold" htmlFor="name">Actividad:</label>
                <input 
                className=" border-2 rounded-lg border-slate-300 p-2 w-full hover:shadow-md hover:border-slate-950 transition-all"
                id="name"
                type="text" 
                placeholder="Ej. Comida, Jugos de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
                />
            </div>
            <div className=" grid grid-cols-1 gap-1">
                <label className=" font-bold" htmlFor="calories">Calorias:</label>
                <input 
                className=" border-2 rounded-lg border-slate-300 p-2 w-full hover:shadow-md hover:border-slate-950 transition-all"
                id="calories"
                type="number" 
                placeholder="Calorias Ej. 300, 500"
                value={activity.calories}
                onChange={handleChange}
                />
            </div>
            <input type="submit" 
            className=" w-full bg-slate-800 hover:bg-slate-950 text-white p-2 transition-all cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? `Guardar Comida` : `Guardar Ejercicio`} 
            disabled={!isValidActivity()}
            />
        </form>
    )
}
