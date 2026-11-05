import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.5.0/dist/fuse.mjs'

let searchIndex = {}

class Search {
    constructor() {
        this.resultsElement = null
        this.fuse = null
        this.textValue = ""
        this.domains = []
    }
    initFuse(searchIndex) {
        this.fuse = new Fuse(searchIndex, {
            keys: ["title", "content"]
        })
    }
    setResultsElement() {
        this.resultsElement = document.getElementById("search-results")
    }
    setTextValue(value) {
        this.textValue = value
    }
    addDomain(domain) {
        this.domains.push(domain)
    }
    removeDomain(domain) {
        this.domains = this.domains.filter(d => d !== domain)
    }
    removeChildren() {
        while (this.resultsElement.firstChild) {
            this.resultsElement.removeChild(this.resultsElement.lastChild);
        }
    }
    addResultElement(result) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.href = result.item.url
        a.innerText = result.item.title
        li.appendChild(a)
        this.resultsElement.appendChild(li)
    }
    filter() {
        const results = this.fuse.search(this.textValue)
        if (this.domains.length === 0) {
            results.forEach(result => {
                this.addResultElement(result)
            })
            return
        }
        const filteredResults = results.filter(result => {
            if ( result.item.taxonomies.domain === null ) {
                return false
            }
            return this.domains.every(domain => result.item.taxonomies.domain.includes(domain))

        })
        this.removeChildren()
        filteredResults.forEach(result => {
            this.addResultElement(result)
        })
    }
}

const search = new Search()


const addCopyEventHandler = (buttonId, textId) => {
    const button = document.getElementById(buttonId);
    if (!button) {
        return;
    }
    const codeElement = document.getElementById(textId);
    if (!codeElement) {
        return;
    }
    const text = codeElement
        .querySelector(".highlight")
        .innerText.replaceAll("\n\n", "\n");
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(
            () => {},
            (reason) => {
                console.warn("Couldn't add to clipboard!");
                console.warn(reason);
            },
        );
    });
};
const addTabClickEventHandler = () => {
    const buttons = document.querySelectorAll(".tab-button");
    const tabs = document.querySelectorAll(".tab");
    buttons.forEach((button) => button.addEventListener("click", () => {
        const button_id = button.id;
        const tab_id = button_id + "-content";
        buttons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        tabs.forEach((tab) => tab.classList.remove("selected"));
        document.getElementById(tab_id).classList.add("selected");
    }));
}
const addFiltering = () => {
    search.setResultsElement()
    const searchInput = document.getElementById("text-box")
    searchInput.addEventListener("keyup", event => {
        const value = event.target.value
        search.setTextValue(value)
        search.filter()
    })
    const domainCheckBoxes = document.getElementsByClassName("domain-checkbox")
    Array.from(domainCheckBoxes).forEach(checkbox => checkbox.addEventListener("change", event => {
        const domain = event.target.name
        const isChecked = event.target.checked
        if (isChecked) {
            search.addDomain(domain)
        } else {
            search.removeDomain(domain)
        }
        search.filter()
    }))

}
fetch(`/index.json`)
    .then(response => response.json())
    .then(data => {
        searchIndex = data.scripts
        search.initFuse(searchIndex)
    })

document.addEventListener("DOMContentLoaded", () => {
    addCopyEventHandler("copy-script", "script");
    addCopyEventHandler("copy-url", "script-url");
    addTabClickEventHandler()
    addFiltering()
});
