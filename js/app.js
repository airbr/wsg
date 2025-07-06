
function findObjectByValue(obj, targetValue) {
  // Check if the current object is an array
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = findObjectByValue(obj[i], targetValue);
      if (result) {
        return result; // Return the found object
      }
    }
  } 
  // Check if the current object is an object (and not null)
  else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        // If the current value matches the target value, return the parent object
        if (value === targetValue) {
          return obj; 
        }
        // Recursively search in nested objects/arrays
        const result = findObjectByValue(value, targetValue);
        if (result) {
          return result; // Return the found object
        }
      }
    }
  }
  return null; // Value not found
}
function getRandomItem(jsonArray) {
    const randomIndex = Math.floor(Math.random() * jsonArray.length);
    return jsonArray[randomIndex];
}
// Guideline by Category
function getGuideline(x, boolean) {
    fetch('/js/guidelines.json')
        .then(response => response.json())
        .then(data => {
           // If URL query param exists
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const parameterName = 'url'; 
            if (params.has(parameterName) && boolean !== true) {
                console.log(`The "${parameterName}" parameter exists.`);
                // console.log(params.get('url')); 
                const guideline = findObjectByValue(data, params.get('url'));
                buildGuideline(guideline);
            } else {
                console.log(`The "${parameterName}" parameter does not exist or was skipped.`);
                const guideline = getRandomItem(data.category[x].guidelines);
                buildGuideline(guideline);
                // console.log(guideline.url); 
                params.set('url', guideline.url);
                url.search = params.toString();
                history.pushState(null, '', url.toString());
            }
        })
        .catch(error => console.error('Error loading data:', error));
}

// Get Guideline by URL in Query Param





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
    let resourcelist = "";

    // Make Success Criteria
    for (const element of guideline.criteria) {

        let resourcelist = "";

        // console.log(element.resources);
        for (let [key, value] of Object.entries(element.resources[0])) {
           resourcelist
                +=
                `<p><a href="${value}">${key}</a></p>`
        }

        criterialist
            +=
            "<details><summary>"
            + element.title +
            "</summary>" +
            element.description + " " + element.testable.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>') +
            "<p>Resources</p>" +
            resourcelist +
            "</details>";
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
    // for (let [key, value] of guideline.criteria.resources) {
    //   resourcelist
    //         +=
    //         `<h3><a href="${value}">${key}</a></h3>`
    // }


    // Place contents into output container
    document.getElementById("output").innerHTML =

   `<h2><a class="fancy-url" href="${guideline.url}">${guideline.guideline}</a></h2>
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

