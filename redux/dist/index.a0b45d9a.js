let reduxState = {
    count: 0,
    name: "ankit singh",
    age: 20,
    post: 0
};
let reducer = (state, action)=>{
    if (action.type === "post/increment") return {
        ...state,
        post: state.post + 1
    };
    else if (action.type === "post/decrement") return {
        ...state,
        post: state.post - 1
    };
    else if (action.type === "post/incrementBy") return {
        ...state,
        post: state.post + action.payload
    };
};
console.log(reduxState);
reduxState = reducer(reduxState, {
    type: "post/increment"
});
console.log(reduxState);
reduxState = reducer(reduxState, {
    type: "post/decrement"
});
console.log(reduxState);
reduxState = reducer(reduxState, {
    type: "post/incrementBy",
    payload: 10
});
console.log(reduxState);

//# sourceMappingURL=index.a0b45d9a.js.map
