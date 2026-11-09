import Fuse from "fuse.js";

class Search {
    constructor() {
        this.resultsElement = null;
        this.fuse = null;
        this.textValue = "";
        this.domains = [];
    }
    initFuse(searchIndex) {
        this.fuse = new Fuse(searchIndex, {
            ignoreLocation: true,
            useTokenSearch: true,
            includeMatches: true,
            keys: [{ name: "title", weight: 2 }, "content"],
            threshold: 0.3,
        });
    }
    setResultsElement() {
        this.resultsElement = document.getElementById("search-results");
    }
    setTextValue(value) {
        this.textValue = value;
    }
    addDomain(domain) {
        this.domains.push(domain);
    }
    removeDomain(domain) {
        this.domains = this.domains.filter((d) => d !== domain);
    }
    createResultElement(result) {
        const matches = result.matches.filter((match) => match.key === "title");
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.href = result.item.url;
        const title = result.item.title;
        if (matches.length === 0) {
            a.textContent = title;
        } else {
            const indices = matches[0].indices;
            const lastPart = [indices[indices.length - 1][1] + 1, title.length];
            indices
                .map((index, i) => {
                    if (i === 0) {
                        return [
                            [0, index[0]],
                            [index[0], index[1] + 1],
                        ];
                    }
                    return [
                        [indices[i - 1][1] + 1, index[0]],
                        [index[0], index[1] + 1],
                    ];
                })
                .flat()
                .concat([lastPart])
                .map((part) => title.slice(part[0], part[1]))
                .forEach((part, i) => {
                    if (i % 2 === 0) {
                        a.appendChild(document.createTextNode(part));
                    } else {
                        const strong = document.createElement("strong");
                        strong.textContent = part;
                        a.appendChild(strong);
                    }
                });
        }
        div.appendChild(a);
        return div;
    }
    filter() {
        if (this.fuse === null) {
            return;
        }
        let results = this.fuse.search(this.textValue);
        if (this.textValue === "") {
            results = results.map((item) => {
                item.matches = [];
                return item;
            });
        }
        let filteredResults = results;
        if (this.domains.length > 0) {
            filteredResults = results.filter((result) =>
                this.domains.some((domain) =>
                    result.item.taxonomies.domains.includes(domain),
                ),
            );
        }
        const resultsElements = filteredResults.map((result) =>
            this.createResultElement(result),
        );
        this.resultsElement.replaceChildren(...resultsElements);
    }
}

const search = new Search();

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
    buttons.forEach((button) =>
        button.addEventListener("click", () => {
            const buttonId = button.id;
            const tabId = buttonId + "-content";
            buttons.forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected");
            tabs.forEach((tab) => tab.classList.remove("selected"));
            document.getElementById(tabId).classList.add("selected");
        }),
    );
};

const addFiltering = () => {
    search.setResultsElement();
    document
        .getElementById("search-form")
        ?.addEventListener("submit", (event) => event.preventDefault());
    const searchInput = document.getElementById("text-box");
    searchInput.addEventListener("input", (event) => {
        const value = event.target.value;
        search.setTextValue(value);
        search.filter();
    });
    const domainCheckBoxes = document.getElementsByClassName("domain-checkbox");
    Array.from(domainCheckBoxes).forEach((checkbox) =>
        checkbox.addEventListener("change", (event) => {
            const domain = event.target.name;
            const isChecked = event.target.checked;
            if (isChecked) {
                search.addDomain(domain);
            } else {
                search.removeDomain(domain);
            }
            search.filter();
        }),
    );
};
const loadIndex=()=> {
    const indexUrl = document.getElementById("search-form")?.dataset.indexUrl;
    if (indexUrl) {
        fetch(indexUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                search.initFuse(data.scripts);
            })
            .catch((reason) =>
                console.warn("Couldn't load search index", reason),
            );
    }
}

const main = () => {
    loadIndex()
    addCopyEventHandler("copy-script", "script");
    addCopyEventHandler("copy-url", "script-url");
    addTabClickEventHandler();
    addFiltering();
};

main();
