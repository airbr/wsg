"use strict";

// Helper: Markdown link to HTML anchor
function markdownToAnchor(text) {
    return text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
}

// Find by value amongst the guidelines or star
function findObjectByValue(obj, targetValue) {
    if (Array.isArray(obj)) {
        for (const item of obj) {
            const result = findObjectByValue(item, targetValue);
            if (result) return result;
        }
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (value === targetValue) return obj;
                const result = findObjectByValue(value, targetValue);
                if (result) return result;
            }
        }
    }
    return null;
}

// Simple get random item
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function getGuideline(categoryIndex, forceRandom = false) {
    fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const paramName = 'url';
            let guideline;
            if (params.has(paramName) && forceRandom == false) {
                guideline = findObjectByValue(data, params.get(paramName));
            } else {
                guideline = getRandomItem(data.category[categoryIndex].guidelines);
                params.set('url', guideline.url);
                url.search = params.toString();
                history.pushState(null, '', url.toString());
            }
            buildGuideline(guideline, getStars(categoryIndex, guideline.id));
        })
        .catch(error => console.error('Error loading data:', error));
}

function getStars(categoryIndex, guidelineId) {
    fetch('/js/star.json')
        .then(response => response.json())
        .then(data => {
            const prefixes = ["", "UX", "WD", "HIS", "BSPM"];
            let prefix = prefixes[categoryIndex] || "";
            if (guidelineId < 10) prefix += "0";
            const idBase = prefix + guidelineId;

            const stars = [];
            for (let i = 1; i <= 6; i++) {
                try {
                    const star = findObjectByValue(data, `${idBase}-${i}`);
                    if (star) stars.push(star);
                } catch (error) {
                    console.error(error);
                }
            }

            if (stars.length > 0) {
                const newElement = document.createElement('div');
                let htmlContent = '';
                stars.forEach(star => {
                    let proceduresList = '';
                    const entries = Object.entries(star.tests[0].procedure[0]);
                    for (const [, value] of entries) {
                        proceduresList += `<li>${value}</li>`;
                    }
                    htmlContent += `
                        <li>
                            <h3>${star.title}</h3>
                            <ul>${markdownToAnchor(proceduresList)}</ul>
                        </li>
                    `;
                });
                newElement.innerHTML = 
                `<h2>Sustainable Tooling And Reporting (STAR)</h2>
                <details><summary>Techniques</summary><ol>${htmlContent}</ol></details>`;
                document.getElementById('output').appendChild(newElement);
                document.getElementById("output").focus();

            }
        })
        .catch(error => console.error('Error loading data:', error));
}

function getGuidelineByTag(tag) {
    fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
            const matches = [];
            for (const category of data.category) {
                if (category.guidelines) {
                    for (const guideline of category.guidelines) {
                        if (guideline.tags.includes(tag)) {
                            matches.push([guideline, category.id]);
                        }
                    }
                }
            }
            if (matches.length === 0) return;
            const [guideline, categoryId] = getRandomItem(matches);
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.set('url', guideline.url);
            url.search = params.toString();
            history.pushState(null, '', url.toString());
            buildGuideline(guideline, getStars(Number(categoryId), guideline.id));
        })
        .then(data => {
            document.getElementById("output").focus();
        })
        .catch(error => console.error('Error loading data:', error));
}

