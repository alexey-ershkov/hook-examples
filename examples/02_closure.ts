const add = (() => {
    let num_variable = 1;
    return () => ++num_variable;
})();

console.log(add());
console.log(add());
console.log(add());
console.log(add());