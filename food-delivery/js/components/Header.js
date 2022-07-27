class Header extends HTMLElement {
    constructor() {
        super()
    }
    
    connectedCallback () {
        if (!this.rendered) {
            this.render()
            this.rendered = true
        }
    }

    render () {
        const element = 
        `
        <header>
            <img id='logo' src='./img/logo.png' />
            <nav>
                <a href='./'>Accueil</a>
                <a href='./restaurants.html'>Restaurants</a>
                <a href='#'>A propos</a>
                <a href='#'>Contact</a>
                <a href='./login.html'>Connexion</a>
            </nav>
        </header>
        `
        this.innerHTML = element
    }
}

customElements.define('c-header', Header)