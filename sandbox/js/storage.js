/* Cookies */

function createCookie(name, value, expiration, path, domain, secured) {
    let cookie = `${name}=${encodeURI(value)}`
    /**
     * if (expiration) {
     *  cookie += '; expires=' + expiration.toGMTString()
     * } else {
     *  cookie += ''
     * }
     */
    cookie += expiration ? '; expires=' + expiration.toGMTString() : ''
    cookie += path ? '; path=' + path : ''
    cookie += domain ? '; domain=' + domain : ''
    cookie += secured ? '; secure' : ''

    console.log(cookie)
    document.cookie = cookie
}

function readCookie(cookie) {
    if (document.cookie.length > 0) {
        // Récupération du cookie & découpage de la chaîne de caractères
        const cookieTab = document.cookie.split(';')
        // Découpage du couple nom / valeur du cookie
        const cookieName = cookieTab[0].split('=')[0]
        const cookieValue = cookieTab[0].split('=')[1]
        if (cookieName === cookie) {
            return decodeURI(cookieValue)
        } else {
            return null
        }
    } else {
        console.log('Pas de cookies dans ce navigateur')
    }
}

let dateExpiration = new Date()
dateExpiration.setTime(dateExpiration.getTime() + 300 * 1000)

createCookie(
    'monCookie',
    'ENI SERVICE',
    dateExpiration,
    '/',
    null,
    false
)

console.log(readCookie('monCookie'))

/* Local Storage */

/*
 Session storage = durée de vie correspondant à l'onglet ouvert
 Local storage = durée de vie infinie tant que l'utilisateur n'a pas vider le cache
*/

function storeData(key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
}

function readData(key) {
    return JSON.parse(localStorage.getItem(key))
}

const data = {
    nom: 'Toto',
    prenom: 'Test',
    phone: '0102030405'
}

storeData('USER', data)

console.log(readData('USER'))

/* Local SQL database */

const db = window.openDatabase('eniService', '1.0', 'Ma première base locale SQL', 5 * 1024 * 1024)

// Création de la base, d'une table et insertion d'une donnée
db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nom TEXT, age NUMERIC)', [], 
    (tx, rs) => {
        tx.executeSql('INSERT INTO users (nom, age) values (?,?)', ['Dupont', 30],
        (tx, rs) => {
            console.log('Données insérées !')
        },
        (tx,error) => {
            console.error(error)
        })
    },
    (tx, error) => {
        console.error('Impossible de créer la table : ' + error)
    })
})

// Lecture de données
db.transaction(tx => {
    tx.executeSql('SELECT * from users WHERE age < ?', [50],
    (tx, rs) => {
        if (!rs.rows.length) {
            console.log('Pas de résultats')
        } else {
            let results = []
            for (let i = 0; i < rs.rows.length; i++) {
                results.push(rs.rows.item(i))
            }
            console.log(results)
        }
    },
    (tx, error) => {
        console.error(error)
    })
})

