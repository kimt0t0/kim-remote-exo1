const array = ['Banane', 'Fraise', 'Kiwi', 'Melon', 'Tomate', 'Pomme', 'Poire', 'Pêche', 'Myrtille']

function generateRandomColor () {
    let color = Math.floor(Math.random()*16777215).toString(16)
    while (color.length < 6) {
        color = Math.floor(Math.random()*16777215).toString(16)
    }
    return '#' + color
}

function changeBgColor () {
    document.body.style.backgroundColor = generateRandomColor()
}

/**
 * Affiche les fruits dans la page HTML
 * @param {*} fruits 
 */
function showFruits (fruits) {
    let main = document.getElementsByTagName('main')[0]
    main.innerHTML = null
    fruits.forEach(function (fruit) {
        // let fruitHTML = '<div>'
        // fruitHTML += 'Je suis ' + fruit
        // fruitHTML += '</div>'

        let fruitHTML = `
            <div style='background-color: ${generateRandomColor()}'>
                <p>Je suis ${fruit}</p>
            </div>
        `
        main.innerHTML += fruitHTML
    });
}

function init () {
    let button = document.getElementById('bgButton')
    button.addEventListener('click', changeBgColor)

    let searchInput = document.getElementById('search')
    searchInput.addEventListener('keyup', function (event) {
        const search = event.target.value
        let filteredArray = array.filter(fruit => {
            return fruit.toUpperCase().includes(search.toUpperCase())
        })
        showFruits(filteredArray)
    })

    // let newArray = array.sort()
    // let newArray = array.filter(function (fruit) {
    //     return fruit.length >= 6
    // })

    showFruits(array)
    // button.addEventListener('click', function () {
    //     changeBgColor()
    // })
}

window.addEventListener('load', function () {
    console.log('page chargée')
    // init()
})