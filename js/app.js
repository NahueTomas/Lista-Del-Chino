const form  = document.querySelector('form')
const list = document.querySelector('.list')

document.addEventListener('DOMContentLoaded', main)

function main(){
    form.addEventListener('submit', saveText)
}

function saveText(e){
    e.preventDefault()
    if (e.target.children[0].value.length > 1 ){
        list.appendChild(createList(e.target.children[0].value))
        list.addEventListener('click', deleteItem)

        e.target.children[0].value = ''
    }
}

function createList(value){
    const article = document.createElement('li')
    const text = document.createElement('p')
    const btnT = document.createElement('a')
    const btnC = document.createElement('input')
    const cont = document.createElement('div')

    btnT.innerHTML = `<img class="btn-trash" width="30" src="img/trash-icon.png"></img>`

    btnC.setAttribute('type', 'checkbox')
    btnC.classList.add('btn-complete')

    cont.classList.add('container-items')
    cont.appendChild(btnC)
    cont.appendChild(btnT)

    text.textContent = value

    article.appendChild(text)
    article.appendChild(cont)
    
    return article
}

function deleteItem(e){
    if(e.target.classList.contains('btn-trash')){
        list.removeChild(e.target.parentElement.parentElement.parentElement)
    }
}