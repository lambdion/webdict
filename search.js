var colors = true;
function condition(entry, query) {
    "Return true if the entry contains the query string, case insensitive."
    return entry.toLowerCase().includes(query.toLowerCase())
}
function queryDict(dict, query) {
    "Set the contents of the element with id #results to the entries in dict whose key string contain query."
    document.getElementById("info-button").value = "Info"; // Set #info-button to say Info
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
    let color = colors ? "revert-layer" : "inherit" // If colors is true set the color to be revert-layer, otherwise inherit
    // This has to be there so that toggleColors has something to change
    let opacity = colors ? document.getElementById("finales").value : "0"
    // If colors is true, set the opacity to the value of the slider, otherwise to 0
    return ({
        "a": "<span class='a' style='color: " + color + ";'>a</span>",
        "ar": "<span class='ar' style='color: " + color + ";'>àr</span>",
        "e": "<span class='e' style='color: " + color + ";'>e</span>",
        "-e": "<span class='e optional' style='color: " + color + "; opacity: " + opacity + "'>e</span>",
        "é": "<span class='é' style='color: " + color + ";'>é</span>",
        "er": "<span class='er' style='color: " + color + ";'>èr</span>",
        "i": "<span class='i' style='color: " + color + ";'>i</span>",
        "-i": "<span class='i optional' style='color: " + color + "; opacity: " + opacity + "'>i</span>",
        "ir": "<span class='ir' style='color: " + color + ";'>ìr</span>",
        "o": "<span class='o' style='color: " + color + ";'>o</span>",
        "u": "", // Nouns ending -u are still nouns but have no possibility of having an added -e
        "iei": "", // Adjectives ending -ie are still adjectives but have no possibility of having an added -i
        "": ""
    })[theme]
}
function depale(theme) {
    "Remove the initial - from a theme in order to get the full theme for optional themes."
    return (theme[0] == "-") ? theme.slice(1) : theme
}
function linkList(arr) {
    return arr.map(word => `<a href="javascript:goto('${word}')">${word}</a>`).join(", ")
}
function insertResults(resultsElement, resultsList) {
    "Print the formatted HTML displaying the data for resultsList into resultsElement"
    resultsElement.innerHTML = "" // Clear resultsElement
    for (const resultString of resultsList) { // Iterate through resultsList
        function field(key) {
                let value = dict[resultString][key] // Get value from dict
                if (value == undefined) { value = "" } // Make "" if undefined
                if (typeof value === 'string') {
                    value = value.replace(/\[\[(.+?)\]\]/g, (match, text) => `<a href="javascript:goto('${text}')">${text}</a>`);
                } // Replace [[text]] with <a href="" onlick="goto('text')">text</a>
                return value
            }
        let color = colors ? "revert-layer" : "inherit" // If colors is true set the color to be revert-layer, otherwise inherit
        let resultCard = `
        <div class="result">
            <p class="pronunciation display">${field("pronunciation")}</p>
            <p class="lemma display">${field("radica") + theme(field("tema"))}</p>
            <p class="cat ${depale(field("tema"))}" style="color: ${color}">${field("categorie")}</p>
            <p>${field("sincronic")}</p>
            <p>${field("diacronic")}</p>
            <p><i>${field("meaning")}</i></p>
            <p><i>${field("signification")}</i></p>
            <p>${(field("cognates") != "") ? "<b>Cognates</b>: " + field("cognates").join(", ") : ""}</p>
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
    queryDict(dict, query) // Search for query as if the user had pressed a key in the search bar
}
function toggleColors(){
    // Toggle global colors variable
    colors = !colors
    // Get all elements with color classnames and toggle their color style between inherit (black) to revert-layer (whatever their class says)
    for (element of document.querySelectorAll(".a, .ar, .e, .é, .er, .i, .ir, .o, .u")){
        if (element.style.color == "inherit"){
            element.style.color = "revert-layer"
        } else {
            element.style.color = "inherit"
        }
    }
    // Set opacity to default
    if (!colors){
        document.getElementById("finales").value = "0"
        changeOpacity()
    } else {
        document.getElementById("finales").value = "0.1"
        changeOpacity()
    }
}
function changeOpacity(){
    for (element of document.getElementsByClassName("optional")){
        element.style.opacity = document.getElementById("finales").value
    }
}
