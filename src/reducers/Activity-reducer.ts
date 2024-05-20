import { activityType } from "../types"

export type ActivityActions = 
{ type : 'save-activity', payload : {newActivity : activityType} } |
{ type : 'set-activeId', payload : {activeId : activityType['id']} } |
{ type : 'restart-app'} |
{ type : 'delete-activity', payload : {id : activityType['id']} } 


export type ActivityState = {
    activities : activityType[],
    activeId : activityType['id']
}

const setInitialState = () :activityType[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities : setInitialState(),
    activeId : ''
}

export const activityReducer = (
    state : ActivityState = initialState,
    action : ActivityActions
) => {
    //este codigo se ejecutara cuando se mande a llamar save-activity
    if (action.type === 'save-activity'){
        
        let updatedState : activityType[] = []
        if(state.activeId){
            updatedState = state.activities.map( actividad => actividad.id === state.activeId ? action.payload.newActivity : actividad )
        } else {
            updatedState = [...state.activities, action.payload.newActivity]
        }
        
        return {
            ...state,
            activities: updatedState,
            activeId : ""
        }
    }
    if (action.type === 'set-activeId'){

        return {
            ...state,
            activeId : action.payload.activeId
        }
    }
    if (action.type === "delete-activity"){

        return {...state, activities: state.activities.filter(actividad => actividad.id !== action.payload.id)}
    }
    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeId : ''
        }
    }
    return state

}