type ComponentType = () => { render: () => void, click: () => void }

const React = (() => {
    //@ts-ignore
    let storage;
    const useState = <T>(initialState: T): [T, (newState: T) => void] => {
        //@ts-ignore
        const state = storage || initialState;

        const setState = (newState: T): void => {
            storage = newState
        }

        return [state, setState];
    };

    const render = (Component: ComponentType) => {
        const component = Component();
        component.render();
        return component;
    }

    return {useState, render};
})()

const Component: ComponentType = () => {
    const [count, setCount] = React.useState(1);

    return {render: () => console.log(count), click: () => setCount(count + 1)};
};

const App = React.render(Component);
App.click();
React.render(Component);
