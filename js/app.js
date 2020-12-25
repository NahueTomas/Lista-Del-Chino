if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
}else{
    document.write('Su navegador da asco. Por favor, actualizalo')
}