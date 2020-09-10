const form  = document.querySelector('form')
const list = document.querySelector('.list')

let arrayList = []

main()

function main(){
    document.addEventListener('DOMContentLoaded', readLS)
    form.addEventListener('submit', saveText)
    list.addEventListener('click', deleteItem)
}

function saveText(e){
    e.preventDefault()
    text = e.target.children[0].value
    if (text.length > 1 ){
        textObj = {
            id: Date.now(),
            text
        }
        arrayList = [...arrayList, textObj]
        form.reset()
        createItem(arrayList)
    }
}

function createItem(value){
    clearHTML()
    value.forEach(element => {
        const item = document.createElement('li')

        const btnC = document.createElement('input')
        btnC.setAttribute('type', 'checkbox')

        const btnD = document.createElement('img')
        btnD.setAttribute('src', 'img/trash-icon.png')
        btnD.setAttribute('width', '25')

        const cont = document.createElement('div')
        cont.classList.add('container-items')
        cont.appendChild(btnC)
        cont.appendChild(btnD)

        item.textContent = element.text

        item.appendChild(cont)
        item.setAttribute('id', `${element.id}`)

        list.appendChild(item)
    });

    syncLS()

}

function clearHTML(){
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }
}

function deleteItem(e){
    if (e.target.tagName === 'IMG'){
        const id = Number(e.target.parentElement.parentElement.id)
        arrayList = arrayList.filter(element => element.id !== id)
        createItem(arrayList)
    }
}

function syncLS(){
    localStorage.setItem('items', JSON.stringify(arrayList))
}

function readLS(){
    arrayList = (JSON.parse(localStorage.getItem('items')) || [])
    createItem(arrayList)
}