import React from "react"

export const useReferredState = (initialValue) => {
    const [state, setState] = React.useState(initialValue);
    const reference = React.useRef(state);

    const setReferredState = (value) => {
        reference.current = value;
        setState(value);
    };

    return [state, reference, setReferredState];
};