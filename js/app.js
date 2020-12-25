if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then( registrado => console.log('Se registró de 10 mi rey ', registrado))
        .catch(error => alert('Falló la instalación ', error))
}else{
    document.write('Su navegador da asco. Por favor, actualizalo')
}