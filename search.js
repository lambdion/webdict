function condition(entry, query) {
    "Return true if the entry contains the query string, case insensitive."
    return entry.toLowerCase().includes(query.toLowerCase())
}
function queryDict(dict, query) {
    "Set the contents of the element with id #results to the entries in dict whose key string contain query."
    let resultsElement = document.getElementById("results") // Set resultsElement to the element with id #results
    let resultsList = Object.keys(dict).filter(key => condition(key, query)) // Return the keys in dict that meet condition()
    if (resultsList != []) { // If the list is not empty, print the results into resultsElement using insertResults()
        insertResults(resultsElement, resultsList)
    } else { // Otherwise, print that there are no results
        resultsElement.innerHTML = 'Null Resultates'
    }
}
function theme(theme) {
    "Take a root string and a theme vowel class and return an HTML string to be appended to the root."
    return {
        "a": "<span class='a'>a</span>",
        "ar": "<span class='ar'>àr</span>",
        "e": "<span class='e'>e</span>",
        "-e": "<span class='-e'>e</span>",
        "é": "<span class='é'>é</span>",
        "er": "<span class='er'>èr</span>",
        "i": "<span class='i'>i</span>",
        "-i": "<span class='-i'>i</span>",
        "ir": "<span class='ir'>ìr</span>",
        "o": "<span class='o'>o</span>",
        "u": "", // Nouns ending -u are still nouns but have no possibility of having an added -e
        "iei": "" // Adjectives ending -ie are still adjectives but have no possibility of having an added -i
    }[theme]
}
function depale(theme) {
    "Remove the initial - from a theme in order to get the full theme for optional themes."
    return (theme[0] == "-") ? theme.slice(1) : theme
}
function linkList(arr) {
    return arr.map(word => `<a href="" onclick="goto('${word}')">${word}</a>`).join(", ")
}
function insertResults(resultsElement, resultsList) {
    "Print the formatted HTML displaying the data for resultsList into resultsElement"
    resultsElement.innerHTML = "" // Clear resultsElement
    for (const resultString of resultsList) { // Iterate through resultsList
        function field(key) {
                let value = dict[resultString][key] // Get value from dict
                if (value == undefined) { value = "" } // Make "" if undefined
                if (typeof value === 'string') {
                    value = value.replace(/\[\[(.+?)\]\]/g, (match, text) => `<a href="" onclick="goto('${text}')">${text}</a>`);
                } // Replace [[text]] with <a href="" onlick="goto('text')">text</a>
                return value
            }
        let resultCard = `
        <div class="result">
            <p class="pronunciation display">${field("pronunciation")}</p>
            <p class="lemma display">${field("radica") + theme(field("tema"))}</p>
            <p class="cat ${depale(field("tema"))}">${field("categorie")}</p>
            <p>${field("sincronic")}</p>
            <p>${field("diacronic")}</p>
            <p><i>${field("meaning")}</i></p>
            <p><i>${field("signification")}</i></p>
            <p>${(field("sinonimes") != "") ? "<b>Cognates</b>: " + field("sinonimes").join(", ") : ""}</p>
            <p>${(field("sinonimes") != "") ? "<b>Sinomines</b>: " + linkList(field("sinonimes")) : ""}</p>
            <p>${field("notes")}</p>
        </div>
        `
        resultsElement.innerHTML = resultsElement.innerHTML + resultCard // Append this to resultsElement
    }
}
function goto(query) {
    "Set the search bar to query and run a search"
    document.getElementById("search-bar").value = query; // Set the text entered into #search-bar to query
    queryDict(dict, query) // Search for query as if the user had pressed a key in the search abr
}
