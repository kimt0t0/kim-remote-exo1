class RestaurantsList extends HTMLElement {
    constructor () {
        super()
    }

    async connectedCallback () {
        if (!this.rendered) {
            const restaurants = await getRestaurants()
            this.render(restaurants)
            this.rendered = true
        }
    }

    renderRestaurant (restaurant) {
        return `
        <a href='./restaurant.html?id=${restaurant.id}'>
            <div class='card'>
                <img src='${API_URL}${restaurant.photos[0].url}' />
                <div class='card-footer'>
                    <h2>${restaurant.title}</h2>
                    <p>${restaurant.description.length > 150 ? restaurant.description.substring(0,150) + '...' : restaurant.description}</p>
                </div>
            </div>
        </a>
        `
    }

    render (restaurants) {
        // Conteneur de liste
        let element = 
        `
            <h1>Liste des restaurants</h1>
            <div class='list-container'>
        `
        // Elements de la liste
        restaurants.forEach(restaurant => {
            element += this.renderRestaurant(restaurant)
        })
        // Fermeture de la liste
        element += '</div>' 
        this.innerHTML = element
    }
}

customElements.define('restaurants-list', RestaurantsList)