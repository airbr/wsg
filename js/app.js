// Register the service worker for offline cache ability
if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        try {
            // Capture the registration for later use, if needed
            let reg;
            // In production, use the normal service worker registration
            reg = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service worker registered!', reg);
        } catch (err) {
            console.log('Service worker registration failed: ', err);
        }
    });
}

function getRandomItem(jsonArray) {
    const randomIndex = Math.floor(Math.random() * jsonArray.length);
    return jsonArray[randomIndex];
}
// Guideline by Category
function getGuideline(x) {
    fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
            const guideline = getRandomItem(data.category[x].guidelines);
            buildGuideline(guideline);
        })
        .catch(error => console.error('Error loading data:', error));
}

function getGuidelineByTag(tag) {
    return fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
            let matches = [];
            for (const category of data.category) {
                if (category.guidelines) {
                    for (const guideline of category.guidelines) {
                        if (guideline.tags.includes(tag)) {
                            matches.push(guideline);
                        }
                    }
                }
            }
            return buildGuideline(getRandomItem(matches));
        })
        .catch(error => console.error('Error loading data:', error));
}
// Basic HTML builder
function buildGuideline(guideline) {

    let criterialist = "";
    let benefitlist = [];
    let examplelist = "";
    let taglist = "";
    let resourcelist = [];

    // Make Success Criteria
    for (const element of guideline.criteria) {
        criterialist
            +=
            "<details><summary>"
            + element.title +
            "</summary>" +
            element.description + " " + element.testable.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>') +
            ".</details>";
    }

    // Benefits
    const entries = Object.entries(guideline.benefits[0]);
    for (let [key, value] of entries) {
        benefitlist
            +=
            "<details><summary>"
            + key +
            "</summary>" +
            value +
            "</details>";
    }

    // Replace markdown links with anchor tags
    for (const example of guideline.example) {
        var html = example.content.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
        examplelist
            +=
            "<code>"
            + html +
            "</code>";
    }

    for (const tag of guideline.tags) {
        taglist
            +=
            "<li class='tag'>"
            + tag +
            "</li>"
    }

    // Resources
    const resources = Object.entries(guideline.resources[0]);
    for (let [key, value] of resources) {
        resourcelist
            +=
            `<h3><a href="${value}">${key}</a></h3>`
    }

    // Place contents into output container
    document.getElementById("output").innerHTML =

   `<h1><a class="fancy-url" href="${guideline.url}">${guideline.guideline}</a></h1>
    <p>Impact: <strong>${guideline.impact}</strong>. Effort: <strong>${guideline.effort}</strong></p>
    <h2>Success criteria:</h2>
    ${criterialist}
    <div>
    <blockquote cite="${guideline.url}">
    <p><strong>${guideline.intent}</strong></p>
    </blockquote>
    <p>WSG 1.0 Draft Intent: <cite>${guideline.guideline}</cite></p>
    </div>
    <h3>example: ${examplelist}</h3>
    <details>
    <summary>Benefits of this guideline</summary>
        ${benefitlist}
    </details>
    <details>
    <summary>Resources to help apply this guideline</summary>
        ${resourcelist}
    </details>
    <p class="tagline">Tags:</p>
    <ul class="taglist cluster">${taglist}</ul>
    `;

}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function generateButtonList() {

    let buttonlist = [];
    for (const tag of [
        "Hardware",
        "Software",
        "Accessibility",
        "Ideation",
        "Research",
        "Compatibility",
        "Performance",
        "Networking",
        "Reporting",
        "UI",
        "Patterns",
        "Usability",
        "KPIs",
        "E-Waste",
        "Marketing",
        "Strategy",
        "Social Equity",
        "Content",
        "Assets",
        "HTML",
        "CSS",
        "JavaScript",
        "Security",
        "Privacy",
        "Education",
        "Governance"
    ]) {
        buttonlist
            +=
            `<li>
              <button class="button" data-button-radius="hard" data-button-variant="primary" onclick="getGuidelineByTag('${tag}'); mobileScroll()" >${tag}</button>
            </li>`
    }

    document.getElementById("buttonlist").innerHTML =
        buttonlist +
        `
    <li>
        <button class="button" data-button-radius="hard" data-button-variant="primary" onclick="getGuideline(1); mobileScroll()">UX Design</button>
    </li>
    <li>
    <button class="button" data-button-radius="hard"  data-button-variant="primary" onclick="getGuideline(2); mobileScroll()">Web Development</button>
    </li>
    <li>
        <button class="button" data-button-radius="hard"  data-button-variant="primary" onclick="getGuideline(3); mobileScroll()">Hosting & Infrastructure</button>
    </li>
    <li>
        <button class="button" data-button-radius="hard"  data-button-variant="primary" onclick="getGuideline(4); mobileScroll()">Business & Product Strategy</button>
    </li>
    `
}

