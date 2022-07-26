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
                <a href='#'>Accueil</a>
                <a href='#'>Restaurants</a>
                <a href='#'>A propos</a>
                <a href='#'>Contact</a>
            </nav>
        </header>
        `
        this.innerHTML = element
    }
}

customElements.define('c-header', Header)