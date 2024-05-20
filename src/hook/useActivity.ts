import { useContext } from "react"
import { BudgetContext } from "../context/appContext"


export const useActivity = () => {
    const context = useContext(BudgetContext)
    if(!context) throw new Error("No se cargo el provider de estados globales")
    return context
}