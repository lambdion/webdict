function showInfo() {
    if (document.getElementById("info") == null) {
        document.getElementById("info-button").value = "Cela"
        document.getElementById("results").innerHTML = `
    <div class="info" id="info">
        <p>Ti es un dictionarium del lingue de Occidental (o Interlingue) in li detalliat stil de Noah Webster. It contene plu information quam existent dictionariumes, e es flexibil e traserchabil pro su digital formate. Un exemplari articul seque:</p>
    </div>
    <div class="result">
        <p class="pronunciation display">/pronunciation/ (<a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">IFA</a>)</p>
        <p class="lemma display">lemm<span class="a">a</span></p>
        <p class="cat a">grammatical categorie</p>
        <p>Sincronic etimologie (morfologic structura)</p>
        <p>Diacronic etimologie (historic antecessores)</p>
        <p><i>A definition or guide to the meaning of the word, in English. Polysemy (multiple meanings in different contexts) will be listed, and relevant contexts given in parentheses (e.g. <i>scientific</i>). The Websterian inspiration is in definitions being nuanced and almost poetic rather than dry and obvious.</i></p>
        <p><i>Un definition o guidantie por li signification del parol, in Occidental. Polisemie (multiplic significations in distint contextus) va esser listat, e pertinent contextus dat in parenteses (p. ex. <i>scientic</i>). Li Websterian inspiration es in definitions esser nuanciat e presc poetic vice laconic e ja evident.</i></p>
        <p><b>Cognates</b>: un, liste, de, corespondent, paroles, de, altri, lingues</p>
        <p><b>Sinomines</b>: un, liste, de, similari, paroles</p>
        <p>Additional discussion pri li signification o usation del parol e su amics va esser dat u necessi.</p>
    </div>
    <div class="info">
        <p>Li paroles que have lexical temas (p. ex. <span class="a">a</span> o <span class="er">er</span>) es colorat aptmen. Paroles con optional eufonic vocales (p. ex. omni adjective posse esser terminat con <span class="i">i</span> si su fonologie permisse) have un color debil o pallid. (dunc: <b>solar<span class="i">i</span></b>, <b>obscur<span class="-i">i</span></b>, ma <b>blanc</span></b>).</p>
        <p>Textu posse haver ligamentes que sercha un parol quande claccat, p. ex. por sercha li parol <a href="#" onclick="goto('efaciar')">efaciar</a>.</p>
        <p>Sequente li convention de Haas de su Grammatica, un grave (\`) indica un regulari accentu quel es ordinarimen ínscrit, e un acute (´) indica un ínregulari accentu quel deve esser scrit.</p>
        <p>Ti dictionarium ne contene regulari derivationes. Consulta li Grammatica o usa li <a href="https://occidental-lang.com/derive-from-verb/">utilitá de derivation sur li websitu</a></p>
    </div>
    `
    } else {
        document.getElementById("info-button").value = "Info"
        queryDict(dict, "")
    }
}
