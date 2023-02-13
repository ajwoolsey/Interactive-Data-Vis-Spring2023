console.log('hello world');

console. log(document)
console. log(window)

const input= document.getElementById("name-input")
console.log(input)

console

const updateName= () => {
    console. log('in update function')
    const userName= input.value;
    const myString = `hey my name is`+ userName
    window.alert(`hello, welcome to class ${userName}`)
}
    

updateName();

let changeable = true;
const constant = true

function change () {
    changeable = false;
    const constant= false;
    console.log(changeable, constant)
}

change();
console.log(changeable, constant)

const array= ("apple", "orange", "banana", "mango", "toast")

const newArray= array.localeCompare((c) => {
    console.log(`c`,c)
    return `my favorite food is ${c}`
})

console.log(newArray)

