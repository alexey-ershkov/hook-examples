type ComponentType = () => { render: () => void, click: () => void, type: () => void }

const React = (() => {
    //@ts-ignore
    let hooks = [];
    let stateIdx = 0;
    const useState = <T>(initialState: T): [T, (newState: T) => void] => {
        //@ts-ignore
        const state = hooks[stateIdx] || initialState;
        const _idx = stateIdx
        const setState = (newState: T): void => {
            hooks[_idx] = newState
        }
        stateIdx++;
        return [state, setState];
    };

    //@ts-ignore
    const useEffect = (callback, dependencies) => {
        let hasChanged = true;
        //@ts-ignore
        const oldDeps = hooks[stateIdx];

        if (oldDeps) {
            //@ts-ignore
            hasChanged = dependencies.some((dep, i) => !Object.is(dep, oldDeps[i]))
        }

        if (hasChanged) {
            callback();
        }

        hooks[stateIdx] = dependencies;
        stateIdx++;
    }

    const render = (Component: ComponentType) => {
        stateIdx = 0;
        const component = Component();
        component.render();
        return component;
    }

    return {useState, render, useEffect};
})()

const Component: ComponentType = () => {
    const [count, setCount] = React.useState(1);
    const [text, setText] = React.useState('some text');
    React.useEffect(() => {
        console.log("useEffect called");
    }, []);

    return {
        render: () => console.log({count, text}),
        type: () => setText("other text"),
        click: () => setCount(count + 1)
    };
};

let App = React.render(Component);
App.click();
App = React.render(Component);
App.type();
React.render(Component);
