import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType
beforeEach(()=>{

    startState={
        error:null,
        status:'idle'
    }
})



test('correct error-message should ber set', () => {
    const endState = appReducer(startState, setAppErrorAC("error"))//альтернативная запись
    expect(endState.error).toBe('error');

});


test('correct status should ber set', () => {
    const endState = appReducer(startState, setAppStatusAC("loading"))//альтернативная запись
    expect(endState.status).toBe('loading');

});