function buildGuideline(guideline, getStars, getImpacts) {
    let criterialist = '';
    let benefitlist = '';
    let examplelist = '';
    let taglist = '';
    var impacted = '';

    for (const element of guideline.criteria) {
        // let resourcelist = '';
        // for (const [key, value] of Object.entries(element.resources[0])) {
        //     resourcelist += `<li><a href="${value}">${key}</a></li>`;
        // }
        criterialist += `
            <details>
                <summary><h3>${element.title}</h3></summary>
                ${element.description}
            </details>
        `;
    }

    // for (const [key, value] of Object.entries(guideline.benefits[0])) {
    //     benefitlist += `
    //         <details>
    //             <summary>${key}</summary>
    //             ${value}
    //         </details>
    //     `;
    // }

    for (const tag of guideline.tags) {
        taglist += `
            <li class='tag'>
                <button class="button" data-button-variant="tagbutton" data-button-radius="hard" onclick="getGuidelineByTag('${tag}')">${tag}</button>
            </li>
        `;
    }
    // Should always have URL, for now, always fetch Impact.json 
    if (guideline.url) {
        fetch('/js/impact.json')
        .then(response => response.json())
        .then(data => {

                // Temporary Handling of Metrics and Impact Data
                var impacted = findObjectByValue(data, guideline.url);
                var metricslist = "";
                if (impacted !== null){
                    if ("metrics" in impacted){
                        for (var metric of impacted.metrics) {
                            metricslist += `
                                <li>
                                    <strong>${metric}</strong>
                                </li>
                            `;
                        }
                    }
                }

                document.getElementById("output").focus();
                document.getElementById("output").innerHTML = `
                    <h1 id="guideline-header"><a class="fancy-url" href="${guideline.url}">Guideline: ${guideline.guideline}</a></h1>
                    ${ metricslist ? '<div class="metrics-background"><h2 class="metrics-header">Impactful metrics for this guideline:</h2><ul>'+metricslist+'</ul> </div>' : ''}
                    ${ impacted ? `
                    <p><strong>${ impacted ? JSON.stringify(impacted.rationale, null, 2) : ""}</strong></p>
                    <div class="impacts">
                    <p>People Impact is rated ${ impacted ? JSON.stringify(impacted.impactRatings.people, null, 2) : "n/a yet"}, with a score of ${ impacted ? JSON.stringify(impacted.points.people, null, 2) : "n/a yet"}</p>   
                    <p>Planet Impact is rated ${ impacted ? JSON.stringify(impacted.impactRatings.planet, null, 2) : "n/a yet"}, with a score of ${ impacted ? JSON.stringify(impacted.points.planet, null, 2) : "n/a yet"}</p>    
                    <p>Prosperity Impact is rated ${ impacted ? JSON.stringify(impacted.impactRatings.prosperity, null, 2) : "n/a yet"}, with a score of ${ impacted ? JSON.stringify(impacted.points.prosperity, null, 2) : "n/a yet"}</p>    
                    <p>Timeframe Impact is rated ${ impacted ? JSON.stringify(impacted.impactRatings.timeframe, null, 2) : "n/a yet"}, with a score of ${ impacted ? JSON.stringify(impacted.points.timeframe, null, 2) : "n/a yet"}</p>    
                    </div>
                    <h2 class="big-number">Impact Score: ${ impacted ? impacted.points.people+impacted.points.planet+impacted.points.prosperity+impacted.points.timeframe : ""}</h2>`
                    : "" }
                    <p class="tagline">Want another? get a random Guideline by tag:</p>
                    <ul class="taglist cluster">${taglist}</ul>
                    <div>
                        <blockquote cite="${guideline.url}">
                            <p><strong>${guideline.subheading}</strong></p>
                        </blockquote>
                        <p>Guideline Draft Subheading: <cite>${guideline.guideline}</cite></p>
                    </div>
                    <h2>Success criteria for this guideline:</h2>
                    ${criterialist}
                `;
        })
        .then(data => {
            document.getElementById("output").focus();
        })
        .catch(error => console.error('Error loading data:', error));
    }

    getStars;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function generateButtonList() {
    const tags = [
        "Hardware", "Software", "Accessibility", "Ideation", "Research", "Compatibility", "Performance",
        "Networking", "Reporting", "UI", "Patterns", "Usability", "KPIs", "E-Waste", "Marketing",
        "Strategy", "Social Equity", "Content", "Assets", "HTML", "CSS", "Javascript", "Security",
        "Privacy", "Education", "Governance", "AI"
    ];

    let buttonlist = tags.map(tag =>
        `<li>
            <button class="button" data-button-radius="hard" data-button-variant="tagbutton" onclick="getGuidelineByTag('${tag}');">${tag}</button>
        </li>`
    ).join('');

    document.getElementById("buttonlist").innerHTML = buttonlist;
}