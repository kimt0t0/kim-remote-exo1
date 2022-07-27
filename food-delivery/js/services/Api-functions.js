const API_URL = 'https://strapi.myidea.fr'

async function getRestaurants () {
    try {
        // Vérification de la présence de AUTH dans le localStorage
        if (localStorage.getItem('AUTH')) {
            const token = JSON.parse(localStorage.getItem('AUTH')).jwt
            // Vérification du token (rajouter la vérification d'expiration)
            if (token) {
                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                // Appel d'API protégé
                const response = await fetch(`${API_URL}/restaurants`, options)
                const data = await response.json()
                return data
            }
        }
    } catch (error) {
        console.error(error)
    }
}

async function getRestaurantById (id) {
    try {
        const response = await fetch(`${API_URL}/restaurants/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

async function login (event) {
    event.preventDefault()

    // Méthode simple (champ par champ)
    // const email = document.getElementById('email').value
    // const password = document.getElementById('password').value

    // Méthode "moderne" (tout les champs d'un coup)
    const formData = new FormData(event.target)
    const formValues = Object.fromEntries(formData)

    // console.log(formValues)

    if (formValues.email && formValues.password) {
        console.log(formValues)

        // Préparation de la requête
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: formValues.email,
                password: formValues.password
            })
        }

        const response = await fetch(`${API_URL}/auth/local`, options)
        const data = await response.json()
        
        if (data) {
            localStorage.setItem('AUTH', JSON.stringify(data))
            document.getElementById('result').innerHTML = `
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `
        }
    }
}