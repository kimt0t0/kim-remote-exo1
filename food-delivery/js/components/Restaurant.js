class Restaurant extends HTMLElement {
    constructor() {
        super()
    }

    async connectedCallback () {
        if (!this.rendered) {
            const urlParams = new URLSearchParams(window.location.search)
            const id = urlParams.get('id')
            const restaurant = await getRestaurantById(id)
            document.title = restaurant.title
            this.render(restaurant)
            this.rendered = true
        }
    }

    render (restaurant) {
        this.innerHTML = `
            <h1>RESTAURANT</h1>
            <pre>${JSON.stringify(restaurant,null,2)}</pre>
        `
    }
}

customElements.define('c-restaurant', Restaurant)