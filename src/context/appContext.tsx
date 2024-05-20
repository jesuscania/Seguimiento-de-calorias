import React, { ReactNode, createContext, useReducer } from "react"
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/Activity-reducer"

type budgetContextProps = {
    state : ActivityState
    dispatch : React.Dispatch<ActivityActions>
}

type budgetProviderProps = {
    children : ReactNode
}

export const BudgetContext = createContext<budgetContextProps>(null!)

export const BudgetProvider = ({children} : budgetProviderProps) => {

    const [state,dispatch] = useReducer(activityReducer, initialState)
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        > {children}
        </BudgetContext.Provider>
    )
}