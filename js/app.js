
function findObjectByValue(obj, targetValue) {
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            const result = findObjectByValue(obj[i], targetValue);
            if (result) {
                return result; // Return the found object
            }
        }
    }
    else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (value === targetValue) {
                    return obj;
                }
                const result = findObjectByValue(value, targetValue);
                if (result) {
                    return result;
                }
            }
        }
    }
    return null;
}
function getRandomItem(jsonArray) {
    const randomIndex = Math.floor(Math.random() * jsonArray.length);
    return jsonArray[randomIndex];
}
function getGuideline(x, boolean) {
    fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const parameterName = 'url';
            if (params.has(parameterName) && boolean !== true) {
                const guideline = findObjectByValue(data, params.get('url'));
                buildGuideline(guideline, getStars(x, guideline.id));
            } else {
                const guideline = getRandomItem(data.category[x].guidelines);
                buildGuideline(guideline, getStars(x, guideline.id));

                params.set('url', guideline.url);
                url.search = params.toString();
                history.pushState(null, '', url.toString());
            }
        })
        .catch(error => console.error('Error loading data:', error));
}

function getStars(x, guidelineId) {
    fetch('/js/star.json')
        .then(response => response.json())
        .then(data => {
            // console.log(x);
            // console.log(guidelineId);
            let prefix = "";
            switch (x) {
                case 1:
                    prefix = "UX";
                    // console.log("UX");
                    break;
                case 2:
                    prefix = "WD";
                    // console.log("WD");
                    break;
                case 3:
                    prefix = "HIS";
                    // console.log("HIS");
                    break;
                case 4:
                    prefix = "BSPM";
                    // console.log("BSPM");
                    break;
                default:
                    console.log(`default`);
            }
            if (guidelineId < 10) {
                prefix = prefix + "0"
            }
            let id = prefix + guidelineId;
            let arrayOfStars = [];
            try {
                const star1 = findObjectByValue(data, id + "-1");
                arrayOfStars.push(star1);
                //   console.log(star1);
            } catch (error) {
                console.error(error);
            }
            try {
                const star2 = findObjectByValue(data, id + "-2");
                arrayOfStars.push(star2);
                //   console.log(star2);
            } catch (error) {
                console.error(error);
            }
            try {
                const star3 = findObjectByValue(data, id + "-3");
                arrayOfStars.push(star3);
                //   console.log(star3);
            } catch (error) {
                console.error(error);
            }
            try {
                const star4 = findObjectByValue(data, id + "-4");
                arrayOfStars.push(star4);
                //   console.log(star4);
            } catch (error) {
                console.error(error);
            }
            try {
                const star5 = findObjectByValue(data, id + "-5");
                arrayOfStars.push(star5);
                //   console.log(star5);
            } catch (error) {
                console.error(error);
            }
            try {
                const star6 = findObjectByValue(data, id + "-6");
                arrayOfStars.push(star6);
                //   console.log(star6);
            } catch (error) {
                console.error(error);
            }

            const newElement = document.createElement('div');
            let htmlContent = ''; // Accumulator for HTML strings
            const filteredarrayOfStars = arrayOfStars.filter(item => item !== null);
            if (filteredarrayOfStars.length > 0) {
                filteredarrayOfStars.forEach(star => {
                    let proceduresList = []
                    const entries = Object.entries(star.tests[0].procedure[0]);
                    for (let [key, value] of entries) {
                        proceduresList
                            +=
                            "<li>" +
                            value +
                            "</li>";
                    }
                    htmlContent += `
                    <li>
                        <h3>${star.title}</h3>
                        <ul>${proceduresList.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')}</ul>
                    </li>
                `;
                });
                newElement.innerHTML = `<details><summary>Sustainable Tooling And Reporting (STAR)</summary><ol>` + htmlContent + `</ol></details>`;
                const parentElement = document.getElementById('output');
                parentElement.appendChild(newElement);
            }
        })
        .catch(error => console.error('Error loading data:', error));
}
function getGuidelineByTag(tag) {
    fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
            let matches = [];
            for (const category of data.category) {
                if (category.guidelines) {
                    for (const guideline of category.guidelines) {
                        if (guideline.tags.includes(tag)) {
                            matches.push([guideline, category.id]);
                        }
                    }
                }
            }
            const randomTagItem = getRandomItem(matches);
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const parameterName = 'url';
            params.set('url', randomTagItem[0].url);
            url.search = params.toString();
            history.pushState(null, '', url.toString());
            return buildGuideline(randomTagItem[0], getStars(Number(randomTagItem[1]), randomTagItem[0].id));
        })
        .catch(error => console.error('Error loading data:', error));
}


function buildGuideline(guideline, getStars) {

    let criterialist = "";
    let benefitlist = [];
    let examplelist = "";
    let taglist = "";
    let resourcelist = "";

    for (const element of guideline.criteria) {
        let resourcelist = "";
        for (let [key, value] of Object.entries(element.resources[0])) {
            resourcelist
                +=
                `<li><a href="${value}">${key}</a></li>`
        }

        criterialist
            +=
            "<details><summary>"
            + element.title +
            "</summary>" +
            element.description + " " + element.testable.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>') +
            "<p>Resources list</p><ul>" +
            resourcelist +
            "</ul></details>";
    }
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
            `<li class='tag'><button class="button" data-button-variant="tagbutton" data-button-radius="hard" onclick="getGuidelineByTag('${tag}')">`
            + tag +
            "</button></li>"
    }


    document.getElementById("output").innerHTML =

    `<p class="tagline">Get another random guideline:</p>
    <ul class="taglist cluster">${taglist}</ul>
    <hr />
    <h2><a class="fancy-url" href="${guideline.url}">${guideline.guideline}</a></h2>
    <p>Impact: <strong>${guideline.impact}</strong>. Effort: <strong>${guideline.effort}</strong>.</p>
    <div>
    <blockquote cite="${guideline.url}">
    <p><strong>${guideline.intent}</strong></p>
    </blockquote>
    <p>Guideline Draft Intent: <cite>${guideline.guideline}</cite></p>
    </div>
    <h2>Success criteria:</h2>
    ${criterialist}
    <div>
    <blockquote>
    <h3>example: ${examplelist}</h3>
    </blockquote>
    </div>
    <details>
    <summary>Benefits of this guideline</summary>
        ${benefitlist}
    </details>
    `;

    getStars;
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
        "Javascript",
        "Security",
        "Privacy",
        "Education",
        "Governance"
    ]) {
        buttonlist
            +=
            `<li>
              <button class="button" data-button-radius="hard" data-button-variant="tagbutton" onclick="getGuidelineByTag('${tag}'); mobileScroll()" >${tag}</button>
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

