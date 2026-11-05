import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@7.5.0/dist/fuse.mjs";

class Search {
    constructor() {
        this.resultsElement = null;
        this.fuse = null;
        this.textValue = "";
        this.domains = [];
        this.index = null;
    }
    initFuse(searchIndex) {
        this.fuse = new Fuse(searchIndex, {
            ignoreLocation: true,
            useTokenSearch: true,
            includeMatches: true,
            keys: [{ name: "title", weight: 2 }, "content"],
            threshold: 0.3,
        });
        this.index = searchIndex;
    }
    setIndex(index) {
        this.index = index;
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
    removeChildren() {
        while (this.resultsElement.firstChild) {
            this.resultsElement.removeChild(this.resultsElement.lastChild);
        }
    }
    addResultElement(result) {
        const matches = result.matches.filter((match) => match.key == "title");
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.href = result.item.url;
        const title = result.item.title;
        if (matches.length == 0) {
            a.innerText = title;
        } else {
            const indices = matches[0].indices;
            const lastPart = [indices[indices.length - 1][1] + 1, title.length];
            indices
                .map((index, i) => {
                    if (i == 0) {
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
                    if (i % 2 == 0) {
                        a.appendChild(document.createTextNode(part));
                    } else {
                        const strong = document.createElement("strong");
                        strong.innerText = part;
                        a.appendChild(strong);
                    }
                });
        }
        div.appendChild(a);
        this.resultsElement.appendChild(div);
    }
    filter() {
        this.removeChildren();
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
        if (this.domains.length === 0) {
            results.forEach((result) => {
                this.addResultElement(result);
            });
            return;
        }
        const filteredResults = results.filter((result) => {
            if (result.item.taxonomies.domain === null) {
                return false;
            }
            return this.domains.some((domain) =>
                result.item.taxonomies.domain.includes(domain),
            );
        });
        filteredResults.forEach((result) => {
            this.addResultElement(result);
        });
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
            const button_id = button.id;
            const tab_id = button_id + "-content";
            buttons.forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected");
            tabs.forEach((tab) => tab.classList.remove("selected"));
            document.getElementById(tab_id).classList.add("selected");
        }),
    );
};

const debounce = (callback, wait = 150) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
};

const addFiltering = () => {
    search.setResultsElement();
    const searchInput = document.getElementById("text-box");
    const debouncedHandler = debounce((event) => {
        const value = event.target.value;
        search.setTextValue(value);
        search.filter();
    });
    searchInput.addEventListener("input", (event) => debouncedHandler(event));
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
const indexUrl = document.getElementById("search-form")?.dataset.indexUrl;
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
    .catch((reason) => console.warn("Couldn't load search index", reason));

document.addEventListener("DOMContentLoaded", () => {
    addCopyEventHandler("copy-script", "script");
    addCopyEventHandler("copy-url", "script-url");
    addTabClickEventHandler();
    addFiltering();
});
