type ComponentType = () => { render: () => void, click: () => void, type: () => void }

const React = (() => {
    //@ts-ignore
    let storage = [];
    let storageIdx = 0;
    const useState = <T>(initialState: T): [T, (newState: T) => void] => {
        //@ts-ignore
        const state = storage[storageIdx] || initialState;
        const cachedIdx = storageIdx;
        const setState = (newState: T): void => {
            storage[cachedIdx] = newState;
        }
        storageIdx++;
        return [state, setState];
    };

    const render = (Component: ComponentType) => {
        storageIdx = 0;
        const component = Component();
        component.render();
        return component;
    }


    return {useState, render};
})()

const Component: ComponentType = () => {
    const [count, setCount] = React.useState(1);
    const [text, setText] = React.useState('some text');

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

