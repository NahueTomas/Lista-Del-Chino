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
        textObj = {id: Date.now(), status: false, text}
        arrayList = [...arrayList, textObj]
        form.reset()
        createItem(arrayList)
    }
}
function createItem(value){
    clearHTML()
    value.forEach(element => {
        const item = document.createElement('li')
        const trash = document.createElement('img')
        trash.setAttribute('src', 'img/trash-icon.png')
        trash.setAttribute('width', '25')
        trash.setAttribute('height', '25')
        item.textContent = element.text
        item.appendChild(trash)
        item.setAttribute('id', `${element.id}`)
        if (element.status === true){
            item.classList.add('complete')
        }else{
            item.classList.remove('complete')
        }
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
        const id = Number(e.target.parentElement.id)
        arrayList = arrayList.filter(element => element.id !== id)
    }
    if (e.target.tagName === 'LI'){
        const id = Number(e.target.id)
        const indice = arrayList.findIndex(element => element.id === id )
        if (arrayList[indice].status === true){
            arrayList[indice].status = false
        }else{
            arrayList[indice].status = true
        }
    }
    createItem(arrayList)
}
function syncLS(){
    localStorage.setItem('items', JSON.stringify(arrayList))
}
function readLS(){
    arrayList = (JSON.parse(localStorage.getItem('items')) || [])
    createItem(arrayList)
}