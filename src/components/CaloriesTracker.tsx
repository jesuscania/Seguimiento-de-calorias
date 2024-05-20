import { useMemo } from "react"
import { useActivity } from "../hook/useActivity"

export default function CaloriesTracker() {
    const {state} = useActivity()
    const activities = state.activities
    const caloriesConsume = useMemo(()=> activities.reduce((total,activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesBurned = useMemo(()=> activities.reduce((total,activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const caloriesTotal = useMemo(()=> caloriesConsume - caloriesBurned , [caloriesBurned, caloriesConsume])
    
    
    return (
        <>
            <h2 className=" text-4xl font-bold text-white text-center"> Resumen de Calorias </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className=" font-black text-6xl text-lime-500">{caloriesConsume}</span>
                    Consumidas
                </p>
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className=" font-black text-6xl text-orange-500">{caloriesBurned}</span>
                    Quemadas
                </p>
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className=" font-black text-6xl text-red-500">{caloriesTotal}</span>
                    Resumen
                </p>
            </div>
        </>
    )
}
