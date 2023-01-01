let todoInput
let btnAdd
let ulList
let errorInfo
let newTodos

let popup
let popupInfo
let popupInput
let todoToEdit
let popupBtnCancel
let popupBtnAdd


const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}
const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo__input')
    btnAdd = document.querySelector('.todo__btn-add')
    errorInfo = document.querySelector('.todolist__error')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup__info')
    popupInput = document.querySelector('.popup__input')
    popupBtnCancel = document.querySelector('.cancel')
    popupBtnAdd = document.querySelector('.accept')

}
const prepareDOMEvents = () => {
    btnAdd.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    popupBtnCancel.addEventListener('click', closedPopup)
    popupBtnAdd.addEventListener('click', changeTodo)
    todoInput.addEventListener('keyup', enterKeyCheck)
    
    
}
const addNewTask = () => {
    if(todoInput.value !== '') {
        newTodos = document.createElement('li')
        newTodos.textContent = todoInput.value
        createNewTools()

        ulList.append(newTodos);
        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania'
    }
}

const createNewTools = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('todolist__tools')
    newTodos.append(toolsPanel)

    const btnComplete = document.createElement('button')
    btnComplete.classList.add('todolist__btn-complete')
    btnComplete.innerHTML = `<i class="fas fa-check"></i>`

    const btnEdit = document.createElement('button')
    btnEdit.classList.add('todolist__btn-edit')
    btnEdit.textContent = 'EDIT'

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('todolist__btn-delete')
    btnDelete.innerHTML = '<i class="fas fa-times">'

    toolsPanel.append(btnComplete, btnEdit, btnDelete)
}

const checkClick = (e) => {
    if(e.target.matches('.todolist__btn-complete')){
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if(e.target.matches('.todolist__btn-edit')) {
        editTodo(e)
    } else if(e.target.matches('.todolist__btn-delete')) {
        deleteTodo(e)
    }
}

const editTodo = (e) => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    popup.classList.toggle('flex')
}

const closedPopup = () => {
    popup.classList.toggle('none')
    popupInfo.textContent = ''
}

const changeTodo = () => {
    if(popupInput.value !== ''){
        todoToEdit.firstChild.textContent = popupInput.value
        popup.classList.toggle('none')
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść'
    }
}

const deleteTodo = (e) => {
    e.target.closest('li').remove()
}
const enterKeyCheck = (e) => {
    if(e.key === 'Enter'){
        addNewTask()
    }
}
document.addEventListener('DOMContentLoaded', main)