import { useMemo } from "react"
import { activityType } from "../types"
import { categories } from "../data/db"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useActivity } from "../hook/useActivity"



export default function ActivityList() {

    const {state, dispatch} = useActivity()
    const acitivity = state.activities

    const categoryName = useMemo(()=> (categorie : activityType['category'])=> categories.map(cat => cat.id === categorie ? cat.name : '') ,[state])

    return (
        <>
            <h2
            className=" text-4xl font-bold text-center"
            >Lista de Actividades</h2>
            { acitivity.map(actividad => (
                <div 
                className="px-5 py-10 border-2 rounded-xl shadow-md bg-slate-100 mt-10 flex justify-between"
                key={actividad.id}>
                    <div className=" space-y-2 relative">
                        <p 
                        className={`absolute -top-14 -lef-8 rounded-b-md py-2 px-10  uppercase font-bold text-white ${actividad.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}
                        >{categoryName(+actividad.category)}</p>
                        <p className=" text-xl font-bold">{actividad.name}</p>
                        <p className={`text-4xl ${actividad.category == 1 ? 'text-lime-500' : 'text-orange-500'} font-bold`}>{actividad.calories} {" "} <strong>Calorias</strong></p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button>
                            <PencilSquareIcon
                            onClick={() => dispatch({type : "set-activeId", payload : {activeId : actividad.id}})} 
                            className=" h-8 w-8 text-gray-800"
                            />
                        </button>
                        <button>
                            <XCircleIcon
                            onClick={() => dispatch({type : "delete-activity", payload : {id : actividad.id}})} 
                            className=" h-8 w-8 text-red-600"
                            />
                        </button>
                    </div>    
                </div>
            ))}
        </>
    )
}
