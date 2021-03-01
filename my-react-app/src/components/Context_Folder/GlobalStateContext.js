import React, {createContext, Component} from 'react'
//handle on recipe submite removing from stack 
//call historyKeys in other components to check history
export const GlobalStateContext = createContext()
const [BROWSER_KEY, COMPONENT_STATE] = [0,1]
class GlobalStateContextProvider extends Component{
    state ={
        historyStack: [],
        historyKeys: {},
        pointer: -1
    }
    restoreHistory =(browserKey)=>{
        let {historyStack, historyKeys, pointer} = this.state
        if(historyKeys[browserKey] === undefined){
            return false
        }
        else{
            pointer = historyKeys[browserKey]
            this.setState({pointer})
            return historyStack[pointer][COMPONENT_STATE]
        }

    }
    addToHistory = (browserKey, key, value) =>{
        let {historyStack, historyKeys, pointer} = this.state
        //this check may not be necisary
        if (browserKey !== historyStack[pointer][BROWSER_KEY]){
            console.log('addToHistory move the pointer need to check out')
            pointer = historyKeys[browserKey]
            //do a check here to see if key existis because if not something when wrong
            this.setState({
                pointer
            })
        }
        //this could be a bad way of editing state 
        //do i need to use the spread operator when adding the array back to state when all the changes have already been made
        historyStack[pointer][COMPONENT_STATE][key] = value
        this.setState({
            historyStack
        })
        
    }
    pushToHistory = (browserKey, componentState) =>{
        //https://www.w3schools.com/jsref/prop_his_length.asp
        let {historyStack, historyKeys, pointer} = this.state

        //pointer at the end of the stack
        if(pointer + 1 === historyStack.length){
            pointer += 1
            let newPair = {[browserKey]: pointer}
            this.setState({
                historyStack: [...historyStack, [browserKey,componentState]],
                pointer,
                historyKeys: {...historyKeys, ...newPair}
            })
        }
        //pointer not at the end
        else{
            pointer += 1
            let scrubHistoryStack = historyStack.slice(pointer)
            historyStack = historyStack.slice(0,pointer)
            let newPair = {[browserKey]: pointer}
            for(let i = 0; i < scrubHistoryStack.length; i ++){
                let key = scrubHistoryStack[i][BROWSER_KEY]
                delete historyKeys[key]
            }
            this.setState({
                historyStack: [...historyStack,  [browserKey,componentState]],
                pointer,
                historyKeys: {...historyKeys, ...newPair}
            })
        }
        //if history stack is greater than 50 keep stack at 50 or less
        //swap with history.length may need to make this a HOC 
        if(historyStack.length > 50){
            if(pointer === 0){
                console.log('from context: somthing went wrong in clearing history stack pointer is at 0 and stack is > 50')
            }
            else{
                let key = historyStack[0][BROWSER_KEY]
                delete historyKeys[key]
                historyStack.shift() //remove first element of the array
                for(let i = 0; i < historyStack.length; i++){
                    key = historyStack[i][BROWSER_KEY]
                    historyKeys[key] = i
                }
                this.setState({
                    historyStack,
                    pointer: pointer - 1,
                    historyKeys
                })
            }
        }

    }

    render(){
        return(
            <GlobalStateContext.Provider value={{restoreHistory: this.restoreHistory, addToHistory: this.addToHistory, pushToHistory: this.pushToHistory, contextState: this.state}}>
                {this.props.children}
            </GlobalStateContext.Provider>
        )
    }
}

export default GlobalStateContextProvider