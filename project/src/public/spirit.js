let store = {
    spirit: ''
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {

    let {spirit} = state

    return `
        <main>
            <section class="datasection">
                <article> Photos </article>
                ${SpiritPage(spirit)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// Example of a pure function that renders infomation requested from the backend
const SpiritPage = (rover) => {
    let photos = [];
    var html_code = ``;

    getRoverInfo(rover);
    
    photos = rover.images.photos;

    photos.forEach((result) => {

        html_code += `
        <article>
            <img src="${result.img_src}" width="100%" height="350px">  
        <ul>
            <li>Camera: ${result.camera.full_name}</li>
            <li>Rover: ${result.rover.name}</li>
            <li>Launched: ${result.rover.launch_date}</li>
            <li>Mars Landing: ${result.rover.landing_date}</li>
            <li>Mission status: ${result.rover.status}</li>
        </ul>
        </article>
        `;    
    });

    return html_code;
}

// ------------------------------------------------------  API CALLS

const getRoverInfo = (state) => {
    let { spirit } = state

    fetch(`http://localhost:3000/spirit`)
        .then(res => res.json())
        .then(spirit => updateStore(store, { spirit }))
}