/* Callbacks */

console.log('Début du script')
// Le callback est une méthode passée en paramètre d'une autre dans le but de gérer l'asynchrone
function maMethodeAvecCallback (a, b, callback) {
    setTimeout(function () {
        const result = a + b
        callback(result)
    }, 3000)
}

console.log('Appel de la méthode avec callback')

maMethodeAvecCallback(5, 25, function (resultat) {
    console.log('Résultat de la méthode avec callback: ' + resultat)
})

console.log('Après appel de la méthode avec callback')

/* Promesses */

// La promesse est une méthode retournant un new Promise et utilisant les méthodes resolve() et reject()
function maMethodeAvecPromesse () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('La promesse est terminée')
        }, 2000)
    })
}

console.log('Appel de la promesse')

maMethodeAvecPromesse()
.then(function (resultat) {
    console.log(resultat)
})
.catch(function (error) {
    console.error(error)
})

console.log('Après appel de la promesse')

/* Promesses avec async / await */

async function maPromesseAsync () {
   const response = await fetch('https://api.publicapis.rg/entries')
   const result = await response.json()
   return result
}

(async function () {
    try {
        const data = await maPromesseAsync()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
})()