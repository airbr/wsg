function getRandomItem(jsonArray) {
    const randomIndex = Math.floor(Math.random() * jsonArray.length);
    return jsonArray[randomIndex];
}
// Guideline by Category
function getGuideline(x) {
    const guideline = getRandomItem(wsg.category[x].guidelines);
    const shortName = wsg.category[x].shortName;
    buildGuideline(guideline, shortName);
}

function buildGuideline(guideline, shortName = "") {
    let criterialist = "";
    let examplelist = "";
    let taglist = "";

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
            "<li class='tag' onclick='getGuidelineByTag(\"" + tag + "\")'>"
            + tag +
            "</li>"
    }
    // Place contents into output container
    document.getElementById("output").innerHTML =

    `<h1><a class="fancy-url" href="${guideline.url}">${guideline.guideline}</a></h1>
    <p>Impact: <strong>${guideline.impact}</strong>. Effort: <strong>${guideline.effort}</strong></p>
    <h2>Success criteria:</h2>
    ${criterialist}
    <p>${guideline.description}</p>
    <br>
    <h3>example: ${examplelist}</h3>
    <br>
    <br>
    <br>
    <br>
    <p>Tags:</p>
    <ul class="taglist cluster">${taglist}</ul>`;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// Get all Guidelines with Tag
function getGuidelinesWithTag(tag) {
    let matches = [];
    for (const category of wsg.category) {
        if (category.guidelines) {
            for (const guideline of category.guidelines) {
                if (guideline.tags.includes(tag)) {
                    matches.push(guideline);
                }
            }
        }
    }
    return matches
}

// Get All Tags Combined into one array, remove duplicates:
// This was useful but I decided it only needed to run once to generate the list and now it can be commented out
// Until next time...
// function getAllTags(){
//     let matches = [];
//     for (const category of wsg.category) {
//         if (category.guidelines){
//             for (const guideline of category.guidelines) {
//                 if (guideline.tags) {
//                     for (const tag of guideline.tags){ 
//                             matches.push(tag);
//                     }
//                 }
//             }
//         }
//     }
//     let uniq = [...new Set(matches)];
//     return uniq;
// }

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
            <button class="button" data-button-radius="hard" data-button-variant="primary" onclick="getGuidelineByTag('${tag}')">${tag}</button>
            </li>`
    }

    document.getElementById("buttonlist").innerHTML =
        buttonlist +
    `
    <li>
        <button class="button" data-button-radius="hard" data-button-variant="primary" onclick="getGuideline(1)">UX Design</button>
    </li>
    <li>
    <button class="button" data-button-radius="hard"  data-button-variant="primary" onclick="getGuideline(2)">Web Development</button>
    </li>
    <li>
        <button class="button" data-button-radius="hard"  data-button-variant="primary" onclick="getGuideline(3)">Hosting & Infrastructure</button>
    </li>
    <li>
        <button class="button" data-button-radius="hard"  data-button-variant="primary" onclick="getGuideline(4)">Business & Product Strategy</button>
    </li>
    `
}

// Get Random Guideline with that Tag
function getGuidelineByTag(tag) {
    const guideline = getRandomItem(getGuidelinesWithTag(tag));
    buildGuideline(guideline);
}


// This is Temporarily like this. Going to split or refine later.
const wsg = {
    "title": "Web Sustainability Guidelines",
    "version": "1.0",
    "edition": "Editor's Draft",
    "lastModified": "2025-02-17",
    "category": [
        {
            "id": "1",
            "name": "Introduction"
        },
        {
            "id": "2",
            "name": "User-Experience Design",
            "shortName": "UX Design",
            "guidelines": [
                {
                    "id": "1",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#undertake-systemic-impacts-mapping",
                    "guideline": "Undertake Systemic Impacts Mapping",
                    "description": "Many variables can impact the user-experience, and a bunch of these can impact how sustainable your website will be. Attempting to identify where you can make a difference to the visitor and give them a more sustainable experience will be beneficial.",
                    "criteria": [
                        {
                            "title": "External Variables",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX01-1)",
                            "description": "Any negative external variables affecting a product or service are displayed in a publicly available resource, identifying where your product's sustainable impact can be diminished (systemic design)."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Clearly understanding a system's components can help a product team construct a plan to reduce emissions, especially from third-party services in an organization's supply chain.",
                            "Privacy": "Teams can better prioritize data privacy when they clearly understand a system's components, especially if they can identify potential risks to data protection.",
                            "Social Equity": "Teams can better prioritize social equity when they clearly understand a system's components. They must pay special attention to considerations from underrepresented groups, as these variables may not be well understood or covered in existing best practices.",
                            "Accessibility": "Teams can better prioritize accessibility when they clearly understand the components of a system. This is because they will understand their target audience and can identify improvements to make beyond basic inclusive design practices which could provide a well-rounded experience."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "A Systemic Design [Toolkit](https://oasahk.glueup.com/resources/protected/organization/1649/event/40184/d8b58bf3-c7bb-4662-b3c6-5b6f49318961.pdf) (PDF)."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.1.6 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Are my third parties green?": "https://aremythirdpartiesgreen.com/",
                            "[GPFEDS] 1.1 - Strategy (Assessment & Impact) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 1.5 - Strategy (Impact Goals) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.1 - Specifications (Hardware Profiles) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.12 - UX and UI (Impact Flags) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 7-3047 - Systemic Approach": "https://gr491.isit-europe.org/en/crit.php?id=7-3047-uxui-starting-a-project-without-taking-into-account",
                            "IBM Design For Sustainability (PDF)": "https://www.ibm.com/design/practices/design-for-sustainability/",
                            "Learn Performance": "https://web.dev/learn/performance?hl=en",
                            "Nachhaltige Websites? (German)": "https://www.websiteboosting.com/magazin/75/nachhaltige-websites-wie-wir-alle-mehr-fuer-die-umwelt-tun-koennen.html",
                            "Network energy use not directly proportional to data volume": "https://onlinelibrary.wiley.com/doi/10.1111/jiec.13512",
                            "Opquast Web Quality Assurance Checklist (PDF)": "https://checklists.opquast.com/en/web-quality-assurance/download/",
                            "Reduce the weight of a web page: which elements have the greatest impact?": "https://greenspector.com/en/reduce-the-weight-of-a-web-page-which-elements-have-the-greatest-impact/",
                            "Scope 3 Emissions in Your Digital Supply Chain": "https://www.mightybytes.com/blog/scope-3-emissions-in-your-digital-supply-chain/",
                            "The Fog of Enactment": "https://www.thegreenwebfoundation.org/publications/report-fog-of-enactment/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Variables of Web Sustainability (PDF)": "https://websitesustainability.com/cache/files/variables.pdf",
                            "Why your internet habits are not as clean as you think": "https://www.bbc.com/future/article/20200305-why-your-internet-habits-are-not-as-clean-as-you-think"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Ideation", "Research", "Compatibility", "Performance", "Hardware", "Software", "Networking", "Reporting"]
                },
                {
                    "id": "2",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#assess-and-research-visitor-needs",
                    "guideline": "Assess and Research Visitor Needs",
                    "description": "When creating a product or service, identifying your target audience through user-research, analytics, data collected using ethical anonymous methods, or feedback from and with visitors is important in being able to create a customized service for and with them that is tailor-made for their specific preferences, adapted for any needs they may have, and particularly useful in helping a website or application evolve its service to meet sustainability targets.",
                    "criteria": [
                        {
                            "title": "Identify And Define",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX02-1)",
                            "description": "Primary and secondary target visitors are identified, and their needs are defined through quantitative or qualitative research, testing, or analytics, ensuring your visitors and affected communities remain a close part of the research and testing process."
                        },
                        {
                            "title": "Visitor Constraints",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX02-2)",
                            "description": "Potential visitor constraints like the device age, operating system version, browser, and connection speeds are accounted for when designing user-experiences."
                        },
                        {
                            "title": "Barriers And Access",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX02-3)",
                            "description": "The team has researched and identified whether a technical, material, or human constraint might require an adapted version of the product or service that reduces barriers or improves access to content."
                        },
                        {
                            "title": "Barrier Removal",
                            "testable": "Human Testable",
                            "description": "Barriers to access (pain points or dark / deceptive design patterns) have been identified in the user-research with visitors for removal."
                        },
                        {
                            "title": "Seat At The Table",
                            "testable": "Human Testable",
                            "description": "All stakeholders including your visitors have been assigned an equitable role in the decision-making process when undertaking research, identifying needs, or conducting iterative design work."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "Undertaking analytics or research allows you to customize your product or service based on the needs of your visitor. The benefits of this are that emissions will be reduced due to an experience not making assumptions or developing unnecessary features (wasting resources), and being more specific about how you might reduce a product or service's environmental impact.",
                            "Privacy": "Assessing the needs of visitors will help you comply with privacy laws like GDPR, and anonymous analytics alongside test data can also be used to improve privacy.",
                            "Social Equity": "Improved user-experience often means products or services work better for visitors on older devices, in low-bandwidth environments, those with older devices, those in restrictive countries, those who speak different languages, and those with other potential barriers to accessing content. This reduces emissions as less e-waste will be produced if the need for newer equipment becomes less of a priority.",
                            "Accessibility": "Understanding the needs of your visitors through accessibility and trauma-informed research will help you prioritize which inclusive design improvements need to be implemented to enhance an already accessible product or service.",
                            "Performance": "Identifying what visitors require through research and analytics will reduce the potential for technical debt along the product's lifespan, which will help reduce emissions as developers will spend less time building a product with unnecessary features. It can also be used to identify bottlenecks in the user-experience that are causing visitor abandonment. Fixes can be measured and tested against each other, and the benefits of improvements can result in fewer emissions.",
                            "Economic": "Knowing your audience has financial benefits, as they are more likely to purchase your product or service if it meets their requirements. Quantitative data analysis can identify potential cost savings by reducing data payload sizes where optimizations can be made.",
                            "Conversion": "If a product matches an audience's requirements, they will be likely to use it regularly and this will increase its popularity and gain trust, word of mouth, and social standing."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "A User-research [plan with a template](https://maze.co/guides/ux-research/plan/), some further [UX research templates](https://odette-jansen.notion.site/UX-Research-Templates-079c8453fb0d40039b7b7597dccb340f), plus some additional [interview](https://savranska.medium.com/the-complete-guide-to-user-interviews-87bd783a4448) templates. Also a user-experience return-on-investment [calculator](https://humanfactors.com/thinking-favorite.aspx)."
                        }
                    ],
                    "resources": [
                        {
                            "6 Powerful User Research Methods to Boost Hypothesis Validation": "https://uxplanet.org/6-powerful-user-research-methods-to-boost-hypothesis-validation-58c491461075",
                            "9 bogus reasons why some designers claim UX Research is a waste": "https://uxdesign.cc/9-bogus-reasons-why-some-designers-claim-ux-research-is-a-waste-5ddf3d030851",
                            "[AFNOR] Spec 5.1.1 & 5.1.2 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Creating And Maintaining A Voice Of Customer Program": "https://www.smashingmagazine.com/2023/11/creating-maintaining-voice-customer-program/",
                            "Design Justice Network Principles": "https://designjustice.org/read-the-principles",
                            "Deceptive Patterns": "https://www.deceptive.design/",
                            "[GPFEDS] 1.2 - Strategy (Target Users) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.2 - Specifications (Older Device) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.3 - Specifications (Connection Issues) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.4 - Specifications (Older Software) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-3024 - Target Versions of Devices, OS and Browsers": "https://gr491.isit-europe.org/en/crit.php?id=3-3024-uxui-the-business-line-the-users-profile-allows",
                            "[GR491] 6-3039 - Software or Hardware Configurations": "https://gr491.isit-europe.org/en/crit.php?id=6-3039-uxui-users-equipement-is-increasingly-more-efficient-and",
                            "GreenIT (French) 002 - Quantifier précisément le besoin": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_002_fr.md",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "How To Run UX Research Without Access To Users": "https://www.smashingmagazine.com/2024/05/how-run-ux-research-without-access-users/",
                            "IBM Design For Sustainability (PDF)": "https://www.ibm.com/design/practices/design-for-sustainability/",
                            "Keys To An Accessibility Mindset": "https://www.smashingmagazine.com/2023/02/keys-accessibility-mindset/",
                            "Make the sustainable thing the best thing, by design": "https://medium.com/necdigitalstudio/make-the-sustainable-thing-the-best-thing-by-design-e38da7bd7768",
                            "Metrics to measure the ROI of web accessibility": "https://uxdesign.cc/top-10-metrics-to-measure-the-roi-of-web-accessibility-f9ddd697896a",
                            "Precisely specify the need": "http://www.ecometer.org/rules/precisely-specify-the-need.html",
                            "Shaping Europe's digital future": "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/shaping-europes-digital-future_en",
                            "Six Dark Patterns to Avoid On Your Website": "https://www.mightybytes.com/blog/6-dark-patterns-to-avoid-on-your-website/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "The UX Cookbook": "https://theuxcookbook.com/",
                            "UX: Best Practices For Developers": "https://blog.openreplay.com/ux-best-practices-for-developers/",
                            "UX/UI Product Design Roadmap": "https://product-design-roadmap.com/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Patterns", "Ideation", "Research", "Usability", "Compatibility", "Reporting", "KPIs"]
                },
                {
                    "id": "3",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#research-non-visitor-s-needs",
                    "guideline": "Research Non-Visitor's Needs",
                    "description": "If you provide physical goods or services, you may also have to account for the sustainability impact of delivery services. This can often be tricky, but courier companies may provide useful tooling to help you identify emissions data for routing.",
                    "criteria": [
                        {
                            "title": "Non-Human Impact",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX03-1)",
                            "description": "A plan of action has been established for non-users and other stakeholders who might be passively impacted by a digital product or service, such as neighbors accepting parcels, traffic jams due to deliveries, etc. Research their needs and understand how they might be affected."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "To the extent that they can be planned for up-front through verifiable research practices, interventions such as planning with suppliers can potentially significantly reduce the environmental impact of a digital product or service.",
                            "Social Equity": "By including other potentially marginalized groups as part of the research process, product teams can potentially head off unintended consequences or requirements these groups may have before they occur.",
                            "Accessibility": "By including people who might not be primary or secondary users, such as people with disabilities who may be specifically impacted by the need for such services; as key stakeholders in research, this community's specific needs can be better addressed.",
                            "Economic": "Up-front research on a product or service's entire ecosystem, including the wider aspects like indirect services will help organizations more effectively manage project budgets."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Physical goods carbon footprint and emissions [calculator](https://www.2030calculator.com/)."
                        }
                    ],
                    "resources": [
                        {
                            "Digitalisation and Energy": "https://www.iea.org/reports/digitalisation-and-energy",
                            "Foundations of Humane Technology": "https://www.humanetech.com/course",
                            "[GPFEDS] 1.2 - Strategy (Target Users) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "IBM Design For Sustainability (PDF)": "https://www.ibm.com/design/practices/design-for-sustainability/",
                            "Stakeholder Mapping": "https://www.mightybytes.com/blog/stakeholder-mapping/",
                            "Sustainability Guide: Distribution": "https://sustainabilityguide.eu/ecodesign/distribution/",
                            "Sustainability Guide: Manufacturing": "https://sustainabilityguide.eu/ecodesign/manufacturing/",
                            "The power of good design": "https://www.vitsoe.com/rw/about/good-design",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Research", "Usability", "Hardware", "E-Waste", "Reporting", "KPIs", "Marketing"]
                },
                {
                    "id": "4",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#consider-sustainability-in-early-ideation",
                    "guideline": "Consider Sustainability in Early Ideation",
                    "description": "While some things require the use of electricity, during the early ideation phase you could consider wireframing or rapid prototyping (using paper) among other offline tools to reduce energy consumption. Even the electronic versions of these may have a lower carbon cost than committing to building a full-blown experience for each idea.",
                    "criteria": [
                        {
                            "title": "Wireframes And Prototypes",
                            "testable": "Human Testable",
                            "description": "Wireframes, and rapid prototyping are utilized to quickly build consensus, reduce risk, and lower the number of resources needed to build features."
                        },
                        {
                            "title": "Participation And Testing",
                            "testable": "Human Testable",
                            "description": "Users are involved within the iteration and design process using participatory design, and when conducting user-testing reach out to your community to help improve your product by allowing them to apply their knowledge and experience to your product or service."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Incorporating wireframes, prototypes, and user-testing into early product design cycles improves environmental impact by helping product teams build only the features visitors want. This reduces resource use and lowers emissions.",
                            "Economic": "Early rough ideation can improve financial performance, since organizations won't waste time and money building features people don't use.",
                            "Conversion": "Tested user-interfaces often improve conversion rates as they have been optimized to remove confusing aspects of the layout that cause problematic friction and arrange content to optimize the fastest user flow (which can help emissions)."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "A website wireframe [example](https://cdn-proxy.slickplan.com/wp-content/uploads/2019/03/hand-drawn-wireframe-1024x683.jpeg) from SlickPlan."
                        }
                    ],
                    "resources": [
                        {
                            "Activating sustainability in the design process": "https://www.degruyter.com/document/doi/10.1515/icom-2024-0037/html?lang=en",
                            "An introduction to radical participatory design": "https://www.cambridge.org/core/journals/design-science/article/an-introduction-to-radical-participatory-design-decolonising-participatory-design-processes/63F70ECC408844D3CD6C1A5AC7D35F4D",
                            "[GPFEDS] 2.6 - Specifications (Design Review) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How Wireframes and Rapid Prototypes Improve Digital Projects": "https://www.mightybytes.com/blog/wireframes-and-prototypes-for-websites/",
                            "Importance of Wireframing & Prototyping in Web Design": "https://www.loop-digital.co.uk/the-importance-of-wireframing-prototyping-in-web-design/",
                            "L'idéation au service de l'éco-conception #1 : La méthode C.O.E.U.R. (French)": "https://www.lunaweb.fr/actualites/blog/atelier-ideation-eco-conception/",
                            "Lean UX ❤ Sustainability": "https://medium.com/design-bootcamp/lean-ux-sustainability-designing-for-people-planet-and-profit-4b1406564c81",
                            "Rapid prototyping can be key to creating more sustainable products": "https://www.imeche.org/news/news-article/rapid-prototyping-can-be-key-to-creating-more-sustainable-products",
                            "Sustainable UX design": "https://blog.adobe.com/en/publish/2021/09/24/sustainable-ux-design-what-is-it-and-how-can-it-benefit-your-organization",
                            "The Design Process": "https://sustainabilityguide.eu/methods/the-design-process/"
                        }
                    ],
                    "tags": ["UI", "Ideation", "Research", "Software", "Strategy"]
                },
                {
                    "id": "5",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#account-for-stakeholder-issues",
                    "guideline": "Account for Stakeholder Issues",
                    "description": "Brainstorming allows you to flush out ideas before you commit to pursuing a path. Being considerate of not just your visitors but other individuals who may be affected by your product or service (including non-humans, like the environment!) is a useful practical exercise as it may influence your decisions in how you scope your project.",
                    "criteria": [
                        {
                            "title": "Human-Centered Brainstorming",
                            "testable": "Human Testable",
                            "description": "All stakeholders have been considered using a human-centered approach during the brainstorming process."
                        },
                        {
                            "title": "Ecological Brainstorming",
                            "testable": "Human Testable",
                            "description": "The planetary needs and ecological boundaries of a project have been taken into account during the brainstorming process. This can include creating non-users, non-human (animal, planet) personas, or climate-specific user stories and sprints."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "By helping key project stakeholders better understand the ecological impact of a potential digital product or service, its environmental impact can be identified and reduced throughout its lifecycle.",
                            "Social Equity": "For other potentially marginalized groups, such as those who speak different languages, live in low-bandwidth areas, use older devices, have other barriers to accessing information, and so on, accounting for their needs early in the process will reduce the need for costly redesigns to accompany their requirements later on due to demand (or producing specialist alternative sites to cope with their functionality).",
                            "Accessibility": "By understanding the accessibility communities' requirements in the early stages of a digital project, inclusive design can be prioritized throughout the product or service life-cycle, which will lead to efficiency savings in developer time (due to not having to retrofit accessibility) and fewer emissions from the patching process."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "A product brainstorming guide / [framework](https://www.smashingmagazine.com/2016/06/a-framework-for-brainstorming-products/)."
                        }
                    ],
                    "resources": [
                        {
                            "[GPFEDS] 1.2 - Strategy (Target Users) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-3002 - Brain Storming": "https://gr491.isit-europe.org/en/crit.php?id=1-3002-uxui-putting-the-user-at-the-center-of",
                            "[GR491] 1-3003 - Planet Centric Design": "https://gr491.isit-europe.org/en/crit.php?id=1-3003-uxui-every-design-decision-has-an-impact.-if",
                            "Planetary Boundaries": "https://sustainabilityguide.eu/sustainability/planetary-boundaries/",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Ideation", "Research", "Strategy", "KPIs"]
                },
                {
                    "id": "6",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#create-a-lightweight-experience-by-default",
                    "guideline": "Create a Lightweight Experience by Default",
                    "description": "When providing the option to download, save, print, or access anything online, defaulting to the most lightweight, least featureful version will reduce emissions through passive browsing; with non-essential information removed from the screen either to be shown when it's required or eliminated.",
                    "criteria": [
                        {
                            "title": "Efficient Paths",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX06-1)",
                            "description": "The path taken to access the service (the initial contact with the website or service) should be as efficient and as simple as possible (time required to complete an action displayed, reducing too much choice, ensuring visitors know what's required at the start of a complex set of steps, etc)."
                        },
                        {
                            "title": "Patterns For Efficiency",
                            "testable": "Human Testable",
                            "description": "The users journey (when browsing an accessed website or service) should be as smooth as possible. User-research is key, as is building on established design patterns that people already understand."
                        },
                        {
                            "title": "Distraction-Free Design",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX06-3)",
                            "description": "Visitors can complete tasks without distractions or non-essential features getting in the way."
                        },
                        {
                            "title": "Eliminate The Non-Essential",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX06-4)",
                            "description": "Visitors see only information that is relevant to their experience, without non-essential information being displayed on the screen."
                        },
                        {
                            "title": "User-Initiated Actionable Content",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX06-5)",
                            "description": "Ensure that actionable information such as pop-up or modal windows can only be initiated by the visitor."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Streamlining a user-experience to remove barriers and non-essential items (which eliminates waste from code and content) reduces the amount of time visitors spend on their devices trying to complete tasks or find information. This reduces the amount of energy used and lowers emissions.",
                            "Privacy": "Collecting less information by hiding non-essential features will be beneficial for data protection as you can reduce how much information is presented to the visitor and, in turn, how much is exposed to a minimum (if any is needed during the experience).",
                            "Social Equity": "Lightweight experiences work better for people with older devices, those who live in low-bandwidth environments, and so on. The benefits for lower-powered devices are that fewer emissions will be generated, as the device's reduced capabilities will often have lower energy requirements.",
                            "Accessibility": "Intuitive, lightweight user-experiences that are easy to understand improve accessibility, especially for people with cognitive disabilities, and will benefit sustainability in terms of less confusion which could impact the time spent on websites trying to find content.",
                            "Performance": "Displaying less information on the screen by reducing the amount of content until it is necessary will naturally reduce bandwidth consumption over the lifecycle of a product or service, and may make an experience feel faster.",
                            "Economic": "Lower data payloads resulting from reducing visitor choices and simplifying an interface by reducing the amount of information can help reduce the burden of choice and convince visitors during the decision-to-purchase process.",
                            "Conversion": "Busy websites with too much information laid out haphazardly will lead to confusion and abandonment. Following conventions and patterns with a clean, distraction-free layout will reduce churn, page abandonment, and barriers to entry."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "The example shown for this airline check-in page shows how [performance by default](https://hidde.blog/the-web-is-fast-by-default-lets-keep-it-fast/) can benefit visitors."
                        }
                    ],
                    "resources": [
                        {
                            "A manifesto for small, static, web apps": "https://rosswintle.uk/2024/02/a-manifesto-for-small-static-web-apps/",
                            "[AFNOR] Spec 5.2.1 and 5.2.2 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Customer Experience Mapping": "https://www.startupgrind.com/blog/customer-experience-mapping-what-is-it-and-how-to-do-it/",
                            "Design patterns": "https://ui-patterns.com/patterns",
                            "Design Principles": "https://principles.design/",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-7033 - Lighter Framework / Library": "https://gr491.isit-europe.org/en/crit.php?id=2-7033-backend-for-an-equal-functional-scope-several-technical",
                            "[GR491] 4-5030 - Older Equipment or Limited Network Access": "https://gr491.isit-europe.org/en/crit.php?id=4-5030-frontend-the-more-components-the-service-implements-that",
                            "[GR491] 7-3052 - Quick And Simple": "https://gr491.isit-europe.org/en/crit.php?id=7-3052-uxui-there-are-several-scenarios-for-accessing-the",
                            "[GR491] 9-3063 - Useful to the User": "https://gr491.isit-europe.org/en/crit.php?id=9-3063-uxui-the-efficient-use-of-a-digital-service",
                            "GreenIT (French) 001 - Éliminer les fonctionnalités non essentielles": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_001_fr.md",
                            "GreenIT (French) 003 - Optimiser le parcours utilisateur": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_003_fr.md",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "How Fast Do Websites Load In 2024?": "https://www.debugbear.com/blog/page-speed-2024",
                            "How to Become an Eco Web Designer": "https://onextrapixel.com/how-to-become-an-eco-web-designer/",
                            "Improve the process flow": "http://www.ecometer.org/rules/improve-the-process-flow.html",
                            "Laws Of UX": "https://lawsofux.com/",
                            "OpQuast 29 - A product or service can be purchased without creating an account.": "https://checklists.opquast.com/en/web-quality-assurance/a-product-or-service-can-be-purchased-without-creating-an-account",
                            "OpQuast 33 - Product availability is indicated before final validation of the order.": "https://checklists.opquast.com/en/web-quality-assurance/product-availability-is-shown-before-final-order-placement",
                            "OpQuast 84 - The user is alerted at the beginning of a complex process to the nature of the required data and document.": "https://checklists.opquast.com/en/web-quality-assurance/the-user-is-alerted-at-the-beginning-of-a-complex-process-to-the-nature-of-the-data-required",
                            "OpQuast 149 - Navigating the website does not open any pop-up windows.": "https://checklists.opquast.com/en/web-quality-assurance/navigating-the-website-does-not-open-any-pop-up-windows",
                            "Paradox of Choice: Why Less is More in UX Design": "https://thedecisionlab.com/reference-guide/economics/the-paradox-of-choice",
                            "Patterns": "https://web.dev/patterns?hl=en",
                            "Patterns.dev": "https://www.patterns.dev/",
                            "Remove non-essential features": "http://www.ecometer.org/rules/remove-non-essential-features.html",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "UI Tools": "https://designsustainably.eu/uitools/",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "Using UX Design to Build a Sustainable Future": "https://uxmag.com/articles/using-ux-design-to-build-a-sustainable-future",
                            "UX: Best Practices For Developers": "https://blog.openreplay.com/ux-best-practices-for-developers/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "What is a Customer Journey Map?": "https://www.mightybytes.com/blog/customer-journey-map-template-download/"
                        }
                    ],
                    "tags": ["Social Equity", "Content", "UI", "Patterns", "Usability", "Performance"]
                },
                {
                    "id": "7",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#avoid-unnecessary-or-an-overabundance-of-assets",
                    "guideline": "Avoid Unnecessary or an Overabundance of Assets",
                    "description": "It's great to have a pretty-looking website or application but to ensure a sustainable design, it's important to avoid cluttering up the interface with too many visuals (which aren't necessary to the content). Keeping a clean design will reduce website rendering, and thereby emissions.",
                    "criteria": [
                        {
                            "title": "Decorative Design",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX07-1)",
                            "description": "Decorative design is used only when it improves the user-experience, and unnecessary assets or ones that fail to benefit the visitor or sustainability are removed (or rendered optional and disabled by default)."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Using fewer typefaces will reduce the page size and use fewer resources to render the new font on the visitor's machine for that page's instance (saving DOM rendering cycles).",
                            "Social Equity": "Bloat costs bandwidth, slimming down the web matters to remain inclusive.",
                            "Accessibility": "Decorative design can be intrusive (if marked up incorrectly) or distracting.",
                            "Performance": "HTTP requests can be reduced both with fewer fonts and by creating CSS / SVG sprites if the images are unlikely to change.",
                            "Conversion": "A page with fewer heavy elements is more likely to load within 3 seconds."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "@font-face {\r\n\tfont-family: \"Trickster\";\r\n\tsrc: local(\"Trickster\"),\r\n\t\turl(\"trickster-COLRv1.otf\") format(\"opentype\") tech(color-COLRv1), url(\"trickster-outline.otf\")\r\n\t\tformat(\"opentype\"), url(\"trickster-outline.woff\") format(\"woff\");\r\n}",
                            "content": "This is an example of an external web asset (a custom typeface). Too many of these can be detrimental to the performance of a website or application due to their need to be rendered (through CPU cycles) to the screen on every element in which they are used, which is bad news for sustainability! [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)."
                        }
                    ],
                    "resources": [
                        {
                            "Best practices for fonts": "https://web.dev/articles/font-best-practices?hl=en",
                            "Decorative Images": "https://www.w3.org/WAI/tutorials/images/decorative/",
                            "[GPFEDS] 4.6 - UX and UI (Informational Media) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Implementing image sprites in CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Implementing_image_sprites_in_CSS",
                            "Less Data Doesn't Mean a Lesser Experience": "https://timkadlec.com/remembers/2019-08-30-less-data-doesnt-mean-a-lesser-experience/",
                            "Less is more: How stripping back can improve UX Design": "https://www.uxdesigninstitute.com/blog/improve-ux-design/",
                            "Mobile website Load Time Statistics": "https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/",
                            "Reduce Redundancy": "https://www.nngroup.com/articles/reduce-redundancydecrease-duplicated-design-decisions/",
                            "Reduce The Number Of Images": "https://www.giftofspeed.com/minimize-images/",
                            "Reducing Cognitive Overload": "https://www.lionandmason.com/ux-blog/reducing-cognitive-overload-declutter-your-design-for-better-ux/",
                            "Simple icon systems using SVG sprites": "https://oliverjam.es/articles/svg-sprites",
                            "Simplify Your UX Through Reduction": "https://www.uxmatters.com/mt/archives/2015/07/simplify-your-ux-through-reduction.php",
                            "The Website Obesity Crisis (Video)": "https://webdirections.org/blog/the-website-obesity-crisis/",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "Use fewer web fonts": "https://web.dev/articles/font-best-practices?hl=en"
                        }
                    ],
                    "tags": ["UI", "Usability", "Assets", "Performance"]
                },
                {
                    "id": "8",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#ensure-navigation-and-way-finding-are-well-structured",
                    "guideline": "Ensure Navigation and Way-Finding Are Well-Structured",
                    "description": "Information architecture is a central part of the Web development process, and how you structure a website ensures that people can way-find your content easily. Having appropriately marked-up links within your product or service allows visitors, search engines, and social networks to identify key information quickly.",
                    "criteria": [
                        {
                            "title": "Navigation And Search",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX08-1)",
                            "description": "Provide an accessible, easy-to-use navigation menu with search features that help visitors easily find what they need."
                        },
                        {
                            "title": "Navigable Sitemaps",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX08-2)",
                            "description": "Implement an efficient (human-readable) sitemap that is organized and is regularly updated. This helps search engines better index website content, which helps visitors more quickly find what they are looking for."
                        },
                        {
                            "title": "New Content",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX08-3)",
                            "description": "Implement a way for visitors to find out about new content and services."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Efficient navigation with intuitive search features means visitors spend less time and energy finding what they require and accomplishing tasks. This also lowers emissions.",
                            "Accessibility": "Accessible navigation improves the user-experience for people with disabilities. Being able to find the correct pages quickly also helps to reduce data wastage.",
                            "Performance": "Efficient website structure has an impact on performance in that people can more quickly find what they require. This doesn't necessarily mean pages or assets load faster, but if appropriate way-finding mechanisms are in place, less time on-screen can result, which is beneficial for emissions.",
                            "Economic": "If visitors more quickly find what they need, this could potentially reduce hosting costs if those are based on data transfer.",
                            "Conversion": "Good website structure and navigation can also improve conversion rates if more people find what they require. This could also be true if visitors are alerted to new content they have expressed interest in."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Information Architecture](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f1bf345c-c79c-45e8-9d46-416d1e5ff0cb/ia-big-picture-sitemap.png) of a Website Sitemap."
                        }
                    ],
                    "resources": [
                        {
                            "An Excellent Beginner's Guide to Information Architecture": "https://careerfoundry.com/en/blog/ux-design/a-beginners-guide-to-information-architecture/",
                            "Build and submit a sitemap": "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en",
                            "Building Accessible Menu Systems": "https://www.smashingmagazine.com/2017/11/building-accessible-menu-systems/",
                            "Find And Add Your Sitemap": "https://accessibleweb.com/user-guide/finding-and-adding-your-sitemap/",
                            "[GPFEDS] 4.3 - UX and UI (Optimized Clickstream) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "GreenIT (French) 4008 - Mettre en place un sitemap efficient": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4008_fr.md",
                            "How To Achieve Instant Navigations On The Web": "https://www.debugbear.com/blog/instant-navigations",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "Information Architecture Design Step-by-Step": "https://uxplanet.org/information-architecture-design-step-by-step-7036897511d7",
                            "Menus Tutorial": "https://www.w3.org/WAI/tutorials/menus/",
                            "OpQuast 1 - The website provides a way for users to find out about new content and services.": "https://checklists.opquast.com/en/web-quality-assurance/the-site-provides-users-with-a-way-to-know-about-new-contents-and-services",
                            "OpQuast 213 - The website provides a sitemap file listing the content to be crawled.": "https://checklists.opquast.com/en/web-quality-assurance/the-website-provides-a-sitemap-file-listing-the-content-to-be-crawled",
                            "UX: Best Practices For Developers": "https://blog.openreplay.com/ux-best-practices-for-developers/"
                        }
                    ],
                    "tags": ["Accessibility", "UI", "Usability", "HTML", "Marketing"]
                },
                {
                    "id": "9",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#respect-the-visitor-s-attention",
                    "guideline": "Respect the Visitor's Attention",
                    "description": "Time is precious, wasting a visitor's will cause frustration and lead to abandonment or resentment. Additionally, the more time a visitor spends in front of a screen, the more energy they utilize. As such, throwing stuff in front of the visitor vying for their attention might sound like good business (even though we know due to banner blindness it rarely works), but it mostly damages the environment and dissuades the visitor.",
                    "criteria": [
                        {
                            "title": "Respecting Attention",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX09-1)",
                            "description": "The visitor can easily control how (and when) they receive information to both improve attention and respect with the visitor."
                        },
                        {
                            "title": "Avoid Distraction",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX09-2)",
                            "description": "Features that don't distract people or unnecessarily lengthen the time they spend using the product or service have a higher priority than others."
                        },
                        {
                            "title": "Avoid Attention-keeping",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX09-3)",
                            "description": "Avoid using infinite scroll or related attention-keeping tactics."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Using pagination rather than infinite scrolling allows individuals to request data on demand rather than encouraging overconsumption, thereby reducing their carbon impact by way of using psychology to encourage healthy (and sustainable) browsing habits.",
                            "Transparency": "Being open and honest with visitors about their experience and avoiding moving their attention in negative ways will lead to greater trust and the potential for repeat custom.",
                            "Social Equity": "By avoiding dark and deceptive patterns and ensuring that the visitor's attention is focused on achieving their aims, you reduce the potential for confusion, mistakes, and lapses in judgment which could lead to consequences for them and the trust they have in your business down the road.",
                            "Accessibility": "Being aware of accessibility barriers and accounting for them within your processes will allow you to reduce barriers to access and prioritize the availability of information for visitors who may access information using different tooling (such as assistive technology like a screen reader). In doing so you can reduce the additional emissions produced by accessibility tools as visitors can find what they want quicker, and fewer mistakes are likely to be made during a session.",
                            "Performance": "Certain attention-seeking features like notification requests or cookie banners can detract from visitor performance, as time is spent by consumers navigating through methods to close or hide the annoyances. Finding better ways of presenting the information will make an experience feel faster and reduce the barriers to access which trigger a block in the user-flow.",
                            "Economic": "Organizations that monetize visitor attention strive to keep it as long as possible, therefore increasing their product or service's environmental impact. Conversely, organizations that strive to streamline interactions while still meeting visitor's needs (and their own business goals) measurably reduce their product or service's environmental impact, and potentially reach new audiences."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Community guidelines](https://www.thinkific.com/blog/how-to-create-community-guidelines-examples-template/) can help foster a safe, conflict-free environment. Here is also an example of an attention manipulation tactic to be avoided."
                        }
                    ],
                    "resources": [
                        {
                            "4 practices for eco-friendly online purchase journeys": "https://www.bunnyfoot.com/2023/09/sustainable-ux-4-practices-for-eco-friendly-online-purchase-journeys/",
                            "Deceptive Patterns": "https://www.deceptive.design/",
                            "Design Justice Network Principles": "https://designjustice.org/read-the-principles",
                            "Design for Sustainable Behaviour": "https://sustainabilityguide.eu/methods/design-sustainable-behaviour/",
                            "[GPFEDS] 4.2 - UX and UI (Infinite Scroll) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 8-5057 - Attention Capturing": "https://gr491.isit-europe.org/en/crit.php?id=8-5057-frontend-the-attention-of-the-user-is-a",
                            "[GR491] 10-3072 - Respect for the User": "https://gr491.isit-europe.org/en/crit.php?id=10-3072-uxui-addictions-some-services-are-designed-to-create",
                            "[GR491] 10-3074 - Attention Control": "https://gr491.isit-europe.org/en/crit.php?id=10-3074-uxui-the--users-attention-is-an-asset",
                            "GreenIT (French) 4035 - Préférer la pagination au défilement infini": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4035_fr.md",
                            "Humane By Design": "https://humanebydesign.com/principles",
                            "Laws Of UX": "https://lawsofux.com/",
                            "Psychology of Design": "https://growth.design/psychology",
                            "Society Centered Design": "https://societycentered.design/",
                            "Social sustainability": "https://sustainabilityguide.eu/sustainability/social-sustainability/",
                            "The Potentially Dangerous Non-Accessibility Of Cookie Notices": "https://www.smashingmagazine.com/2023/04/potentially-dangerous-non-accessibility-cookie-notices/",
                            "The snake that eats its tail": "https://uxdesign.cc/the-snake-that-eats-its-tail-3656b31fd0f9",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators"
                        }
                    ],
                    "tags": ["UI", "Patterns", "Usability", "Assets"]
                },
                {
                    "id": "10",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-recognized-design-patterns",
                    "guideline": "Use Recognized Design Patterns",
                    "description": "Visitors can identify patterns fairly easily, and they like browsing websites and apps and feeling as if they know what they are dealing with. As such, focusing your efforts on producing a product or service that is clean and has key components in easy-to-recognize locations (and visuals) will allow faster user-experiences and fewer emissions.",
                    "criteria": [
                        {
                            "title": "Design Patterns",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX10-1)",
                            "description": "Provide only essential components visible at the time they are needed. Where appropriate, interfaces should deploy visual styles (patterns) that are easily recognized and used."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Using easily recognized design components will reduce the amount of time visitors spend browsing between pages, trying to identify the information they came to your resource to locate. As such, the less time visitors spend on your site, the greater the efficiency savings in terms of emissions.",
                            "Accessibility": "Recognizable design patterns can help people with cognitive disabilities easily understand how to perform a task. Similarly, simple layouts often improve access to information as well.",
                            "Performance": "Using recognized patterns that appear where visitors expect, and only when they require them may increase the perceived speed of the website or application as navigation from point to point will increase due to the ease of use."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Clean, simple, [honest](https://lowwwcarbon.com/) website layout [examples](https://minimal.gallery/)."
                        }
                    ],
                    "resources": [
                        {
                            "Choose a design that is simple, clear and tailored to the web": "http://www.ecometer.org/rules/choose-a-design-that-is-simple.html",
                            "Dark mode can save battery, but only if your device has an OLED screen": "https://www.businessinsider.com/guides/tech/does-dark-mode-save-battery?r=US&IR=T",
                            "Dark Mode Can Improve Text Readability — But Not for Everyone": "https://www.boia.org/blog/dark-mode-can-improve-text-readability-but-not-for-everyone",
                            "Design patterns": "https://ui-patterns.com/patterns",
                            "GreenIT (French) 005 - Favoriser un design simple, épuré, adapté au web": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_005_fr.md",
                            "[GPFEDS] 4.14 - UX and UI (Dark Patterns) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 5-3029 - Visual Soberness": "https://gr491.isit-europe.org/en/crit.php?id=5-3029-uxui-visual-sound-and-tactile-elements-/-components",
                            "Google: Here's why dark mode massively extends your OLED phone's battery life": "https://www.zdnet.com/article/google-heres-why-dark-mode-massively-extends-your-oled-phones-battery-life/",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "Laws Of UX": "https://lawsofux.com/",
                            "Patterns": "https://web.dev/patterns?hl=en",
                            "Patterns.dev": "https://www.patterns.dev/",
                            "The dark side of green web design": "https://www.wholegraindigital.com/blog/dark-colour-web-design/"
                        }
                    ],
                    "tags": ["UI", "Patterns", "Usability", "Assets", "CSS"]
                },
                {
                    "id": "11",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#avoid-manipulative-patterns",
                    "guideline": "Avoid Manipulative Patterns",
                    "description": "Manipulating the visitor into doing things you want them to is a short-term gain, long-term loss tactic tool. It's ethically bad, unsustainable, and should be avoided at all costs.",
                    "criteria": [
                        {
                            "title": "Dark and Deceptive Design Patterns",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX11-1)",
                            "description": "Avoid what are commonly known as dark patterns, deceptive design, or unethical coding techniques, which manipulate visitors into taking actions not necessarily in their best interest (anti-right click, no-copy, requiring an account to purchase, etc)."
                        },
                        {
                            "title": "Using Advertisements",
                            "testable": "Human Testable",
                            "description": "Advertisements and sponsorships are both ethical and clearly identified with the product or service, only presenting them when they provide real economic and ethical value and don't diminish a visitor's experience."
                        },
                        {
                            "title": "Page Tracking",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX11-3)",
                            "description": "Remove unused and unconsented page tracking."
                        },
                        {
                            "title": "Search Engine Optimization",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX11-4)",
                            "description": "Optimization for search engines, social networks, and third-party services are organically led with good coding practices with user-experience the focus, not manipulating the services to gain greater priority through obfuscating content, pages, websites, or applications with redundancy or non-useful and optimized (to the visitor) material."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Many deceptive design patterns have visitors wasting time and energy trying to undo choices they never intended to make. Avoiding them therefore reduces energy use.",
                            "Privacy": "Many deceptive patterns are intentionally designed to undermine data privacy. Ensuring you comply with ethical privacy practices and avoiding such patterns will avoid potential legal conflicts. You also reduce additional data being sent among the providers of tracking and advertising data.",
                            "Accessibility": "Dark and deceptive design patterns often intentionally block or hide access to information, which especially undermines the experience of people with disabilities who use assistive technologies. By avoiding them, you will give those with accessibility needs justification to trust your brand. Furthermore, avoiding unsustainable or carbon-intensive implementations will prevent making any existing situations worse.",
                            "Performance": "Interference with the user-interface (such as removing the ability to copy text) causes unnecessary friction and forces the visitor to spend more time on the page to work around the barrier put in place. This uses additional energy as they try to find a solution onsite, elsewhere, or give up entirely. Using ethical, non-disruptive coding practices will speed up interactions within your website.",
                            "Economic": "Ethical websites incentivize customers to whitelist your website on ad blockers.",
                            "Conversion": "Avoiding dark and deceptive patterns will likely result in fewer complaints. A classic example of this is the use of CAPTCHAs which can disrupt the visitor, cause accessibility barriers, and reduce the legitimate use of your product or service."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Examples](https://www.netsolutions.com/insights/dark-patterns-in-ux-disadvantages/) of dark patterns to be avoided."
                        }
                    ],
                    "resources": [
                        {
                            "48 Cart Abandonment Rate Statistics 2023": "https://baymard.com/lists/cart-abandonment-rate",
                            "An empirical study on the performance and energy costs of ads and analytics in mobile web apps": "https://www.sciencedirect.com/science/article/pii/S0950584923002252",
                            "Biased By Design": "https://biasedbydesign.com/",
                            "Climate change SEO survey": "https://searchengineland.com/climate-change-seo-survey-making-web-more-sustainable-438209",
                            "Dark Design Patterns Catalog": "https://www.uxtigers.com/post/dark-design",
                            "Dark pattern": "https://en.wikipedia.org/wiki/Dark_pattern",
                            "Dark Patterns Detective": "https://games.productartistry.com/games/dark-patterns",
                            "Dark Patterns Hall of Shame": "https://hallofshame.design/",
                            "Dark patterns in UX: how designers should be responsible for their actions": "https://uxdesign.cc/dark-patterns-in-ux-design-7009a83b233c",
                            "Dealing with Ads in 2020": "https://schepp.dev/posts/ad-integration-in-2020/",
                            "Deceptive design vs. the law": "https://clearleft.com/thinking/deceptive-design-vs-the-law",
                            "Deceptive Patterns": "https://www.deceptive.design/",
                            "Design Justice Network Principles": "https://designjustice.org/read-the-principles",
                            "Digital sustainability audits: a de facto standard for the Internet carbon footprint": "https://www.researchgate.net/publication/343041330_Digital_sustainability_audits_a_de_facto_standard_for_the_Internet_carbon_footprint",
                            "Effectively loading ads without impacting page speed": "https://web.dev/articles/loading-ads-page-speed?hl=en",
                            "Fair Patterns": "https://www.fairpatterns.com/",
                            "Fastest Ad Blocker: 13 Best We Tested for Performance in 2023": "https://whatsoftware.com/10-ad-blocking-extensions-tested-for-best-performance/view-all/",
                            "[GPFEDS] 4.14 - UX and UI (Dark Patterns) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 10-3070 - Dark Patterns": "https://gr491.isit-europe.org/en/crit.php?id=10-3070-uxui-some-services-are-designed-to-create-some",
                            "[GR491] 10-3073 - Advertisements": "https://gr491.isit-europe.org/en/crit.php?id=10-3073-uxui-targeted-or-untargeted-advertising-can-be-an",
                            "Guide to using analytics for performance and privacy": "https://www.wholegraindigital.com/blog/guide-to-using-analytics-for-performance-and-privacy/",
                            "How Deceptive Design is Used to Compromise Your Privacy and How to Fight Back": "https://consciousdigital.org/deceptive-design-patterns/",
                            "How to Build a Low-tech Website?": "https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "Humane By Design": "https://humanebydesign.com/principles",
                            "Is GDPR Good for the Environment?": "https://www.mightybytes.com/blog/is-gdpr-good-for-the-environment/",
                            "Just normal web things": "https://heather-buchel.com/blog/2023/07/just-normal-web-things/",
                            "Learn Privacy": "https://web.dev/blog/introducing-learn-privacy?hl=en",
                            "Ledger of Harms": "https://ledger.humanetech.com/",
                            "My solar-powered and self-hosted website": "https://dri.es/my-solar-powered-and-self-hosted-website",
                            "OpQuast 8 - Advertisements and sponsored content are identified as such.": "https://checklists.opquast.com/en/web-quality-assurance/advertisements-and-sponsored-content-are-identified-as-such",
                            "Overlay Fact Sheet": "https://overlayfactsheet.com/",
                            "Overlay False Claims": "https://overlayfalseclaims.com/",
                            "Six Dark Patterns to Avoid On Your Website": "https://www.mightybytes.com/blog/6-dark-patterns-to-avoid-on-your-website/",
                            "Society Centered Design": "https://societycentered.design/",
                            "The Calm Web": "https://calibreapp.com/blog/calm-web",
                            "Tracking Protection in Firefox For Privacy and Performance (PDF)": "https://www.ieee-security.org/TC/SPW2015/W2SP/papers/W2SP_2015_submission_32.pdf",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "Why People Block Ads (And What It Means for Marketers and Advertisers)": "https://blog.hubspot.com/marketing/why-people-block-ads-and-what-it-means-for-marketers-and-advertisers",
                            "Why you should stop using Google Analytics on your website": "https://plausible.io/blog/remove-google-analytics"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Patterns", "Usability", "Compatibility", "Assets", "JavaScript", "Security", "JavaScript", "Privacy"]
                },
                {
                    "id": "12",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#document-and-share-project-outputs",
                    "guideline": "Document and Share Project Outputs",
                    "description": "Everything produced by designers, developers, writers, and those involved with a project should be in an open format, well maintained, and curated in a common format (so everyone is working from the same model).",
                    "criteria": [
                        {
                            "title": "Deliverables Reusability",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX12-1)",
                            "description": "The deliverables output, including documentation, are used upstream of the project and produced in ways that will allow it to be reused in subsequent projects."
                        },
                        {
                            "title": "Deliverables Documentation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX12-2)",
                            "description": "Design functionality and technical specifications are documented so that deliverables are comprehensible by the project team and transferable to the development team."
                        },
                        {
                            "title": "Deliverables Readability",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX12-3)",
                            "description": "Developers have access to code comments and other View Source affordances which can reduce the burden to access, understand, maintain, and utilize production-ready code as this will reduce redundancy and foster an open source culture."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "Deliverables that are used in common, easy-to-understand formats will take less computer time to learn and adapt to the environment. As such, less energy will be spent trying to manage a project with emissions savings as a consequence.",
                            "Economic": "Well-documented projects that can be implemented with ease are likely to have fewer ongoing costs due to a lower need for maintenance.",
                            "Conversion": "Using an open format, to which anyone can contribute, will have a lower barrier to entry as there will likely be no cost involved in participation. Therefore it will encourage more individuals to play an active role in your project's future."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "[System Design](https://miro.medium.com/v2/resize:fit:1362/0*aZ2wQ5lWgbSHeLpj) of a Website functional structure."
                        }
                    ],
                    "resources": [
                        {
                            "7 simple habits of the top 1% of engineers": "https://read.engineerscodex.com/p/7-simple-habits-of-the-top-1-of-engineers",
                            "[GPFEDS] 1.10 - Strategy (Documented APIs) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-3008 - Reusability": "https://gr491.isit-europe.org/en/crit.php?id=1-3008-uxui-a-sustainable-it-knowledge-and-skills-base",
                            "[GR491] 7-3050 - Documentation": "https://gr491.isit-europe.org/en/crit.php?id=7-3050-uxui-too-many-inadequate-documents-are-produced-during",
                            "HTML First": "https://html-first.com/",
                            "Right-Click-View-Source As Culture": "https://htmx.org/essays/right-click-view-source/#right-click-view-source-as-culture",
                            "Society Centered Design": "https://societycentered.design/",
                            "System design": "https://sustainabilityguide.eu/methods/system-design/",
                            "System Design: The complete course": "https://kps.hashnode.dev/system-design-the-complete-course",
                            "System Design in Software Development": "https://medium.com/the-andela-way/system-design-in-software-development-f360ce6fcbb9",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators"
                        }
                    ],
                    "tags": ["Content", "Patterns", "Education", "Assets", "Software"]
                },
                {
                    "id": "13",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-a-design-system-to-prioritize-interface-consistency",
                    "guideline": "Use a Design System To Prioritize Interface Consistency",
                    "description": "Design systems allow common components and patterns to be formalized and managed within a website or application. By using such a tool, designers and developers can avoid reinventing existing tooling and thereby reduce wasted time (and emissions).",
                    "criteria": [
                        {
                            "title": "Design System",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX13-1)",
                            "description": "A design system is employed based on web standards and recognizable patterns to mutualize interface components and provide a consistent experience for visitors."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Consistent interfaces that employ web standards require less energy and resources across the product ecosystem, as they are usually tightly optimized. Also, design systems that incorporate environmental criteria can help to scale digital sustainability across the enterprise and reduce redundancy within code, resulting in collectively reduced energy use and impact.",
                            "Social Equity": "A design system with standardized, lightweight components will improve access to information for people in low-bandwidth areas, on older devices, and so on. Also, design systems will reduce the chance of biases that could affect such groups being introduced.",
                            "Accessibility": "A design system with accessible components will improve access to information for people with disabilities. Building design features with accessibility baked in by default reduces the potential that people with accessibility requirements will be left out during the website or application's lifecycle.",
                            "Performance": "Design Systems are built using standardized components that reduce the churn of repeat coding, thereby reducing developer coding turnarounds and, as a byproduct, improve performance and reduce emissions during the process. This will inherently reduce emissions considerably through the building of sustainable patterns.",
                            "Economic": "Because of their use of standardized components and their avoidance of redundancy, design systems reduce costs as the development time may be reduced (even accounting for the maintenance time involved in having one). Also, familiar-looking websites that can be browsed with ease are likely to suffer lower bounce rates (where visitors just give up) due to the ease of transition (unlike a unique-looking website which can make navigation increasingly complex).",
                            "Conversion": "Design Systems encourage using recognizable components throughout a design, which will help visitors identify and utilize the product or service successfully. As such, this will reduce complaints and annoyance, which can help increase customer retention. Also, user-interface consistency improves visitor trust as individuals will recognize familiar components within your design and know how to utilize them, and this can improve conversion rates as it will lower the rates of abandonment."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Polaris](https://polaris.shopify.com/) Design System."
                        }
                    ],
                    "resources": [
                        {
                            "4 Ways to Make Your Code More Reusable": "https://medium.com/@lanceharvieruntime/4-ways-to-make-your-code-more-reusable-bc20889c1e4",
                            "A Brief History of Design Systems. Part 1": "https://uxmag.com/articles/a-brief-history-of-design-systems-part-1",
                            "A Brief History of Design Systems. Part 2": "https://uxmag.com/articles/a-brief-history-of-design-systems-part-2",
                            "[AFNOR] Spec 5.3.5 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Design System Ecosystem": "https://bradfrost.com/blog/post/the-design-system-ecosystem/",
                            "Design System Gallery": "https://designsystemsrepo.com/design-systems/",
                            "Design System Guide": "https://thedesignsystem.guide/",
                            "Design System Metrics": "https://thedesignsystem.guide/design-system-metrics",
                            "The Digital Playbook: A Crucial Counterpart To Your Design System": "https://www.smashingmagazine.com/2025/01/digital-playbook-crucial-counterpart-design-system/",
                            "Design System ROI Calculator": "https://www.knapsack.cloud/calculator",
                            "Everything you need to know about Design Systems": "https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 7-3047 - Systemic Approach": "https://gr491.isit-europe.org/en/crit.php?id=7-3047-uxui-starting-a-project-without-taking-into-account",
                            "How much is a design system worth?": "https://uxdesign.cc/how-much-is-a-design-system-worth-d72e2ededf76",
                            "How to Write Clean, Reusable Code": "https://eledris.com/how-to-write-clean-reusable-code/",
                            "Laws Of UX": "https://lawsofux.com/",
                            "OpQuast 133 - Links of the same nature have identical colors, shapes and behaviors on all pages.": "https://checklists.opquast.com/en/web-quality-assurance/hyperlinks-of-the-same-nature-have-identical-colors-shapes-and-behaviors-on-all-pages",
                            "The Anatomy of a Design System": "https://sparkbox.com/foundry/design_system_makeup_design_system_layers_parts_of_a_design_system",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "What is a Design System?": "https://www.mightybytes.com/blog/what-is-a-design-system/",
                            "Why digital isn't always greener or fairer": "https://www.southampton.ac.uk/blog/digitalteam/2021/03/03/why-digital-isnt-always-greener-or-fairer/"
                        }
                    ],
                    "tags": ["UI", "Patterns", "Education", "Usability", "Assets", "Strategy"]
                },
                {
                    "id": "14",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#write-with-purpose-in-an-accessible-easy-to-understand-format",
                    "guideline": "Write With Purpose, in an Accessible, Easy To Understand Format",
                    "description": "Everyone should be able to understand what you've written without wasting time staring at a screen or jumping from page to page looking for answers, whether they have accessibility requirements or not. This also means avoiding using technical language (without explanations) and including enough information to help direct people (and search engines) from page to page.",
                    "criteria": [
                        {
                            "title": "Write Clearly",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX14-1)",
                            "description": "Content is written clearly, using plain, inclusive language delivered at an easy-to-understand reading level considering accessibility and internationalization inclusions as required (for example, dyslexia)."
                        },
                        {
                            "title": "Content Formatting",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX14-2)",
                            "description": "Content is formatted to support how people read online, including a clear document structure, visual hierarchy, headings, bulleted lists, line spacing, and so on."
                        },
                        {
                            "title": "Search Engine Optimization (SEO)",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX14-3)",
                            "description": "SEO has been prioritized from the early design stages and throughout a product or service's lifecycle to improve content findability."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "When people can quickly find and comprehend the content they need to make informed decisions, they use less time and resources, which reduces energy use and lowers emissions.",
                            "Social Equity": "Inclusive language that avoids jargon, gendered terms, and so on can improve the user-experience for a broader audience.",
                            "Accessibility": "Plain-language content that can be quickly skimmed is easier to understand, especially for people with cognitive disabilities. Moreover, good document structure works better for assistive technologies such as screen readers.",
                            "Performance": "Good document structure improves search performance as the content will likely rank higher in search engines, which can help people more quickly find the content they need.",
                            "Economic": "Being an authoritative source on a subject can have a positive financial impact on your business, as it can bring income through multiple streams.",
                            "Conversion": "Content that is well-written and authoritative will be cited by third parties and can lead to an increase in traffic."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "CodePen's plain English [terms of service](https://blog.codepen.io/legal/terms-of-service/) agreement are easy-to-read."
                        }
                    ],
                    "resources": [
                        {
                            "Adapt text for the web": "http://www.ecometer.org/rules/adapt-text-for-the-web.html",
                            "Content design practices for sustainable communication in tech": "https://uxdesign.cc/content-design-practices-for-sustainable-communication-in-tech-cbfc679be0cc",
                            "The Elements of Content Strategy": "https://elements-of-content-strategy.abookapart.com/",
                            "[GR491] 1-4002 - Sustainable Commitment": "https://gr491.isit-europe.org/en/crit.php?id=1-4002-contents-many-elements-are-produced-externally-it-would",
                            "[GR491] 1-4003 - Verified Sources": "https://gr491.isit-europe.org/en/crit.php?id=1-4003-contents-the-information-transmitted-can-be-controversial-and",
                            "[GR491] 1-4004 - Facts and Opinions": "https://gr491.isit-europe.org/en/crit.php?id=1-4004-contents-when-the-information-provided-is-not-deemed",
                            "[GR491] 2-4014 - Internationalisation": "https://gr491.isit-europe.org/en/crit.php?id=2-4014-contents-multi-language-management-adds-a-substantial-volume-of",
                            "[GR491] 5-3033 - SEO Stakeholders": "https://gr491.isit-europe.org/en/crit.php?id=5-3033-uxui-algorithms-optimization--tend-to-accumulate-data",
                            "[GR491] 5-4046 - Useful Images and Links": "https://gr491.isit-europe.org/en/crit.php?id=5-4046-contents-content-uses-external-references-rather-than-duplicating",
                            "GreenIT (French) 113 - Adapter les textes au web": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_113_fr.md",
                            "How screen readers read special characters: an update": "https://elevenways.be/en/articles/screenreaders-special-characters",
                            "How to Effectively Use Visual Hierarchy in Web Design": "https://speckyboy.com/visual-hierarchy-web-design/",
                            "How to Use Keywords for SEO and Web Sustainability": "https://www.mightybytes.com/blog/keyword-optimization-seo-sustainability/",
                            "How to Write for a Global Audience": "https://uxplanet.org/how-to-write-for-a-global-audience-d12c3a9cd46",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "HTML: HyperText Markup Language": "https://developer.mozilla.org/en-US/docs/Web/HTML",
                            "On-Page SEO Checklist": "https://www.semrush.com/blog/on-page-seo-checklist/",
                            "Page Structure Tutorial": "https://www.w3.org/WAI/tutorials/page-structure/",
                            "Plain Language Writing — An Essential Part Of Accessibility": "https://www.forbes.com/sites/andrewpulrang/2020/10/22/plain-language-writing---an-essential-part-of-accessibility/",
                            "Readability Scoring System": "https://readabilityformulas.com/readability-scoring-system.php",
                            "Stop Writing Web Copy That Over Explains Everything": "https://www.mightybytes.com/blog/stop-writing-web-copy-that-over-explains/",
                            "Sustainable SEO: How to focus on a lasting SEO strategy": "https://yoast.com/sustainable-seo/",
                            "The digital butterfly effect: Sustainable websites and SEO": "https://www.the-future-of-commerce.com/2022/03/01/sustainable-websites/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "WCAG 2.2 Understanding Docs: Reading Level": "https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Why Heading Tags and Content Structure Matter": "https://www.mightybytes.com/blog/why-heading-tags-and-structure-matter/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Content", "UI", "Usability"]
                },
                {
                    "id": "15",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#take-a-more-sustainable-approach-to-image-assets",
                    "guideline": "Take a More Sustainable Approach to Image Assets",
                    "description": "Of all the data that comprises the largest over-the-wire transfer rates within the average website or application, images are usually those that are responsible due to their quantity and usefulness. As such, doing all you can to reduce their size and unnecessary loading will be beneficial for sustainability.",
                    "criteria": [
                        {
                            "title": "Need For Images",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX15-1)",
                            "description": "The need for images has been determined considering the quantity, format, and size necessary for implementation."
                        },
                        {
                            "title": "Optimize Images",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX15-2)",
                            "description": "Resize, optimize, and compress each image (outside the browser), offering different sizes (for each image) for different screen resolutions."
                        },
                        {
                            "title": "Lazy Loading",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX15-3)",
                            "description": "Provide Lazy Loading to ensure image assets only load when they are required."
                        },
                        {
                            "title": "Sizing And Deactivation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX15-4)",
                            "description": "Let the visitor select the display size, and provide the option to deactivate images."
                        },
                        {
                            "title": "Management And Usage",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX15-5)",
                            "description": "Set up a media management and use policy to reduce the overall impact of images, with criteria for media compression and file formats."
                        }
                    ],
                    "impact": "High",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Image assets often make up the largest part of a web page's overall size. Compressing and delivering them in lightweight formats that improve the user-experience can often reduce the hardware burden on older devices. This in turn can reduce overall consumer e-waste by reducing forced upgrade cycles.",
                            "Social Equity": "Lightweight images work better for visitors in low-bandwidth areas and on older devices, as long as the device can support the formats used.",
                            "Accessibility": "Delivering images in ways that are meaningful to visitors improves access to information.",
                            "Performance": "By optimizing your images, you can significantly speed up your website in terms of HTTP requests, data transfer, and even in some cases the physical rendering effort - all of which have an impact on a visitor's user-experience and speed of access.",
                            "Economic": "Visitors with data caps will benefit from optimized resources as they will be able to consume more content, and hosts of content will endure smaller bills due to lower overheads."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "<img src=\"image.jpg\" alt=\"...\" loading=\"lazy\"\/>\r\n<iframe src=\"video-player.html\" title=\"...\" loading=\"lazy\"><\/iframe>",
                            "content": "[Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)."
                        }
                    ],
                    "resources": [
                        {
                            "20 ways to make your website more energy efficient": "https://www.wholegraindigital.com/blog/website-energy-efficiency/",
                            "Avoid hotlinking images with Cross-Origin-Resource-Policy": "https://www.sjoerdlangkemper.nl/2024/11/27/avoid-hotlinking-images-with-corp-cross-origin-resource-policy/",
                            "Avoid using bitmap images for the interface": "http://www.ecometer.org/rules/avoid-using-bitmap-for-the-interface.html",
                            "Dithering Images": "https://www.greendesign.io/dithering-images",
                            "Fast load times: Optimize Your Images": "https://web.dev/explore/fast?hl=en#optimize-your-images",
                            "Favor CSS over images": "http://www.ecometer.org/rules/favor-css-over-images.html",
                            "Focus Mode": "https://www.greendesign.io/focus-mode",
                            "Greening The Web: A Study On Low-Carbon Image Formats": "https://michaelandersen93.substack.com/p/greening-the-web-a-study-on-low-carbon?r=3dzajs",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.1 - UX and UI (Autoplay) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.7 - UX and UI (Media Choices) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.1 - Content (Image Suitability) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.2 - Content (Image Compression) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.4 - Front-End (Image Dimensions) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-4008 - Image Compression": "https://gr491.isit-europe.org/en/crit.php?id=2-4008-contents-the-transmission-of-compressed-data-is-essential",
                            "[GR491] 2-4009 - Meaningful Images": "https://gr491.isit-europe.org/en/crit.php?id=2-4009-contents-the-weight-of-an-image-thus-its",
                            "[GR491] 2-4010 - Image Avoidance": "https://gr491.isit-europe.org/en/crit.php?id=2-4010-contents-the-weight-of-an-image-thus-its",
                            "[GR491] 2-4011 - Text Replacement": "https://gr491.isit-europe.org/en/crit.php?id=2-4011-contents-the-weight-of-an-image-thus-its",
                            "[GR491] 7-5050 - Sizes and Formats": "https://gr491.isit-europe.org/en/crit.php?id=7-5050-frontend-front-end-operations-may-require-file-transfers-between",
                            "[GR491] 7-5053 - Convert and Resize": "https://gr491.isit-europe.org/en/crit.php?id=7-5053-frontend-image-transfers-introduce-peculiarities-related-to-the",
                            "[GR491] 7-5054 - File Compression": "https://gr491.isit-europe.org/en/crit.php?id=7-5054-frontend-the-volume-of-data-transferred-increases-the",
                            "[GR491] 8-3057 - Media Management": "https://gr491.isit-europe.org/en/crit.php?id=8-3057-uxui-the-volume-of-data-transferred-increases-the",
                            "[GR491] 8-3061 - Optimized Images": "https://gr491.isit-europe.org/en/crit.php?id=8-3061-uxui-the-volume-of-data-exchanged-for-the",
                            "[GR491] 9-5068 - Lazy Loading": "https://gr491.isit-europe.org/en/crit.php?id=9-5068-frontend-when-loading-the-service-on-the-user",
                            "Green by Default": "https://screenspan.net/blog/green-by-default/",
                            "GreenIT (French) 023 - Préférer les CSS aux images": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_023_fr.md",
                            "GreenIT (French) 030 - Préférer les glyphs aux images": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_030_fr.md",
                            "GreenIT (French) 034 - Ne pas redimensionner les images coté navigateur": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_034_fr.md",
                            "GreenIT (French) 036 - Optimiser les images vectorielles": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_036_fr.md",
                            "GreenIT (French) 037 - Utiliser le chargement paresseux": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_037_fr.md",
                            "GreenIT (French) 080 - Optimiser les images": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_080_fr.md",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "How to Build a Low-tech Website?": "https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/",
                            "How to Defer Offscreen Images and Background Images": "https://www.debugbear.com/blog/defer-offscreen-images",
                            "How to Optimize Images for Faster Load Times and Sustainability": "https://www.mightybytes.com/blog/how-to-optimize-images/",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "Image Carbon": "https://www.imagecarbon.com/",
                            "Lazy loading": "https://en.wikipedia.org/wiki/Lazy_loading",
                            "Learn Images": "https://web.dev/blog/learn-images?hl=en",
                            "Modern way of serving images": "https://kurtextrem.de/posts/modern-way-of-img",
                            "My solar-powered and self-hosted website": "https://dri.es/my-solar-powered-and-self-hosted-website",
                            "OpQuast 114 - Thumbnails and previews are not larger images resized on the client side.": "https://checklists.opquast.com/en/web-quality-assurance/thumbnails-and-previews-are-not-larger-images-resized-on-the-client-side",
                            "Practical SVG": "https://practical-svg.chriscoyier.net/",
                            "Reduce the weight of a web page: which elements have the greatest impact?": "https://greenspector.com/en/reduce-the-weight-of-a-web-page-which-elements-have-the-greatest-impact/",
                            "Resize images outside the browser": "http://www.ecometer.org/rules/dont-resize-image-in-browser.html",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "Sustainable Web Design": "https://alistapart.com/article/sustainable-web-design/",
                            "UI Tools": "https://designsustainably.eu/uitools/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Why Web Designers Need To Think About Sustainable Web Design": "https://www.forbes.com/councils/forbesbusinesscouncil/2022/09/01/why-web-designers-need-to-think-about-sustainable-web-design/",
                            "World Wide Waste": "https://gerrymcgovern.com/books/world-wide-waste/"
                        }
                    ],
                    "tags": ["Content", "UI", "Usability", "Assets", "HTML", "Performance", "Software"]
                },
                {
                    "id": "16",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#take-a-more-sustainable-approach-to-media-assets",
                    "guideline": "Take a More Sustainable Approach to Media Assets",
                    "description": "Video and audio-heavy websites are often those that can have significant sustainability costs in terms of storage and carbon intensity for viewers who have to process the media with their devices to watch them (draining batteries). Optimizing such assets as much as possible is critical for a sustainable product or service.",
                    "criteria": [
                        {
                            "title": "Need For Media",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX16-1)",
                            "description": "The need for video or sound (when it adds visitor value, for example, to enhance accessibility) has been determined, and non-informative media (background media), including autoplaying functionality, has been banned or removed."
                        },
                        {
                            "title": "Optimize Media",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX16-2)",
                            "description": "Compress the media according to the visitor's requirements, select the appropriate format, ensure it works across browsers, and avoid embedded player plugins."
                        },
                        {
                            "title": "Lazy Loading",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX16-3)",
                            "description": "Any media requiring a lot of data to be downloaded on the client side (including the media itself) has been loaded behind a facade (a non-functional, static, representational element)."
                        },
                        {
                            "title": "Labels And Choice",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX16-4)",
                            "description": "Let the visitor control media deactivation, giving a choice of resolutions; all while providing alternative resolutions and formats. Also increase visitor awareness by informing them of the length, format, and weight of the media."
                        },
                        {
                            "title": "Management And Usage",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX16-5)",
                            "description": "Set up a media management and use policy to reduce the overall impact of audio and video, with criteria for media compression and file formats."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Media assets like audio and video can be very resource-hungry. Reducing battery-draining events such as loading high-effort content until the moment it is required can have savings in terms of pure processing and displaying of the media.",
                            "Social Equity": "Providing alternatives to bandwidth-hungry media will assist those unable to benefit due to their environment.",
                            "Accessibility": "Delivering media assets in ways that convey information in an easy-to-perceive manner both visually and contextually (even if people are unable to for example see), will allow a wider audience to gain from your content.",
                            "Performance": "Catering your experience to the device, situation, and environment of the visitor will reduce wasted bandwidth (for example, sending a lower resolution for less capable devices). As such, the data savings will translate into a performance boost for those taking advantage of the reduced capabilities.",
                            "Economic": "Being able to avoid media entirely and rely on options such as transcripts will provide huge financial rewards for those who pay for the bandwidth they consume or serve."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "WEBVTT\r\n\r\n00:01.000 --> 00:04.000\r\n- Never drink liquid nitrogen.\r\n\r\n00:05.000 --> 00:09.000\r\n- It will perforate your stomach.\r\n- You could die.",
                            "content": "[Web Video Text Tracks Format](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)."
                        }
                    ],
                    "resources": [
                        {
                            "20 ways to make your website more energy efficient": "https://www.wholegraindigital.com/blog/website-energy-efficiency/",
                            "Adapt sounds to the listening environment": "http://www.ecometer.org/rules/adapt-sounds-to-the-environment.html",
                            "Adapt videos to the viewing environment": "http://www.ecometer.org/rules/adapt-videos-to-the-environment.html",
                            "[AFNOR] Spec 5.4.4 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Ditch 4K video and new tech to fight climate change": "https://www.bbc.co.uk/news/technology-55164410",
                            "Factcheck: What is the carbon footprint of streaming video on Netflix?": "https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.1 - UX and UI (Autoplay) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.7 - UX and UI (Media Choices) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.11 - UX and UI (Inform Users) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.3 - Content (Video Definition) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.4 - Content (Video Compression) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.6 - Content (Audio Compression) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-4028 - Meaningful Videos": "https://gr491.isit-europe.org/en/crit.php?id=3-4028-contents-video-streams-are-one-of-the-elements",
                            "[GR491] 3-4029 - Video Avoidance": "https://gr491.isit-europe.org/en/crit.php?id=3-4029-contents-in-digital-service-uses-video-streams-are",
                            "[GR491] 7-5050 - Formats and Sizes": "https://gr491.isit-europe.org/en/crit.php?id=7-5050-frontend-front-end-operations-may-require-file-transfers-between",
                            "[GR491] 7-5054 - File Compression": "https://gr491.isit-europe.org/en/crit.php?id=7-5054-frontend-the-volume-of-data-transferred-increases-the",
                            "[GR491] 8-3057 - Media Management": "https://gr491.isit-europe.org/en/crit.php?id=8-3057-uxui-the-volume-of-data-transferred-increases-the",
                            "[GR491] 8-3060 - Video and Animation Usage": "https://gr491.isit-europe.org/en/crit.php?id=8-3060-uxui-video-streams-and-animations-generate-a-large",
                            "[GR491] 9-5071 - Autoplay": "https://gr491.isit-europe.org/en/crit.php?id=9-5071-frontend-active-content-uses-technical-resources-to-function.",
                            "GreenIT (French) 112 - Adapter les sons aux contextes d'écoute": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_112_fr.md",
                            "GreenIT (French) 114 - Adapter les vidéos aux contextes de visualisation": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_114_fr.md",
                            "GreenIT (French) 4003 - Éviter la lecture et le chargement automatique des vidéos et des sons": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4003_fr.md",
                            "Green Production Guide": "https://greenproductionguide.com/",
                            "Greening of Streaming": "https://www.greeningofstreaming.org/",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "How to Compress a Video File without Losing Quality": "https://www.youtube.com/watch?v=sgmE1T8A4UY",
                            "Lazy load third-party resources with facades": "https://developer.chrome.com/docs/lighthouse/performance/third-party-facades?hl=en",
                            "Making Audio and Video Media Accessible": "https://www.w3.org/WAI/media/av/",
                            "OpQuast 116 - Each audio and video content is accompanied by a text transcription.": "https://checklists.opquast.com/en/web-quality-assurance/all-audio-and-video-content-is-accompanied-by-a-text-transcription",
                            "OpQuast 118 - The length of video and audio content is indicated.": "https://checklists.opquast.com/en/web-quality-assurance/the-length-of-video-and-audio-content-is-displayed",
                            "OpQuast 119 - Videos are user-triggered.": "https://checklists.opquast.com/en/web-quality-assurance/videos-are-user-triggered",
                            "OpQuast 120 - Sounds are user-triggered.": "https://checklists.opquast.com/en/web-quality-assurance/sounds-are-user-triggered",
                            "Optimizing Video for the Web": "https://www.mightybytes.com/blog/optimizing-video/",
                            "Reduce the weight of a web page: which elements have the greatest impact?": "https://greenspector.com/en/reduce-the-weight-of-a-web-page-which-elements-have-the-greatest-impact/",
                            "The carbon footprint of streaming video: fact-checking the headlines": "https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines",
                            "UI Tools": "https://designsustainably.eu/uitools/",
                            "Video - an Environmental Monster?": "https://www.linkedin.com/pulse/video-environmental-monster-joe-jones/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Why Web Designers Need To Think About Sustainable Web Design": "https://www.forbes.com/councils/forbesbusinesscouncil/2022/09/01/why-web-designers-need-to-think-about-sustainable-web-design/",
                            "Zoom Emissions": "https://www.utilitybidder.co.uk/business-electricity/zoom-emissions/"
                        }
                    ],
                    "tags": ["Content", "UI", "Usability", "Assets", "HTML", "Performance", "Software"]
                },
                {
                    "id": "17",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#take-a-more-sustainable-approach-to-animation",
                    "guideline": "Take a More Sustainable Approach to Animation",
                    "description": "Animation can be both CPU and GPU-intensive and have implications for accessibility. While visually appealing and useful in certain situations, care and attention should be taken when considering the use of a high emissions technology.",
                    "criteria": [
                        {
                            "title": "Need For Animation",
                            "testable": "Human Testable",
                            "description": "Use animation only when it adds value to a visitor's experience, and not for decorative elements."
                        },
                        {
                            "title": "Avoid Overburdening",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX17-2)",
                            "description": "Progressively display an appropriate quantity of animation so as not to overburden the visitor or diminish expected device behavior."
                        },
                        {
                            "title": "Control Animation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX17-3)",
                            "description": "Allow visitors to start, stop, pause, or otherwise control animated content."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Animation can be resource intensive. It can utilize both the CPU and GPU, consume a vast amount of RAM, and take a while to render. This is without considering the accessibility and usability issues it contains. By taking all of this into account, allowing the disabling or reduction of animation can be environmentally beneficial.",
                            "Social Equity": "Individuals from different nations and backgrounds may have differing views on the use of animation, and different devices may support different levels of technology. As such, catering to many viewpoints will ensure the widest possible audience.",
                            "Accessibility": "Animation that flashes can potentially trigger seizure conditions such as epilepsy; therefore it is critically important that you avoid any hazards within your designs.",
                            "Performance": "Compressing, removing, or otherwise reducing animation files improves performance as less syntax will exist within your product or service codebase.",
                            "Economic": "Subtle animation can draw the visitor's eye to useful information that could assist you to financial success, but this must be done ethically, and without overdoing it."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "@media (prefers-reduced-motion: reduce) {\r\n\tbody *,\r\n\tbody *::before,\r\n\tbody *::after {\r\n\t\tanimation-delay: -1ms !important;\r\n\t\tanimation-duration: 1ms !important;\r\n\t\tanimation-iteration-count: 1 !important;\r\n\t\tbackground-attachment: initial !important;\r\n\t\ttransition-duration: 1ms !important;\r\n\t\ttransition-delay: -1ms !important;\r\n\t\tscroll-behavior: auto !important;\r\n\t}\r\n}",
                            "content": "[Prefers-reduced-motion: Sometimes less movement is more](https://web.dev/articles/prefers-reduced-motion?hl=en)."
                        }
                    ],
                    "resources": [
                        {
                            "Climate Change Implications of Gaming Products and Services (PDF)": "https://openresearch.surrey.ac.uk/discovery/delivery/44SUR_INST:ResearchRepository/99512335802346#13140594990002346",
                            "Equations relating total annual energy consumption and chips energy efficiency": "https://www.researchgate.net/publication/371938289_Equations_relating_total_annual_energy_consumption_and_chips_energy_efficiency",
                            "[GPFEDS] 4.1 - UX and UI (Autoplay) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.6 - UX and UI (Informational Media) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 7-5051 - Animation Frequency": "https://gr491.isit-europe.org/en/crit.php?id=7-5051-frontend-the-presentation-of-operations-on-the-front",
                            "[GR491] 9-5079 - Animation Necessity": "https://gr491.isit-europe.org/en/crit.php?id=9-5079-frontend-the-processing-of-animations-consumes-technical-resources",
                            "GreenIT (French) 039 - Éviter les animations JavaScript / CSS": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_039_fr.md",
                            "GreenIT (French) 4002 - Limiter l'utilisation des GIFs animés": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4002_fr.md",
                            "GreenIT (French) 4030 - Limiter le recours aux carrousels": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4030_fr.md",
                            "GreenIT (French) 4035 - Préférer la pagination au défilement infini": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4035_fr.md",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "Humane By Design": "https://humanebydesign.com/principles/",
                            "Let users pause/stop/hide animation": "https://urm.wwu.edu:443/accessibility/guide/pause-stop-hide-animation",
                            "The ultimate guide to proper use of animation in UX": "https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9",
                            "UI Animation: Please Use Responsibly": "https://uxdesign.cc/ui-animation-please-use-responsibly-e707dbdb12d5",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["Accessibility", "UI", "Usability", "CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "18",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#take-a-more-sustainable-approach-to-typefaces",
                    "guideline": "Take a More Sustainable Approach to Typefaces",
                    "description": "Since the advent of the modern web, the ability to include embedded fonts and provide a more customized experience has seen their use explode. They aren't always the most performant option (which poses emissions hazards) and come with a few issues such as Flash Of Unstyled Content (FOUC) / Flash Of Unstyled Text (FOUT) which should be addressed.",
                    "criteria": [
                        {
                            "title": "Default Typefaces",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX18-1)",
                            "description": "Use standard system-level (web-safe / pre-installed) fonts as much as possible."
                        },
                        {
                            "title": "Font Optimization",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX18-2)",
                            "description": "The number of fonts, and the variants within typefaces (such as weight and characters) are limited within a project, using the most performant file format available."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Reducing the number of fonts being loaded will reduce the amount of rendering that occurs, all of which have a carbon impact (as the physical rendering of non-system typefaces graphically onto every element of the DOM will have an energy commitment).",
                            "Social Equity": "System-level (Web Safe) fonts work across the widest range of devices and platforms, which improves access to information for those who may have tightly regulated browsing habits or limited availability.",
                            "Performance": "By providing Web fonts that are optimized but optional, visitors can experience the product or service with a level of speed versus aesthetic they feel comfortable with.",
                            "Economic": "While pretty, custom typefaces are entirely optional on the Web and, as such, the bandwidth they consume (and the emissions this produces) are unnecessary. This added cost can be eliminated, but the benefit such fonts give in readability or personality for a website or application is worth considering."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;",
                            "content": "[System Font Stack](https://systemfontstack.com/)."
                        }
                    ],
                    "resources": [
                        {
                            "Apple System Fonts": "https://developer.apple.com/fonts/system-fonts/",
                            "Best practices for fonts": "https://web.dev/articles/font-best-practices?hl=en",
                            "Complete Guide to Pre-Installed Fonts in Linux, Mac, and Windows": "https://apaddedcell.com/wp-content/uploads/2022/04/web-fonts.png",
                            "CSS Fonts": "https://www.cssfontstack.com/",
                            "Fallback Font Generator": "https://screenspan.net/fallback",
                            "Font style matcher": "https://meowni.ca/font-style-matcher/",
                            "[GPFEDS] 4.7 - UX and UI (Media Choices) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.8 - UX and UI (Font Limits) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-4015 - Font Limits": "https://gr491.isit-europe.org/en/crit.php?id=2-4015-contents-each-font-is-encoded-in-a-file",
                            "[GR491] 2-4016 - System Fonts": "https://gr491.isit-europe.org/en/crit.php?id=2-4016-contents-system-fonts-are-embedded-in-the-presentation",
                            "[GR491] 8-3058 - Fonts and Varients": "https://gr491.isit-europe.org/en/crit.php?id=8-3058-uxui-fonts-can-be-very-large.-by-reducing",
                            "GreenIT (French) 029 - Favoriser les polices standards": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_029_fr.md",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "List of typefaces included with macOS": "https://en.wikipedia.org/wiki/List_of_typefaces_included_with_macOS",
                            "List of typefaces included with Microsoft Windows": "https://en.wikipedia.org/wiki/List_of_typefaces_included_with_Microsoft_Windows",
                            "Matrix of fonts bundled with Mac and Windows operating systems, Microsoft Office and Adobe Creative Suite": "https://media.24ways.org/2007/17/fontmatrix.html",
                            "Modern Font Stacks": "https://modernfontstacks.com/",
                            "Preload Fonts On Your Website For Better Core Web Vitals": "https://www.debugbear.com/blog/preload-web-fonts",
                            "Reduce web font size": "https://web.dev/articles/reduce-webfont-size?hl=en",
                            "The performance cost of custom web fonts, and how to solve it": "https://www.wholegraindigital.com/blog/performant-web-fonts/",
                            "The Ultimate Guide to Font Performance Optimization": "https://www.debugbear.com/blog/website-font-performance",
                            "Use standard typefaces": "http://www.ecometer.org/rules/use-standard-typefaces.html",
                            "Using UX Design to Build a Sustainable Future": "https://uxmag.com/articles/using-ux-design-to-build-a-sustainable-future",
                            "Web Font Performance - How Your Fonts Affect Page Speed": "https://speedy.site/web-font-performance-how-your-fonts-affect-page-speed/",
                            "Web fonts: when you need them, when you don't": "https://david-gilbertson.medium.com/web-fonts-when-you-need-them-when-you-dont-a3b4b39fe0ae",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["UI", "Usability", "CSS", "Performance"]
                },
                {
                    "id": "19",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#provide-suitable-alternatives-to-web-assets",
                    "guideline": "Provide Suitable Alternatives to Web Assets",
                    "description": "Media, images, fonts, and documents enrich the Internet. The problem is that people may not want to watch a video, listen to an audio file, look at an image, or use a specific application. By providing alternative formats to anything you embed, you ensure the widest possible audience can benefit from it (and reduced carbon output will occur as the alternative text will induce less consumer hardware thrashing than its rich media alternative).",
                    "criteria": [
                        {
                            "title": "Open Formats",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX19-1)",
                            "description": "All proprietary file formats (such as PDF) are offered in HTML for accessibility and to ensure future availability."
                        },
                        {
                            "title": "Font Subsetting",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX19-2)",
                            "description": "All custom typefaces (using font-display) are subsetted and offered as part of a font stack with a system font as a backup."
                        },
                        {
                            "title": "Alternative Text",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX19-3)",
                            "description": "All images provide meaningful alternative text for screen reader users (or when images fail to load) accessibility."
                        },
                        {
                            "title": "Audio Alternatives",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX19-4)",
                            "description": "Audio provides text transcripts of conversations as an alternative to playing the media."
                        },
                        {
                            "title": "Video Alternatives",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX19-5)",
                            "description": "Video provides text transcripts (at minimum), subtitles (using WebVTT), and for accessibility best practice, offer closed captions and sign language options."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Offering low-impact alternatives to media formats reduces the amount of battery-draining hardware processing required for visitors to find the information they require.",
                            "Social Equity": "Not every visitor will be in a situation where they can watch a video or listen to audio; therefore it makes sense to have a plaintext alternative.",
                            "Accessibility": "Certain accessibility barriers can prevent media from being consumed, as such it's important to offer different ways of viewing a site's content.",
                            "Performance": "Reducing the interactivity of a website doesn't mean a lesser experience, it can help visitors access what they need quicker.",
                            "Economic": "Media is costly to produce and host, text is cheap and takes little data to download, it can help reduce your hosting costs to serve a media-free setting within pages.",
                            "Conversion": "Text alternatives (like transcripts) to media can be indexed by search engines, this can allow your project to be found easier."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;",
                            "content": "[System Font Stack](https://systemfontstack.com/)."
                        }
                    ],
                    "resources": [
                        {
                            "A New Way To Reduce Font Loading Impact: CSS Font Descriptors": "https://www.smashingmagazine.com/2021/05/reduce-font-loading-impact-css-descriptors/",
                            "Alternative Text": "https://webaim.org/techniques/alttext/",
                            "Creating font subsets": "https://markoskon.com/creating-font-subsets/",
                            "CSS Font Stack (Web-Safe)": "https://www.cssfontstack.com/",
                            "Fabulous Font-Face Fallbacks": "https://calendar.perfplanet.com/2024/fabulous-font-face-fallbacks/",
                            "Fast Load Times: Optimize WebFonts": "https://web.dev/explore/fast?hl=en#optimize-webfonts",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.6 - UX and UI (Informational Media) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.7 - UX and UI (Media Choices) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.12 - UX and UI (Impact Flags) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.5 - Content (Video Alternative) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-4012 - Image Alternatives": "https://gr491.isit-europe.org/en/crit.php?id=2-4012-contents-accessibility-assistants-must-be-able-to-use",
                            "[GR491] 3-4034 - Audio Alternatives": "https://gr491.isit-europe.org/en/crit.php?id=3-4034-contents-access-to-sound-is-difficult-if-not",
                            "[GR491] 9-5064 - Image Text Replacement": "https://gr491.isit-europe.org/en/crit.php?id=9-5064-frontend-accessibility-assistants-must-be-able-to-use",
                            "Making a positive change: PDF to HTML": "https://accessibility.blog.gov.uk/2023/06/12/making-a-positive-change-pdf-to-html/",
                            "prefers-reduced-data": "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "The performance cost of custom web fonts, and how to solve it": "https://www.wholegraindigital.com/blog/performant-web-fonts/",
                            "Tips for creating a transcript file": "https://support.google.com/youtube/answer/2734799",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "Video Captions": "https://www.w3.org/WAI/perspective-videos/captions/",
                            "W3C Web Accessibility Initiative: Transcripts": "https://www.w3.org/WAI/media/av/transcripts/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Web Font Performance - How Your Fonts Affect Page Speed": "https://speedy.site/web-font-performance-how-your-fonts-affect-page-speed/",
                            "Web Video Text Tracks Format (WebVTT)": "https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API",
                            "Web fonts: when you need them, when you don't": "https://david-gilbertson.medium.com/web-fonts-when-you-need-them-when-you-dont-a3b4b39fe0ae",
                            "WebVTT: The Web Video Text Tracks Format": "https://www.w3.org/TR/webvtt1/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Content", "UI", "Usability", "Compatibility", "Assets", "HTML", "Performance"]
                },
                {
                    "id": "20",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#provide-accessible-usable-minimal-web-forms",
                    "guideline": "Provide Accessible, Usable, Minimal Web Forms",
                    "description": "Understandably, businesses want to know more about their customers, but a key part of sustainability is being ethical towards visitors and as such, the right to privacy is considered paramount. Don't demand information when it's not required and not only will this help visitors complete transactions quicker (reducing emissions), it will help with legal compliance such as GDPR.",
                    "criteria": [
                        {
                            "title": "Form Simplicity",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX20-1)",
                            "description": "Remove unnecessary forms and reduce form content to the bare minimum necessary to meet the visitor's needs and the organization's business goals. Clearly communicate why a form is necessary, what its value proposition is, how many steps it will take to complete, and what an organization will do with collected data (informed consent)."
                        },
                        {
                            "title": "Form Functionality",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX20-2)",
                            "description": "Avoid auto-completion / auto-suggest if it would prove unhelpful (to conserve bandwidth) whilst allowing autofill for ease of repeat entry (including the use of helpful tooling such as password managers)."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Optimizing forms reduces the resources necessary for visitors to complete them and products or services to process them, and in doing so, will reduce the emissions as a byproduct of avoiding using unnecessary hardware on the server or client-side.",
                            "Privacy": "Forms that include informed consent and helpful prompts about cookies, data collection, and so on improve data privacy.",
                            "Accessibility": "Ensuring your forms are well labeled, and accessible not only for those with disabilities but those using a range of different devices and inputs will reduce barriers, and thereby form processing will occur with higher success rates.",
                            "Economic": "If visitors can complete forms more successfully, they will suffer less frustration, and website owners will get fewer complaints, which will be beneficial in a potential reduction in support costs and result in more visitors likely to continue with purchases on a website.",
                            "Conversion": "Forms that are standards-based and well constructed which consider accessibility will improve conversion rates due to visitors being able to complete forms error-free more regularly."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Guide to creating easy-to-use [web forms](https://www.smashingmagazine.com/2017/06/designing-efficient-web-forms/) and a guide to [form design](https://coyleandrew.medium.com/form-design-for-complex-applications-d8a1d025eba6) for complex applications."
                        }
                    ],
                    "resources": [
                        {
                            "Autofill in action: real-world insights": "https://developer.chrome.com/blog/autofill-insights-2024?hl=en",
                            "Best Practices For Mobile Form Design": "https://www.smashingmagazine.com/2018/08/best-practices-for-mobile-form-design/",
                            "Designing Efficient Web Forms": "https://www.smashingmagazine.com/2017/06/designing-efficient-web-forms/",
                            "Form design: from zero to hero all in one blog post": "https://adamsilver.io/blog/form-design-from-zero-to-hero-all-in-one-blog-post/",
                            "Form Design for Complex Applications": "https://coyleandrew.medium.com/form-design-for-complex-applications-d8a1d025eba6",
                            "Form UX: How to Design a User-Friendly Form": "https://blog.hubspot.com/marketing/form-ux",
                            "Forms Tutorial": "https://www.w3.org/WAI/tutorials/forms/",
                            "[GPFEDS] 1.6 - Strategy (Data Collection) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.10 - UX and UI (Input Format) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "GreenIT (French) 004 - Préférer la saisie assistée à l'autocomplétion": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_004_fr.md",
                            "How Web Content Accessibility Guidelines Improve Digital Products": "https://www.mightybytes.com/blog/web-content-accessibility-guidelines/",
                            "Reducing the impact of autocompletion": "https://greenspector.com/en/reducing-the-impact-of-autocompletion/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "Use input help instead of autocomplete": "http://www.ecometer.org/rules/use-input-help-instead-of-autocomplete.html"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Usability", "HTML", "Privacy"]
                },
                {
                    "id": "21",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#support-non-graphic-ways-to-interact-with-content",
                    "guideline": "Support Non-Graphic Ways To Interact With Content",
                    "description": "Certain visitors such as those with visual disabilities or speech agents (like Amazon Alexa) may rely on an experience without the graphical part of an interface. As such, they potentially may use less data or may have a different carbon impact on the Web.",
                    "criteria": [
                        {
                            "title": "Alternative Interactions",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX21-1)",
                            "description": "Support speech browsing and other non-graphical ways to interact with content that provide alternatives to a visual interface."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Aural (speech) browsers have no visual component, which reduces the environmental impact they suffer when browsing pages (as a screen is often one of the biggest drainers of a consumer's battery). Being able to look up information through such mechanisms through your product or service thereby will help reduce your overall emissions greatly.",
                            "Accessibility": "People who have accessibility needs and browse the Web using specialist equipment, hardware, or software will benefit from the assistance aids you have built into your product or service.",
                            "Conversion": "Increasing compatibility by supporting a wider range of device types, outside the most popular or well-known sort of hardware and software, will encourage new audiences to visit and potentially become customers."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "code {\r\n\tbackground-color: #292a2b;\r\n\tcolor: #e6e6e6;\r\n\tfont-family: monospace;\r\n\tspeak: literal-punctuation; \/* Reads all punctuation out loud in iOS VoiceOver *\/\r\n}",
                            "content": "[Let's Talk About Speech CSS](https://css-tricks.com/lets-talk-speech-css/)."
                        }
                    ],
                    "resources": [
                        {
                            "[GPFEDS] 2.5 - Specifications (Adaptive Design) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.7 - UX and UI (Media Choices) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 6-3042 - Interface Free Solutions": "https://gr491.isit-europe.org/en/crit.php?id=6-3042-uxui-an-interface-is-not-just-about-the",
                            "IBM Design For Sustainability (PDF)": "https://www.ibm.com/design/practices/design-for-sustainability/",
                            "Sustainable Web Design": "https://alistapart.com/article/sustainable-web-design/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Content", "UI", "Usability", "Compatibility", "HTML", "Performance", "Software"]
                },
                {
                    "id": "22",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#give-useful-notifications-to-improve-the-visitor-s-journey",
                    "guideline": "Provide Useful Notifications To Improve The Visitor's Journey",
                    "description": "Notifications whether through the browser or messaging can be potentially useful, but only used in moderation. Spam and the lack of control are contributing sources of Internet emissions and as such, businesses should aim to reduce such actions.",
                    "criteria": [
                        {
                            "title": "Notification Justification",
                            "testable": "Human Testable",
                            "description": "Remove non-essential notifications while justifying and reducing the practice of e-mailing or text messaging to what is strictly necessary. Useful notifications (such as alerts for new content) should be used with care and restraint."
                        },
                        {
                            "title": "Notification Control",
                            "testable": "Human Testable",
                            "description": "Let the visitor control notifications (for example through the browser, SMS, or by email) and adjust messaging preferences, and the option to unsubscribe, logout, and close an account should be available and visible."
                        },
                        {
                            "title": "Prompts And Responses",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX22-3)",
                            "description": "Clearly explain the result of a potential input through helpful prompts and messages that explain errors, next steps, and so on. This will help manage their expectations."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Notifications that can inform visitors about important events can help them avoid having to constantly refresh pages, as such they act as a shortcut to only loading information when the information becomes available, leading to emission savings.",
                            "Privacy": "If used appropriately, notifications can provide personalized content to specific devices, which reduces the risk of information exposure.",
                            "Accessibility": "Being able to signpost individuals to information through helpful notifications or error messages will have a beneficial effect of avoiding visitor abandonment. It's especially essential to ensure that all information is presented so that such critical information doesn't discriminate based on an individual's abilities, as you could exclude a massive part of your audience."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "<form>\r\n\t<label for=\"choose\">Would you prefer a banana or cherry? (required)<\/label>\r\n\t<input id=\"choose\" name=\"i-like\" required \/>\r\n\t<button>Submit<\/button>\r\n<\/form>",
                            "content": "[Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Forms/Form_validation)."
                        }
                    ],
                    "resources": [
                        {
                            "Biased By Design": "https://biasedbydesign.com/",
                            "Carbon Footprint of Email Spam Report (PDF)": "https://twosidesna.org/wp-content/uploads/sites/16/2018/05/McAfee_and_ICF_The_Carbon_Footprint_of_Email_Spam_Report_2009.pdf",
                            "Creating Error Messages": "https://uxdesign.cc/creating-error-messages-best-practice-in-ux-design-cda3be0f5e16",
                            "Designing Better Error Messages UX": "https://www.smashingmagazine.com/2022/08/error-messages-ux-design/",
                            "Error-Message Guidelines": "https://www.nngroup.com/articles/error-message-guidelines/",
                            "[GPFEDS] 4.13 - UX and UI (Notifications) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.6 - Front-End (Sensor Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 4-7046 - Notification Necessity": "https://gr491.isit-europe.org/en/crit.php?id=4-7046-backend-the-notification-methods-can-use-resource-consuming-technologies",
                            "[GR491] 5-3034 - E-mailing Necessity": "https://gr491.isit-europe.org/en/crit.php?id=5-3034-uxui-emailing--especially-when-the-emails-contain",
                            "[GR491] 9-3064 - Error Management": "https://gr491.isit-europe.org/en/crit.php?id=9-3064-uxui-actions-triggered-by-the-user-can-lead",
                            "GreenIT (French) 109 - Limiter les e-mails lourds et redondants": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_109_fr.md",
                            "GreenIT (French) 111 - Limiter la taille des e-mails envoyés": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_111_fr.md",
                            "How To Design Notifications For Better UX": "https://uxplanet.org/how-to-design-notifications-for-better-ux-6fb0711be54d",
                            "Humane By Design": "https://humanebydesign.com/principles",
                            "Privacy UX: Better Notifications And Permission Requests": "https://www.smashingmagazine.com/2019/04/privacy-better-notifications-ux-permission-requests/"
                        }
                    ],
                    "tags": ["UI", "Usability", "JavaScript", "Privacy"]
                },
                {
                    "id": "23",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#reduce-the-impact-of-downloadable-or-physical-documents",
                    "guideline": "Reduce the Impact of Downloadable or Physical Documents",
                    "description": "Printing or downloading documents can both be a net benefit and a net cost in terms of sustainability as it can reduce repeat requests to websites, but the act of printing (especially when unoptimized) wastes valuable ink and paper.",
                    "criteria": [
                        {
                            "title": "Printing Documents",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX23-1)",
                            "description": "If the production of paper documents is essential, it should be designed to limit its impact to the lowest possible. Create a CSS Print stylesheet and test it with different types of content. Ensure PDF printing is encouraged over paper-based storage."
                        },
                        {
                            "title": "Optimize Documents",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX23-2)",
                            "description": "Provide all downloadable documents in a state of being optimized, compressed, and in a variety of accessible file formats."
                        },
                        {
                            "title": "Optimize Delivery",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX23-3)",
                            "description": "If a document is likely to be re-used, generate the document once on the server-side (preferably on a cookie-free domain) rather than forcing the effort to be duplicated."
                        },
                        {
                            "title": "Labels And Choice",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX23-4)",
                            "description": "Clearly display the document name, a summary, the file size, and the format, allowing the visitor a choice if possible of both the format, and the language (if not the same as the web page). Furthermore, be sure to avoid embedding the document within Web pages (provide a direct link to download or view within the browser instead)."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Reducing the need to print documents or providing a printing StyleSheet will remove the emissions from wasted paper and ink.",
                            "Accessibility": "Providing a range of inclusively designed downloadable documents in a variety of formats which the visitor can choose between can benefit those with accessibility needs as they can choose the best fitting download for their device.",
                            "Performance": "Compressing or otherwise optimizing documents will allow them to be downloaded faster by the consumer, which helps visitors avoid having to wait to view uniquely formatted offline files."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Embeddable [Print CSS](https://printedcss.com/) Stylesheet Library."
                        }
                    ],
                    "resources": [
                        {
                            "A Guide To The State Of Print Stylesheets In 2018": "https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/",
                            "Changing Paper Consumption": "http://www.greenschools.net/article.php-id=75.html",
                            "Compress documents": "http://www.ecometer.org/rules/compress-documents.html",
                            "CSS Design: Going to Print": "https://alistapart.com/article/goingtoprint/",
                            "[GPFEDS] 4.11 - UX and UI (Inform Users) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 5-4052 - Downloadable Documents": "https://gr491.isit-europe.org/en/crit.php?id=5-4052-contents-the-documents-available-to-the-user-in",
                            "[GR491] 5-4053 - PDF Documents": "https://gr491.isit-europe.org/en/crit.php?id=5-4053-contents-large-documents-are-rarely-read-completely-by",
                            "[GR491] 6-3044 - Paper Printing": "https://gr491.isit-europe.org/en/crit.php?id=6-3044-uxui-the-flows-of-dematerialization-are-sometimes-broken",
                            "[GR491] 9-5076 - Ink Saving": "https://gr491.isit-europe.org/en/crit.php?id=9-5076-frontend-the-flows-of-dematerialization-are-sometimes-broken",
                            "GreenIT (French) 027 - Fournir une CSS print": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_027_fr.md",
                            "GreenIT (French) 107 - Compresser les documents": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_107_fr.md",
                            "GreenIT (French) 108 - Optimiser les PDF": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_108_fr.md",
                            "GreenIT (French) 4039 - Ne pas afficher les documents à l'intérieur des pages": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4039_fr.md",
                            "How to Become an Eco Web Designer": "https://onextrapixel.com/how-to-become-an-eco-web-designer/",
                            "OpQuast 142 - The format of the files available for download is indicated.": "https://checklists.opquast.com/en/web-quality-assurance/the-format-of-downloadable-files-is-displayed",
                            "OpQuast 143 - The size of the internal files available for downloading is indicated.": "https://checklists.opquast.com/en/web-quality-assurance/the-size-of-downloadable-files-is-displayed",
                            "OpQuast 144 - The language of downloadable files is mentioned when it differs from the original page.": "https://checklists.opquast.com/en/web-quality-assurance/the-language-of-downloadable-files-is-mentioned-when-it-is-different-to-the-original-page",
                            "OpQuast 190 - The website offers styles dedicated to printing.": "https://checklists.opquast.com/en/web-quality-assurance/the-site-provides-at-least-one-style-sheet-for-printing",
                            "OpQuast 191 - The content of each page can be printed without printing the navigation blocks.": "https://checklists.opquast.com/en/web-quality-assurance/the-content-of-each-page-can-be-printed-without-navigation-blocks",
                            "Optimize PDFs": "http://www.ecometer.org/rules/optimize-pdfs.html",
                            "UI Tools": "https://designsustainably.eu/uitools/",
                            "United Nations [SDGS] Goal 11 (Human Habitats)": "https://sdgs.un.org/goals/goal11#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "Using UX Design to Build a Sustainable Future": "https://uxmag.com/articles/using-ux-design-to-build-a-sustainable-future"
                        }
                    ],
                    "tags": ["Content", "UI", "Usability", "Compatibility", "Assets", "Performance", "Hardware", "Software", "E-Waste"]
                },
                {
                    "id": "24",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#create-a-stakeholder-focused-testing-prototyping-policy",
                    "guideline": "Create a Stakeholder-Focused Testing & Prototyping Policy",
                    "description": "The organization has policies and practices in place to incorporate stakeholder-focused testing and prototyping into its product development cycles.",
                    "criteria": [
                        {
                            "title": "New Features And Perspectives",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX24-1)",
                            "description": "The organization has outlined processes it uses to prototype and test new features, product ideas, and user-interface components when applicable with real users who represent various stakeholder perspectives, including people with slow connection, with disabilities, with difficulties using digital services, and so on."
                        },
                        {
                            "title": "Resourcing And Viability",
                            "testable": "Human Testable",
                            "description": "The organization has appropriately resourced these processes to support its long-term product viability."
                        },
                        {
                            "title": "Training And Onboarding",
                            "testable": "Human Testable",
                            "description": "The organization has training materials to onboard new product team members to these practices."
                        },
                        {
                            "title": "Testing And Validation",
                            "testable": "Human Testable",
                            "description": "The organization regularly conducts extensive testing and user interviews to validate whether the released features are meeting both business goals and visitor needs."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Potentially less energy use and reduced emissions as visitors complete tasks more quickly and efficiently.",
                            "Economic": "Organizational policies that prioritize user-research help to reduce and mitigate risks associated with building the wrong thing (incurring technical debt), which can increase costs. Additionally, iterative testing and prototyping will reduce the resources needed to build new features.",
                            "Conversion": "Reduced visitor frustration resulting from a well-researched and built interface will likely result in less visitor churn."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "A comprehensive usability testing [toolkit](https://www.userfocus.co.uk/articles/testplan.html)."
                        }
                    ],
                    "resources": [
                        {
                            "5 Common Low-Fidelity Prototypes and Their Best Practices": "https://www.interaction-design.org/literature/article/prototyping-learn-eight-common-methods-and-best-practices",
                            "A Complete Guide to Usability Testing": "https://www.uxmatters.com/mt/archives/2023/05/a-complete-guide-to-usability-testing.php",
                            "A Comprehensive Guide To User Testing": "https://www.smashingmagazine.com/2018/03/guide-user-testing/",
                            "A comprehensive list of UX design methods & deliverables": "https://uxdesign.cc/a-comprehensive-list-of-ux-design-methods-deliverables-2021-2feb3e70e168",
                            "[GPFEDS] 1.2 - Strategy (Target Users) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Learn Accessibility": "https://web.dev/learn/accessibility?hl=en",
                            "Little Book of Accessibility": "https://uxdesign.cc/the-little-book-of-accessibility-a9b59d82b412",
                            "Microsoft Inclusive Design": "https://inclusive.microsoft.design/",
                            "Product Management and the Build Trap": "https://www.mightybytes.com/blog/product-management-the-build-trap/",
                            "Prototyping User Experiences: Reducing the Risks of Product Innovation": "https://www.uxmatters.com/mt/archives/2020/04/prototyping-user-experiences-reducing-the-risks-of-product-innovation.php",
                            "Testing for accessibility": "https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility",
                            "The Beginner's Guide to Usability Testing": "https://blog.hubspot.com/marketing/usability-testing",
                            "The Performance Inequality Gap": "https://infrequently.org/series/performance-inequality/",
                            "The Ultimate Guide to Accessibility Testing": "https://info.usablenet.com/accessibility-testing",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "Usability Testing 101": "https://www.nngroup.com/articles/usability-testing-101/",
                            "Web Accessibility": "https://www.udacity.com/course/web-accessibility--ud891",
                            "Web Accessibility Checklist": "https://www.webaccessibilitychecklist.com/",
                            "Website Accessibility: 25 Statistics that Prove It Matters": "https://blog.hubspot.com/website/accessibility-statistics",
                            "Why does speed matter?": "https://web.dev/learn/performance/why-speed-matters?hl=en"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Ideation", "Research", "Education", "Usability", "Governance"]
                },
                {
                    "id": "25",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#conduct-regular-audits-regression-and-non-regression-tests",
                    "guideline": "Conduct Regular Audits, Regression, and Non-Regression Tests",
                    "description": "Products and services at any stage of a project can suffer bugs or issues that need to be resolved. Fixing these regressions also generates additional development and environmental costs. By resolving such issues, you can reduce the chances of a visitor giving up on a session and thereby reduce the amount of wasted energy your website emits overall.",
                    "criteria": [
                        {
                            "title": "Regular Issue Testing",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX25-1)",
                            "description": "The codebase has been checked for bugs, performance issues hav been identified, and accessibility or security problems have been accounted for at either monthly or quarterly timeframes (depending on your scheduling allowance)."
                        },
                        {
                            "title": "Non-Regression Tests",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX25-2)",
                            "description": "Non-regression tests are implemented for all important functionality."
                        },
                        {
                            "title": "Regression Tests",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX25-3)",
                            "description": "Regression testing has been incorporated into each release cycle to ensure that new features don't introduce bugs or otherwise conflict with existing software functionality."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Regular service audits reduce technical debt, which improves performance and environmental sustainability. Regression analysis also supports continuous improvement and lowers resource use over time, which also reduces emissions.",
                            "Security": "Regular auditing of a product or service will not only identify potential sources of breaches, but it will also identify areas of improvement both in security and privacy.",
                            "Accessibility": "Maintaining inclusivity over time through regular audits and testing reduces outages, improves access to information, and creates a better experience for all users, not just those with accessibility needs.",
                            "Economic": "Ongoing regression testing improves security, which reduces risk and its associated costs."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "It is important to automate measurements of page speed, time-to-first-byte, and page score to verify recent changes didn't increase these metrics. Automatic threshold alerts or anomalies on metrics help indicate regression. Identify target \"page weight budgets\" to help establish a baseline. Popular performance tools like Google Lighthouse can help too. Similarly, environmental metrics can be measured or assessed and evaluated against thresholds defined in a sustainability budget. Here is a [checklist](https://www.wordstream.com/blog/ws/2022/01/24/website-audit-checklist) for auditing a web design."
                        }
                    ],
                    "resources": [
                        {
                            "Access Guide": "https://www.accessguide.io/",
                            "Accessibility": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Accessibility",
                            "AWS WAF: SEC11-BP02 - Automate testing throughout the development and release lifecycle": "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/sec_appsec_automate_testing_throughout_lifecycle.html",
                            "Building a Greener Digital Future: Catchpoint Launches Carbon Control": "https://www.catchpoint.com/blog/building-a-greener-digital-future-catchpoint-launches-carbon-control",
                            "Front-End Performance Checklist 2021": "https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Hacksplaning": "https://www.hacksplaining.com/lessons",
                            "High Performance Browser Networking": "https://hpbn.co/",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "Learn Accessibility": "https://web.dev/learn/accessibility?hl=en",
                            "Learn Performance": "https://web.dev/learn/performance?hl=en",
                            "Measuring Web Performance in 2024: The Definitive Guide": "https://requestmetrics.com/web-performance/measure-web-performance/",
                            "OWASP Web Application Security Testing Checklist": "https://github.com/0xRadi/OWASP-Web-Checklist",
                            "Power profiling with the Firefox Profiler": "https://archive.fosdem.org/2023/schedule/event/energy_power_profiling_firefox/",
                            "Regression testing": "https://en.wikipedia.org/wiki/Regression_testing",
                            "Regression Testing: A Detailed Guide": "https://www.browserstack.com/guide/regression-testing",
                            "Software and Data Integrity Failures": "https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/",
                            "Software regression testing": "https://www.rainforestqa.com/blog/software-regression-testing",
                            "Test automation": "https://web.dev/explore/test-automation?hl=en",
                            "The Basics of Web Application Security": "https://martinfowler.com/articles/web-security-basics.html",
                            "The Simple and Complete Guide on Non-Regression Testing": "https://testgrid.io/blog/non-regression-testing/",
                            "Top 10 Web Application Security Risks": "https://owasp.org/www-project-top-ten/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "W3C Web Content Accessibility Guidelines": "https://www.w3.org/TR/WCAG22/",
                            "Web performance": "https://developer.mozilla.org/en-US/docs/Web/Performance",
                            "Web security": "https://developer.mozilla.org/en-US/docs/Web/Security",
                            "WebPageTest": "https://www.webpagetest.org/",
                            "Why does speed matter?": "https://web.dev/learn/performance/why-speed-matters?hl=en"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Research", "Usability", "Compatibility", "Performance", "Security", "Privacy", "Reporting", "KPIs"]
                },
                {
                    "id": "26",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#incorporate-performance-testing-into-each-major-release-cycle",
                    "guideline": "Incorporate Performance Testing Into Each Major Release-Cycle",
                    "description": "Try to ethically measure how efficient a visitor's experience is by analyzing the performance of the website or application and how it has been constructed, by doing so you might be able to reduce any issues they may have encountered previously, decrease loading times, and reduce the burden of loading unnecessary pages.",
                    "criteria": [
                        {
                            "title": "Performance Testing",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX26-1)",
                            "description": "The performance of a website or application, to identify and resolve bottlenecks or issues in the underlying code or infrastructure which could ultimately impact the sustainability of a website or application, are regularly measured with each release-cycle (using tooling or through research and auditing)."
                        },
                        {
                            "title": "Measurement And Compliance",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX26-2)",
                            "description": "Only data required to provide a streamlined and effective user-journey, put policies in place to ensure strict adherence, and comply with relevant accessibility policies and privacy laws, such as the General Data Protection Regulation (GDPR) are collected."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Alongside the device longevity which inherently comes with having a performant product or service, it can also help you meet the societal impacts of PPP targets.",
                            "Performance": "Faster pages that load less data improve performance, as there will be less for rendering engines within browsers to process. Additionally, as the pages are smaller, they will reach the visitor quicker based on their connection speed.",
                            "Economic": "Less data stored and transferred also reduces costs for those hosting content and those who own websites and applications.",
                            "Conversion": "Page load speed can measurably improve conversion rates, as visitors will be less likely to abandon a product or service if the content appears instantaneously."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<link rel=\"prefetch\" href=\"\/articles\/\" as=\"document\">",
                            "content": "[Prefetch resources to speed up future navigations](https://web.dev/articles/link-prefetch?hl=en)."
                        }
                    ],
                    "resources": [
                        {
                            "Addy Osmani's 18-Point Web Performance Checklist": "https://dev.to/ben/addy-osmanis-18-point-web-performance-checklist-2e1",
                            "Awesome Page Speed Metrics": "https://github.com/csabapalfi/awesome-pagespeed-metrics",
                            "Blazing Fast Websites with Speculation Rules": "https://www.debugbear.com/blog/speculation-rules",
                            "Browser Rendering Optimization": "https://www.udacity.com/course/browser-rendering-optimization--ud860",
                            "The Three Cs": "https://csswizardry.com/2023/10/the-three-c-concatenate-compress-cache/",
                            "Fast load times": "https://web.dev/explore/fast?hl=en",
                            "Front-End Performance Checklist 2021": "https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/",
                            "Getting started with Web Performance": "https://www.htmhell.dev/adventcalendar/2023/14/",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "High Performance Browser Networking": "https://hpbn.co/",
                            "How UX design can help tackle climate change": "https://www.cyber-duck.co.uk/insights/how-sustainable-design-can-help-climate-change",
                            "Is GDPR Good for the Environment?": "https://www.mightybytes.com/blog/is-gdpr-good-for-the-environment/",
                            "Learn Performance": "https://web.dev/learn/performance?hl=en",
                            "Measuring Web Performance in 2024: The Definitive Guide": "https://requestmetrics.com/web-performance/measure-web-performance/",
                            "Optimizing Performance Without Compromising Design": "https://unicornclub.dev/articles/2024-11-16-optimizing-performance-without-compromising-design-a-deep-dive/",
                            "PageSpeed Insights": "https://pagespeed.web.dev/",
                            "The Almost-Complete Guide to Cumulative Layout Shift": "https://jessbpeck.com/posts/completecls/",
                            "The Performance Inequality Gap": "https://infrequently.org/series/performance-inequality/",
                            "Psychology of Speed": "https://calibreapp.com/blog/perceived-performance",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "WebPageTest": "https://www.webpagetest.org/",
                            "What Are Core Web Vitals (CWVs) & How To Improve Them": "https://ahrefs.com/blog/core-web-vitals/",
                            "Why does speed matter?": "https://web.dev/learn/performance/why-speed-matters?hl=en",
                            "Why your website should be under 14kB in size": "https://endtimes.dev/why-your-website-should-be-under-14kb-in-size/"
                        }
                    ],
                    "tags": ["Accessibility", "Research", "Usability", "Performance", "Networking", "Strategy", "KPIs"]
                },
                {
                    "id": "27",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#incorporate-value-testing-into-each-major-release-cycle",
                    "guideline": "Incorporate Value Testing Into Each Major Release-Cycle",
                    "description": "Occasionally, you may find that features you have developed for a product or service have little to no active users or could be better implemented to bring better value. Undertaking research to identify redundancy allows you to optimize your codebase (and reduce emissions).",
                    "criteria": [
                        {
                            "title": "Usage Changes",
                            "testable": "Human Testable",
                            "description": "Visitor feedback, adoption, and churn rates are monitored of product or service features and their insights incorporated into future releases."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Feedback can help product teams make choices that improve a product or service's environmental impact, a clear example of this would be ensuring that frequently used features are more visible than lesser used features, thereby reducing the burden of findability. Which helps visitors spend less time attempting to achieve their goals.",
                            "Performance": "User-testing allows you to focus on your product goals, ensuring that you maintain a minimum viable product and not one overburdened with complexity. In doing so, your product or service will be lightweight and run quickly.",
                            "Economic": "If you can avoid wasting development time building features that bring little value to the consumer, your precious resources can be better spent where it will provide a better return.",
                            "Conversion": "Feedback often improves conversion rates because it ensures that your product or service reflects the needs of your audience."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Qualitative [usability testing](https://www.nngroup.com/articles/qual-usability-testing-study-guide/) will help authors gain critical feedback about in-use features."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.2.5 and 5.4.5 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 5-3030 - Feature Usage": "https://gr491.isit-europe.org/en/crit.php?id=5-3030-uxui-according-to-studies--70%25-of-the",
                            "[GR491] 9-3065 - User Feedback": "https://gr491.isit-europe.org/en/crit.php?id=9-3065-uxui-the-measurement-of-user-satisfaction-or-dissatisfaction",
                            "Society Centered Design": "https://societycentered.design/",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "UI Tools": "https://designsustainably.eu/uitools/"
                        }
                    ],
                    "tags": ["Research", "Usability", "Strategy", "KPIs"]
                },
                {
                    "id": "28",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#incorporate-usability-testing-into-each-minor-release-cycle",
                    "guideline": "Incorporate Usability Testing Into Each Minor Release-Cycle",
                    "description": "Researching a product or service and how it is used over time allows you to iterate and ensure the features and functionality being offered match how user-needs change over time. Doing so will help you reduce code redundancy further and reduce emissions through optimization.",
                    "criteria": [
                        {
                            "title": "Usability Testing",
                            "testable": "Human Testable",
                            "description": "Usability testing has been incorporated into product cycles and the impact of these tests is routinely measured for future releases."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "When visitors can quickly and easily accomplish tasks or access information, this reduces the energy they burn searching for answers.",
                            "Accessibility": "Visitor feedback from people with disabilities can inform key improvements within the product or service, which will ensure your website or application can be used by the widest possible audience."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Here is a great usability testing [starter kit](https://digital.gov/resources/digitalgov-user-experience-resources/digitalgov-user-experience-program-usability-starter-kit/) that includes templates."
                        }
                    ],
                    "resources": [
                        {
                            "A Comprehensive Guide To User Testing": "https://www.smashingmagazine.com/2018/03/guide-user-testing/",
                            "[AFNOR] Spec 5.4.6 and 5.4.7 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "GreenIT (French) 4014 - S'assurer que les parcours utilisateurs permettent de réaliser leur action prévue": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4014_fr.md",
                            "Inclusive Design Principles": "https://inclusivedesignprinciples.org/",
                            "Playbook for Universal Design": "https://universaldesignguide.com/",
                            "Research-Based Web Design and Usability Guidelines (PDF)": "https://web.archive.org/web/20130112215348/http://www.usability.gov/guidelines/guidelines_book.pdf",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "Usability testing": "https://en.wikipedia.org/wiki/Usability_testing",
                            "Usability Testing 101": "https://www.nngroup.com/articles/usability-testing-101/",
                            "UX: Best Practices For Developers": "https://blog.openreplay.com/ux-best-practices-for-developers/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Research", "Usability", "Strategy", "KPIs"]
                },
                {
                    "id": "29",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#incorporate-compatibility-testing-into-each-release-cycle",
                    "guideline": "Incorporate Compatibility Testing Into Each Release-Cycle",
                    "description": "Compatibility is a critical part of the sustainability mindset and should be prioritized through all products and services. If individuals wish to use older devices (or cannot upgrade due to cost) or do not wish to upgrade as frequently, it will reduce the amount of e-waste that enters the system. If something doesn't work, it's also likely to result in visitors suffering a wasted effort, potentially leading to refused access to your service (and thereby emitting further emissions).",
                    "criteria": [
                        {
                            "title": "Compatibility Policy",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX29-1)",
                            "description": "A compatibility policy with obsolete devices and software versions, listing the supported devices brands, operating systems, and browsers (including versions) has been established."
                        },
                        {
                            "title": "Maintaining Compatibility",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX29-2)",
                            "description": "Planned obsolescence in software updates is routinely avoided, striving to maintain compatibility for as long as possible and clearly communicating whether an update is evolutionary (large updates that can significantly reduce performance) or corrective (smaller updates that fix bugs or improve security)."
                        },
                        {
                            "title": "Frequent Testing",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX29-3)",
                            "description": "The product or service regularly tests with weak, unstable, and slow connections, old browsers, and devices older than five years to ensure compatibility."
                        },
                        {
                            "title": "Mobile Friendly",
                            "testable": "Human Testable",
                            "description": "Device-adaptable methods (such as responsive design) are utilized and interfaces are prototyped to ensure progressive enhancement, content prioritization, and improved accessibility."
                        },
                        {
                            "title": "Progressive Web Applications (PWAs)",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#UX29-5)",
                            "description": "A PWA has been either chosen or rejected based on whether it be more sustainable and compatible over a native mobile application."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Incompatible websites and applications across the Web encourage people to purchase new devices, which has a giant impact on the environment due to the amount of e-waste it produces. Additionally, planned obsolescence is one of the biggest contributors to e-waste on the planet. Extending the lifespan and improving digital device compatibility within your site's service plan, can improve sustainability and slow the upgrade cycle which results from sluggish digital experiences.",
                            "Social Equity": "More compatible products and services that last longer helps to reduce the digital divide, which can be a key issue in cases where income inequality, infrastructure robustness, and other factors play their part (and open your work to new markets). Similarly, because progressive web applications use established web standards, they are available to more people than more cost-prohibitive closed systems (Apple App Store, Google Play, etc).",
                            "Accessibility": "The fourth pillar of Accessibility is robustness. By incorporating accessibility into early prototypes, it becomes a priority for project teams throughout a product's lifecycle. Broken source code can also (in specific cases) impact assistive technologies (such as screen readers) and how they can read content to individuals with visual disabilities. Ensuring semantic code can provide an equal, error-free experience to all.",
                            "Performance": "Incompatible code has an energy cost, when it's non-standard, deprecated or doesn't work on a device it can take additional time to render as it is usually un-optimized for the environment, which will put pressure on the CPU and waste the consumer's battery. Using modern Web standards will help your website run fast in modern browsers.",
                            "Economic": "Product teams benefit from time savings and improved quality, organizations see cost reductions as less refactoring is required due to increased stability, and users benefit from greater trust and potentially lower product costs and maintenance fees as upgrades may not be required as frequently.",
                            "Conversion": "More compatible products and services that last longer can potentially increase conversion rates due to the lower rates of abandonment and a wider market audience that can use a barrier-free version of the product or service."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "Progressive Web Application [Builder](https://www.pwabuilder.com/)."
                        }
                    ],
                    "resources": [
                        {
                            "A Framework for Evaluating Browser Support": "https://www.joshwcomeau.com/css/browser-support/",
                            "A modern approach to browser support": "https://clearleft.com/thinking/a-modern-approach-to-browser-support",
                            "Assessing the Impact of Service Workers on the Energy Efficiency of Progressive Web Apps (PDF)": "https://www.ivanomalavolta.com/files/papers/Mobilesoft_2017.pdf",
                            "BCD Watch": "https://bcd-watch.igalia.com/",
                            "BrowserHacks": "http://browserhacks.com/",
                            "BrowserStack": "https://www.browserstack.com/live",
                            "Building a resilient frontend using progressive enhancement": "https://www.gov.uk/service-manual/technology/using-progressive-enhancement",
                            "Can I Stop?": "https://canistop.net/",
                            "Climate-friendly software: don't fight the wrong battle": "https://blog.ltgt.net/climate-friendly-software/",
                            "CSS Triggers": "https://css-triggers.com/",
                            "Ecoconception Presentation (French) (PDF)": "https://ecoresponsable.numerique.gouv.fr/docs/2021/formation-ecoconception-2021-12-16.pdf",
                            "Evaluating the Impact of Caching on the Energy Consumption and Performance of Progressive Web Apps (PDF)": "https://www.ivanomalavolta.com/files/papers/MOBILESoft_Caching_PWA_2020.pdf",
                            "Going Responsive": "https://goingresponsive.com/",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.1 - Specifications (Hardware Profiles) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.2 - Specifications (Older Device) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.3 - Specifications (Connection Issues) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.4 - Specifications (Older Software) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.5 - Specifications (Adaptive Design) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-3020 - Weak Connections": "https://gr491.isit-europe.org/en/crit.php?id=3-3020-uxui-development-and-testing-environments-are-often-efficient",
                            "[GR491] 3-3023 - Compatibility Policy": "https://gr491.isit-europe.org/en/crit.php?id=3-3023-uxui-technological-advances-are-increase-constantly--hardware",
                            "[GR491] 4-5028 - Compatibility Range": "https://gr491.isit-europe.org/en/crit.php?id=4-5028-frontend-user-equipment-is-increasingly-efficient.-when-digital",
                            "[GR491] 4-5031 - Older Equipment": "https://gr491.isit-europe.org/en/crit.php?id=4-5031-frontend-the-sector-of-activity-and-the-profile",
                            "GreenIT (French) 006 - Privilégier une approche mobile first, à défaut un chargement adaptatif": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_006_fr.md",
                            "GreenIT (French) 4009 - Assurer la compatibilité avec les plus anciens appareils et logiciels du parc": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4009_fr.md",
                            "GreenIT (French) 4019 - Préférer une PWA à une application mobile native similaire au site web": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4019_fr.md",
                            "How Far Back in Time Can I Take My Website's Design": "https://ajxs.me/blog/How_Far_Back_in_Time_Can_I_Take_My_Websites_Design.html",
                            "How to Become an Eco Web Designer": "https://onextrapixel.com/how-to-become-an-eco-web-designer/",
                            "How web bloat impacts users with slow devices": "https://danluu.com/slow-device/",
                            "Introducing Web Vitals": "https://blog.chromium.org/2020/05/introducing-web-vitals-essential-metrics.html",
                            "Investigating the correlation between performance scores and energy consumption of mobile web apps (PDF)": "https://www.ivanomalavolta.com/files/papers/EASE_2020.pdf",
                            "iOS 404": "https://ios404.com/",
                            "Learn Testing": "https://web.dev/learn/testing?hl=en",
                            "Mise à jour logicielle : il est urgent de légiférer (French)": "https://www.greenit.fr/2019/03/19/mise-a-jour-logicielle-il-est-urgent-de-legiferer/",
                            "Mobile First": "https://mobile-first.abookapart.com/",
                            "Mobile Web Best Practices": "https://www.w3.org/TR/mobile-bp/",
                            "Mobile-specific Best Practices": "https://github.com/cnumr/best-practices-mobile",
                            "Network Throttling in Chrome DevTools": "https://www.debugbear.com/blog/chrome-devtools-network-throttling",
                            "Progressive enhancement brings everyone in": "https://thehistoryoftheweb.com/the-inclusive-web-of-progressive-enhancement/",
                            "Quel design pour un navigateur low-tech? (French)": "https://graphism.fr/quel-design-pour-un-navigateur-low-tech/",
                            "Resilient web design": "https://resilientwebdesign.com/",
                            "Responsive design": "https://developer.mozilla.org/en-US/docs/Learn_web_development/CSS/CSS_layout/Responsive_Design",
                            "Responsive Design and Accessibility": "https://www.boia.org/blog/responsive-design-and-accessibility",
                            "Responsive Design Mode": "https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/",
                            "Responsive Web Design": "https://alistapart.com/article/responsive-web-design/",
                            "Responsive Web Design (Book)": "https://ethanmarcotte.com/books/responsive-web-design/",
                            "Responsive web design (Wiki)": "https://en.wikipedia.org/wiki/Responsive_web_design",
                            "Responsive web design basics": "https://web.dev/articles/responsive-web-design-basics?hl=en",
                            "Responsive Design: Patterns & Principles": "https://ethanmarcotte.com/books/responsive-design-patterns-and-principles/",
                            "Responsive Web Design: What It Is And How To Use It": "https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/",
                            "Runtime compatibility": "https://runtime-compat.unjs.io/",
                            "Slowfiles": "https://slowfil.es/",
                            "Software Maintenance Types: Corrective, Adaptive, Perfective, and Preventive": "https://hackernoon.com/what-do-you-need-to-know-about-software-maintenance-types-as-an-engineer-421335fl",
                            "Starbucks Ordering and Store Locator PWA": "https://commerce.nearform.com/work/starbucks-progressive-web-app/",
                            "Taking RWD To The Extreme": "https://www.smashingmagazine.com/2025/02/taking-rwd-to-the-extreme/",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "The State Of Mobile And Why Mobile Web Testing Matters": "https://www.smashingmagazine.com/2021/03/mobile-app-web-testing/",
                            "The state of the art in measurement-based experiments on the mobile web": "https://www.sciencedirect.com/science/article/pii/S095058492200091X",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "Using UX Design to Build a Sustainable Future": "https://uxmag.com/articles/using-ux-design-to-build-a-sustainable-future",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Web features explorer": "https://web-platform-dx.github.io/web-features-explorer/",
                            "Web Platform Status": "https://webstatus.dev/",
                            "Web Vitals": "https://web.dev/articles/vitals?hl=en",
                            "What is resilience?": "https://www.stockholmresilience.org/research/research-news/2015-02-19-what-is-resilience.html"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "UI", "Research", "Usability", "Compatibility", "Software", "Security", "Strategy", "KPIs"]
                }
            ]
        },
        {
            "id": "3",
            "name": "Web Development",
            "shortName": "Web Development",
            "guidelines": [
                {
                    "id": "1",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#identify-relevant-technical-indicators",
                    "guideline": "Identify Relevant Technical Indicators",
                    "description": "Performance is a key part of the sustainability mindset as reductions in loading times can have a considerable impact on energy loads within CPU, GPU, RAM, and hard drive caching (among other variables), as such ensuring a performant product is essential.",
                    "criteria": [
                        {
                            "title": "Performance Goals",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD01-1)",
                            "description": "Explicit goals that impact the environment and performance of the service, for example, HTTP requests, or the amount of DOM elements that need to be rendered are both set and met."
                        },
                        {
                            "title": "Accountancy Types",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD01-2)",
                            "description": "Because the payload being delivered may not always be equal in terms of energy intensity, operators of websites and applications must ensure that consideration is given for the energy intensity (or unit being evaluated) of each component. For example, non-rendering text is less computational than CSS, which in turn is less process-heavy than JavaScript, which is less resource-heavy than WebGL."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Limiting the number of server requests and the size of the DOM decreases a product or service's environmental impact by reducing CPU and GPU cycles, and RAM usage which benefits energy consumption, reducing the need to recharge devices as frequently.",
                            "Performance": "Reducing the hardware utilization as denoted above will also improve performance metrics, as a device will suffer less consumption and thrashing of limited resources.",
                            "Conversion": "Search engines consider web performance in their ranking data, as such a faster website may lead to a higher rank and potentially better conversion rates."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "A large list of ways to speed up your website within the front-end performance [checklist](https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/)."
                        }
                    ],
                    "resources": [
                        {
                            "15 page speed optimizations that sites ignore (at their own risk)": "https://www.speedcurve.com/blog/15-neglected-page-speed-optimizations/",
                            "Analysis of overconsumptions on a light website": "https://greenspector.com/en/analysis-of-overconsumptions-on-a-light-website-2/",
                            "Avoid An Excessive DOM Size For Better Web Performance": "https://www.debugbear.com/blog/excessive-dom-size",
                            "Boring Web Development": "https://meiert.com/en/blog/boring-web-development/",
                            "CPU Throttling In Chrome DevTools and Lighthouse": "https://www.debugbear.com/blog/cpu-throttling-in-chrome-devtools-and-lighthouse",
                            "Does not compute: Avoiding pitfalls assessing the Internet's energy and carbon impacts": "https://www.cell.com/joule/fulltext/S2542-4351(21)00211-7",
                            "Electronics Goes Green (PDF)": "https://online.electronicsgoesgreen.org/wp-content/uploads/2020/10/Proceedings_EGG2020_v2.pdf",
                            "Equations relating total annual energy consumption and chips energy efficiency": "https://www.researchgate.net/publication/371938289_Equations_relating_total_annual_energy_consumption_and_chips_energy_efficiency",
                            "Fast load times": "https://web.dev/explore/fast?hl=en",
                            "[GPFEDS] 1.1 - Strategy (Assessment & Impact) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 1.5 - Strategy (Impact Goals) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.9 - UX and UI (Server Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-7043 - Client / Server Requests": "https://gr491.isit-europe.org/en/crit.php?id=3-7043-backend-the-operations-carried-out-on-the-front",
                            "Graphics Card Power Consumption and Efficiency Tested": "https://www.tomshardware.com/features/graphics-card-power-consumption-tested",
                            "How Deep is Your DOM?": "https://frontendatscale.com/blog/how-deep-is-your-dom/",
                            "How Improving Website Performance Can Help Save The Planet": "https://www.smashingmagazine.com/2019/01/save-planet-improving-website-performance/",
                            "How Much Power Does Memory Use?": "https://www.crucial.com/support/articles-faq-memory/how-much-power-does-memory-use",
                            "Latency numbers every frontend developer should know": "https://vercel.com/blog/latency-numbers-every-web-developer-should-know",
                            "Mac Pro power consumption and thermal output (BTU/h) information": "https://support.apple.com/en-us/102839",
                            "Power Consumption of PC Components in Watts": "https://www.buildcomputers.net/power-consumption-of-pc-components.html",
                            "Platform Strategy and Its Discontents": "https://infrequently.org/2024/10/platforms-are-competitions/",
                            "Rethinking Allocation in High-Baseload Systems (PDF)": "https://research-information.bris.ac.uk/ws/portalfiles/portal/348324297/Schien_rethinking_allocation.pdf",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "UI Tools": "https://designsustainably.eu/uitools/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Why do reflows negatively affect performance?": "https://frontendmasters.com/blog/why-do-reflows-negatively-affect-performance/"
                        }
                    ],
                    "tags": ["Social Equity", "Research", "Performance", "Networking", "Strategy", "KPIs"]
                },
                {
                    "id": "2",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#minify-your-html-css-and-javascript",
                    "guideline": "Minify Your HTML, CSS, and JavaScript",
                    "description": "Whitespace holds no value when it's being presented to the visitor (unless they view the source code), by using minification, valuable data savings can be made which will reduce loading times.",
                    "criteria": [
                        {
                            "title": "Minify Code",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD02-1)",
                            "description": "All source code is minified upon compilation (including inline code)."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Performance": "Reduced loading times as a result of less data being transferred. Though this does not inherently have an ecological benefit as whitespace is ignored by rendering engines, it does help meet sustainability targets with visitor-based improvements in terms of loading times.",
                            "Conversion": "When a page loads quickly, visitors are less likely to abandon their journey or search for their information elsewhere."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "!function(e,t){\"use strict\";\"object\"==typeof module&&\"object\"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error(\"jQuery requires a window with a document\");return t(e)}:t(e)}(\"undefined\"!=typeof window?window:this,function(g,e){\"use strict\";var t=[],r=Object.getPrototypeOf,s=t.slice,v=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf",
                            "content": "[jQuery Slim](https://code.jquery.com/jquery-3.6.3.slim.min.js)."
                        }
                    ],
                    "resources": [
                        {
                            "Electricity Intensity of Internet Data Transmission": "https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630",
                            "Lighthouse: Minify JavaScript": "https://gtmetrix.com/minify-javascript.html",
                            "Minification": "https://developer.mozilla.org/en-US/docs/Glossary/Minification",
                            "Minification Benchmarks": "https://github.com/privatenumber/minification-benchmarks",
                            "Minify JavaScript And CSS Code For A Faster Website": "https://www.debugbear.com/blog/minify-javascript-css",
                            "Optimizing Encoding and Transfer Size of Text-Based Assets": "https://web.dev/articles/optimizing-content-efficiency-optimize-encoding-and-transfer?hl=en",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["HTML", "CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "3",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-code-splitting-within-projects",
                    "guideline": "Use Code-Splitting Within Projects",
                    "description": "When dealing with heavy components (such as JavaScript), the ability to modularize them into smaller pieces that can be loaded as and when required reduces the amount of redundancy and serves as a great way to make your scripts more sustainable.",
                    "criteria": [
                        {
                            "title": "Code Splitting",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD03-1)",
                            "description": "Breakdown bandwidth-heavy components into segments that can be loaded as required."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Performance": "Having smaller (modular) components allows for more optimized caching and loading only what code functions are required (which reduces the payload). Unused portions of a resource remain un-downloaded (potentially huge savings).",
                            "Economic": "Reducing the size of large files will result in lower bandwidth bills for service providers.",
                            "Conversion": "A faster website reduces the chance of abandonment (which is especially of concern for visitors of handheld devices)."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "link.addEventListener(\"click\", (e) => {\r\n\te.preventDefault();\r\n\timport(\"\/modules\/my-module.js\")\r\n\t.then((module) => {\r\n\t\t\/* Do something *\/\r\n\t})\r\n\t.catch((err) => {\r\n\t\tconsole.error(err.message);\r\n\t});});",
                            "content": "[Dynamic Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)."
                        }
                    ],
                    "resources": [
                        {
                            "Code splitting": "https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting",
                            "Electricity Intensity of Internet Data Transmission": "https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630",
                            "How code splitting increases performance": "https://blog.jakoblind.no/how-code-splitting-increases-performance/",
                            "JavaScript performance": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Performance/JavaScript",
                            "Mobile website Load Time Statistics": "https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/",
                            "You Might Not Need": "https://youmightnotneed.com/",
                            "You Might Not Need that Framework": "https://frontendmasters.com/blog/you-might-not-need-that-framework/"
                        }
                    ],
                    "tags": ["CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "4",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#apply-tree-shaking-to-code",
                    "guideline": "Apply Tree Shaking To Code",
                    "description": "Often when coding, projects can accumulate clutter and functions that are no longer used (due to newer, more effective features being developed). By utilizing tree shaking techniques, all the \"dead wood\" will be automatically dropped upon compilation, reducing a file's size.",
                    "criteria": [
                        {
                            "title": "Remove Redundancy",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD04-1)",
                            "description": "Identify and eliminate unused and dead code within CSS and JavaScript."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Removal of unused code eliminates wasted bytes from the rendering tree, which means less wasted download and potential processing time (which can be a battery-draining process).",
                            "Performance": "Unused code will not impact visitors, yet it takes up space in the cache, RAM, and takes extra time to download and render. Clearing wasted space frees' visitor resources.",
                            "Economic": "Unused code has a maintenance cost as it might affect other code, additionally, it's something else for developers to have to deal with unnecessarily."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "export function read(props) { return props.book }\r\nimport { read } from 'utilities';\r\neventHandler = (e) => { read({ book: e.target.value })}",
                            "content": "[Tree Shaking](https://www.patterns.dev/posts/tree-shaking)."
                        }
                    ],
                    "resources": [
                        {
                            "Browser Default Styles": "https://browserdefaultstyles.com/",
                            "Coverage: Find unused JavaScript and CSS": "https://developer.chrome.com/docs/devtools/coverage?hl=en",
                            "Front-End Performance 2021: Build Optimizations": "https://www.smashingmagazine.com/2021/01/front-end-performance-build-optimizations/",
                            "How large DOM sizes affect interactivity": "https://web.dev/articles/dom-size-and-interactivity?hl=en",
                            "How To Reduce Unused CSS And Speed Up Your Website": "https://www.debugbear.com/blog/reduce-unused-css",
                            "How To Reduce Unused JavaScript": "https://www.debugbear.com/blog/reduce-unused-javascript",
                            "Reduce JavaScript payloads with tree shaking": "https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking?hl=en",
                            "Remove unused CSS": "https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules?hl=en",
                            "The cost of not deleting code": "https://www.asystad.net/the-cost-of-not-deleting-code/",
                            "Tree shaking": "https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking",
                            "Tree-Shaking: A Reference Guide": "https://www.smashingmagazine.com/2021/05/tree-shaking-reference-guide/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Who Killed My Battery: Analyzing Mobile Browser Energy Consumption (PDF)": "https://mobisocial.stanford.edu/papers/boneh-www2012.pdf"
                        }
                    ],
                    "tags": ["CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "5",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#ensure-your-solutions-are-accessible",
                    "guideline": "Ensure Your Solutions Are Accessible",
                    "description": "Not everyone can access services equally, being sustainable is also about being accessible, fair, ethical, and ensuring that your product or service doesn't discriminate. As such, ensuring your website complies with best practices and relevant laws whilst meeting the needs of your visitors is critical as well as good business.",
                    "criteria": [
                        {
                            "title": "Accessibility Compliance",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD05-1)",
                            "description": "Your website or application must conform to WCAG (at the necessary level), plus extend beyond to obey relevant laws and meet additional visitor accessibility requirements. Building inclusively means that people with permanent, temporary, or situational disabilities will be able to more quickly find what they are looking for, and not have to spend extra time searching for a way to use your product or service."
                        },
                        {
                            "title": "Enhancing Accessibility",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD05-2)",
                            "description": "Enhance your website or application with Accessible Rich Internet Applications (ARIA) ONLY if applicable or necessary, and accessibility enhancing features when useful or beneficial."
                        },
                        {
                            "title": "Electronic Inequalities",
                            "testable": "Human Testable",
                            "description": "Deploy solutions that fight against electronic inequalities in products and services."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Inclusive websites are often more sustainable due to the effort put into improving code quality, user-experience, and limiting issues such as barriers to access that trigger waste in the service or product.",
                            "Social Equity": "There is a legal obligation to be accessible, and beyond this, turning away millions of potential visitors due to a lack of care is wasteful not only in time but also in digital and physical resources (e-waste).",
                            "Accessibility": "Adapting a digital product or service to be accessible by default will improve access to information for people with disabilities. This must be managed and maintained over time, as the sustainability benefits from reduced unnecessary friction add to the benefits of increasing your audience.",
                            "Performance": "An accessible website or application will typically be written using semantic, well-written code. While you may have more code to accommodate accessibility tooling (like ARIA), well-coded sites are usually less bloated, so they may have a performance edge that will reduce overall emissions.",
                            "Economic": "Improving the user-experience through accessibility can also improve financial performance by reducing costs (through lawsuits), building capacity, increasing sales or donations (with new audiences), and making better use of available resources.",
                            "Conversion": "Better-equipped experiences across devices and platforms signal to visitors that you are making a concentrated effort to meet their specific needs. This increases trust and can improve conversion rates."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<img src=\"\/image.jpg\" alt=\"Christmas cards all lined up on a shelf.\">",
                            "content": "[Resources on Alternative Text for Images](https://www.w3.org/WAI/alt/)."
                        }
                    ],
                    "resources": [
                        {
                            "A Designer's Guide to Documenting Accessibility & User Interactions": "https://stephaniewalter.design/blog/a-designers-guide-to-documenting-accessibility-user-interactions/",
                            "A Web Designer's Accessibility Advocacy Toolkit": "https://www.smashingmagazine.com/2024/02/web-designer-accessibility-advocacy-toolkit/",
                            "A11y Project Checklist": "https://www.a11yproject.com/checklist/",
                            "Access Guide": "https://www.accessguide.io/",
                            "Accessibility": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
                            "Accessibility and web performance are not features, they're the baseline": "https://css-tricks.com/accessibility-and-web-performance-are-not-features-theyre-the-baseline/",
                            "Accessibility Maturity Model": "https://www.w3.org/TR/maturity-model/",
                            "Accessibility Support": "https://a11ysupport.io/",
                            "Accessible Rich Internet Applications": "https://www.w3.org/TR/wai-aria-1.2/",
                            "ARIA, the good parts": "https://talks.hiddedevries.nl/hDiDOG/aria-the-good-parts",
                            "Bridging Web Accessibility and Sustainability for a Better Digital Future": "https://dodonut.com/blog/bridging-web-accessibility-and-sustainability/",
                            "Complete a VPAT": "https://www.deque.com/blog/understanding-vpat-and-acr/",
                            "Continuous Accessibility": "https://continuousaccessibility.com/",
                            "Creating an Accessibility Audit Report Template": "https://www.digitala11y.com/creating-an-accessibility-audit-template/",
                            "Disability and Health": "https://www.who.int/news-room/fact-sheets/detail/disability-and-health",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-3018 - Electronicism": "https://gr491.isit-europe.org/en/crit.php?id=3-3018-uxui-diminishing-inequalities-of-access-to-digital-service",
                            "[GR491] 3-3019 - The Digital Gap": "https://gr491.isit-europe.org/en/crit.php?id=3-3019-uxui-dealing-with-cases-of-digital-exclusion-is",
                            "How do we work out the environmental savings from accessibility?": "https://www.thegreenwebfoundation.org/events/fosdem/",
                            "How to Write an Accessibility Statement": "https://www.digitala11y.com/how-to-write-an-accessibility-statement/",
                            "How Web Content Accessibility Guidelines Improve Digital Products": "https://www.mightybytes.com/blog/web-content-accessibility-guidelines/",
                            "IBM Design For Sustainability (PDF)": "https://www.ibm.com/design/practices/design-for-sustainability/",
                            "Inclusive Design Principles": "https://inclusivedesignprinciples.org/",
                            "Internet access, sustainability, and citizen participation": "https://www.opendemocracy.net/en/internet-access-sustainability-and-citizen-participation-electricity-as-prerequisite/",
                            "Internet Speeds by Country 2023": "https://worldpopulationreview.com/country-rankings/internet-speeds-by-country",
                            "Introduction to Web Accessibility": "https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility",
                            "Learn Accessibility": "https://web.dev/learn/accessibility?hl=en",
                            "The Little Book of Accessibility": "https://uxdesign.cc/the-little-book-of-accessibility-a9b59d82b412",
                            "Making Content Usable for People with Cognitive and Learning Disabilities": "https://www.w3.org/TR/coga-usable/",
                            "Performance Is Accessibility": "https://hookedoncode.com/2020/07/performance-is-accessibility/",
                            "Principles Of Web Accessibility": "https://github.com/Heydon/principles-of-web-accessibility",
                            "The Performance Inequality Gap": "https://infrequently.org/series/performance-inequality/",
                            "This Is WCAG": "https://thisiswcag.com/",
                            "Understanding Accessibility": "https://www.understandingaccessibility.com/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators",
                            "W3C Web Content Accessibility Guidelines": "https://www.w3.org/TR/WCAG22/",
                            "Web Accessibility": "https://www.udacity.com/course/web-accessibility--ud891",
                            "What is the law on accessibility?": "https://info.webusability.co.uk/blog/what-is-the-law-on-accessibility",
                            "Who Can Use": "https://www.whocanuse.com/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Content", "UI", "Research", "Usability", "Compatibility", "Software", "KPIs"]
                },
                {
                    "id": "6",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#avoid-code-duplication",
                    "guideline": "Avoid Code Duplication",
                    "description": "Redundancy is the enemy of sustainability. Having systems in place to ensure that everyone can work from established patterns, the website or application remains clean and easy to use, and iteration over redesign is firmly in the mindset that will help promote sustainable practices. It's also worth being wary of abstracting code too early (see AHA methodology) or incorrectly, as while good abstractions can be more efficient, poor ones can waste effort and introduce complexity, bloat, and bugs to your codebase which can lead to emissions.",
                    "criteria": [
                        {
                            "title": "Remove Or Simplify",
                            "testable": "Human Testable",
                            "description": "Remove or simplify (through rewriting for performance) your code to focus on essential features and have a cleaner, less redundant product (and codebase)."
                        },
                        {
                            "title": "Iteration Over Recreation",
                            "testable": "Human Testable",
                            "description": "Improve (iterate) an existing creation rather than constantly redeveloping and redesigning products from scratch (duplication of coding effort) if possible to reduce visitor learning burden and developer impact."
                        },
                        {
                            "title": "Organize Code Arrangement",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD06-3)",
                            "description": "Within CSS and JavaScript, use methodologies (like BEM) and systems like DRY and WET to optimize the arrangement and output of your source code."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "While CSS methodologies increasingly add more code to your markup, they improve maintainability (reducing development time at scale), which can reduce energy usage.",
                            "Accessibility": "Developers with accessibility requirements may find the naming conventions used in CSS methodologies easier to work with than generic CSS selector identifiers.",
                            "Performance": "Avoiding repetitive code reduces waste in markup, which reduces the time sites take to download (and reduces server energy usage).",
                            "Economic": "An optimized codebase (that's reusable) can improve productivity and code quality."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": ".opinions_box {\r\n\tmargin: 0 0 8px 0;\r\n\ttext-align: center;\r\n\t&__view-more {\r\n\t\ttext-decoration: underline;\r\n\t}\r\n\t&__text-input {\r\n\t\tborder: 1px solid #ccc;\r\n\t}\r\n\t&--is-inactive {\r\n\t\tcolor: gray;\r\n\t}\r\n}",
                            "content": "[Block, Element, Modifier](https://getbem.com/)."
                        }
                    ],
                    "resources": [
                        {
                            "3 software development principles I wish I knew earlier in my career": "https://thetshaped.dev/p/3-software-development-principles",
                            "A Sustainable Design Handbook": "https://www.sustainabledesignhandbook.com/design-development",
                            "AHA Programming": "https://kentcdodds.com/blog/aha-programming",
                            "The Art of Clean Code": "https://dev.to/nozibul_islam_113b1d5334f/the-art-of-clean-code-a-practical-guide-to-writing-maintainable-javascript-1eb9",
                            "Becoming a Better Programmer: Improve Code by Removing It": "https://www.oreilly.com/library/view/becoming-a-better/9781491905562/ch04.html",
                            "Clean Code Essentials: YAGNI, KISS, DRY": "https://dev.to/juniourrau/clean-code-essentials-yagni-kiss-and-dry-in-software-engineering-4i3j",
                            "Clean Code Explained": "https://www.freecodecamp.org/news/clean-coding-for-beginners/",
                            "Produce clean and maintainable code": "https://www.ncsc.gov.uk/collection/developers-collection/principles/produce-clean-maintainable-code",
                            "DRY CSS: How to Use Declarations Just Once, Effectively": "https://meiert.com/en/blog/dry-css/",
                            "Organizing your CSS": "https://developer.mozilla.org/en-US/docs/Learn_web_development/CSS/Building_blocks/Organizing#css_methodologies",
                            "Stop Redesigning And Start Tuning Your website Instead": "https://www.smashingmagazine.com/2012/05/stop-redesigning-start-tuning-your-site/",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["Patterns", "CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "7",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#rigorously-assess-third-party-services",
                    "guideline": "Rigorously Assess Third-Party Services",
                    "description": "Whether advertising, chatbots, maps, or other tooling; outsourcing your service to a third-party provider may be potentially useful in certain scenarios in reducing design or development time and redundancy (which can be a win for sustainability). Third-party services, however, come with issues, such as the lack of control over emissions, and they often can potentially suffer from latency and large file sizes which may not exist if you self-hosted or created the material.",
                    "criteria": [
                        {
                            "title": "Assess Third-Parties",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD07-1)",
                            "description": "Third-party services (including plugins, widgets, feeds, maps, carousels, etc) have been assessed as early in the ideation or creation process as possible and as few of them are used as possible to reduce the product or service's overall ecological impact, including Scope 3 emissions."
                        },
                        {
                            "title": "Third-party Implementation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD07-2)",
                            "description": "Third-party content (including plugins, widgets, feeds, maps, carousels, etc) should be placed behind a click-to-load delay screen (using the \"import on interaction\" pattern), while alternatives to automated solutions such as chatbots should be offered."
                        },
                        {
                            "title": "Libraries And Frameworks",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD07-3)",
                            "description": "Large CSS libraries and JavaScript frameworks are only be used if a more performant alternative that achieves the same goal cannot be used instead."
                        },
                        {
                            "title": "Self-Hosting",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD07-4)",
                            "description": "Self-hosted content has been prioritized over embedded content from third-party services."
                        },
                        {
                            "title": "Avoiding Dependency",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD07-5)",
                            "description": "Your own clickable icons and widgets have been created, rather than relying on third-party services to host or allow embedding within your product or service."
                        },
                        {
                            "title": "Third-party Preferences",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD07-6)",
                            "description": "Third-party products, services, libraries, and frameworks are often a source of sustainability issues that cannot be controlled or managed by the first-party provider of a service. While many do provide benefits to a website, the need to justify their inclusion must be made not only by those creating the product or service but also be able to be controlled by the consumer. As showcased with cookies, websites or applications can provide a similar mechanism of disabling or refusing non-first-party features (with explanations of their purpose) - unless such features can be proven as critical for functionality."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Replacing heavy tooling and third-party services with lightweight tooling reduces visitor bandwidth usage considerably, despite having to learn a new way of doing things or reducing the visibility of such information. It can significantly reduce a page's (and data you have no control over) environmental impact, especially when it comes to Scope 3 emissions.",
                            "Privacy": "Visitors not interested in embedded content may identify the lack of third-party tracking (such as embedded pixels and tags) as a privacy benefit, as there are fewer chances that visitor data is exploited.",
                            "Performance": "Self-made widgets and controls work much faster than third-party content as you don't have to perform additional server requests, rendering requests, and such. You only include what features you require, and this reduces the overall size of the bandwidth usage (and emissions produced)."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "<iframe src=\"https:\/\/example.com\" loading=\"lazy\" width=\"600\" height=\"400\"><\/iframe>",
                            "content": "[It's time to lazy-load offscreen iframes](https://web.dev/articles/iframe-lazy-loading?hl=en)."
                        }
                    ],
                    "resources": [
                        {
                            "AdGreen": "https://www.weareadgreen.org/",
                            "An empirical study on the performance and energy costs of ads and analytics in mobile web apps": "https://www.sciencedirect.com/science/article/pii/S0950584923002252",
                            "Building for sustainability with WordPress": "https://sustywp.com/",
                            "Cookies, Pixels, and Tags": "https://www.osano.com/articles/privacy-cookies-pixels-and-tags",
                            "Effectively loading ads without impacting page speed": "https://web.dev/articles/loading-ads-page-speed?hl=en",
                            "Electricity Intensity of Internet Data Transmission": "https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630",
                            "Environmental impact assessment of online advertising": "https://www.sciencedirect.com/science/article/pii/S0195925517303505",
                            "Fast Load Times: Optimize your third-party resources": "https://web.dev/explore/fast?hl=en#optimize-your-third-party-resources",
                            "Front-End Performance 2021: Defining The Environment": "https://www.smashingmagazine.com/2021/01/front-end-performance-defining-the-environment/",
                            "[GPFEDS] 2.9 - Specifications (Off-The-Shelf Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.10 - Specifications (Third-Party Services) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.4 - UX and UI (Third-Party Enablement) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.7 - Front-End (Server Host) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.3 - Back-End (Background Processing) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 5-3036 - Necessary Analytics": "https://gr491.isit-europe.org/en/crit.php?id=5-3036-uxui-the-analytics-data-collect-is-installed-in",
                            "[GR491] 6-3045 - Third-party Solutions": "https://gr491.isit-europe.org/en/crit.php?id=6-3045-uxui-third-party-solutions-may-provide-value-to",
                            "GreenIT (French) 019 - Remplacer les boutons officiels de partage des réseaux sociaux": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_019_fr.md",
                            "GreenIT (French) 4030 - Limiter le recours aux carrousels": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4030_fr.md",
                            "How ad platforms like Facebook, Google, and others drive climate change": "https://asemakula.medium.com/how-ad-platforms-like-facebook-google-and-others-sneakily-drive-climate-change-152194836e81",
                            "How efficient code increases sustainability in the enterprise": "https://venturebeat.com/programming-development/how-efficient-code-increases-sustainability-in-the-enterprise/",
                            "How large DOM sizes affect interactivity": "https://web.dev/articles/dom-size-and-interactivity?hl=en",
                            "How tracking pixels work": "https://jvns.ca/blog/how-tracking-pixels-work/",
                            "JavaScript performance": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Performance/JavaScript",
                            "Lighthouse: Lazy load third-party resources with facades": "https://gtmetrix.com/lazy-load-third-party-resources-with-facades.html",
                            "Make Better Ads (PDF)": "https://assets.ctfassets.net/ozc5on9ss4ee/1CY4ycGNINwaVU1efbjN9B/c4077a6d5fdac802838ff1d19be21b51/WeTransfer_Advertising_-_Make_better_ads_whitepaper_-_2023.pdf",
                            "MicroJS": "http://microjs.com/",
                            "Measuring energy consumption of cross-platform frameworks for mobile applications (PDF)": "https://www.math.unipd.it/~gaggi/doc/webistext15.pdf",
                            "Plain Vanilla": "https://plainvanillaweb.com/",
                            "Reckoning": "https://infrequently.org/2024/08/",
                            "Reduce the weight of a web page: which elements have the greatest impact?": "https://greenspector.com/en/reduce-the-weight-of-a-web-page-which-elements-have-the-greatest-impact/",
                            "Reducing The Web's Carbon Footprint: Optimizing Social Media Embeds": "https://www.smashingmagazine.com/2022/02/reducing-web-carbon-footprint-optimizing-social-media-embeds/",
                            "Scope 3 Emissions in Your Digital Supply Chain": "https://www.mightybytes.com/blog/scope-3-emissions-in-your-digital-supply-chain/",
                            "Simple Icons": "https://simpleicons.org/",
                            "Speed up your Wordpress by loading 3rd party scripts on interaction": "https://medium.com/nerd-for-tech/speed-up-your-wordpress-by-loading-3rd-party-scripts-on-interaction-1abd146e87f",
                            "Sustainable Web Design": "https://alistapart.com/article/sustainable-web-design/",
                            "The Cost of Javascript Frameworks": "https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/",
                            "The User Experience of Chatbots": "https://www.nngroup.com/articles/chatbots/",
                            "Tracking pixel security": "https://jscrambler.com/blog/tracking-pixel-security",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "Use as few plugins as possible": "http://www.ecometer.org/rules/limit-plugins.html",
                            "Web Video Text Tracks Format": "https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API",
                            "What could the sustainability initiative do for WordPress?": "https://oursustainablewp.org/",
                            "What is a tracking pixel, and how does it work?": "https://nordvpn.com/blog/what-is-a-tracking-pixel/",
                            "You don't need JavaScript for that": "https://www.htmhell.dev/adventcalendar/2023/2/",
                            "You Might Not Need": "https://youmightnotneed.com/",
                            "You Might Not Need that Framework": "https://frontendmasters.com/blog/you-might-not-need-that-framework/"
                        }
                    ],
                    "tags": ["UI", "Usability", "JavaScript", "Performance", "Software", "Security", "Privacy"]
                },
                {
                    "id": "8",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#optimize-use-of-html-elements",
                    "guideline": "Optimize Use of HTML Elements",
                    "description": "HTML semantics are important. They don't just play a key role in making the Web look the way it does, they have a function in accessibility, SEO, and even in sustainability. Ensuring that you markup your content correctly and avoid cluttering your markup wastefully will reduce emissions.",
                    "criteria": [
                        {
                            "title": "Semantic Code",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD08-1)",
                            "description": "Content must be accurately marked up according to the relevant standard(s)."
                        },
                        {
                            "title": "Optional Features",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD08-2)",
                            "description": "Remove optional HTML tags, attribute quotes, and default attributes only when they do not negatively impact functionality, accessibility, or readability. Retain them when they enhance accessibility, maintain clarity (without compromising on performance), or ensure consistent browser rendering."
                        },
                        {
                            "title": "Avoid Non-standard Code",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD08-3)",
                            "description": "Avoid using non-standard elements or attributes."
                        },
                        {
                            "title": "Custom Code",
                            "testable": "Human Testable",
                            "description": "Prefer using standard HTML elements and attributes. Only use custom elements or Web Components if you cannot utilize native HTML elements or if you need tightly regulated control over the implementation of design system components.."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Sites with bloated markup waste data, also sites with broken markup could trigger memory leaks (performance issues) in apps, and following standards ensures sites will work the same across devices and platforms (reducing bugs, developer fix time, and resource waste).",
                            "Accessibility": "Semantic HTML is a great stepping stone towards making your content easier to navigate by assistive technologies. Many tags within HTML5 come with pre-loaded context about what is expected within them (reducing the need for ARIA or other descriptive features). This can also help browsers, search engines, social networks, and other \"blind\" technologies understand your websites or applications better. This can help you reduce barriers in terms of content navigability.",
                            "Performance": "Deprecated code isn't optimized within rendering engines, and while Web components do outperform framework components, they won't beat the native HTML elements they build upon.",
                            "Economic": "Inaccessible sites can lead to lawsuits, avoiding these is beneficial to any website owner.",
                            "Conversion": "Poorly coded sites may break features for visitors, leading to website abandonment."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<header><\/header>\r\n<section>\r\n<article>\r\n\t<figure>\r\n\t\t<img>\r\n\t\t<figcaption><\/figcaption>\r\n\t<\/figure>\r\n<\/article>\r\n<\/section>\r\n<footer><\/footer>",
                            "content": "[Semantic HTML5 Elements Explained](https://www.freecodecamp.org/news/semantic-html5-elements/)."
                        }
                    ],
                    "resources": [
                        {
                            "0.5% of the Global Top 200 Websites Use Valid HTML": "https://meiert.com/en/blog/html-conformance-2024/",
                            "A Node and Command Line Tool to Find Obsolete HTML": "https://meiert.com/en/blog/find-obsolete-html/",
                            "Almost, but not quite, entirely unlike": "https://www.htmhell.dev/adventcalendar/2024/7/",
                            "Deprecated HTML elements (and what to use instead)": "https://blog.logrocket.com/deprecated-html-elements-and-what-to-use-instead/",
                            "Every HTML Element": "https://iamwillwang.com/every-html-element/",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.9 - Specifications (Off-The-Shelf Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.5 - UX and UI (Native Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-4006 - Information Over Presentation": "https://gr491.isit-europe.org/en/crit.php?id=1-4006-contents-automatons-and-accessibility-assistants-use-tags-to",
                            "HTML: A good basis for accessibility": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Accessibility/HTML",
                            "HTML First": "https://html-first.com/",
                            "HTML5 For Web Designers": "https://html5forwebdesigners.com/",
                            "Jumping HTML tags. Another reason to validate your markup": "https://pepelsbey.dev/articles/jumping-html-tags/",
                            "Optional HTML: Everything You Need to Know": "https://meiert.com/en/blog/optional-html/",
                            "Page bloat update": "https://www.speedcurve.com/blog/page-bloat-2025/",
                            "Plain Vanilla": "https://plainvanillaweb.com/",
                            "Reducing Carbon Emissions On The Web": "https://www.smashingmagazine.com/2021/09/reducing-carbon-emissions-on-web/#using-standard-elements",
                            "Semantic HTML": "https://web.dev/learn/html/semantic-html?hl=en",
                            "Semantic HTML: the foundation of web accessibility": "https://uxdesign.cc/semantic-html-the-foundation-of-web-accessibility-e5bbecad7c17",
                            "Stop Closing Void Elements": "https://meiert.com/en/blog/stop-closing-void-elements/",
                            "Ten years of page bloat: What have we learned?": "https://www.speedcurve.com/blog/ten-years-page-bloat/",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "The history of deprecated and changed HTML tags": "https://msandrini.medium.com/the-history-of-deprecated-and-changed-html-tags-47cdfd2c427e",
                            "Understanding why Semantic HTML is important, as told by TypeScript": "https://medium.com/@mandy.michael/understanding-why-semantic-html-is-important-as-told-by-typescript-bd71ad41e6c4",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "W3C Validator": "https://validator.w3.org/",
                            "Web Accessibility Lawsuits": "https://www.levelaccess.com/blog/web-accessibility-lawsuits-2022-recap-and-what-to-expect-in-2023/",
                            "Web Components Basics and Performance Benefits": "https://medium.com/@spkamboj/web-components-basics-and-performance-benefits-f7537c908075",
                            "Web components vs. React": "https://blog.logrocket.com/web-components-vs-react/",
                            "Web Standards: The What, The Why, And The How": "https://www.smashingmagazine.com/2019/01/web-standards-guide/",
                            "What is page bloat?": "https://www.speedcurve.com/blog/page-bloat-web-performance/",
                            "Where Has All the Valid HTML Gone": "https://meiert.com/en/blog/where-has-all-the-valid-html-gone/",
                            "Why Do Some HTML Elements Become Deprecated?": "https://css-tricks.com/why-do-some-html-elements-become-deprecated/",
                            "Why Web Components?": "https://fast.design/docs/resources/why-web-components/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Content", "Usability", "Compatibility", "HTML"]
                },
                {
                    "id": "9",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#resolve-render-blocking-content",
                    "guideline": "Resolve Render Blocking Content",
                    "description": "The ability to work around render-blocking issues is a great addition to the web. From deferring code, to lazy loading, to asynchronous loading, each has its use case and each can have the potential to reduce or give performance benefits to a website or application.",
                    "criteria": [
                        {
                            "title": "Asynchronous Code",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD09-1)",
                            "description": "All external assets have been deferred or set to async (unless required) to avoid Flash Of Unstyled Content (FOUC)."
                        },
                        {
                            "title": "Priority Loading",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD09-2)",
                            "description": "If external resources are required on load, their priorities (delivery route) are set correctly."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Lazy loading videos and images ensures that they are only requested once the visitor needs them (not demanded even if they aren't viewed). This saves processing power which can help older devices or those with less battery capacity access your websites and applications barrier-free.",
                            "Performance": "Letting text render first makes your website feel like it's loading faster (as the remainder will appear in the background or on demand).",
                            "Economic": "Unused content will not contribute to your server's bandwidth bills."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<img src=\"image.png\" loading=\"lazy\" alt=\"\u2026\" width=\"200\" height=\"200\">",
                            "content": "[Browser-level image lazy loading for the web](https://web.dev/articles/browser-level-image-lazy-loading?hl=en)."
                        }
                    ],
                    "resources": [
                        {
                            "CSS performance optimization": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Performance/CSS",
                            "Electricity Intensity of Internet Data Transmission": "https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630",
                            "Fast Load Times: Lazy-load images and video": "https://web.dev/explore/fast?hl=en#lazy-load-images-and-video",
                            "Fast Load Times: Optimize your resource delivery": "https://web.dev/explore/fast?hl=en#optimize-your-resource-delivery",
                            "Flash of unstyled content": "https://en.wikipedia.org/wiki/Flash_of_unstyled_content",
                            "Front-End Performance 2021: Delivery Optimizations": "https://www.smashingmagazine.com/2021/01/front-end-performance-delivery-optimizations/",
                            "Get All That Network Activity Under Control with Priority Hints": "https://macarthur.me/posts/priority-hints/",
                            "Islands Architecture": "https://www.patterns.dev/vanilla/islands-architecture",
                            "Lazy loading": "https://en.wikipedia.org/wiki/Lazy_loading",
                            "Lazy loading (Performance)": "https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading",
                            "On the Impact of the Critical CSS Technique on the Performance and Energy Consumption of Mobile Browsers (PDF)": "https://www.ivanomalavolta.com/files/papers/EASE_2022_critical_css.pdf",
                            "Optimizing The Critical Rendering Path": "https://www.debugbear.com/blog/optimizing-the-critical-rendering-path",
                            "Tight Mode: Why Browsers Produce Different Performance Results": "https://www.smashingmagazine.com/2025/01/tight-mode-why-browsers-produce-different-performance-results/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Web performance resources": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Performance/Web_Performance_Basics"
                        }
                    ],
                    "tags": ["Assets", "CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "10",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#provide-code-based-way-finding-mechanisms",
                    "guideline": "Provide Code-Based Way-Finding Mechanisms",
                    "description": "Helping visitors avoid wasting their time can reduce the number of emissions from time spent in front of a screen. As such, by using existing technologies like metadata, robots files, and accessibility-friendly aids within the page, improvements to the experience can be made.",
                    "criteria": [
                        {
                            "title": "Metadata And Microdata",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD10-1)",
                            "description": "Metadata and microdata for search engines and social media have been optimized."
                        },
                        {
                            "title": "Search Engines",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD10-2)",
                            "description": "Search engines are not obstructed, while ill-intentioned robots and scripts are blocked."
                        },
                        {
                            "title": "Accessibility Aids",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD10-3)",
                            "description": "Accessibility and usability aids are provided to find content, such as skip links and signposts."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "People spend a lot of time searching for the information they want, and helping them get there quicker will reduce the drain on their device battery.",
                            "Social Equity": "Paradoxically as it may seem, the concept of getting people to spend more time on your website is not often beneficial. Visitors often want to accomplish a task and move on, yet we put great effort into keeping them on-site (time-wasting). This is a dark pattern that has consequences for sustainability (consumption of resources) and potentially the visitor's health and well-being.",
                            "Accessibility": "Skip links and other aids can accelerate a visitor's journey through your website, reducing the system resources their tooling requires, and assist them in finding the content they need.",
                            "Performance": "Finding information quickly is a perceived performance. It may not physically reduce the data transferred, but it will help reduce the steps required to achieve a goal; thus, the time on-screen is lessened.",
                            "Economic": "Quick visits may encourage repeat custom when the visitor has limited spare time.",
                            "Conversion": "A well-mapped website will index properly in search engines, leading to a good page rank."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<urlset xmlns=\"http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9\">\r\n\t<url>\r\n\t\t<loc>https:\/\/www.example.com\/foo.html<\/loc>\r\n\t\t<lastmod>2022-06-04<\/lastmod>\r\n\t<\/url>\r\n<\/urlset>",
                            "content": "[Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en)."
                        }
                    ],
                    "resources": [
                        {
                            "A simple guide to HTML head elements": "https://github.com/joshbuchea/HEAD",
                            "About /robots.txt": "https://www.robotstxt.org/robotstxt.html",
                            "An Extended Standard for Robot Exclusion": "https://www.conman.org/people/spc/robots2.html",
                            "Customer Experience Mapping": "https://www.startupgrind.com/blog/customer-experience-mapping-what-is-it-and-how-to-do-it/",
                            "Distribution of bot and human web traffic worldwide from 2014 to 2021": "https://www.statista.com/statistics/1264226/human-and-bot-web-traffic-share/",
                            "How Google interprets the robots.txt specification": "https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt?hl=en",
                            "How to Use Keywords for SEO and Web Sustainability": "https://www.mightybytes.com/blog/keyword-optimization-seo-sustainability/",
                            "Learn about sitemaps": "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=en",
                            "Ledger of Harms": "https://ledger.humanetech.com/",
                            "MetaExtensions": "https://wiki.whatwg.org/wiki/MetaExtensions",
                            "Perceived performance": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Performance/Perceived_performance",
                            "Research Shows that Searching for Information at Work Wastes Time and Money": "https://www.articlecube.com/research-shows-searching-information-work-wastes-time-and-money",
                            "Sitemaps Protocol": "https://www.sitemaps.org/protocol.html",
                            "Skip Navigation Links": "https://webaim.org/techniques/skipnav/",
                            "Structured Data": "https://schema.org/",
                            "The Benefits of Tree Testing Your Navigation": "https://www.mightybytes.com/blog/things-you-learn-tree-testing-navigation/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "What is a Customer Journey Map?": "https://www.mightybytes.com/blog/customer-journey-map-template-download/"
                        }
                    ],
                    "tags": ["Accessibility", "UI", "Usability", "HTML", "Marketing"]
                },
                {
                    "id": "11",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#validate-form-errors-and-external-input",
                    "guideline": "Validate Form Errors and External Input",
                    "description": "Entering information on a page can lead to problems. If a visitor makes a mistake along the way, it makes good sense to have systems in place to guide them through resolving the typos, confusion, and glitches that can occur which lead to abandonment and extra emissions through wasted device usage.",
                    "criteria": [
                        {
                            "title": "Error Validation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD11-1)",
                            "description": "Errors are identified through live validation as well as upon submission."
                        },
                        {
                            "title": "Label Elements",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD11-2)",
                            "description": "Required elements are clearly identified and labeled (for the benefit of voice tools such as screen readers and virtual assistants), and optional elements (if unnecessary) removed."
                        },
                        {
                            "title": "Allow Paste",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD11-3)",
                            "description": "Always allow the pasting of content (including passwords) from external sources."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Security": "Allowing people to correct mistakes (and identifying errors early in the input process) on forms before submission can avoid costly mistakes during financial transactions and spend less time being wasted on tasks.",
                            "Performance": "Being able to fill in a form while addressing issues quickly reduces the barrier to entry and thereby avoids potentially having to refill a form or waste time going back and scrolling.",
                            "Economic": "Shopping cart abandonment happens when errors occur, fixing issues upfront can reduce such potential issues."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<label for=\"username\">Username: (3-16 characters)<\/label>\r\n<input name=\"username\" type=\"text\" value=\"Sasha\" pattern=\"\\w{3,16}\" required>\r\n<label for=\"pin\">PIN: (4 digits)<\/label>\r\n<input name=\"pin\" type=\"password\" pattern=\"\\d{4,4}\" required>",
                            "content": "[HTML attribute: pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)."
                        }
                    ],
                    "resources": [
                        {
                            "48 Cart Abandonment Rate Statistics 2023": "https://baymard.com/lists/cart-abandonment-rate",
                            "Client-side form validation": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Forms/Form_validation",
                            "Data Validation": "https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/",
                            "Designing for forgiveness": "https://uxdesign.cc/designing-for-forgiveness-how-to-create-error-tolerant-interfaces-af9146c8072b",
                            "[GPFEDS] 4.10 - UX and UI (Input Format) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How GDPR Will Change The Way You Develop": "https://www.smashingmagazine.com/2018/02/gdpr-for-web-developers/",
                            "HTML attribute: required": "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required",
                            "Let them paste passwords": "https://www.ncsc.gov.uk/blog-post/let-them-paste-passwords",
                            "The \"Cobra Effect\" that is disabling paste on password fields": "https://www.troyhunt.com/the-cobra-effect-that-is-disabling/",
                            "The Label element": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "WCAG 2.2 Understanding Docs: Error Identification": "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html",
                            "Validating Input": "https://www.w3.org/WAI/tutorials/forms/validation/",
                            "Web Form Validation: Best Practices and Tutorials": "https://www.smashingmagazine.com/2009/07/web-form-validation-best-practices-and-tutorials/"
                        }
                    ],
                    "tags": ["Accessibility", "UI", "Usability", "Compatibility", "HTML", "Security"]
                },
                {
                    "id": "12",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-metadata-correctly",
                    "guideline": "Use Metadata Correctly",
                    "description": "Search engines and social networks make use of the content within a website, by ensuring that your metadata is correctly marked up, you can reduce emissions by improving way-finding.",
                    "criteria": [
                        {
                            "title": "Required Elements",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD12-1)",
                            "description": "Include the required title element, plus any optional HTML head elements (such as link)."
                        },
                        {
                            "title": "Meta Tags",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD12-2)",
                            "description": "Include necessary meta tag references that search engines and social networks recognize, using a recognized name scheme such as Dublin Core Metadata Initiative (DCMI), Friend Of A Friend (FOAF), or RDFa."
                        },
                        {
                            "title": "Structured Data",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD12-3)",
                            "description": "Embed Microdata, Structured Data (Schema), or Microformats within your pages."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Adding rich metadata allows your website to be indexed correctly within search engines and social networks, allowing visitors to find content from your website or product quicker (often without even requiring a visit), saving clicks and energy.",
                            "Transparency": "Used correctly, metadata can ensure clients find the correct site, and if they are just after contact details, potentially do not have to even visit the page (wasting bandwidth).",
                            "Performance": "Visitors spend less time jumping through pages, as they will likely land on the page they wish to browse through searching (if they came via a third-party tool).",
                            "Economic": "Increased awareness within a search engine or social network may lead to more visitors or customers.",
                            "Conversion": "Recognized microdata usage can lead to a better search engine position."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<html>\r\n\t<head>\r\n\t\t<title>Example: A website about Examples<\/title>\r\n\t\t<script type=\"application\/ld+json\">\r\n\t\t{\r\n\t\t\t\"@context\" : \"https:\/\/schema.org\",\r\n\t\t\t\"@type\" : \"WebSite\",\r\n\t\t\t\"name\" : \"Example\",\r\n\t\t\t\"url\" : \"https:\/\/example.com\/\"\r\n\t\t}\r\n\t<\/script>\r\n\t<\/head>\r\n\t<body>\r\n\t<\/body>\r\n<\/html>",
                            "content": "[Provide a website name to Google Search](https://developers.google.com/search/docs/appearance/site-names?hl=en)."
                        }
                    ],
                    "resources": [
                        {
                            "A simple guide to HTML head elements": "https://github.com/joshbuchea/HEAD",
                            "DCMI Metadata Terms": "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
                            "Friend Of A Friend": "http://xmlns.com/foaf/spec/",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How to get a Knowledge Panel for your brand, even without Wikipedia": "https://searchengineland.com/how-to-get-a-knowledge-panel-for-your-brand-even-without-wikipedia-338642",
                            "HTML Living Standard": "https://html.spec.whatwg.org/multipage/",
                            "Introduction to structured data markup in Google Search": "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=en",
                            "Let's talk about the sustainability of digital touchpoints": "https://www.adesso-sweden.se/en/news-center/blog/lets-talk-about-the-sustainability-of-digital-touchpoints.jsp",
                            "Meta tags and attributes that Google supports": "https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=en",
                            "MetaExtensions": "https://wiki.whatwg.org/wiki/MetaExtensions",
                            "Microformats": "https://microformats.org/wiki/Main_Page",
                            "Open Graph Protocol": "https://ogp.me/",
                            "Structured Data": "https://schema.org/",
                            "The digital butterfly effect: Sustainable websites and SEO": "https://www.the-future-of-commerce.com/2022/03/01/sustainable-websites/",
                            "W3C RDFa Specification": "https://www.w3.org/TR/rdfa-core/"
                        }
                    ],
                    "tags": ["Accessibility", "Usability", "HTML", "Marketing"]
                },
                {
                    "id": "13",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#adapt-to-user-preferences",
                    "guideline": "Adapt to User Preferences",
                    "description": "Sustainability benefits can be generated in numerous ways, by making sure that your website adheres to the requests made by a browser for specific conditions to be taken into account (such as CSS media and preference queries), you can unlock benefits for the visitor, and as a by-product reduce your emissions. It's worth noting that the introduction of user preferences and APIs has increased the risk of visitor fingerprinting and privacy issues.",
                    "criteria": [
                        {
                            "title": "Media and Preference Queries",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD13-1)",
                            "description": "Apply the monochrome, prefers-contrast, prefers-color-scheme, prefers-reduced-data, prefers-reduced-transparency, and prefers-reduced-motion CSS preference queries if they will benefit your website or application. Use the print & scripting CSS media queries if they will improve the sustainability of your website."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Improving the experience for monochrome devices (using a monochrome preference query) could encourage more visitors to use these energy-efficient eInk devices. For OLED displays dark mode (prefers-color-scheme) will be more energy efficient. Animation and media have a significant impact on CPU and GPU, therefore reducing its usage (prefers-reduced-motion) will reduce energy usage. Finally, having a print-friendly stylesheet will save not only paper but also ink wastage.",
                            "Social Equity": "Media queries don't tell individuals how to experience the web, they follow the preferences of the visitor or a device's capabilities.",
                            "Accessibility": "Having a high contrast (prefers-contrast) version of a site will reduce the barriers to entry and time wasted for visually impaired visitors. Less motion may also assist people with accessibility requirements.",
                            "Performance": "Allowing visitors to have a Lo-Fi (prefers-reduced-data) version of a site could significantly reduce the carbon footprint they emit (which for individuals on a data plan would be beneficial). Additionally, by detecting if scripting is disabled and offering alternative content, you could save wasted effort and improve the performance of a product or service.",
                            "Economic": "Print media queries (or stylesheets) can save visitors additional ink and paper costs.",
                            "Conversion": "User preferences make an interface friendlier, encouraging repeat visitors."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "@media (prefers-color-scheme: dark) {\r\n\t\/* wants dark mode *\/\r\n}\r\n@media (prefers-color-scheme: light) {\r\n\t\/* wants light mode *\/\r\n}",
                            "content": "[The complete guide to CSS media queries](https://polypane.app/blog/the-complete-guide-to-css-media-queries/#prefers-color-scheme)."
                        }
                    ],
                    "resources": [
                        {
                            "A Guide To The State Of Print Stylesheets In 2018": "https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/",
                            "Cascading Spy Sheets: Exploiting the Complexity of Modern CSS for Email and Browser Fingerprinting": "https://cispa.de/en/research/publications/84162-cascading-spy-sheets-exploiting-the-complexity-of-modern-css-for-email-and-browser-fingerprinting",
                            "Changing Paper Consumption": "http://www.greenschools.net/article.php-id=75.html",
                            "Cost of a pixel color (Video)": "https://www.youtube.com/watch?v=N_6sPd0Jd3g",
                            "CSS Design: Going to Print": "https://alistapart.com/article/goingtoprint/",
                            "CSS-Based Fingerprinting": "https://css-tricks.com/css-based-fingerprinting/",
                            "Dark mode & accessibility myth": "https://stephaniewalter.design/blog/dark-mode-accessibility-myth-debunked/",
                            "Dark mode can save battery, but only if your device has an OLED screen": "https://www.businessinsider.com/guides/tech/does-dark-mode-save-battery?r=US&IR=T",
                            "Dark mode may not save your phone's battery life as much as you think, but there are a few silver linings": "https://www.purdue.edu/newsroom/archive/releases/2021/Q3/dark-mode-may-not-save-your-phones-battery-life-as-much-as-you-think,-but-there-are-a-few-silver-linings.html",
                            "Dark Mode Can Improve Text Readability — But Not for Everyone": "https://www.boia.org/blog/dark-mode-can-improve-text-readability-but-not-for-everyone",
                            "Demo: Disabling JavaScript Won't Save You from Fingerprinting": "https://fingerprint.com/blog/disabling-javascript-wont-stop-fingerprinting/",
                            "Energy efficient color palette ideas": "https://greentheweb.com/energy-efficient-color-palette-ideas/",
                            "Google: Here's why dark mode massively extends your OLED phone's battery life": "https://www.zdnet.com/article/google-heres-why-dark-mode-massively-extends-your-oled-phones-battery-life/",
                            "[GPFEDS] 2.5 - Specifications (Adaptive Design) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How can we design sustainably?": "https://medium.com/@sandra.pallier/how-can-we-design-sustainably-3be7530a0f5b",
                            "How much battery does dark mode save?: an accurate OLED display power profiler for modern smartphones": "https://dl.acm.org/doi/10.1145/3458864.3467682",
                            "How to Become an Eco Web Designer": "https://onextrapixel.com/how-to-become-an-eco-web-designer/",
                            "Impact of GPU Acceleration on Browser CPU Usage": "https://helgeklein.com/blog/impact-gpu-acceleration-browser-cpu-usage/",
                            "Mitigating Browser Fingerprinting in Web Specifications": "https://www.w3.org/TR/fingerprinting-guidance/",
                            "prefers-reduced-data": "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data",
                            "Save the planet through sustainable web design": "https://www.creativebloq.com/inspiration/save-planet-through-sustainable-web-design-8126147",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "The complete guide to CSS media queries": "https://polypane.app/blog/the-complete-guide-to-css-media-queries/",
                            "The dark side of green web design": "https://www.wholegraindigital.com/blog/dark-colour-web-design/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "User preference media features client hints headers": "https://web.dev/articles/user-preference-media-features-headers?hl=en"
                        }
                    ],
                    "tags": ["Accessibility", "UI", "Usability", "Assets", "CSS"]
                },
                {
                    "id": "14",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#develop-a-device-adaptable-layout",
                    "guideline": "Develop a Device-Adaptable Layout",
                    "description": "Visitors approach our products and services on a wide variety of devices these days. Ensuring that your device works on the widest range of devices and differing screen resolutions ensures that you will have a compatible website or application. A Device-Adaptable approach goal is to provide a consistent, adaptable experience across a full range of devices by considering all screen sizes and resolutions from the start, rather than primarily focusing on mobile scaling upward.",
                    "criteria": [
                        {
                            "title": "Mobile-First",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD14-1)",
                            "description": "Allow a website or app to work and adapt seamlessly across a variety of devices and screen sizes, including mobile, desktop, smart TVs, and other emerging platforms. Ensures that content and functionality are accessible and optimized on both smaller mobile screens and larger displays without limiting accessibility, usability or design on any specific device type. It is essential to implement robust fallback strategies to ensure that the website or application will not fail if it encounters unsupported technologies."
                        },
                        {
                            "title": "Progressive Enhancement",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD14-2)",
                            "description": "Regardless of the approach or combination of approaches used, such as Adaptive Design, Mobile-First Design, or Dynamic Serving, it's essential to ensure overall sustainability through progressive enhancement."
                        },
                        {
                            "title": "Carbon Aware Design",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD14-3)",
                            "description": "To maximize the use of renewable energy, adapt your website or service to electricity availability using carbon-aware design techniques. This should include using situational design to reduce the codebase disable non-essential functionality during high-intensity periods or adapting the user-interface to perform better in situations where scaling hardware resources can be avoided to reduce emissions. It can also include designing algorithms that can auto-disable features based on set thresholds."
                        },
                        {
                            "title": "Alternative Browsing",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD14-4)",
                            "description": "Support other indirect methods of interaction such as voice (speech), code (QR, etc), reader view (browser, application, or RSS), or connected technology (watch, appliance, transport, etc)."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Image optimization, minification, and efficient resource loading can improve performance and provide a streamlined experience for visitors. Additionally, smaller devices are often more underpowered than larger devices, so any hardware optimization could benefit both the user and the environment. Using less energy to power screens, for example, by adopting \"Dark Mode or Dark Background,\" can also offer many benefits.",
                            "Social Equity": "Low-powered devices are frequently used in developing nations, but ensuring that content works for older devices is paramount.",
                            "Accessibility": "Mobile websites usually incorporate large, touch-friendly buttons, simplified navigation menus, and clear readable fonts. This often makes it easier for individuals with visual or motor impairments to interact with than a traditional desktop layout and could prove to be beneficial for certain visitors to take advantage of. A device-adaptable strategy (considering approach limitations) maximizes accessibility and usability across all devices, enhancing accessibility and ensuring an optimized experience by reducing the need for users to adapt their experience to device-specific limitations.",
                            "Performance": "Using lazy-loading and other delayed rendering techniques can boost website speed for small visual capacity devices.",
                            "Economic": "Ensuring that your website or application works across not only desktop devices but also smartphones and other unique screen resolutions can benefit you financially as it allows individuals to make purchases while on the move (which can be more convenient), while potentially using little or no screen.",
                            "Conversion": "Products and services that work well across a wider range of platforms and devices can encourage a wider audience to use your website or application not only in one situation but in many you might not have envisaged."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Low",
                            "water": "Medium",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "@media screen and (min-width: 600px) {\r\n\tbody {\r\n\t\tcolor: red;\r\n\t}\r\n}",
                            "content": "[Beginner's guide to media queries](https://developer.mozilla.org/en-US/docs/Learn_web_development/CSS/CSS_layout/Media_queries#media_feature_rules)."
                        }
                    ],
                    "resources": [
                        {
                            "Build for the Web, Build on the Web, Build with the Web": "https://csswizardry.com/2025/01/build-for-the-web-build-on-the-web-build-with-the-web/",
                            "Building a robust frontend using progressive enhancement": "https://www.gov.uk/service-manual/technology/using-progressive-enhancement",
                            "Carbon Aware Computing": "https://www.carbon-aware-computing.com/",
                            "Carbon Aware Computing: Next Green Breakthrough or New Greenwashing?": "https://hackernoon.com/carbon-aware-computing-next-green-breakthrough-or-new-greenwashing",
                            "Carbon-Aware vs. Carbon-Efficient Applications": "https://devblogs.microsoft.com/sustainable-software/carbon-aware-vs-carbon-efficient-applications/",
                            "Design for Carbon-Aware Digital Experiences": "https://branch.climateaction.tech/issues/issue-1/design-for-carbon-aware-digital-experiences/",
                            "Electricity Maps": "https://app.electricitymaps.com",
                            "Everything You Want To Know About Creating Voice User Interfaces": "https://www.smashingmagazine.com/2022/02/voice-user-interfaces-guide/",
                            "Front-End Performance Checklist 2021": "https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/",
                            "Going Responsive": "https://goingresponsive.com/",
                            "[GPFEDS] 2.2 - Specifications (Older Device) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.4 - Specifications (Older Software) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.5 - Specifications (Adaptive Design) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Graceful degradation": "https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation",
                            "Graceful degradation versus progressive enhancement": "https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement",
                            "Here's how much it costs to charge a smartphone for a year": "https://www.zdnet.com/article/heres-how-much-it-costs-to-charge-a-smartphone-for-a-year/",
                            "How to Become an Eco Web Designer": "https://onextrapixel.com/how-to-become-an-eco-web-designer/",
                            "How web bloat impacts users with slow connections": "https://danluu.com/web-bloat/",
                            "Is Progressive Enhancement Dead Yet? (Video)": "https://briefs.video/videos/is-progressive-enhancement-dead-yet/",
                            "It's about time I tried to explain what progressive enhancement actually is": "https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/",
                            "Let's Talk About Speech CSS": "https://css-tricks.com/lets-talk-speech-css/",
                            "List of sovereign states by Internet connection speeds": "https://en.wikipedia.org/wiki/List_of_sovereign_states_by_Internet_connection_speeds",
                            "Mobile First": "https://mobile-first.abookapart.com/",
                            "Mobile-First CSS: Is It Time for a Rethink?": "https://alistapart.com/article/mobile-first-css-is-it-time-for-a-rethink/",
                            "Mobile First Design and Sustainability": "https://www.mightybytes.com/blog/mobile-first-sustainability/",
                            "Mobile-First Design Complete Guide 2024": "https://uxplanet.org/mobile-first-design-guide-2023-fdd597455d",
                            "Mobile Gender Gap Report (PDF)": "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2020/05/GSMA-The-Mobile-Gender-Gap-Report-2020.pdf",
                            "Not always mobile first": "https://cssence.com/2024/not-always-mobile-first/",
                            "Progressive Enhancement": "https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement",
                            "Progressive enhancement brings everyone in": "https://thehistoryoftheweb.com/the-inclusive-web-of-progressive-enhancement/",
                            "Progressive Enhancement: What It Is, And How To Use It?": "https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/",
                            "Resilient web design": "https://resilientwebdesign.com/",
                            "Responsive design": "https://developer.mozilla.org/en-US/docs/Learn_web_development/CSS/CSS_layout/Responsive_Design",
                            "Responsive Design and Accessibility": "https://www.boia.org/blog/responsive-design-and-accessibility",
                            "Responsive Design Mode": "https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/",
                            "Responsive Web Design": "https://alistapart.com/article/responsive-web-design/",
                            "Responsive Web Design (Book)": "https://ethanmarcotte.com/books/responsive-web-design/",
                            "Responsive web design (Wiki)": "https://en.wikipedia.org/wiki/Responsive_web_design",
                            "Responsive web design basics": "https://web.dev/articles/responsive-web-design-basics?hl=en",
                            "Responsive Design: Patterns & Principles": "https://ethanmarcotte.com/books/responsive-design-patterns-and-principles/",
                            "Responsive Web Design: What It Is And How To Use It": "https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/",
                            "RSS Specification": "https://www.rssboard.org/rss-specification",
                            "Smartphone Ownership Is Growing Rapidly Around the World, but Not Always Equally": "https://www.pewresearch.org/global/2019/02/05/smartphone-ownership-is-growing-rapidly-around-the-world-but-not-always-equally/",
                            "Stop resizing your browser": "https://jenchan.biz/blog/stop-resizing-your-browser-improve-responsive-testing",
                            "Taking RWD To The Extreme": "https://www.smashingmagazine.com/2025/02/taking-rwd-to-the-extreme/",
                            "The Performance Inequality Gap": "https://infrequently.org/series/performance-inequality/",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "Vampire Energy: Essential Answer": "https://stanfordmag.org/contents/vampire-energy-essential-answer",
                            "What is Mobile First Design?": "https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00"
                        }
                    ],
                    "tags": ["UI", "Usability", "Compatibility", "CSS", "Performance"]
                },
                {
                    "id": "15",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-beneficial-javascript-and-its-api-s",
                    "guideline": "Use Beneficial JavaScript and Its APIs",
                    "description": "When new best practices or if beneficial scripting guidance exists that will improve the visitor experience, following it should be of the highest priority (only using scripts ethically should be promoted).",
                    "criteria": [
                        {
                            "title": "Beneficial JavaScript",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD15-1)",
                            "description": "Improve sustainability through accessible and performant code implementations."
                        },
                        {
                            "title": "Sustainable APIs",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD15-2)",
                            "description": "Apply potential energy-reducing APIs (such as Battery Status, Compression Streams, Page Visibility, and Vibration) if they can improve the eco-efficiency of your website or application."
                        },
                        {
                            "title": "API Requests",
                            "testable": "Human Testable",
                            "description": "When using an API, make sure you only call it when necessary. On the other side, make sure no unrequired data is sent by the API."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Removing unwatched distractions (Page Visibility API), for example, would reduce wasted visual effects such as animation from being processed in the background. This could potentially help visitors conserve battery if they leave multiple tabs open in their browser.",
                            "Privacy": "Allowing for script-free visitors can protect the privacy of visitors who may live in unsafe nations.",
                            "Performance": "Using modern APIs or low-code solutions often reduces heavy codebase usage. Having fallbacks for unavailable JavaScript allows older or less capable devices to still experience your products.",
                            "Economic": "If a product works in more situations, you can sell it to more people without it failing.",
                            "Conversion": "Fallbacks for technology that might fail can lead to sales that otherwise wouldn't exist."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "const audio = document.querySelector(\"audio\");\r\n\/\/ Handle page visibility change:\r\n\/\/ - If the page is hidden, pause the video\r\n\/\/ - If the page is shown, play the video\r\ndocument.addEventListener(\"visibilitychange\", () => {\r\nif (document.hidden) {\r\n\taudio.pause();\r\n} else {\r\n\taudio.play();\r\n}\r\n});",
                            "content": "[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)."
                        }
                    ],
                    "resources": [
                        {
                            "9 Proven Strategies to Improve API Performance": "https://www.thegeekyminds.com/post/strategies-to-improve-api-performance",
                            "A handful of reasons JavaScript won't be available": "https://piccalil.li/blog/a-handful-of-reasons-javascript-wont-be-available/",
                            "Accessible JavaScript": "https://webaim.org/techniques/javascript/",
                            "CanIUse": "https://caniuse.com/",
                            "Common API mistakes and how to avoid them": "https://blog.logrocket.com/common-api-mistakes-and-how-to-avoid-them-804fbcb9cc4b/",
                            "Common Causes of Memory Leaks in JavaScript": "https://www.trevorlasn.com/blog/common-causes-of-memory-leaks-in-javascript",
                            "Comparing the Energy Efficiency of WebAssembly and JavaScript in Web Applications on Android Mobile Devices (PDF)": "https://www.ivanomalavolta.com/files/papers/EASE_2022_web_assembly.pdf",
                            "Degree of internet freedom in selected countries according to the Freedom House Index in 2022": "https://www.statista.com/statistics/272533/degree-of-internet-freedom-in-selected-countries/",
                            "Everyone has JavaScript, right?": "https://www.kryogenix.org/code/browser/everyonehasjs.html",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 1.10 - Strategy (Documented APIs) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.6 - Front-End (Sensor Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How To Test Your Website With JavaScript Disabled": "https://www.debugbear.com/blog/test-website-with-javascript-disabled",
                            "Hidden cost of frontend frameworks": "https://manonbox.io/articles/hidden-cost-of-frontend-frameworks",
                            "How Web Content Can Affect Power Usage": "https://webkit.org/blog/8970/how-web-content-can-affect-power-usage/",
                            "Internet censorship and surveillance by country": "https://en.wikipedia.org/wiki/Internet_censorship_and_surveillance_by_country",
                            "JavaScript dos and donts": "https://muan.co/posts/javascript",
                            "JavaScript for Web Designers": "https://abookdeparts.netlify.app/",
                            "JS Free": "https://jsfree.org/",
                            "Memory leaks: the forgotten side of web performance": "https://nolanlawson.com/2022/01/05/memory-leaks-the-forgotten-side-of-web-performance/",
                            "Optimizing Javascript for fun and for profit": "https://romgrk.com/posts/optimizing-javascript",
                            "The Performance Inequality Gap": "https://infrequently.org/series/performance-inequality/",
                            "W3C Web Performance Working Group": "https://www.w3.org/webperf/",
                            "WebAssembly versus JavaScript: Energy and Runtime Performance (PDF)": "https://repositorio.inesctec.pt/server/api/core/bitstreams/0870fb76-d463-456b-9e34-5b33bb7c0dd1/content"
                        }
                    ],
                    "tags": ["Accessibility", "JavaScript", "Security"]
                },
                {
                    "id": "16",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#ensure-your-scripts-are-secure",
                    "guideline": "Ensure Your Scripts Are Secure",
                    "description": "The dangers of scripting are well known, and vulnerabilities are discovered with increasing regularity. As such, it's of ethical benefit for authors to ensure all code used regularly passes security processes.",
                    "criteria": [
                        {
                            "title": "Script Security",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD16-1)",
                            "description": "Check the code for vulnerabilities, exploits, header issues, and code injection."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Websites that have no outstanding security issues are less likely to become a target for individuals who might exploit them (consuming vast amounts of data in the process).",
                            "Security": "Having a secure website can prevent personal information from being exploited.",
                            "Performance": "A secure website is less likely to have its infrastructure breached, which could lead to vast amounts of data being stolen, corrupted, or destroyed.",
                            "Economic": "Preventing security issues will help your project and visitors avoid financial crime."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "This [article](https://www.freecodecamp.org/news/how-to-protect-against-dom-xss-attacks/) has information and examples of XSS security issues to avoid."
                        }
                    ],
                    "resources": [
                        {
                            "5 Ways to Keep Your website from Getting Hacked": "https://www.mightybytes.com/blog/5-ways-to-keep-site-from-getting-hacked/",
                            "Content Security Policy Reference": "https://content-security-policy.com/",
                            "Frontend Security Checklist": "https://www.trevorlasn.com/blog/frontend-security-checklist/",
                            "[GPFEDS] 1.7 - Strategy (Encryption) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-7020 - Data Security": "https://gr491.isit-europe.org/en/crit.php?id=1-7020-backend-the-gdpr-requires-the-implementation-of-a",
                            "OWASP Top Ten": "https://owasp.org/www-project-top-ten/",
                            "Security Headers using meta": "https://www.htmhell.dev/adventcalendar/2023/7/",
                            "Script Integrity": "https://frontendmasters.com/blog/script-integrity/",
                            "The OWASP Top 10": "https://www.freecodecamp.org/news/technical-dive-into-owasp/",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators",
                            "Web security": "https://developer.mozilla.org/en-US/docs/Web/Security",
                            "Website security": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Server-side/First_steps/Website_security",
                            "WordPress Security: How to Protect Your website from Attacks and Hackers": "https://www.mightybytes.com/blog/wordpress-security/"
                        }
                    ],
                    "tags": ["Social Equity", "JavaScript", "Security", "Privacy"]
                },
                {
                    "id": "17",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#manage-dependencies-appropriately",
                    "guideline": "Manage Dependencies Appropriately",
                    "description": "While JavaScript may not cause the most website bloat, it can cause very high emissions in terms of CPU load due to the rendering process, thereby it makes sense to consider the use of dependencies and third-party code carefully.",
                    "criteria": [
                        {
                            "title": "Dependency Management",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD17-1)",
                            "description": "Prevent developers from downloading and installing JavaScript libraries to run locally (client-side) when they are not needed by checking for unused dependencies and uninstalling those that aren't needed and removing them from your package.json file."
                        },
                        {
                            "title": "Dependency Necessity",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD17-2)",
                            "description": "Only use libraries where necessary as this will reduce the amount of JavaScript that has to be downloaded and parsed by the browser. Consider whether you can use a native JavaScript API instead. Check the package size, and whether individual modules can be installed and imported rather than the whole library."
                        },
                        {
                            "title": "Dependency Updates",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD17-3)",
                            "description": "Regularly check dependencies and keep them up-to-date."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Developer's machines do not need to waste energy installing and / or rendering packages that are not needed.",
                            "Security": "Third-party code can contain bugs and security issues. Keeping packages up-to-date and using fewer third-party libraries reduces the likelihood of security flaws.",
                            "Performance": "Reduction in client-side JavaScript normally results in faster websites."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "npm uninstall lodash",
                            "content": "[Uninstalling packages and dependencies](https://docs.npmjs.com/uninstalling-packages-and-dependencies)."
                        }
                    ],
                    "resources": [
                        {
                            "Bundlephobia": "https://bundlephobia.com/",
                            "e18e": "https://e18e.dev/",
                            "Equations relating total annual energy consumption and chips energy efficiency": "https://www.researchgate.net/publication/371938289_Equations_relating_total_annual_energy_consumption_and_chips_energy_efficiency",
                            "[GPFEDS] 2.9 - Specifications (Off-The-Shelf Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.10 - Specifications (Third-Party Services) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-7025 - Reducing Dependencies": "https://gr491.isit-europe.org/en/crit.php?id=2-7025-backend-dependency-trees-provide-a-mapping-of-components",
                            "[GR491] 3-5020 - Unused Dependencies": "https://gr491.isit-europe.org/en/crit.php?id=3-5020-frontend-dependency-trees-provide-the-mapping-of-components",
                            "How to Check if You Have Unused Dependencies in Your JavaScript App": "https://javascript.plainenglish.io/how-to-check-if-you-have-unused-dependencies-in-your-javascript-app-2c69dd97c49e",
                            "How to Keep Your App Dependencies Up-To-Date?": "https://medium.com/better-programming/how-to-keep-your-app-dependencies-up-to-date-833fc45dae4",
                            "If Not React, Then What?": "https://infrequently.org/2024/11/if-not-react-then-what/",
                            "Keeping dependencies up-to-date": "https://understandlegacycode.com/blog/keeping-dependencies-up-to-date/",
                            "Pkg-Size": "https://pkg-size.dev/",
                            "Should Developers Use Third-Party Libraries?": "https://www.scalablepath.com/back-end/third-party-libraries",
                            "Uninstalling packages and dependencies": "https://docs.npmjs.com/uninstalling-packages-and-dependencies",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators"
                        }
                    ],
                    "tags": ["Patterns", "JavaScript", "Performance", "Software", "Security"]
                },
                {
                    "id": "18",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#include-expected-and-beneficial-files",
                    "guideline": "Include Expected and Beneficial Files",
                    "description": "Websites should include a range of expected and standard beneficial files to improve search engine optimization, user experience, transparency, and overall site health. Search engines and browsers regularly request these files by default. If they don't exist, this leads to unnecessary requests, potential errors, and increased emissions. Including these files avoids these issues while also providing SEO, user-experience, and other benefits. They each have a low carbon footprint, so while they do create emissions, it's worth including them for the benefits they provide.",
                    "criteria": [
                        {
                            "title": "Expected File Formats",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD18-1)",
                            "description": "Include the favicon.ico, robots.txt, opensearch.xml, site.webmanifest, and sitemap.xml documents. Additionally, ensure that any such files defined in future web standards or specifications are included."
                        },
                        {
                            "title": "Beneficial File Formats",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD18-2)",
                            "description": "Include beneficial files such as ads.txt, carbon.txt, humans.txt, security.txt. Additionally, ensure that any such files defined in future web standards or specifications are included."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Search engines or browsers request certain files by default, ensuring they are in place will reduce loading errors, and may provide efficiency enhancements in how visitors find or interact with a site. Plaintext requires no rendering. If visitors (or search engines) know about these useful files (like carbon.txt) they can load quicker and with less CPU / GPU impact than any HTML website.",
                            "Accessibility": "OpenSearch enables the browser's default search box rather than a custom solution to be integrated with your website search, which may aid accessibility as it encourages the use of a browser native component (and / or keyboard shortcuts) rather than a website or application which may suit certain accessibility requirements better.",
                            "Performance": "Files that are expected will produce HTTP requests, ensuring they are met will satisfy the products making them and potentially reduce the requests once they are discovered. Plaintext files contain no links, no markup, and have no imprint. Putting credits (for example) in such a file will reduce data transfer and have a lower rendering footprint.",
                            "Economic": "Robots and Sitemap files can be utilized by search engines to help make your website more findable, this could lead to more visitors and potentially more customers as a result. The ads.txt file is part of a scheme to reduce advertising fraud, it could be useful.",
                            "Conversion": "Robots can be used to target specific search engines, helping to ensure content is correctly indexed to get a good placement so that visitors can find you easily.",
                            "Transparency": "The humans file provides credit to people involved in a site's creation, and security offers critical points of contact if an issue is discovered. Both are valuable additions to a project."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "User-agent: *\r\nDisallow: \/cgi-bin\/",
                            "content": "[About /robots.txt](https://www.robotstxt.org/robotstxt.html)."
                        }
                    ],
                    "resources": [
                        {
                            "About /robots.txt": "https://www.robotstxt.org/robotstxt.html",
                            "Ads.txt guide": "https://support.google.com/adsense/answer/12171612?hl=en-GB&rd=1",
                            "The ads.txt Standard": "https://iabtechlab.com/ads-txt/",
                            "All about humans. Humans.txt, actually": "https://codeburst.io/all-about-humans-humans-txt-actually-f571d37f92d2",
                            "Build and submit a sitemap": "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en",
                            "The carbon.txt Proposed Standard": "https://carbontxt.org/",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "Define a favicon to show in search results": "https://developers.google.com/search/docs/appearance/favicon-in-search?hl=en",
                            "Favicon Generator": "https://realfavicongenerator.net/",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How Google interprets the robots.txt specification": "https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt?hl=en",
                            "The humans.txt Standard": "https://humanstxt.org/Standard.html",
                            "OpenSearch": "https://en.wikipedia.org/wiki/OpenSearch",
                            "OpenSearch Protocol": "https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md",
                            "security.txt": "https://en.wikipedia.org/wiki/Security.txt",
                            "The security.txt Proposed Standard": "https://securitytxt.org/",
                            "Sitemaps Protocol": "https://www.sitemaps.org/protocol.html",
                            "slash pages": "https://slashpages.net/",
                            "Web Application Manifest": "https://www.w3.org/TR/appmanifest/"
                        }
                    ],
                    "tags": ["UI", "Patterns", "Compatibility", "Assets", "Marketing", "Security"]
                },
                {
                    "id": "19",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#avoid-using-deprecated-proprietary-or-outdated-code",
                    "guideline": "Avoid Using Deprecated, Proprietary, or Outdated Code",
                    "description": "The web is full of outdated or deprecated formats and web standards, and proprietary (non-standard custom) features that have been superseded. By adhering to up-to-date and widely recognized formats and web standards, developers can ensure better compatibility, user experience, and lower environmental impact.",
                    "criteria": [
                        {
                            "title": "Preferred Code",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD19-1)",
                            "description": "Avoid the use of deprecated, proprietary, or outdated formats and web standards. Always adopt up-to-date, widely recognized standards that offer equivalent or improved functionality. Such code may be used to meet a documented customer need only if there is a justifable benefit that cannot otherwise be met (such as compatibility, accessibility, or emissions reduction)."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Deprecated standards will not be optimized or supported by future browsers, which could lead to broken functionality or a slow experience, wasting time and visitor resources.",
                            "Security": "Old code can potentially be exploited if security issues arise (and browsers stop supporting the features). Ensuring you maintain standards should be a part of your processes.",
                            "Accessibility": "Deprecated web standards often have poor support in assistive technologies, avoiding them will help to provide a semantic experience that works well for everyone.",
                            "Performance": "Modern web standards are highly optimized, avoiding deprecated or less efficient standards will increase the longevity of your product and reduce the need for a carbon-intensive redesign."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "<?xml version=\"1.0\"?>\r\n<!DOCTYPE cross-domain-policy SYSTEM \"http:\/\/www.adobe.com\/xml\/dtds\/cross-domain-policy.dtd\">\r\n<cross-domain-policy>\r\n\t<site-control permitted-cross-domain-policies=\"none\"\/>\r\n<\/cross-domain-policy>",
                            "content": "Avoid using the now deprecated [Cross Domain](https://www.adobe.com/devnet-docs/acrobatetk/tools/AppSec/xdomain.html) format unless you have an explicit requirement for it, as Flash is deprecated."
                        }
                    ],
                    "resources": [
                        {
                            "DevOps tech: Code maintainability": "https://dora.dev/capabilities/code-maintainability/",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.9 - Specifications (Off-The-Shelf Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.5 - UX and UI (Native Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-5005 - Proven Development Standards": "https://gr491.isit-europe.org/en/crit.php?id=1-5005-frontend-the-best-development-standards-cover-a-large",
                            "HTML5 Security Cheat Sheet": "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html",
                            "JSON vs XML: which one is faster and more efficient?": "https://www.imaginarycloud.com/blog/json-vs-xml/",
                            "Maintainability Guide": "https://meiert.com/en/blog/maintainability-guide/",
                            "marquee elements are deprecated and must not be used": "https://dequeuniversity.com/rules/axe/4.3/marquee",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "The Compact Guide to Web Maintainability: 200 Tips and Resources": "https://meiert.com/en/blog/maintainability-guide-2/",
                            "The Neverending Story": "https://garrettdimon.com/journal/posts/the-neverending-story",
                            "Use JSON for data exchange": "https://www.genelify.com/blog/how-to-improve-php-performance#_7_Use_JSON_for_data_exchange",
                            "Website Maintenance Tips for Front-End Developers": "https://www.smashingmagazine.com/2009/11/website-maintenance-tips-for-front-end-developers/",
                            "Why Do Some HTML Elements Become Deprecated?": "https://css-tricks.com/why-do-some-html-elements-become-deprecated/"
                        }
                    ],
                    "tags": ["Accessibility", "Compatibility", "HTML", "CSS", "JavaScript", "Performance"]
                },
                {
                    "id": "20",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#align-technical-requirements-with-sustainability-goals",
                    "guideline": "Align Technical Requirements With Sustainability Goals",
                    "description": "Every product or service is different, and each will require a different set of tooling to accomplish the most sustainable result. Deciding whether to go with a bulky framework, Static Site Generator (SSG), or a Content Management System (CMS) takes careful planning based on client or service requirements.",
                    "criteria": [
                        {
                            "title": "Identify Requirements",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD20-1)",
                            "description": "Identify the requirements and from this, choose the implementation of the product or service. A simpler technological implementation may use more human resources but could have a smaller footprint. A prebuilt solution may use more system resources (and thereby produce more emissions upon render) but have a faster build-time (emitting less carbon during development)."
                        },
                        {
                            "title": "Optimized Methodology",
                            "testable": "Human Testable",
                            "description": "As a general rule, coding from scratch is the best-performing methodology (though if an existing solution is actively maintained, it may be better optimized than what you could produce). Therefore, use native components and file systems to a WYSIWYG editor or heavy framework, and be considerate of the impact of third-party solutions."
                        },
                        {
                            "title": "Static VS Dynamic",
                            "testable": "Human Testable",
                            "description": "If choosing a code generation tool, use a Static Site Generator in preference to a bulky content management system. Because SSGs often start using a minimalist content entry format (like markdown) and all of the compilation is done before the website is uploaded, the emissions benefit comes from the server not having to place as much effort into serving pages (as they are static) for each visitor. In the case of a CMS, the dynamic nature of a site will involve additional computation (server-side processing) and bulkier libraries."
                        },
                        {
                            "title": "Expandability Considerations",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD20-4)",
                            "description": "Plugins, extensions, and themes have been carefully reviewed and selected to maximize interoperability, accessibility, and performance. They are regularly audited over time to ensure continued compatibility."
                        },
                        {
                            "title": "Interface Impact",
                            "testable": "Human Testable",
                            "description": "All the components of the user-interface are the subject of special attention in terms of its sustainability impact while respecting accessibility and the performance of such components."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Carefully considering long-term technology implications and taking the time to ensure they are optimized and efficiently utilized can help a team measurably reduce a product or service's environmental impact over time, which will reduce overall emissions.",
                            "Security": "Maintaining a software product over time and ensuring that the only third-party products you use are critical, and your service improves security.",
                            "Privacy": "Prioritizing security and user privacy helps an organization better comply with current and emerging related legislation.",
                            "Accessibility": "Making assistive technologies a core part of project specifications from the beginning and throughout a product or service's life-cycle improves access to information for people with disabilities.",
                            "Performance": "Avoiding unnecessary complexity in your infrastructure will increase the speed at which developers can work, but also reduce the overhead load of website performance, increasing the benefits relating to emission reduction.",
                            "Economic": "Avoiding tooling which may be overburdening the user-experience may have financial savings, especially if certain tooling has maintenance costs or fees for software usage."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "You can view a [comparison](https://cms-comparison.io/#/list) of more performant (headless) content management systems or download the sustainability [Figma Kit](https://www.figma.com/community/file/1165191622334300908/sustainability-kit-for-digital-designers)."
                        }
                    ],
                    "resources": [
                        {
                            "7 Reasons to Use a Static Site Generator": "https://www.sitepoint.com/7-reasons-use-static-site-generator/",
                            "[AFNOR] Spec 5.3.3 & 5.2.2 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Are Content Management Systems Sustainable?": "https://sustainablevirtualdesign.wordpress.com/2016/01/13/are-content-management-systems-cms-sustainable/",
                            "Creating a Low Carbon Umbraco Website": "https://www.etive-mor.com/blog/creating-a-low-carbon-umbraco-website",
                            "Getting Started with Sustainability": "https://www.drupal.org/docs/getting-started/sustainability/getting-started-with-sustainability",
                            "[GPFEDS] 1.5 - Strategy (Impact Goals) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-5021 - Functionality VS Native": "https://gr491.isit-europe.org/en/crit.php?id=3-5021-frontend-some-features-are-available-in-several-forms.",
                            "[GR491] 6-3041 - Sustainable IT Impact": "https://gr491.isit-europe.org/en/crit.php?id=6-3041-uxui-the-simpler-the-visual-theme-the-more",
                            "[GR491] 8-3059 - Native System Features": "https://gr491.isit-europe.org/en/crit.php?id=8-3059-uxui-some-features-are-available-in-multiple-forms.",
                            "GreenIT (French) 011 - Favoriser un développement sur-mesure à l'usage d'un CMS": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_011_fr.md",
                            "GreenIT (French) 4037 - Bien choisir son thème et limiter le nombre d'extensions dans un CMS": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4037_fr.md",
                            "Headless CMS vs. static site generator": "https://www.contentstack.com/cms-guides/headless-cms-vs-static-site-generator",
                            "How Many WordPress Plugins Are Too Many?": "https://www.elegantthemes.com/blog/wordpress/how-many-wordpress-plugins-are-too-many",
                            "How to design a sustainable website?": "https://dodonut.com/blog/how-to-design-a-sustainable-website-quiz/",
                            "Implementing digital sufficiency (PDF)": "https://theshiftproject.org/wp-content/uploads/2021/07/TSP_DigitalSufficiency2020_Summary_corrige.pdf",
                            "Quels sont les avantages des sites statiques? (French)": "https://www.osuny.org/actualites/2023-01-16-quels-sont-les-avantages-des-sites-statiques/",
                            "Solid Protocol": "https://solidproject.org/TR/protocol",
                            "Striking a Balance Between Native and Custom Select Elements": "https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/",
                            "UI Tools": "https://designsustainably.eu/uitools/",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "What Affects CMS Performance?": "https://www.keycdn.com/support/what-affects-cms-performance",
                            "What is a static site generator?": "https://www.cloudflare.com/learning/performance/static-site-generator/"
                        }
                    ],
                    "tags": ["Ideation", "Compatibility", "Performance", "Strategy"]
                },
                {
                    "id": "21",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-the-latest-stable-language-version",
                    "guideline": "Use the Latest Stable Language Version",
                    "description": "Languages evolve regularly, and it's important for security and performance reasons to keep on top of the technology stack you are using. It's also important to consider whether the language you are using is appropriate or optimized for the task you wish to use it for.",
                    "criteria": [
                        {
                            "title": "Versioning",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD21-1)",
                            "description": "Use the latest build of your chosen syntax language and its coupled framework."
                        },
                        {
                            "title": "Language Choice",
                            "testable": "Human Testable",
                            "description": "Use the most appropriate programming language for a task. Many tools and programming languages are optimized for performing particular tasks, and utilizing those most appropriate to the problem, especially if there is a reasonable visitor base involved justifies the time and effort, as long as it doesn't impact PPP factors such as the well-being of those involved or become too cost prohibitive."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Using the latest language version may improve efficiency and reduce data center energy consumption. Verify benefits are worthwhile before major build upgrades.",
                            "Security": "Often, older versions may have security issues that could expose your website or app (and thereby your visitors) to harm. Maintaining an upgrade schedule is good for security.",
                            "Performance": "Language version updates are usually coupled with performance improvements. Regarding language choice, an algorithm implemented in a compiled language such as C or Rust, for example, can have greatly reduced execution time and energy usage compared to the same algorithm written in an interpreted language like Python or JavaScript.",
                            "Economic": "Using the latest and more performant language version could help hosting companies reduce their costs. That could be beneficial for the company and the visitor."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Use [benchmarks](https://kinsta.com/blog/php-benchmarks/) to identify the efficiency of languages."
                        }
                    ],
                    "resources": [
                        {
                            "Best PHP Performance Tips From Community & Influencers": "https://www.cloudways.com/blog/php-performance/",
                            "Energy Efficiency across Programming Languages (PDF)": "https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf",
                            "PHP 5.6 vs PHP 7 Performance Comparison": "https://www.altamira.ai/blog/php-5-vs-php-7-performance-comparison/",
                            "Programming Language Benchmarks": "https://attractivechaos.github.io/plb/",
                            "Speed comparison": "https://niklas-heer.github.io/speed-comparison/",
                            "Web Framework Benchmark": "https://web-frameworks-benchmark.netlify.app/result",
                            "Web Framework Benchmarks": "https://www.techempower.com/benchmarks/#hw=ph&test=composite&section=data-r22"
                        }
                    ],
                    "tags": ["Compatibility", "Performance", "Security"]
                },
                {
                    "id": "22",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#take-advantage-of-native-features",
                    "guideline": "Take Advantage of Native Features",
                    "description": "Ensuring that your code is free of redundancy by using pre-existing functionality provided by the web browser is important as it will help you to reduce the amount of time wasted, re-creating the same components, this offers obvious sustainability benefits in terms of time in front of the screen.",
                    "criteria": [
                        {
                            "title": "Native Over Custom",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#WD22-1)",
                            "description": "Use native functions, APIs, and features over writing your own."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Avoiding repetition of pre-existing features improves efficiency, which ultimately will lead to less redundancy, less development time, and thereby emissions saving for the construction of the product or service.",
                            "Performance": "Native features will have been well optimized, it's unlikely a custom component will match this, therefore a native function will not only load quicker but will use fewer resources.",
                            "Economic": "Existing features don't require additional development time, so is a time saver."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "<button onclick=\"window.dialog.showModal()\">open dialog</button>\r\n<dialog id=\"dialog\">\r\n\t<p>I'm a dialog.</p>\r\n\t<form method=\"dialog\">\r\n\t\t<button>Close</button>\r\n\t</form>\r\n</dialog>",
                            "content": "HTML [dialog] (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) API [example](https://codepen.io/chriscoyier/pen/QWLRBVK)."
                        },
                        {
                            "code": "<?php\r\n$ar1 = array(10, 100, 100, 0);\r\n$ar2 = array(1, 3, 2, 4);\r\narray_multisort($ar1, $ar2);\r\nvar_dump($ar1);\r\nvar_dump($ar2);\r\n?>",
                            "content": "[PHP](https://www.php.net/manual/en/function.array-multisort.php) example."
                        }
                    ],
                    "resources": [
                        {
                            "15 Tips to Optimize Your PHP Script for Better Performance for Developers": "https://www.thegeekstuff.com/2014/04/optimize-php-code/",
                            "Energy Efficiency across Programming Languages (PDF)": "https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf",
                            "[GPFEDS] 1.9 - Strategy (Interoperable Technologies) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.5 - UX and UI (Native Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How to improve PHP performance in your web application": "https://www.genelify.com/blog/how-to-improve-php-performance#8_Take_advantage_of_the_native_functions_of_PHP",
                            "Native features of the browser": "https://subscription.packtpub.com/book/game-development/9781849696029/1/ch01lvl1sec13/native-features-of-the-browser",
                            "PHP Function and Method listing": "https://www.php.net/manual/en/indexes.functions.php",
                            "Web APIs": "https://developer.mozilla.org/en-US/docs/Web/API"
                        }
                    ],
                    "tags": ["UI", "Patterns", "Compatibility", "HTML", "CSS", "JavaScript"]
                },
                {
                    "id": "23",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#run-fewer-simpler-queries-as-possible",
                    "guideline": "Run Fewer, Simpler Queries As Possible",
                    "description": "Making multiple requests whether HTTP or within a database has a carbon cost as infrastructure has to send that information back and forth. As such, managing how you store and use data locally for a visitor will help reduce wasted cycles.",
                    "criteria": [
                        {
                            "title": "Database Queries",
                            "testable": "Human Testable",
                            "description": "If you need information that is stored in a database, and you require it (or it's likely to be requested) more than once in your code, access the database only once, and store the data locally for subsequent processing. Also, avoid reliance on framework helpers that might defer filtering to later on in the process."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Filtering out unneeded data at a deeper level of the application may reduce energy usage, as less processing is required for (de)serialization.",
                            "Performance": "By holding the data locally rather than remotely, you can avoid waiting for an additional HTTP request to occur to process the string. Relational databases and other specialist data stores are generally heavily optimized for data filtering and retrieval. Performing transformations at this level of the application may lead to reduced CPU time and faster responses.",
                            "Economic": "Rather than pushing multiple additional demands to the server (which could lead to stress failures and lost business), an optimized codebase can reduce bandwidth overheads."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "$value = get_post_meta( int $post_id, string $key = '', bool $single = false ): mixed",
                            "content": "[get_post_meta Function](https://developer.wordpress.org/reference/functions/get_post_meta/)."
                        }
                    ],
                    "resources": [
                        {
                            "[GPFEDS] 4.9 - UX and UI (Server Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.3 - Back-End (Background Processing) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.5 - Front-End (Upload Triggers) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "High Performance MySQL: Query Performance Optimization": "https://www.oreilly.com/library/view/high-performance-mysql/9780596101718/ch04.html",
                            "Improving PHP Performance for Web Applications": "https://www.keycdn.com/blog/php-performance#9-limit-your-database-hits",
                            "Minimizing SQL query response times": "https://www.ibm.com/docs/en/cognos-analytics/11.1.0?topic=performance-minimizing-sql-query-response-times",
                            "Performance Tuning SQL Queries": "https://mode.com/sql-tutorial/sql-performance-tuning/",
                            "Query optimization techniques in SQL Server": "https://www.sqlshack.com/query-optimization-techniques-in-sql-server-tips-and-tricks/",
                            "SQL Query Optimization": "https://codedamn.com/news/sql/sql-query-optimization-tips-tricks-faster-queries"
                        }
                    ],
                    "tags": ["Performance", "Networking"]
                }
            ]
        },
        {
            "id": "4",
            "name": "Hosting, Infrastructure And Systems",
            "shortName": "Hosting & Infrastructure",
            "guidelines": [
                {
                    "id": "1",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#choose-a-sustainable-hosting-provider",
                    "guideline": "Choose a Sustainable Hosting Provider",
                    "description": "In addition to reducing the environmental impacts of a website, choose a hosting service that mitigates the remaining impacts. To make sure of this, there are many criteria to look for.",
                    "criteria": [
                        {
                            "title": "Monitor Metrics",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS01-1)",
                            "description": "To assess the environmental impacts of hosting and detect overconsumption, some indicators are monitored: energy / water usage, CPU / Memory usage, allocation of servers and CPU cores, etc. These indicators are be used to calculate metrics directly related to environmental impacts, such as Power Usage Effectiveness (PUE), Water Usage Effectiveness (WUE), and Carbon Usage Effectiveness (CUE). They are displayed to visitors for transparency and monitoring reasons. If possible (to reduce redundancy) the ability to scale packages based on usage requirements is made available (manually or automatically) to reduce wasted resources."
                        },
                        {
                            "title": "Equipment Longevity",
                            "testable": "Human Testable",
                            "description": "Equipment is managed responsibly by keeping it as long as possible, using it as efficiently as possible, making sure it is certified, and purchasing long-lifespan products."
                        },
                        {
                            "title": "Recycling Waste",
                            "testable": "Human Testable",
                            "description": "Waste (including equipment) is recovered, recycled, and upcycled."
                        },
                        {
                            "title": "Renewable Electricity",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS01-4)",
                            "description": "Electricity comes entirely from sources with the lowest possible carbon intensity (ideally generated by wind or solar rather than from non-renewable sources). For example, Renewable Energy Credits (RECs) can help verify the source, or, ideally, prove that electricity comes directly from renewable sources."
                        },
                        {
                            "title": "Remaining Emissions",
                            "testable": "Human Testable",
                            "description": "Remaining emissions are compensated, keeping in mind that the priority should be to avoid then reduce them and only compensate for them if they cannot be avoided. Carbon credits may not be sustainable, therefore the effectiveness of an offset solution must be verified, shown to be both environmentally viable and sustainable, and part of a longer-term strategy to eliminate emissions entirely from a chain, benefitting the wider ecosystem."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Helps in detecting overconsumption, reduces the environmental impacts of equipment (such as embodied carbon, for instance), and reduces the environmental impacts related to the production of consumed electricity.",
                            "Economic": "Reduces the quantity of equipment needed to be purchased."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Some hosting companies [display](https://pue.dc2.opcore.eu/en/) their PUE / WUE. In addition to being a good way for users and possible customers to get insight into this, it is also a good lever to incite competitors to do the same. The [Green Hosting Directory](https://www.thegreenwebfoundation.org/tools/directory/) from the Green Web Foundation offers a list of hosting companies that claim to use only renewable energies."
                        }
                    ],
                    "resources": [
                        {
                            "#3 Metrics for Datacenter Efficiency: PUE, CUE, and WUE": "https://submer.com/blog/pue-cue-and-wue-what-do-these-three-metrics-represent-and-which-is-one-is-the-most-important/",
                            "2020 Best Practice Guidelines for the EU Code of Conduct on Data Centre Energy Efficiency (PDF)": "https://e3p.jrc.ec.europa.eu/sites/default/files/documents/publications/jrc119571_jrc119571_2020_best_practice_guidelines_v11.1.0a_br_ma_21_jan.pdf",
                            "2024 Eco Web Hosting Review": "https://go.eco/news/2024-eco-web-hosting-review/",
                            "43% of major environmental websites make mass carbon emissions": "https://www.openaccessgovernment.org/43-of-major-environmental-websites-make-mass-carbon-emissions/134119/",
                            "An Even More Inconvenient Truth": "https://features.propublica.org/brazil-carbon-offsets/inconvenient-truth-carbon-credits-dont-work-deforestation-redd-acre-cambodia/",
                            "AWS WAF: SUS05-BP01 - Use the minimum amount of hardware to meet your needs": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_hardware_a2.html",
                            "AWS WAF: SUS05-BP04 - Optimize your use of hardware-based compute accelerators": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_hardware_a5.html",
                            "Benefits of buying sustainable goods and services": "https://www.netregs.org.uk/environmental-topics/carbon-reduction-and-efficiency/buying-eco-friendly-goods-and-services/benefits-of-buying-sustainable-goods-and-services/",
                            "Best Practices Guide for Energy-Efficient Data Center Design (PDF)": "https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf",
                            "Beyond PUE: Taclking IT's wasted terawatts (PDF)": "https://www.capex.net.co/wp-content/uploads/2020/02/Capex.pdf",
                            "Can you really negate your carbon emissions?": "https://www.vox.com/2020/2/27/20994118/carbon-offset-climate-change-net-zero-neutral-emissions",
                            "Carbon Aware Computing": "https://www.carbon-aware-computing.com/",
                            "Carbon Aware Computing: Next Green Breakthrough or New Greenwashing?": "https://hackernoon.com/carbon-aware-computing-next-green-breakthrough-or-new-greenwashing",
                            "Carbon accounting in the Cloud (PDF)": "https://arxiv.org/pdf/2406.09645",
                            "Carbon Awareness": "https://learn.greensoftware.foundation/carbon-awareness/",
                            "Carbon Credits vs Renewable Energy Credits": "https://impactful.ninja/carbon-credits-vs-renewable-energy-credits-differences/",
                            "Carbon Neutral Verification": "https://www.carbontrust.com/what-we-do/product-carbon-footprint-labelling/carbon-neutral-verification",
                            "Carbon Usage Effectiveness: A Green Grid Data Center Sustainability Metric": "https://www.thegreengrid.org/en/resources/library-and-tools/241-Carbon-Usage-Effectiveness-(CUE):-A-Green-Grid-Data-Center-Sustainability-Metric",
                            "Circular Economy": "https://sustainabilityguide.eu/sustainability/circular-economy/",
                            "Cloud Computing, Server Utilization, & the Environment": "https://aws.amazon.com/blogs/aws/cloud-computing-server-utilization-the-environment/",
                            "Code of Conduct on Data Centre Energy Efficiency (PDF)": "https://e3p.jrc.ec.europa.eu/sites/default/files/documents/publications/jrc132576_jrc132576_jrc_2023_best_practice_guidelines_v14.1.0final_gt1.pdf",
                            "Data center emissions probably 662% higher than big tech claims. Can it keep up the ruse?": "https://www.theguardian.com/technology/2024/sep/15/data-center-gas-emissions-tech",
                            "Data Center Water Usage Effectiveness": "https://www.akcp.com/blog/data-center-water-usage-effectiveness-wue/",
                            "Data Centres and Data Transmission Networks": "https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks",
                            "Data Centres Code of Conduct": "https://e3p.jrc.ec.europa.eu/communities/data-centres-code-conduct",
                            "Digital Reset (PDF)": "https://digitalization-for-sustainability.com/digital-reset/",
                            "Digital and metal study (French) (PDF)": "https://librairie.ademe.fr/economie-circulaire-et-dechets/7713-etude-numerique-et-metaux.html",
                            "Electronics and obsolescence in a circular economy": "https://www.eionet.europa.eu/etcs/etc-wmge/products/etc-wmge-reports/electronics-and-obsolescence-in-a-circular-economy",
                            "Energizta": "https://boavizta.github.io/Energizta/",
                            "Energy Consumption in Data Centres and Broadband Communication Networks in the EU": "https://publications.jrc.ec.europa.eu/repository/handle/JRC135926",
                            "Equations relating total annual energy consumption and chips energy efficiency": "https://www.researchgate.net/publication/371938289_Equations_relating_total_annual_energy_consumption_and_chips_energy_efficiency",
                            "Europe's consumption in a circular economy: the benefits of longer-lasting electronics": "https://www.eea.europa.eu/publications/europe2019s-consumption-in-a-circular/benefits-of-longer-lasting-electronics",
                            "[GPFEDS] 4.15 - UX and UI (Dark Patterns) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.1 - Hosting (Hosting Provider) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.2 - Hosting (Equipment Policy) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.3 - Hosting (Power Usage Effectiveness) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.4 - Hosting (Water Usage Effectiveness) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.5 - Hosting (Renewable Documentation) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.6 - Hosting (Local Datacenters) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.7 - Hosting (Heat Utilization) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-8002 - Does Cooling Affect Groundwater": "https://gr491.isit-europe.org/en/crit.php?id=1-8002-hosting-water-usage-is-associated-with-it-hosting",
                            "[GR491] 1-8004 - Water Quality From Usage": "https://gr491.isit-europe.org/en/crit.php?id=1-8004-hosting-the-data-center-must-be-able-to",
                            "[GR491] 1-8005 - Source Of Water": "https://gr491.isit-europe.org/en/crit.php?id=1-8005-hosting-there-is-no-unnecessary-water-treatment-required",
                            "[GR491] 1-8006 - Water Recovered Or Recycled": "https://gr491.isit-europe.org/en/crit.php?id=1-8006-hosting-the-treatment-of-waste-generated-by-a",
                            "[GR491] 1-8007 - Noise Pollution": "https://gr491.isit-europe.org/en/crit.php?id=1-8007-hosting-in-accordance-with-article-l1382-of-the",
                            "[GR491] 1-8008 - Heat Reusage": "https://gr491.isit-europe.org/en/crit.php?id=1-8008-hosting-the-transformation-of-energy-produces-heat.-in",
                            "[GR491] 1-8013 - Server Power Efficiency": "https://gr491.isit-europe.org/en/crit.php?id=1-8013-hosting-one-factor-in-reducing-the-hosting-footprint",
                            "[GR491] 1-8014 - Power Usage Effectivness": "https://gr491.isit-europe.org/en/crit.php?id=1-8014-hosting-the-total-power-consumed-by-the-data",
                            "[GR491] 1-8016 - Water Usage Effectivness": "https://gr491.isit-europe.org/en/crit.php?id=1-8016-hosting-the-total-water-consumed-by-the-data",
                            "[GR491] 1-8017 - Datacenter Best Practices": "https://gr491.isit-europe.org/en/crit.php?id=1-8017-hosting-datacenter-business-give-more-and-more-rules",
                            "[GR491] 2-8023 - Respect for Labor Code": "https://gr491.isit-europe.org/en/crit.php?id=2-8023-hosting-data-center-hardware-supply-providers-should-be",
                            "[GR491] 3-8026 - Power Off When Not In Use": "https://gr491.isit-europe.org/en/crit.php?id=3-8026-hosting-the-network-infrastructure-is-at-the-heart",
                            "[GR491] 3-8027 - Physical VS Virtual": "https://gr491.isit-europe.org/en/crit.php?id=3-8027-hosting-virtualization-techniques-make-it-possible-to-pool",
                            "[GR491] 3-8030 - Technical Choice Optimization": "https://gr491.isit-europe.org/en/crit.php?id=3-8030-hosting-different-solutions-offered-by-hosting-providers-generate",
                            "[GR491] 4-8039 - Renewable Energy Usage": "https://gr491.isit-europe.org/en/crit.php?id=4-8039-hosting-the-activity-of-a-data-center-requires",
                            "[GR491] 4-8040 - Certified Equipment": "https://gr491.isit-europe.org/en/crit.php?id=4-8040-hosting-environmental-standards-labels-and-certifications-are-becoming",
                            "[GR491] 4-8041 - Energy Use Information": "https://gr491.isit-europe.org/en/crit.php?id=4-8041-hosting-the-total-energy-consumption-is-useful-for",
                            "[GR491] 4-8042 - Customer Transparency": "https://gr491.isit-europe.org/en/crit.php?id=4-8042-hosting-the-activity-of-a-data-center-generates",
                            "[GR491] 4-8047 - Repair Over Replace": "https://gr491.isit-europe.org/en/crit.php?id=4-8047-hosting-the-repairability-of-equipment-and-the-effective",
                            "[GR491] 4-8048 - End-Of-Life": "https://gr491.isit-europe.org/en/crit.php?id=4-8048-hosting-the-renewal-of-the-technical-park-is",
                            "[GR491] 4-8051 - Cooling Impact": "https://gr491.isit-europe.org/en/crit.php?id=4-8051-hosting-cooling-techniques-involve-either-the-production-of",
                            "[GR491] 5-8053 - Efficiency Measurements": "https://gr491.isit-europe.org/en/crit.php?id=5-8053-hosting-the-standards-for-data-centers-highlight-efficiency",
                            "[GR491] 6-8063 - Datacenter Certification": "https://gr491.isit-europe.org/en/crit.php?id=6-8063-hosting-the-characteristics-of-geographic-areas-may-require",
                            "Green Web Foundation Directory": "https://app.greenweb.org/directory/",
                            "How much water do data centres use?": "https://smartwatermagazine.com/news/h2o-building-services/how-much-water-do-data-centres-use",
                            "How to Choose the Best Green Web Hosting Provider": "https://dodonut.com/blog/how-to-choose-the-best-green-web-hosting-provider/",
                            "How to cut water usage in cloud data centers": "https://www.datacenterdynamics.com/en/opinions/how-to-cut-water-usage-in-cloud-data-centers/",
                            "I Made My Blog Solar-Powered, Then Things Escalated": "https://louwrentius.com/i-made-my-blog-solar-powered-then-things-escalated.html",
                            "Is carbon compensation a real climate solution?": "https://genevasolutions.news/climate-environment/is-carbon-compensation-a-real-climate-solution",
                            "Measuring the Emissions & Energy Footprint of the ICT Sector": "https://documents1.worldbank.org/curated/en/099121223165540890/pdf/P17859712a98880541a4b71d57876048abb.pdf",
                            "New perspectives on internet electricity use in 2030": "https://pisrt.org/psr-press/journals/easl-vol-3-issue-2-2020/new-perspectives-on-internet-electricity-use-in-2030/",
                            "Promoting product longevity (PDF)": "https://www.europarl.europa.eu/RegData/etudes/STUD/2020/648767/IPOL_STU(2020)648767_EN.pdf",
                            "Quick Guide to Sustainable Design Strategies": "https://medium.com/disruptive-design/quick-guide-to-sustainable-design-strategies-641765a86fb8",
                            "RECs, PPAs, Allowances and EECs": "https://offsetguide.org/understanding-carbon-offsets/other-instruments-for-claiming-emission-reductions/",
                            "Reduce, Reuse, Recycle": "https://www.scientificamerican.com/article/reduce-reuse-recycle-why-all-3-rs-are-critical-to-a-circular-economy/",
                            "Reporting requirements on the energy performance and sustainability of data centres for the Energy Efficiency Directive": "https://op.europa.eu/en/publication-detail/-/publication/d9404897-7221-11ee-9220-01aa75ed71a1/language-en",
                            "Requirements for Energy Efficiency Management": "https://emile22.github.io/draft-stephan-green-ucs-and-reqs/draft-stephan-green-ucs-and-reqs.html",
                            "Revealed: more than 90% of rainforest carbon offsets by biggest certifier are worthless, analysis shows": "https://www.theguardian.com/environment/2023/jan/18/revealed-forest-carbon-offsets-biggest-provider-worthless-verra-aoe",
                            "The staggering ecological impacts of computation and the cloud": "https://computing.mit.edu/news/the-staggering-ecological-impacts-of-computation-and-the-cloud/",
                            "Sustainability Guide: Product": "https://sustainabilityguide.eu/ecodesign/product/",
                            "Sustainability Guide: Use": "https://sustainabilityguide.eu/ecodesign/use/",
                            "The circular economy in detail: Deep dive": "https://www.ellenmacarthurfoundation.org/the-circular-economy-in-detail-deep-dive",
                            "The environmental footprint of the digital world (PDF)": "https://www.greenit.fr/wp-content/uploads/2019/11/GREENIT_EENM_etude_EN_accessible.pdf",
                            "The real climate and transformative impact of ICT": "https://www.sciencedirect.com/science/article/pii/S2666389921001884",
                            "Use Cases for Energy Efficiency Management": "https://www.ietf.org/archive/id/draft-stephan-green-use-cases-00.html",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 6 (Water & Sanitation)": "https://sdgs.un.org/goals/goal6#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Web Hosting: Renewable Energy & RECs": "https://www.mightybytes.com/blog/web-hosting-renewable-energy/",
                            "What Are Renewable Energy Credits?": "https://www.inspirecleanenergy.com/blog/clean-energy-101/what-are-renewable-energy-credits",
                            "What is a circular economy?": "https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview",
                            "What is PUE / DCiE? How to Calculate, What to Measure": "https://www.42u.com/measurement/pue-dcie.htm",
                            "Why hyperscale, modular data centers improve efficiency": "https://venturebeat.com/business/why-hyperscale-modular-data-centers-improve-efficiency/",
                            "Worthless: Chevron's carbon offsets are mostly junk and some may harm, research says": "https://www.theguardian.com/environment/2023/may/24/chevron-carbon-offset-climate-crisis"
                        }
                    ],
                    "tags": ["Social Equity", "Hardware", "Networking"]
                },
                {
                    "id": "2",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#optimize-browser-caching",
                    "guideline": "Optimize Browser Caching",
                    "description": "Browser caching reduces the requirement for files to need to be constantly reloaded from the server, and in certain situations, it can even allow for files to be viewed offline (or in the case of a reverse proxy, send immediate recurring requests without additional calculation or computation from the server). As such, this will have sustainability and performance benefits (for instance by greatly reducing Time-To-First-Byte).",
                    "criteria": [
                        {
                            "title": "Utilize Caching",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS02-1)",
                            "description": "If using a CMS or (SaaS), install an applicable plugin to enable on-the-fly server-side caching. Otherwise, use the provided server configuration files to include and tweak the file-type cache expiration using expires or cache-control, utilizing tooling where appropriate such as Memcached, or Varnish. If using a language or framework that generates pages on request, cache responses for static pages so that they can be reused for future visitors. Also remember to cache frequently required static assets at the client-side where possible to reduce repeat server requests using bfcache, Local Storage, and other available browser technologies."
                        },
                        {
                            "title": "Offline Access",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS02-2)",
                            "description": "Client-side JavaScript uses a combination of ServiceWorkers, WebWorkers, storage Application Programming Interfaces (APIs), or cookies (if necessary) to streamline the user-journey. For example, through the use of a PWA (Progressive Web Application) to ensure that an offline version is available and accessible at all times to reduce inequality and improve accessibility."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Social Equity": "Allows websites to be functional in regions where no or intermittent Internet connectivity is available.",
                            "Performance": "Unmodified files don't need to constantly be redownloaded (saving bandwidth, and server-side caching reduces the amount of computing resources required (as fewer HTTP requests will likely be submitted). Also, being selective over cached content balances faster reloads over the need to request new pages, which means that visitors may experience less latency due to data being held for repeat requests.",
                            "Economic": "Reduced data transfer allows for savings for individuals on a monitored data plan and infrastructure costs for the provider.",
                            "Conversion": "Caching increases repeat visitor page-load speeds (a customer benefit)."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "High",
                            "water": "Medium",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "code": "Expires:  Wed, 01 Jun 2023 08:00:00 GMT",
                            "content": "HTTP [expires](https://http.dev/expires) headers can be used to control the response."
                        },
                        {
                            "code": "<IfModule mod_expires.c>\r\n\tExpiresActive on\r\n\t# Default: Fallback\r\n\tExpiresDefault                                      \"access plus 1 year\"\r\n\t# Specific: Assets\r\n\tExpiresByType image\/x-icon                          \"access plus 1 week\"\r\n\tExpiresByType application\/rss+xml                   \"access plus 1 hour\"\r\n\tExpiresByType application\/json                      \"access\"\r\n<\/IfModule>",
                            "content": "[htaccess Server MIME Type Control](https://github.com/h5bp/server-configs-apache/blob/main/dist/.htaccess). [Apache](https://github.com/h5bp/server-configs-apache) and [NGINX](https://github.com/h5bp/server-configs-nginx) boilerplates are available."
                        }
                    ],
                    "resources": [
                        {
                            "A Web Caching Primer": "https://www.researchgate.net/publication/2570397_A_Web_Caching_Primer",
                            "Apache Configuration: .htaccess": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Server-side/Apache_Configuration_htaccess",
                            "Back/forward cache": "https://web.dev/articles/bfcache?hl=en",
                            "Client-side storage": "https://developer.mozilla.org/en-US/docs/Learn_web_development/JavaScript/Client-side_web_APIs/Client-side_storage",
                            "Front-End Performance 2021: Build Optimizations": "https://www.smashingmagazine.com/2021/01/front-end-performance-build-optimizations/",
                            "Future trends of Green All Optical Networks and ICT Infrastructure in a large context": "https://www.researchgate.net/publication/368690756_Future_trends_of_Green_All_Optical_Networks_and_ICT_Infrastructure_in_a_large_context_-_trends_to_2050",
                            "Going Offline": "https://goingoffline.adactio.com/",
                            "[GPFEDS] 2.3 - Specifications (Connection Issues) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.2 - Front-End (Caching Mechanisms) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.1 - Back-End (Reusability Caching) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-7032 - Browser Caches": "https://gr491.isit-europe.org/en/crit.php?id=2-7032-backend-the-use-of-certain-frameworks-in-particular",
                            "[GR491] 3-5015 - Cache Usage": "https://gr491.isit-europe.org/en/crit.php?id=3-5015-frontend-the-reduction-of-the-volumes-of-exchanges",
                            "[GR491] 7-3051 - Search Utilization": "https://gr491.isit-europe.org/en/crit.php?id=7-3051-uxui-internat-search-engines-usage-in-the-service",
                            "How to Build a Low-tech Website?": "https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/",
                            "How to improve your page load time with browser caching": "https://www.debugbear.com/blog/browser-caching",
                            "How to Reduce Initial Server Response Time": "https://www.debugbear.com/blog/reduce-initial-server-response-time",
                            "Impact of New and Emerging Internet Technologies on Climate Change and Human Rights (PDF)": "https://www.law.ox.ac.uk/sites/default/files/migrated/un_human_rights_council_advisory_committee_submission_-_new_and_emerging_technologies_-_allmann_hazas.pdf",
                            "Learn PWA": "https://web.dev/learn/pwa?hl=en",
                            "Microsoft Azure WAF: Selecting Services": "https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/select-services",
                            "Microsoft Azure WAF: Server VS Client Rendering": "https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-application-design#evaluate-server-side-vs-client-side-rendering",
                            "My solar-powered and self-hosted website": "https://dri.es/my-solar-powered-and-self-hosted-website",
                            "Progressive web apps": "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps",
                            "Progressive Web Apps: Going Offline": "https://developers.google.com/codelabs/pwa-training/pwa03--going-offline?hl=en",
                            "Resilient web design": "https://resilientwebdesign.com/",
                            "Service workers": "https://web.dev/learn/pwa/service-workers?hl=en",
                            "Varnish Cache": "https://wp-rocket.me/wordpress-cache/varnish-http-cache-server/",
                            "Web Caching 101": "https://nitropack.io/blog/post/web-caching-beginners-guide"
                        }
                    ],
                    "tags": ["Assets", "HTML", "JavaScript", "Performance", "Networking"]
                },
                {
                    "id": "3",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#compress-your-files",
                    "guideline": "Compress Your Files",
                    "description": "Every file will take up a certain amount of room on a server's hard drive, and this data will need to be sent across the wire to each visitor. Doing so will consume resources, but by using compression algorithms you can shrink each file to make its journey less impactful.",
                    "criteria": [
                        {
                            "title": "Server-side Compression",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS03-1)",
                            "description": "If using a CMS, install an applicable plugin to enable on-the-fly server-side compression, such as Brotli or GZIP. Otherwise, use the provided server configuration files to include and tweak the performance-related features to the requirements."
                        },
                        {
                            "title": "Media Compression",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS03-2)",
                            "description": "Compress your various images, fonts, audio, and video; by reducing the quality and offering different resolutions / dimensions (sizes) before uploading to a server or content management system."
                        }
                    ],
                    "impact": "High",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Social Equity": "Reduced reliance on a high-speed connection (which in many locations is unavailable).",
                            "Accessibility": "People with accessibility needs are disproportionately affected by poverty and lower levels of income and thereby are more likely to be unable to afford either a high speed or the high cost of data plans found on cellular networks and satellite providers.",
                            "Performance": "Reduced data consumption (with a slight increase in visitor CPU decompression with server-side techniques).",
                            "Economic": "Reduced data transfer allows for savings for individuals on a monitored data plan."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "Accept-Encoding: zstd, gzip, br, deflate",
                            "content": "HTTP [compression](https://http.dev/compression) headers can be used to control the response."
                        },
                        {
                            "code": "<IfModule mod_deflate.c>\r\n\t<IfModule mod_setenvif.c>\r\n\t\t<IfModule mod_headers.c>\r\n\t\t\tSetEnvIfNoCase ^(Accept-EncodXng|X-cept-Encoding|X{15}|~{15}|-{15})$ ^((gzip|deflate)\\s*,?\\s*)+|[X~-]{4,13}$ HAVE_Accept-Encoding\r\n\t\t\tRequestHeader append Accept-Encoding \"gzip,deflate\" env=HAVE_Accept-Encoding\r\n\t\t<\/IfModule>\r\n\t<\/IfModule>\r\n\t<IfModule mod_filter.c>\r\n\t\tAddOutputFilterByType DEFLATE \"application\/atom+xml application\/javascript application\/json application\/ld+json application\/manifest+json application\/rdf+xml application\/rss+xml application\/schema+json application\/geo+json application\/vnd.ms-fontobject application\/wasm application\/x-font-ttf application\/x-javascript application\/x-web-app-manifest+json application\/xhtml+xml application\/xml font\/eot font\/opentype font\/otf font\/ttf image\/bmp image\/svg+xml image\/vnd.microsoft.icon image\/x-icon text\/cache-manifest text\/calendar text\/css text\/html text\/javascript text\/plain text\/markdown text\/vcard text\/vnd.rim.location.xloc text\/vtt text\/x-component text\/x-cross-domain-policy text\/xml\"\r\n\t<\/IfModule>\r\n\t<IfModule mod_mime.c>\r\n\t\tAddEncoding gzip              svgz\r\n\t<\/IfModule>\r\n<\/IfModule>",
                            "content": "[htaccess GZIP Settings](https://github.com/h5bp/server-configs-apache/blob/main/dist/.htaccess). [Apache](https://github.com/h5bp/server-configs-apache) and [NGINX](https://github.com/h5bp/server-configs-nginx) boilerplates are available."
                        }
                    ],
                    "resources": [
                        {
                            "10 Steps to Avoid Enormous Network Payloads": "https://www.debugbear.com/blog/avoid-enormous-network-payloads",
                            "Apache Configuration: .htaccess": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Server-side/Apache_Configuration_htaccess",
                            "Audacity": "https://www.audacityteam.org/",
                            "Cost of living: Impact of rising costs on disabled people": "https://lordslibrary.parliament.uk/cost-of-living-impact-of-rising-costs-on-disabled-people/",
                            "Does GZIP Save CO2?": "https://www.green-coding.io/case-studies/does-gzip-save-co2/",
                            "Digital sustainability audits: a de facto standard for the Internet carbon footprint": "https://www.researchgate.net/publication/343041330_Digital_sustainability_audits_a_de_facto_standard_for_the_Internet_carbon_footprint",
                            "Fast Load Times: Optimize your images": "https://web.dev/explore/fast?hl=en#optimize-your-images",
                            "Front-End Performance 2021: Assets Optimizations": "https://www.smashingmagazine.com/2021/01/front-end-performance-assets-optimizations/",
                            "Getting Real (small) With Compression Dictionaries": "https://calendar.perfplanet.com/2024/getting-real-small-with-compression-dictionaries/",
                            "[GPFEDS] 1.7 - Strategy (Encryption) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.3 - Front-End (Resource Compression) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Handbrake": "https://handbrake.fr/",
                            "How does data compression affect CO2 emission in Nginx?": "https://github.com/toirl/less-carbon-nginx",
                            "How to Optimize Images for Faster Load Times and Sustainability": "https://www.mightybytes.com/blog/how-to-optimize-images/",
                            "Impact of New and Emerging Internet Technologies on Climate Change and Human Rights (PDF)": "https://www.law.ox.ac.uk/sites/default/files/migrated/un_human_rights_council_advisory_committee_submission_-_new_and_emerging_technologies_-_allmann_hazas.pdf",
                            "Internet Speeds by Country 2023": "https://worldpopulationreview.com/country-rankings/internet-speeds-by-country",
                            "Optimizing Encoding and Transfer Size of Text-Based Assets": "https://web.dev/articles/optimizing-content-efficiency-optimize-encoding-and-transfer?hl=en",
                            "Page bloat update": "https://www.speedcurve.com/blog/page-bloat-2025/",
                            "Reduce web font size": "https://web.dev/articles/reduce-webfont-size?hl=en",
                            "Responsive images": "https://developer.mozilla.org/en-US/docs/Web/HTML/Responsive_images",
                            "Should I Use A Carousel": "https://shouldiuseacarousel.com/",
                            "Squoosh": "https://squoosh.app/",
                            "Supercharge compression efficiency with shared dictionaries": "https://developer.chrome.com/blog/shared-dictionary-compression?hl=en",
                            "SVG OMG": "https://jakearchibald.github.io/svgomg/",
                            "Ten years of page bloat: What have we learned?": "https://www.speedcurve.com/blog/ten-years-page-bloat/",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "The Ultimate Guide to Image Optimisation": "https://calibreapp.com/blog/image-optimisation-guide",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Website carbon emissions": "https://open-innovations.org/blog/2020-04-29-website-carbon-emissions.html",
                            "What is page bloat?": "https://www.speedcurve.com/blog/page-bloat-web-performance/",
                            "Who Killed My Battery: Analyzing Mobile Browser Energy Consumption (PDF)": "https://mobisocial.stanford.edu/papers/boneh-www2012.pdf"
                        }
                    ],
                    "tags": ["Assets", "Performance", "Networking"]
                },
                {
                    "id": "4",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-error-pages-and-redirects-carefully",
                    "guideline": "Use Error Pages and Redirects Carefully",
                    "description": "Navigation errors lead to mistakes, which lead to visitors wasting time trying to resolve them, or abandoning a website altogether. Anything that can be done to interject, predict, and way-find around potential problems will reduce emissions over time.",
                    "criteria": [
                        {
                            "title": "Error Pages",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS04-1)",
                            "description": "Maintain sites by ensuring links are correct, and if errors occur, provide suitable way-finding within optimized pages for each error type to ensure resources can be identified to help visitors complete the task they started."
                        },
                        {
                            "title": "Redirection",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS04-2)",
                            "description": "Redirect websites, subdomains, and pages only when necessary. Proactively seek broken or outdated links and fix them. A redirect or search will often help reduce the number of pages a visitor needs to load."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "While errors and redirects should be avoided, it's not likely possible. Therefore, having the page's visitor's encounter optimized will hopefully reduce their frustration (and thereby their time on screen trying to pick a new route - or worse, giving up).",
                            "Transparency": "Problems can occur, having failsafe mechanisms in place prevents the visitor from being blamed, and it gives them a direction to move once they encounter an error.",
                            "Accessibility": "Error pages matter, they can help lost individuals find their path, and providing useful navigation and appropriate signage can reduce the loss of abandonment. This can be especially useful for individuals with cognitive impairments who may have reached such a location due to forgetting where a resource was located, being unable to spell the URL correctly, or finding themselves at a dead end due to confusion.",
                            "Performance": "Redirects used appropriately can help visitors find a resource that has been moved quickly.",
                            "Conversion": "Visitors are less likely to abandon a website if they can find an instant solution."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "ErrorDocument 404 /404.html",
                            "content": "[htaccess Error Documents](https://github.com/h5bp/server-configs-apache/blob/main/dist/.htaccess). [Apache](https://github.com/h5bp/server-configs-apache) and [NGINX](https://github.com/h5bp/server-configs-nginx) boilerplates are available."
                        }
                    ],
                    "resources": [
                        {
                            "6 Best practices for 404 pages with killer UX": "https://uxplanet.org/6-best-practices-for-404-pages-with-killer-ux-d9305db19ad9",
                            "11 Best Practices for Designing 404 Pages": "https://app.uxcel.com/tutorials/11-best-practices-for-designing-404-pages-656",
                            "Avoid Multiple Page Redirects": "https://www.debugbear.com/blog/avoid-multiple-page-redirects",
                            "[GR491] 5-4047 - URL Validity": "https://gr491.isit-europe.org/en/crit.php?id=5-4047-contents-content-uses-external-references-rather-than-duplicating",
                            "Elements of a Great 404 Page": "https://www.mightybytes.com/blog/elements-great-404-page/",
                            "How Error Pages and Redirects Make Your Website More Sustainable": "https://www.mightybytes.com/blog/redirects-sustainability/",
                            "How to create great error pages": "https://uxdesign.cc/how-to-create-great-error-pages-b2de5e5daca8",
                            "How to Redirect a Web Page": "https://css-tricks.com/redirect-web-page/",
                            "HTTP response status codes": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
                            "When Online Content Disappears": "https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/",
                            "Why You Should Constantly Check for Broken Links in WordPress": "https://www.greengeeks.com/tutorials/why-you-should-constantly-check-for-broken-links-in-wordpress/",
                            "Why you should be testing your 404 pages web performance": "https://nooshu.com/blog/2020/08/25/you-should-be-testing-your-404-pages-web-performance/"
                        }
                    ],
                    "tags": ["Content", "UI", "Usability", "Compatibility", "Networking", "Marketing"]
                },
                {
                    "id": "5",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#limit-usage-of-additional-environments",
                    "guideline": "Limit Usage of Additional Environments",
                    "description": "Decommission or switch off additional environments, such as testing / Quality Assurance QA) / re-production and other such environments when they are not useful.",
                    "criteria": [
                        {
                            "title": "Unused Environments",
                            "testable": "Human Testable",
                            "description": "Ensure no unused environment is available, balancing the cost of deploying an environment with the cost of keeping it online while unused."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Avoids consuming resources for unused services.",
                            "Economic": "Unused services should not be paid for, resulting in savings."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Website [testing](https://webhint.io/) environments should not be automated but run on command."
                        }
                    ],
                    "resources": [
                        {
                            "AWS WAF: SUS02-BP03": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a4.html",
                            "[GPFEDS] 3.7 - Architecture (Optimized Testing) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-8026 - Not In Use Equipment": "https://gr491.isit-europe.org/en/crit.php?id=3-8026-hosting-the-network-infrastructure-is-at-the-heart",
                            "Toward sustainable software engineering": "https://increment.com/containers/containers-for-sustainable-software-engineering/",
                            "United Nations [SDGS] Goal 6 (Water & Sanitation)": "https://sdgs.un.org/goals/goal6#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators"
                        }
                    ],
                    "tags": ["Performance", "Hardware", "Software", "Networking"]
                },
                {
                    "id": "6",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#automate-to-fit-the-needs",
                    "guideline": "Automate To Fit the Needs",
                    "description": "Any tasks, especially repetitive, that can be automated should be automated (compilation, deployment, tests, etc.) to reduce time at the computer being wasted by people.",
                    "criteria": [
                        {
                            "title": "Automate Tasks",
                            "testable": "Human Testable",
                            "description": "Every recurring task, such as deployment, testing, or compilation, is run automatically, as recommended by continuous integration / continuous delivery best practices."
                        },
                        {
                            "title": "Necessitate Tasks",
                            "testable": "Human Testable",
                            "description": "To reduce wasted processing cycles, every automated task is only run when needed."
                        },
                        {
                            "title": "Automated Scaling",
                            "testable": "Human Testable",
                            "description": "Automated scaling infrastructure is used to automatically increase the capacity of the web server and buffering / throttling is implemented to respond to visitor demand."
                        },
                        {
                            "title": "Security Tooling",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS06-4)",
                            "description": "Web browsing from bots has been steadily increasing in recent years. As such, it is a growing concern for security, performance, and sustainability. Use security tools that automatically block bad actors and minimize bad behavior. This results in substantially less load on the server, fewer logs, less data, less effect due to compromise, and more. The result of compromised websites is a large increase in HTTP, email, and other traffic as malicious code attempts to infiltrate other resources and exfiltrate data. Compromised websites are typically identified by anomalous patterned behavior."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "These practices can reduce the resources necessary to execute tasks, which can also result in reduced emissions.",
                            "Operations": "When coupled with upskilling and cross-training, automation can also improve team performance and operational efficiency.",
                            "Economic": "Automation can help reduce organizational costs."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Cleaning up bad bots](https://blog.cloudflare.com/cleaning-up-bad-bots/) can improve sustainability."
                        }
                    ],
                    "resources": [
                        {
                            "2020 Best Practice Guidelines for the EU Code of Conduct on Data Centre Energy Efficiency (PDF)": "https://e3p.jrc.ec.europa.eu/sites/default/files/documents/publications/jrc119571_jrc119571_2020_best_practice_guidelines_v11.1.0a_br_ma_21_jan.pdf",
                            "AWS WAF: SEC11-BP02 - Automate testing throughout the development and release lifecycle": "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/sec_appsec_automate_testing_throughout_lifecycle.html",
                            "AWS WAF: SEC05-BP03 - Automate network protection": "https://docs.aws.amazon.com/wellarchitected/2023-04-10/framework/sec_network_protection_auto_protect.html",
                            "AWS WAF: SEC11-BP06 - Deploy software programmatically": "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/sec_appsec_deploy_software_programmatically.html",
                            "AWS WAF: SUS02-BP01 - Scale workload infrastructure dynamically": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a2.html",
                            "AWS WAF: SUS02-BP03 - Stop the creation and maintenance of unused assets": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a4.html",
                            "AWS WAF: SUS02-BP06 - Implement buffering or throttling to flatten the demand curve": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a7.html",
                            "AWS WAF: SUS03-BP01 - Optimize software and architecture for asynchronous and scheduled jobs": "https://docs.aws.amazon.com/wellarchitected/latest/framework/sus_sus_software_a2.html",
                            "Bot traffic: What it is and why you should care about it": "https://yoast.com/what-to-know-about-bot-traffic/",
                            "Code of Conduct on Data Centre Energy Efficiency (PDF)": "https://e3p.jrc.ec.europa.eu/sites/default/files/documents/publications/jrc132576_jrc132576_jrc_2023_best_practice_guidelines_v14.1.0final_gt1.pdf",
                            "Distribution of bot and human web traffic worldwide from 2014 to 2021": "https://www.statista.com/statistics/1264226/human-and-bot-web-traffic-share/",
                            "[GPFEDS] 3.2 - Architecture (Resource Tailoring) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.1 - Front-End (Download Limits) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.10 - Hosting (Asynchronous Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-8028 - Memory Usage": "https://gr491.isit-europe.org/en/crit.php?id=3-8028-hosting-the-management-of-the-consumption-of-physical",
                            "[GR491] 3-8029 - CPU Usage": "https://gr491.isit-europe.org/en/crit.php?id=3-8029-hosting-the-cpu-resources-available-to-virtual-machines",
                            "[GR491] 3-8031 - Unused CPU Cores": "https://gr491.isit-europe.org/en/crit.php?id=3-8031-hosting-hosted-services-do-not-always-have-the",
                            "[GR491] 3-8036 - Provisioning and Deprovisionning": "https://gr491.isit-europe.org/en/crit.php?id=3-8036-hosting-when-hosting-a-service-each-component-part",
                            "How AI and automation make data centers greener and more sustainable": "https://www.ey.com/en_in/insights/technology/how-ai-and-automation-make-data-centers-greener-and-more-sustainable",
                            "How and Why To Prevent Bots From Crawling Your Site": "https://www.searchenginejournal.com/prevent-bot-crawling/450430/",
                            "How Crawl Optimization Improves Website Sustainability": "https://www.mightybytes.com/blog/how-crawl-optimization-improves-website-sustainability/",
                            "How Green is Your Data Center?": "https://www.readyworks.com/blog/how-green-is-your-data-center-use-automation-to-simplify-esg-reporting",
                            "How to Eliminate Bots From Your Website": "https://www.hostpapa.com/blog/security/how-to-eliminate-bots-from-your-website/",
                            "Load shifting of computing can lower emissions and soak up surplus renewables. Except when it doesn't": "https://watttime.org/news-and-insights/load-shifting-of-computing-can-lower-emissions-and-soak-up-surplus-renewables-except-when-it-doesnt/",
                            "Microsoft Azure WAF: Sustainable workloads": "https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-get-started",
                            "Microsoft Azure WAF: Security considerations": "https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-security"
                        }
                    ],
                    "tags": ["Performance", "Software"]
                },
                {
                    "id": "7",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#maintain-a-relevant-refresh-frequency",
                    "guideline": "Maintain a Relevant Refresh Frequency",
                    "description": "Only send data from the server when the visitor needs it. As much as possible, you can rely on client-side or server-side cache and client-side / local storage. Rather than refreshing data on a given frequency, it might be up to the visitor to manually ask for a refresh.",
                    "criteria": [
                        {
                            "title": "Refresh Frequency",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS07-1)",
                            "description": "The frequency for refresh (of both the cache, locally stored data, and the page) is defined depending on visitor needs."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Caching reduces energy consumption for both servers and end-user devices. This reduces emissions.",
                            "Economic": "Caching can potentially reduce costs by reducing the amount of data transmitted over the network."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "When displaying an estimated time of arrival for a bus, it should be refreshed no more than once per minute."
                        }
                    ],
                    "resources": [
                        {
                            "A Review on Green Caching Strategies for Next Generation Communication Networks": "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9272291",
                            "A Web Caching Primer": "https://www.researchgate.net/publication/2570397_A_Web_Caching_Primer",
                            "Everything About WordPress Cache": "https://wp-rocket.me/wordpress-cache/",
                            "Five Data-Loading Patterns To Boost Web Performance": "https://www.smashingmagazine.com/2022/09/data-loading-patterns-improve-frontend-performance/",
                            "[GPFEDS] 4.9 - UX and UI (Server Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.1 - Back-End (Reusability Caching) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How Caching Helps In Improving Performance Of Application": "https://www.clariontech.com/blog/how-caching-helps-in-improving-performance-of-the-application",
                            "How to Reduce the HTTP/S Requests Your WordPress website Makes": "https://www.greengeeks.com/tutorials/reduce-http-requests-wordpress/"
                        }
                    ],
                    "tags": ["Usability", "JavaScript", "Performance", "Networking"]
                },
                {
                    "id": "8",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#be-mindful-of-duplicate-data",
                    "guideline": "Be Mindful of Duplicate Data",
                    "description": "For security reasons and in accordance with a Service-Level Agreement (SLA), it is often recommended to duplicate data to make sure it remains available if a problem occurs. This should be balanced with the cost of such duplication. Not all data is critical and, rather than overcompensating with multiple saves, duplication should be designed with efficiency in mind.",
                    "criteria": [
                        {
                            "title": "Data Backups",
                            "testable": "Human Testable",
                            "description": "Backups of system and user data are both incremental and secure."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Limiting redundancy reduces the amount of consumed resources.",
                            "Economic": "Limiting redundancy can reduce the induced storage costs."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Incremental backups contain only files that have been modified or changed since the last backup. Furthermore, backups older than a specified amount of time are removed. A classic [example](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/) of a backup maintenance strategy is the 3-2-1 technique."
                        }
                    ],
                    "resources": [
                        {
                            "AWS WAF: SUS04-BP03 - Use policies to manage the lifecycle of your datasets": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html",
                            "AWS WAF: SUS04-BP05 - Remove unneeded or redundant data": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a6.html",
                            "AWS WAF: SUS04-BP08 - Back up data only when difficult to recreate": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a9.html",
                            "[GPFEDS] 1.6 - Strategy (Data Collection) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.2 - Back-End (Data Retention) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.8 - Hosting (Hot / Cold Data) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.9 - Hosting (Duplicate Data) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-7005 - Data Backups": "https://gr491.isit-europe.org/en/crit.php?id=1-7005-backend-one-piece-of-data-might-be-present",
                            "[GR491] 3-8032 - Incremental Backups": "https://gr491.isit-europe.org/en/crit.php?id=3-8032-hosting-security-is-one-of-the-key-points"
                        }
                    ],
                    "tags": ["Performance", "Hardware"]
                },
                {
                    "id": "9",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#enable-asynchronous-processing-and-communication",
                    "guideline": "Enable Asynchronous Processing and Communication",
                    "description": "Depending on carbon intensity, some processes and communications should be delayed and sometimes batched. Redundancy should be avoided wherever possible. This could also be a way to reduce the workload on a server or Virtual Machine (VM). In such cases, visitors should be warned that the process is asynchronous and notified when it is over.",
                    "criteria": [
                        {
                            "title": "Batch Processing",
                            "testable": "Human Testable",
                            "description": "By default, non-critical processes and communications are batched and launched only when carbon intensity is under a given threshold."
                        },
                        {
                            "title": "Protocol Usage",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS09-2)",
                            "description": "The communication protocols used are relevant to the visitor's needs and data transferred. Avoid using insecure protocols (HTTP, FTP), and prioritize more efficient and privacy-aware data routes for visitors (HTTPS, SSH). Modern protocols such as HTTP/2 should be used to benefit from them (multiplexing) while keeping backward-compatibility in mind for older devices."
                        },
                        {
                            "title": "Event-Driven Architecture",
                            "testable": "Human Testable",
                            "description": "When creating products or services that utilize state changes (without triggering a complete refresh), if the utilization of Event-Driven Architecture and Microservices will be more environmentally friendly (based on the PPP variables involved) than traditional APIs in handling the server-side workload of your solution, use it."
                        },
                        {
                            "title": "Client VS Server",
                            "testable": "Human Testable",
                            "description": "Redundant processing should be avoided wherever possible. When processing of data is required, whether such processing and / or delivery should occur from either the client or server-side must be determined based on efficiency, performance, and sustainability metrics (before implementation)."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "The potential reduction in a workload by running processes in batches could help reduce the intensity of peak hardware thrashing, thereby reducing the energy requirements and potentially even the water requirements for cooling (due to excess heat generation).",
                            "Social Equity": "Leaving non-critical processes to run during quieter periods may reduce the opportunity for sites or services to experience downtime or slowdown due to being overburdened."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "When the visitor asks for the generation of a downloadable file, the visitor is informed that the request will be handled asynchronously and given an estimation of the maximum time it will take. When the file is available, the visitor receives a communication in the most sustainable manner, such as an SMS. As such, it is better if the file is made available online and then deleted after a given amount of time. Ideally, the visitor should be given the option to cancel the request."
                        }
                    ],
                    "resources": [
                        {
                            "AWS WAF: SUS02-BP06 - Implement buffering or throttling to flatten the demand curve": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a7.html",
                            "AWS WAF: SUS03-BP01 - Optimize software and architecture for asynchronous and scheduled jobs": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_software_a2.html",
                            "Best practises for 5G App Developers (PDF)": "https://www.gsma.com/get-involved/working-groups/wp-content/uploads/2022/11/IG.15-v1.0-1.pdf",
                            "Event-driven architecture": "https://en.wikipedia.org/wiki/Event-driven_architecture",
                            "[GPFEDS] 1.7 - Strategy (Encryption) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.3 - Architecture (Protocol Support) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.5 - Front-End (Upload Triggers) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.3 - Back-End (Background Processing) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.10 - Hosting (Asynchronous Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 5-6024 - Transfer Compression": "https://gr491.isit-europe.org/en/crit.php?id=5-6024-architecture-the-distribution-of-processing-on-different-and",
                            "Microsoft Azure WAF: Performance efficiency principles": "https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles",
                            "Serve websites over HTTPS": "https://www.ncsc.gov.uk/information/page-removed",
                            "The Complete Guide to Event-Driven Architecture": "https://solace.com/what-is-event-driven-architecture/",
                            "What is an Event-Driven Architecture?": "https://aws.amazon.com/event-driven-architecture/",
                            "What Is Event-Driven Architecture?": "https://blog.hubspot.com/marketing/event-driven-architecture",
                            "Why HTTPS matters": "https://web.dev/articles/why-https-matters?hl=en",
                            "Why You Shouldn't Use FTP or HTTP if You Care About Security": "https://www.automox.com/blog/you-shouldnt-use-ftp-or-http"
                        }
                    ],
                    "tags": ["JavaScript", "Performance", "Networking"]
                },
                {
                    "id": "10",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#consider-cdn-s-and-edge-caching",
                    "guideline": "Consider CDNs and Edge Caching",
                    "description": "Edge caching and CDN delivery can help optimize the sustainable delivery of digital services by optimizing how your website's traffic is transferred over the internet.",
                    "criteria": [
                        {
                            "title": "Content Delivery Networks (CDNs)",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS10-1)",
                            "description": "When building for a globally distributed audience, use a CDN to store and serve simple read-only, pre-generated resources in a fast and efficient manner. Although they definitely can increase performance, it is also another layer of infrastructure that needs to be considered for sustainability."
                        },
                        {
                            "title": "Sustainability Commitment",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS10-2)",
                            "description": "Verify that the CDN provides a commitment to sustainability."
                        },
                        {
                            "title": "Local Servers",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS10-3)",
                            "description": "A hosting provider was chosen with servers located close to the visitor, considering that if you only serve a local audience, the need for distributed content (CDNs) that duplicate your materials globally may not be worthwhile."
                        },
                        {
                            "title": "Avoid Caching Inappropriate Resources",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS10-4)",
                            "description": "Don't use the service to host dynamic / regularly changing resources or JavaScript (unless through a first-party host) as due to cache partitioning, cross-origin resource sharing (CORS), and other browser mechanics, any benefits are negated by weaker performance, the inability to cache or interact, and the potential introduction of security and privacy issues to be introduced. This doesn't affect JSON or other static assets."
                        },
                        {
                            "title": "Process Data Close to the Source",
                            "testable": "Human Testable",
                            "description": "All information passed between the layers of an application incurs a cost, both in terms of data transferred, and CPU cycles for (de)serialization. Wherever possible, data transformations must be performed close to the source to reduce these costs and avoid processing data that will later be discarded."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Reduces the amount of time spent in front of the device as the delivery of assets can occur quicker (due to servers being closer to the device), which in turn will drain the consumers' device battery-less.",
                            "Social Equity": "Benefits visitors in normally underserved geographies and economies, or from disadvantaged backgrounds, as content may be available in a region closer to their location.",
                            "Performance": "Visitors experience less latency due to the distance between them and the server is reduced.",
                            "Economic": "Content delivery networks work on economies of scale, and their data transfer rates are often cheaper than those of many hosting providers."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Medium",
                            "water": "Low",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "A [hosting provider](https://ismyhostfastyet.com/) speed and performance statistics tool."
                        }
                    ],
                    "resources": [
                        {
                            "AWS WAF: SUS01-BP01 - Choose Region based on both business requirements and sustainability goals": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_region_a2.html",
                            "AWS WAF: SUS02-BP04 - Optimize geographic placement of workloads based on their networking requirements": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a5.html",
                            "Caching on a Content Delivery Network (CDN)": "https://www.debugbear.com/blog/cdn-cache",
                            "Carbon accounting in the Cloud (PDF)": "https://arxiv.org/pdf/2406.09645",
                            "Carbon Aware Computing": "https://www.carbon-aware-computing.com/",
                            "Carbon Aware Computing: Next Green Breakthrough or New Greenwashing?": "https://hackernoon.com/carbon-aware-computing-next-green-breakthrough-or-new-greenwashing",
                            "CDN Compare": "https://www.cdnperf.com/cdn-compare",
                            "Cloud Computing, Server Utilization, & the Environment": "https://aws.amazon.com/blogs/aws/cloud-computing-server-utilization-the-environment/",
                            "Cross-Origin Resource Sharing (CORS)": "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
                            "Data center emissions probably 662% higher than big tech claims. Can it keep up the ruse?": "https://www.theguardian.com/technology/2024/sep/15/data-center-gas-emissions-tech",
                            "Double-keyed Caching: How Browser Cache Partitioning Changed the Web": "https://addyosmani.com/blog/double-keyed-caching/",
                            "Edge computing": "https://en.wikipedia.org/wiki/Edge_computing",
                            "Electricity Maps": "https://app.electricitymaps.com",
                            "Energy Consumption in Data Centres and Broadband Communication Networks in the EU": "https://publications.jrc.ec.europa.eu/repository/handle/JRC135926",
                            "Energy-efficient Cloud Computing Technologies and Policies for an Eco-friendly Cloud Market": "https://digital-strategy.ec.europa.eu/en/library/energy-efficient-cloud-computing-technologies-and-policies-eco-friendly-cloud-market",
                            "Future trends of Green All Optical Networks and ICT Infrastructure in a large context": "https://www.researchgate.net/publication/368690756_Future_trends_of_Green_All_Optical_Networks_and_ICT_Infrastructure_in_a_large_context_-_trends_to_2050",
                            "Gaining security and privacy by partitioning the cache": "https://developer.chrome.com/blog/http-cache-partitioning?hl=en",
                            "[GPFEDS] 2.3 - Specifications (Connection Issues) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.2 - Front-End (Caching Mechanisms) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.7 - Front-End (Server Host) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.1 - Back-End (Reusability Caching) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.1 - Hosting (Hosting Provider) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.5 - Hosting (Renewable Documentation) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.6 - Hosting (Local Datacenters) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Greenhouse Gas Protocol - Cloud & Data Center Services (PDF)": "https://ghgprotocol.org/sites/default/files/GHGP-ICTSG%20-%20ALL%20Chapters.pdf#page=142",
                            "[GR491] 1-8003 - Datacenter Location": "https://gr491.isit-europe.org/en/crit.php?id=1-8003-hosting-data-centers-are-rarely-installed-in-the",
                            "[GR491] 2-8020 - Datacenter Hub": "https://gr491.isit-europe.org/en/crit.php?id=2-8020-hosting-physical-trips-to-datacenters-are-by-nature",
                            "Green Data Streams": "https://www.cachefly.com/news/green-data-streams-exploring-the-role-of-cdns-in-digital-sustainability/",
                            "High Performance MySQL: Query Performance Optimization": "https://www.oreilly.com/library/view/high-performance-mysql/9780596101718/ch04.html",
                            "How Clean is Your Cloud? (PDF)": "https://www.greenpeace.org/static/planet4-international-stateless/2012/04/e7c8ff21-howcleanisyourcloud.pdf",
                            "How green data centers can cut your carbon footprint": "https://venturebeat.com/data-infrastructure/how-green-data-centers-can-cut-your-carbon-footprint/",
                            "How much water do data centres use?": "https://smartwatermagazine.com/news/h2o-building-services/how-much-water-do-data-centres-use",
                            "How using a CDN is better for people and the planet": "https://www.wholegraindigital.com/blog/how-using-a-cdn-is-better-for-people-and-the-planet/",
                            "Idle Power Matters": "https://tag-env-sustainability.cncf.io/blog/2024-06-idle-power-matters-kepler-metrics-for-public-cloud-energy-efficiency/",
                            "Investigating the Inconsistencies among Energy and Energy Intensity Estimates of the Internet": "https://www.aramis.admin.ch/Default?DocumentID=67656&Load=true",
                            "Is My Host Fast Yet?": "https://ismyhostfastyet.com/",
                            "Measuring the Emissions & Energy Footprint of the ICT Sector": "https://documents1.worldbank.org/curated/en/099121223165540890/pdf/P17859712a98880541a4b71d57876048abb.pdf",
                            "Microsoft Azure WAF: Deploy to low-carbon regions": "https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-application-platform#deploy-to-low-carbon-regions",
                            "MySQL Has Functions (Part 5) : PHP vs MySQL Performance": "https://onextrapixel.com/mysql-has-functions-part-5-php-vs-mysql-performance/",
                            "Microsoft Emissions Impact Dashboard": "https://www.microsoft.com/en-us/sustainability/emissions-impact-dashboard",
                            "Public CDNs Are Useless and Dangerous": "https://httptoolkit.com/blog/public-cdn-risks/",
                            "Reporting requirements on the energy performance and sustainability of data centres for the Energy Efficiency Directive": "https://op.europa.eu/en/publication-detail/-/publication/d9404897-7221-11ee-9220-01aa75ed71a1/language-en",
                            "Requirements for Energy Efficiency Management": "https://emile22.github.io/draft-stephan-green-ucs-and-reqs/draft-stephan-green-ucs-and-reqs.html",
                            "The staggering ecological impacts of computation and the cloud": "https://computing.mit.edu/news/the-staggering-ecological-impacts-of-computation-and-the-cloud/",
                            "Submarine Cable Map": "https://www.submarinecablemap.com/",
                            "Subresource Integrity": "https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity",
                            "The Hosting Server Location & What It Means For Website SEO": "https://www.linkedin.com/pulse/hosting-server-location-what-means-website-seo-ernest-ekwoge-metuge/",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 6 (Water & Sanitation)": "https://sdgs.un.org/goals/goal6#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Use Cases for Energy Efficiency Management": "https://www.ietf.org/archive/id/draft-stephan-green-use-cases-00.html",
                            "What are dual-use data centers and how they drive energy efficiency": "https://venturebeat.com/data-infrastructure/what-are-dual-use-data-centers-and-how-they-drive-energy-efficiency/",
                            "What is a Content Delivery Network - A Beginner's Guide": "https://imagekit.io/blog/what-is-content-delivery-network-cdn-guide/"
                        }
                    ],
                    "tags": ["Content", "Performance", "Hardware", "Networking"]
                },
                {
                    "id": "11",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-the-lowest-infrastructure-tier-meeting-business-requirements",
                    "guideline": "Use the Lowest Infrastructure Tier Meeting Business Requirements",
                    "description": "Select infrastructure with minimal specifications meeting business requirements of performance, availability, etc.",
                    "criteria": [
                        {
                            "title": "Lowest Requirements",
                            "testable": "Human Testable",
                            "description": "Select infrastructure elements with the lowest requirements tier, meeting your service-level agreements. Avoid over-provisioning multi-datacenter, multi-zone, or distributed deployments if standalone instances meet the requirements. Also avoid provisioning infrastructure that will be under-utilized by provisioning for established average loads, ensuring reasonable resource utilization and autoscaling occurs as needed. Avoid provisioning for peak loads."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Reduces the size and intensity of the compute.",
                            "Economic": "The right-sized compute will typically be the cheapest solution."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Have scheduled automatic scale-up during business hours, and scale-down afterward. Alternatively, have autoscaling (up and down) in direct response to traffic."
                        }
                    ],
                    "resources": [
                        {
                            "AWS WAF: SUS02-BP02 - Align SLAs with sustainability goals": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a3.html",
                            "AWS WAF: SUS02-BP06 - Implement buffering or throttling to flatten the demand curve": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_user_a7.html",
                            "AWS WAF: SUS04-BP08 - Back up data only when difficult to recreate": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a9.html",
                            "Can Reducing Cloud Waste Help Save the Planet?": "https://thenewstack.io/can-reducing-cloud-waste-help-save-the-planet/",
                            "Choose wisely — How technology decisions drive data center efficiency": "https://venturebeat.com/data-infrastructure/choose-wisely-how-technology-decisions-drive-data-center-efficiency/",
                            "[GPFEDS] 3.2 - Architecture (Resource Tailoring) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Measuring the Emissions & Energy Footprint of the ICT Sector": "https://documents1.worldbank.org/curated/en/099121223165540890/pdf/P17859712a98880541a4b71d57876048abb.pdf",
                            "Optimizing your AWS Infrastructure for Sustainability, Part I: Compute": "https://aws.amazon.com/blogs/architecture/optimizing-your-aws-infrastructure-for-sustainability-part-i-compute/",
                            "Study on the practical application of the new framework methodology for measuring the environmental impact of your equipment": "https://op.europa.eu/en/publication-detail/-/publication/ef17c01f-ea7c-49e0-91aa-878f16ba6361",
                            "United Nations [SDGS] Goal 6 (Water & Sanitation)": "https://sdgs.un.org/goals/goal6#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators"
                        }
                    ],
                    "tags": ["Performance", "Hardware", "E-Waste"]
                },
                {
                    "id": "12",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#store-data-according-to-visitor-needs",
                    "guideline": "Store Data According to Visitor Needs",
                    "description": "Optimize storage of data according to what is most important, relevant, and required in service to visitors. This will help to avoid unnecessary storage of data that may not be useful or valuable, which will reduce required infrastructure, power, and data transfer.",
                    "criteria": [
                        {
                            "title": "Reduce Redundancy",
                            "testable": "Human Testable",
                            "description": "Remove unnecessary and redundant data from your servers, whether it is single-use (dark data) or abandoned."
                        },
                        {
                            "title": "Expiration Dates",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS12-2)",
                            "description": "Create data with an expiration date. Excess data is a form of technical debt, and routinely cleaning up old data needs to be normalized."
                        },
                        {
                            "title": "Classify And Tag",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS12-3)",
                            "description": "Use a data classification / tagging policy to make it easier to find, handle, and remove."
                        },
                        {
                            "title": "Justify Storage",
                            "testable": "Human Testable",
                            "description": "Store data only when it is difficult to recreate."
                        },
                        {
                            "title": "Optimize Logging",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#HIS12-5)",
                            "description": "Optimize log collection, storage (off-site), and rotation; scheduling during low-activity hours and using carbon-neutral backup providers."
                        },
                        {
                            "title": "Asset Downloads",
                            "testable": "Human Testable",
                            "description": "Ensure long-term assets, especially those of a large size, are made available for download."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Reduced storage usage results in reduced storage requirements.",
                            "Security": "Reduced storage of personal information reduces the risk of compromise.",
                            "Economic": "Reduced storage usage will result in reduced prices."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "Accept-Encoding: zstd, gzip, br, deflate",
                            "content": "HTTP [compression](https://http.dev/compression) headers can be used to control the response."
                        },
                        {
                            "code": "<IfModule mod_deflate.c>\r\n\t<IfModule mod_setenvif.c>\r\n\t\t<IfModule mod_headers.c>\r\n\t\t\tSetEnvIfNoCase ^(Accept-EncodXng|X-cept-Encoding|X{15}|~{15}|-{15})$ ^((gzip|deflate)\\s*,?\\s*)+|[X~-]{4,13}$ HAVE_Accept-Encoding\r\n\t\t\tRequestHeader append Accept-Encoding \"gzip,deflate\" env=HAVE_Accept-Encoding\r\n\t\t<\/IfModule>\r\n\t<\/IfModule>\r\n\t<IfModule mod_filter.c>\r\n\t\tAddOutputFilterByType DEFLATE \"application\/atom+xml application\/javascript application\/json application\/ld+json application\/manifest+json application\/rdf+xml application\/rss+xml application\/schema+json application\/geo+json application\/vnd.ms-fontobject application\/wasm application\/x-font-ttf application\/x-javascript application\/x-web-app-manifest+json application\/xhtml+xml application\/xml font\/eot font\/opentype font\/otf font\/ttf image\/bmp image\/svg+xml image\/vnd.microsoft.icon image\/x-icon text\/cache-manifest text\/calendar text\/css text\/html text\/javascript text\/plain text\/markdown text\/vcard text\/vnd.rim.location.xloc text\/vtt text\/x-component text\/x-cross-domain-policy text\/xml\"\r\n\t<\/IfModule>\r\n\t<IfModule mod_mime.c>\r\n\t\tAddEncoding gzip              svgz\r\n\t<\/IfModule>\r\n<\/IfModule>",
                            "content": "[htaccess GZIP Settings](https://github.com/h5bp/server-configs-apache/blob/main/dist/.htaccess). [Apache](https://github.com/h5bp/server-configs-apache) and [NGINX](https://github.com/h5bp/server-configs-nginx) boilerplates are available."
                        }
                    ],
                    "resources": [
                        {
                            "AWS WAF: SUS04-BP01 - Implement a data classification policy": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a2.html",
                            "AWS WAF: SUS04-BP03 - Use policies to manage the lifecycle of your datasets": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html",
                            "AWS WAF: SUS04-BP05 - Remove unneeded or redundant data": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a6.html",
                            "AWS WAF: SUS04-BP08 - Back up data only when difficult to recreate": "https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a9.html",
                            "Dark Data Is Leaving a Huge Carbon Footprint, And We Have to Do Something About It": "https://www.sciencealert.com/dark-data-is-leaving-a-huge-carbon-footprint-and-we-have-to-do-something-about-it",
                            "Dark data is killing the planet - we need digital decarbonisation": "https://theconversation.com/dark-data-is-killing-the-planet-we-need-digital-decarbonisation-190423",
                            "Data Compression": "https://www.barracuda.com/support/glossary/data-compression",
                            "Exploring the sustainability challenges facing digitalization and internet data centers": "https://www.sciencedirect.com/science/article/pii/S0959652622032115",
                            "[GPFEDS] 1.6 - Strategy (Data Collection) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.2 - Back-End (Data Retention) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.8 - Hosting (Hot / Cold Data) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 3-7041 - Transfer Compression": "https://gr491.isit-europe.org/en/crit.php?id=3-7041-backend-the-essential-exchanges-should-make-it-possible",
                            "Green by Default": "https://screenspan.net/blog/green-by-default/",
                            "Microsoft Azure WAF: Batch Processing": "https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-application-platform#run-batch-workloads-during-low-carbon-intensity-periods",
                            "Microsoft Azure WAF: Only store what is relevant": "https://learn.microsoft.com/en-us/azure/well-architected/sustainability/sustainability-storage#only-store-what-is-relevant",
                            "The Cloud Is Material": "https://mit-serc.pubpub.org/pub/the-cloud-is-material/release/1?readingCollection=b2d8aadb",
                            "Why data has a sustainability problem": "https://venturebeat.com/data-infrastructure/why-data-has-a-sustainability-problem/"
                        }
                    ],
                    "tags": ["Content", "Performance", "Hardware", "E-Waste", "Privacy"]
                }
            ]
        },
        {
            "id": "5",
            "name": "Business Strategy And Product Management",
            "shortName": "Business & Product Strategy",
            "guidelines": [
                {
                    "id": "1",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#have-an-ethical-and-sustainability-product-strategy",
                    "guideline": "Have an Ethical and Sustainability Product Strategy",
                    "description": "Create a publicly available statement in an easy-to-find location on your website that outlines a clear commitment to prioritize ethics and sustainability PPP standards that align with the organization's mission, vision, and values and include statements specific to digital products, services, policies, and programs. This should be done while actively promoting such efforts (with evidence) using social channels.",
                    "criteria": [
                        {
                            "title": "Statement Availability",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM01-1)",
                            "description": "The organization has published a publicly available Code of Ethics, Product Guidelines, Sustainability, or PPP Statement that includes language specific to digital products, services, policies, and programs."
                        },
                        {
                            "title": "Achievements And Compliance",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM01-2)",
                            "description": "Achievements, features, compliance, and anything beyond the scope of these guidelines are published within a sustainability section of your product or service."
                        },
                        {
                            "title": "Governance Over Time",
                            "testable": "Human Testable",
                            "description": "Evidence is provided by the organization showing how it effectively governs implemented digital sustainability, climate policies, and related PPP practices over time."
                        },
                        {
                            "title": "Onboarding New Members",
                            "testable": "Human Testable",
                            "description": "Training decks and workshops are provided by the organization for onboarding new team members on how it implements more sustainable product strategies."
                        },
                        {
                            "title": "Documentation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM01-5)",
                            "description": "Your methodology has been documented through impact storytelling, documentation, and helping individuals make more informed decisions in order to raise awareness with your visitors."
                        },
                        {
                            "title": "Renewable Showcasing",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM01-6)",
                            "description": "The organization can show how it powers digital products and services with renewable energy."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "A clear sustainability statement should make it easier to align organizational policies and practices with measurable metrics to support goals. And, if included early in digital product strategy, can benefit from improved efficiency and reduced environmental impact.",
                            "Privacy": "By trying to reduce your emissions, and explaining to a wider audience how you aim to keep your sustainability promises, you can also highlight other key areas of visitor value as ethically important, such as privacy and security (which will gain visitor trust in your brand).",
                            "Transparency": "A clear, public-facing set of policies helps internal and external stakeholders better understand an organization's commitments.",
                            "Social Equity": "Highlighting intersectional social issues in documentation, storytelling, and marketing materials raises awareness of both problems and potential solutions.",
                            "Accessibility": "Prioritizing inclusive design both in user-interfaces and storytelling raises awareness of accessibility barriers, improves experience for people with disabilities, and will reduce emissions by reducing barriers to access which may trigger wasted traffic.",
                            "Economic": "Transparent communication on how an organization shares the economic benefits of its digital work raises awareness of social inequalities. Similarly, helping visitors make more informed decisions can support a more financially sustainable product or service overall. A clear statement of intent will also make it easier for the company to measure and report on its impact efforts.",
                            "Operations": "Product teams are more engaged in the work they're doing."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "Here are some great examples of a [sustainability statement](https://civicactions.com/sustainability/), a [Code of Ethics](https://www.mightybytes.com/code-of-ethics/), an [Ethical Policy](https://www.wholegraindigital.com/wholegrain-ethical-policy/), a [corporate digital responsibility](https://www.ottogroup.com/en/nachhaltigkeit/corporate-digital-responsibility.php) document, a [sustainability template](https://ecocart.io/sustainability-statement/), a [sustainability policy](https://www.mightybytes.com/sustainability/), a [code of conduct](https://www.enel.com/company/stories/articles/2022/02/digital-sustainability-code-conduct), and in Italian, a range of useful policy examples (PDF): A code of [Conduct](https://www.piano-d.it/codice-di-condotta-aziendale.pdf), [Ethics](https://www.piano-d.it/codice-etico.pdf), [Environment](https://www.piano-d.it/environmental-policy.pdf), and [Marketing](https://www.piano-d.it/ethical-marketing-policy.pdf)."
                        }
                    ],
                    "resources": [
                        {
                            "6 steps to reduce the carbon footprint of your website": "https://opensource.com/article/23/3/reduce-carbon-footprint-website",
                            "A Guide To Developing Your Organization's Code of Ethics (PDF)": "https://www.shrm.org/content/dam/en/shrm/about/organization-coe.pdf",
                            "Action Plan for Sustainable Planet in the Digital Age (PDF)": "https://www.sparkblue.org/codesactionplanlaunch",
                            "[AFNOR] Spec 5.2.3 and 5.4.4 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Are my third parties green?": "https://aremythirdpartiesgreen.com/",
                            "Best Sustainability Statements": "https://peaksci.com/blog/sustainability-statements",
                            "Boring Web Development": "https://meiert.com/en/blog/boring-web-development/",
                            "Built With": "https://builtwith.com/",
                            "Can the Internet Survive Climate Change?": "https://newrepublic.com/article/155993/can-internet-survive-climate-change",
                            "Climate Product Management Playbook": "https://climateproductleaders.myflodesk.com/",
                            "Creating a company's first sustainability report": "https://www.governance-intelligence.com/esg/creating-companys-first-sustainability-report",
                            "Defining ESG vs. Sustainability": "https://www.brightest.io/esg-sustainability-difference",
                            "Does ESG really matter—and why?": "https://www.mckinsey.com/capabilities/sustainability/our-insights/does-esg-really-matter-and-why",
                            "EcoGrader": "https://ecograder.com/",
                            "[GPFEDS] 1.1 - Strategy (Assessment & Impact) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-3014 - Compliance Labelling": "https://gr491.isit-europe.org/en/crit.php?id=2-3014-uxui-a-number-of-resources-are-available-to",
                            "Green Web Checker": "https://www.thegreenwebfoundation.org/green-web-check/",
                            "How to amplify your sustainability efforts through your user-experience": "https://www.thinkwithgoogle.com/intl/en-emea/future-of-marketing/creativity/sustainability-user-experience/",
                            "How to Build Effective Sustainability Governance Structures": "https://www.bsr.org/en/blog/how-to-build-effective-sustainability-governance-structures",
                            "How To Write a Code of Ethics: 5 Steps to Follow": "https://www.contractscounsel.com/b/how-to-write-a-code-of-ethics",
                            "How to Write an Effective Product Requirements Documents": "https://www.jamasoftware.com/requirements-management-guide/writing-requirements/how-to-write-an-effective-product-requirements-document",
                            "Lean UX ❤ Sustainability": "https://medium.com/design-bootcamp/lean-ux-sustainability-designing-for-people-planet-and-profit-4b1406564c81",
                            "Mitigating our impact on the planet through service design": "https://uxdesign.cc/mitigating-our-impact-on-the-planet-through-services-474859a5b6be",
                            "Product Design Process": "https://uxplanet.org/product-design-process-e25d5b31c581",
                            "Quick Guide to Sustainable Design Strategies": "https://medium.com/disruptive-design/quick-guide-to-sustainable-design-strategies-641765a86fb8",
                            "Sales & Marketing": "https://sustainabilityguide.eu/ecodesign/sales-marketing/",
                            "Sustainability Product Strategy": "https://www.linkedin.com/pulse/sustainability-product-strategy-marisa-gooding/",
                            "Sustainability Statements": "https://ecocart.io/sustainability-statement/",
                            "Sustainability Storytelling Checklist": "https://www.mightybytes.com/blog/sustainability-storytelling-checklist/",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "Sustainable Web Development Strategies Within An Organization": "https://www.smashingmagazine.com/2022/10/sustainable-web-development-strategies-organization/",
                            "The carbon.txt Proposed Standard": "https://carbontxt.org/",
                            "The Carbon Impact of Web Standards (PDF)": "https://websitesustainability.com/cache/files/research23.pdf",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 5 (Gender Equality)": "https://sdgs.un.org/goals/goal5#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "UX/UI Product Design Roadmap": "https://product-design-roadmap.com/",
                            "Website Carbon": "https://www.websitecarbon.com/",
                            "Why sustainability is crucial for corporate strategy": "https://www.weforum.org/stories/2022/06/why-sustainability-is-crucial-for-corporate-strategy/"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Research", "Education", "Strategy", "KPIs"]
                },
                {
                    "id": "2",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#assign-a-sustainability-representative",
                    "guideline": "Assign a Sustainability Representative",
                    "description": "Having someone within an organization who represents sustainability as a core agenda makes good sense due to the accessibility, performance, financial, and other benefits that can occur from following best practices. If the resources are available, a climate Working Group with willing participants could also be established.",
                    "criteria": [
                        {
                            "title": "Ecological Referee",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM02-1)",
                            "description": "An ecological referee (with specific digital expertise) for the product or service within your organization has been assigned and empowered with the tools they require (resources, budget, time, etc.) to achieve their stated goals."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "A referee will maintain quality assurance and guide decisions that measurably reduce the environmental impact of the organization's digital products and services.",
                            "Privacy": "They will maintain intersectional data privacy standards and potentially watch out for legal compliance issues within the organization.",
                            "Social Equity": "A representative will help to reduce the digital divide and improve access to information for visitors with older devices, in low-bandwidth areas, and so on. This reduces emissions as less e-waste will be produced if the need for newer equipment becomes less of a priority.",
                            "Accessibility": "The sustainability representative will help the organization improve issues surrounding barriers to access. These inherently could cost bandwidth, have a monetary value, and have potential legal implications.",
                            "Economic": "A dedicated resource who maintains quality control will ultimately improve the organization's financial standing."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Microsoft's [sustainability](https://www.microsoft.com/en-us/corporate-responsibility/sustainability-journey) team and journey."
                        }
                    ],
                    "resources": [
                        {
                            "Chief sustainability officer": "https://en.wikipedia.org/wiki/Chief_sustainability_officer",
                            "Climate Product Management Playbook": "https://climateproductleaders.myflodesk.com/",
                            "Does Your Organization Need a Chief Sustainability Officer?": "https://www.gartner.com/en/articles/does-your-organization-need-a-chief-sustainability-officer",
                            "[GPFEDS] 1.3 - Strategy (Ecodesign Supervisor) [PDF]": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Organizing for sustainability success": "https://www.mckinsey.com/capabilities/sustainability/our-insights/organizing-for-sustainability-success-where-and-how-leaders-can-start",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Education", "Marketing"]
                },
                {
                    "id": "3",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#raise-awareness-and-inform",
                    "guideline": "Raise Awareness and Inform",
                    "description": "Businesses should not only reference their own materials showcasing how they are working towards becoming sustainable but cite existing sustainability best practices to help others looking to make similar changes within their own work or personal environments.",
                    "criteria": [
                        {
                            "title": "Inform And Aware",
                            "testable": "Human Testable",
                            "description": "All project stakeholders, including product teams, colleagues, and organizational decision-makers (managers and clients) are informed about and trained in both general and digital climate literacy, including your business's use of sustainable technology."
                        },
                        {
                            "title": "Trained And Prepared",
                            "testable": "Human Testable",
                            "description": "Active and routine training is delivered where possible to develop, establish, and refresh skills in sustainability. This can be undertaken through in-house training, courses, workshops, events, webinars, meetups, or other ongoing or on-demand methods to empower your team to deliver on sustainability objectives."
                        },
                        {
                            "title": "Active Participation",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM03-3)",
                            "description": "Stakeholders have been actively encouraged to reduce their environmental impact, share climate and sustainable initiatives and ideas, and resources on sustainable design, best practices, and concepts are provided to assist with this task."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "An informed and educated team has the potential to reap benefits through systemic changes within the way they build products and services, the way they host or manage their creations, and even the way they do business or carry out their everyday lives (extending to their wider community).",
                            "Operations": "By clearly stating sustainability goals and sharing resources, you encourage organizational stakeholders to make their own progress."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Advice and examples on [marketing](https://blog.hubspot.com/marketing/sustainable-marketing) sustainability."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.5.1 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Climate Product Management Playbook": "https://climateproductleaders.myflodesk.com/",
                            "Climate Voice": "https://climatevoice.org/",
                            "Five Dimensions of Sustainable Software Engineering and How Education Can Help!": "https://luiscruz.github.io/2022/01/01/sustainable-se-intro.html",
                            "[GPFEDS] 4.15 - UX and UI (Dark Patterns) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-3011 - Stakeholder Awareness": "https://gr491.isit-europe.org/en/crit.php?id=2-3011-uxui-to-accede-you-have-to-understand.-sustainable",
                            "[GR491] 2-3015 - Reference Materials": "https://gr491.isit-europe.org/en/crit.php?id=2-3015-uxui-users-posture-remains-one-of-the-points",
                            "Green Software Practitioner": "https://learn.greensoftware.foundation/",
                            "How to amplify your sustainability efforts through your user experience": "https://www.thinkwithgoogle.com/intl/en-emea/future-of-marketing/creativity/sustainability-user-experience/",
                            "Make Sustainability Part of Everybody's Job": "https://techcommunity.microsoft.com/blog/greentechblog/make-sustainability-part-of-everybodys-job/3146718",
                            "Product For Net Zero": "https://productfornetzero.com/",
                            "Sustainable Web Development Strategies Within An Organization": "https://www.smashingmagazine.com/2022/10/sustainable-web-development-strategies-organization/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators"
                        }
                    ],
                    "tags": ["Content", "Education", "Reporting", "Marketing"]
                },
                {
                    "id": "4",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#communicate-the-ecological-impact-of-user-choices",
                    "guideline": "Communicate the Ecological Impact of User Choices",
                    "description": "Allowing the visitor to take action to reduce their emissions is key to helping them play a part in becoming more sustainable. By helping them identify when choices they make could have an environmental impact (and by how much) and then providing them with the tooling choices to reduce their footprint, you can empower them to make a lasting difference.",
                    "criteria": [
                        {
                            "title": "Impact Communication",
                            "testable": "Human Testable",
                            "description": "The ecological implications of visitor choices have been clearly communicated and visitors can configure settings based on those choices."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "More ecologically friendly software settings are designed to improve the environmental impact of a product or service. Empowering the visitor will also allow you indirectly to reduce emissions.",
                            "Performance": "Sustainability is inherently tied into accessibility and web performance, as such the benefits these fields bring can have a positive impact on the way your website or application works.",
                            "Conversion": "By clearly communicating the impact, allowing the visitor to set preferences can potentially encourage more individuals to make ecologically friendly choices, thereby increasing adoption rates from those who look for sustainable or ethical brands."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Using [CSS media queries](https://polypane.app/blog/the-complete-guide-to-css-media-queries/), you can adjust the layout of a website based on ecological preferences such as color, data, animation, and more."
                        }
                    ],
                    "resources": [
                        {
                            "Climate Product Management Playbook": "https://climateproductleaders.myflodesk.com/",
                            "[GPFEDS] 4.15 - UX and UI (Dark Patterns) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 6-3039 - Software or Hardware Configurations": "https://gr491.isit-europe.org/en/crit.php?id=6-3039-uxui-users-equipement-is-increasingly-more-efficient-and",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability"
                        }
                    ],
                    "tags": ["Content", "Education", "Reporting"]
                },
                {
                    "id": "5",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#estimate-a-product-or-service-s-environmental-impact",
                    "guideline": "Estimate a Product or Service's Environmental Impact",
                    "description": "Being able to identify key issues with your website or application is essential, and while not a foolproof method, using tooling can help you achieve an overall idea about the state of your product or service's environmental state (as such tools can do for accessibility).",
                    "criteria": [
                        {
                            "title": "Life-cycle Analysis",
                            "testable": "Human Testable",
                            "description": "A full life-cycle Analysis based on the functional unit defined in Guideline 5.15 has been conducted."
                        },
                        {
                            "title": "Competitor Impact",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM05-2)",
                            "description": "The environmental impact of your or a competitor's current service to inform decision-making (as a potential target goal) has been calculated."
                        },
                        {
                            "title": "Tooling Impact",
                            "testable": "Human Testable",
                            "description": "When identifying the environmental impact of your product or service, you must include the impact (or estimates of) of any tooling used to create the product or service along with any third-party solutions utilized in the pipeline. While not created by you, the emissions they generate from production to maintenance are considered integral to your overall solution."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Given their rigor, LCAs offer the biggest opportunities to reduce a digital product or service's overall environmental impact through the identification and elimination of variables and vectors of digital emissions.",
                            "Social Equity": "While LCAs are primarily concerned with environmental impacts, they can incorporate intersectional social metrics as well to improve and consider issues like inequality which affect sustainability.",
                            "Accessibility": "Auditing for accessibility can potentially be included as a key part of a digital LCA, as long as parameters are defined upfront (such as WCAG conformance) and maintained throughout the project to ensure barriers to access are eliminated.",
                            "Performance": "Because they are so detailed, following LCA recommendations should improve product performance due to optimizations being quickly identified and checked off based on best practices."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "Use an online carbon website footprint-checking tool such as [EcoGrader](https://ecograder.com/), [FootSprint](https://calculator.footsprint.co/), [Sitigreen](https://www.sitigreen.it/), or [Website Carbon](https://www.websitecarbon.com/)."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.1.3 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "ETSI ES 203 199 (PDF)": "https://www.etsi.org/deliver/etsi_es/203100_203199/203199/01.03.01_60/es_203199v010301p.pdf",
                            "[GPFEDS] 1.1 - Strategy (Assessment & Impact) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 1.5 - Strategy (Impact Goals) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.3 - UX and UI (Optimized Clickstream) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "GreenIT: Appendices to the Report (PDF)": "https://www.greenit.fr/wp-content/uploads/2021/12/EU-Study-Appendices-to-the-LCA-EN.pdf",
                            "GreenIT: Behind the Figures (PDF)": "https://www.greenit.fr/wp-content/uploads/2021/12/EU-Study-Final-Behind-the-figures-EN_compressed.pdf",
                            "GreenIT: Digital Technologies in Europe (PDF)": "https://www.greenit.fr/wp-content/uploads/2021/12/EU-Study-LCA-7-DEC-EN.pdf",
                            "Principles for Designing Sustainable Services": "https://medium.com/necdigitalstudio/principles-for-designing-sustainable-services-bbf3f3948ac2",
                            "Understanding Digital life-cycle Assessments": "https://www.mightybytes.com/blog/digital-life-cycle-assessment/",
                            "United Nations Digital Economy Report 2024": "https://unctad.org/publication/digital-economy-report-2024",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Research", "Strategy", "KPIs"]
                },
                {
                    "id": "6",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#define-clear-organizational-sustainability-goals-and-metrics",
                    "guideline": "Define Clear Organizational Sustainability Goals and Metrics",
                    "description": "Define sustainability goals for the organization to meet and incorporate into its business model. Pair each goal with at least one clear, achievable metric or Key Performance Indicator (KPI).",
                    "criteria": [
                        {
                            "title": "Sustainability Goals",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM06-1)",
                            "description": "The organization has defined and published a clear set of sustainability goals. It publicly communicates how it will meet these goals, including which performance metrics are important to help the organization and its various stakeholders thrive."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Setting, measuring, and communicating clear sustainability goals aligns an organization's impact aspirations with ongoing efforts to meet these goals.",
                            "Transparency": "Helps stakeholders such as employees, clients, and partners better understand how the organization creates shared value in its various sustainability policies and programs.",
                            "Economic": "Aligning with existing standards or frameworks makes it easier for organizations to include digital in their overall sustainability reporting."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Here is a list of sustainability goals in the form of a [checklist](https://checklists.opquast.com/en/web-quality-assurance/)."
                        }
                    ],
                    "resources": [
                        {
                            "13 SMART Goals Examples for Environmental Sustainability": "https://successindepth.com/smart-goals-for-sustainability/",
                            "B Corperation Standards": "https://www.bcorporation.net/en-us/standards/",
                            "Climate Product Management Playbook": "https://climateproductleaders.myflodesk.com/",
                            "Corporate Digital Responsibility": "https://corporatedigitalresponsibility.net/cdr-manifesto",
                            "Implementing the Sustainable Development Goals": "https://www.gov.uk/government/publications/implementing-the-sustainable-development-goals/implementing-the-sustainable-development-goals--2)",
                            "Science Based Targets": "https://sciencebasedtargets.org/",
                            "Sustainable Development Goals": "https://sdgs.un.org/goals",
                            "United Nations Global Impact": "https://unglobalcompact.org/",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Research", "Governance", "KPIs"]
                },
                {
                    "id": "7",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#verify-your-efforts-using-established-third-party-business-certifications",
                    "guideline": "Verify Your Efforts Using Established Third-Party Business Certifications",
                    "description": "Business certifications can fill the gaps left by incomplete sustainability legislation. Ensuring a business complies with third-party certifications will help verify and apply an objective level of rigor to an organization's sustainability efforts.",
                    "criteria": [
                        {
                            "title": "Certification Achievement",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM07-1)",
                            "description": "The organization has achieved one or more business sustainability certifications and incorporated operational policies and practices to support them."
                        },
                        {
                            "title": "Certification Maintenance",
                            "testable": "Human Testable",
                            "description": "The organization maintains its certification through evolving policies and practices over time."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Operations": "These types of certifications can make it easier for organizations to align operational practices with their mission, vision, and values and communicate these decisions to organizational stakeholders.",
                            "Economic": "Business certifications, which are overseen by impartial governing bodies, help organizations operationalize sustainability principles and achieve higher verified levels of social and environmental performance, accountability, and transparency. These certifications can also help an organization differentiate itself from others in its industry. However, organizations should be sure to vet the certifying entity so no conflicts of interest exist."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "A common form of certification in the Web development field for individuals valuing inclusive design is the [Certified Professional in Web Accessibility](https://www.accessibilityassociation.org/s/certification)."
                        }
                    ],
                    "resources": [
                        {
                            "Are My Third Parties Green?": "https://aremythirdpartiesgreen.com/",
                            "A Complete Guide to Starting a B Corp": "https://www.uschamber.com/co/start/strategy/b-corp-advantages-and-requirements",
                            "B Corperation Certification": "https://www.bcorporation.net/en-us/certification/",
                            "B Corperation Standards": "https://www.bcorporation.net/en-us/standards/",
                            "Blue Angel (German)": "https://www.blauer-engel.de/en",
                            "Built With": "https://builtwith.com/",
                            "Improving your BIA score": "https://bcorporation.uk/b-corp-certification/the-certification-process/improving-your-score/",
                            "ISO 14000 Family - Environmental management": "https://www.iso.org/standards/popular/iso-14000-family",
                            "ISO 14067:2018 - Greenhouse gases": "https://www.iso.org/standard/71206.html",
                            "ISO 27001 - Information security management": "https://www.vanta.com/products/iso-27001",
                            "ISO 50001 - Energy management": "https://www.iso.org/iso-50001-energy-management.html",
                            "ISO Guide 84:2020 - Guidelines for addressing climate change in standards": "https://www.iso.org/standard/72496.html",
                            "Label numérique responsable (French)": "https://institutnr.org/label-numerique-responsable",
                            "PlanetMark": "https://www.planetmark.com/"
                        }
                    ],
                    "tags": ["Governance", "KPIs"]
                },
                {
                    "id": "8",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#implement-sustainability-onboarding-guidelines",
                    "guideline": "Implement Sustainability Onboarding Guidelines",
                    "description": "The organization has clear onboarding and training processes that include PPP policies and practices with explicit references to digital sustainability and responsibility. Ensure that onboarding utilizes a \"green by default\" process and avoids being an opt-in procedure. This applies equally at an organizational level and to visitors and consumers of your products and services.",
                    "criteria": [
                        {
                            "title": "Training Materials",
                            "testable": "Human Testable",
                            "description": "The organization has dedicated training manuals, workshops, and materials that outline the PPP policies and practices it follows and how to implement them. While managing and maintaining these materials over time, adapting them as new policies and practices arise."
                        },
                        {
                            "title": "Progress Incentivisation",
                            "testable": "Human Testable",
                            "description": "The organization incentivizes leadership, teams, and stakeholders to make progress toward the goals outlined in their training, including time for sustainability activities, recognition for completion, and so on."
                        },
                        {
                            "title": "Negative Variables",
                            "testable": "Human Testable",
                            "description": "The organization anticipates and maps potential negative external variables on the service, and acts to minimize their overall impact."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Economic": "Organizations with sustainability training and onboarding practices in place benefit from higher retention rates, improved performance, and more resilient standards of practice for maintaining business continuity."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "An academic organization providing [staff sustainability opportunities](https://sustainablecampus.cornell.edu/take-action/employee-resources/staff-sustainability-training) and resources."
                        }
                    ],
                    "resources": [
                        {
                            "An Introduction to Corporate Sustainability Training": "https://nexioprojects.com/an-introduction-to-corporate-sustainability-training/",
                            "EcoCards Game Workshop Toolkit": "https://www.figma.com/community/file/1197230942511819987/ecocards-jeu-de-cartes-decoconception-web-web-ecodesign-card-game",
                            "[GR491] 1-4002 - Sustainable Commitment": "https://gr491.isit-europe.org/en/crit.php?id=1-4002-contents-many-elements-are-produced-externally-it-would",
                            "Green by Default": "https://screenspan.net/blog/green-by-default/",
                            "Green Upskilling": "https://2030.builders/green-upskilling-why-companies-need-to-train-employees-to-meet-the-demand-of-a-sustainable-economy/",
                            "Green by default": "https://theecologist.org/2016/sep/27/green-default-how-nudge-and-wink-can-save-planet",
                            "How to design a green website (PPTx)": "https://docs.google.com/presentation/d/1XWdCVYAzTuUDi--SVd8Je8hiKpITNuCM/edit",
                            "How to Facilitate More Sustainable Design Workshops": "https://www.mightybytes.com/blog/facilitate-sustainable-design-workshops/",
                            "Systemic Design Toolkit": "https://www.systemicdesigntoolkit.org/",
                            "Tarot Cards of Tech": "https://tarotcardsoftech.artefactgroup.com/",
                            "Team Sustainability Retrospective": "https://miro.com/miroverse/team-sustainability-retrospective/",
                            "The power of green defaults": "https://www.sciencedirect.com/science/article/pii/S0921800919317975",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Variables of Web Sustainability (PDF)": "https://websitesustainability.com/cache/files/variables.pdf"
                        }
                    ],
                    "tags": ["Education", "Strategy"]
                },
                {
                    "id": "9",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#support-mandatory-disclosures-and-reporting",
                    "guideline": "Support Mandatory Disclosures and Reporting",
                    "description": "The organization discloses and reports its PPP impact on at least an annual basis.",
                    "criteria": [
                        {
                            "title": "Policies And Practices",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM09-1)",
                            "description": "The organization has created and published policies and practices for disclosing the social and environmental impacts of its products, services, policies, and programs in line with existing reporting standards such as GRI Performance, SASB, etc."
                        },
                        {
                            "title": "Impact Report",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM09-2)",
                            "description": "The organization produces a publicly available impact report outlining its progress against previous reports on social and environmental goals at least once per year."
                        },
                        {
                            "title": "Standards And Policies",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM09-3)",
                            "description": "The organization publicly and transparently follows existing or emerging environmental standards and legislative policy that promotes mandatory disclosures and reporting for emissions. This is done alongside other social and environmental criteria in its impact reporting, maintaining these practices over time for future reports."
                        },
                        {
                            "title": "Impact Reduction",
                            "testable": "Human Testable",
                            "description": "The organization clearly identifies how it reduces its environmental impact, avoiding double accounting, greenwashing, excluded data, or other manipulative techniques."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "As reporting standards become more rigorous and commonplace, early adopters find the transition less disruptive due to more resilient business operations. Organizations that commit to these practices long-term will also be ahead of the curve as legislation catches up.",
                            "Economic": "Organizations that regularly report on their impact, and show measurable improvement over time, are increasingly likely to attract employees, partners, potential customers, investors, and suppliers based on shared values and an aligned mission. Customers are more likely to purchase products from ethical companies with a proven environmental record."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "[TSMC](https://esg.tsmc.com/en-US/resources/ESG-data-hub?tab=reportbuilder) (PDF) and [Pinterest](https://downloads.ctfassets.net/2pyx8rwuvz6x/73MnH9ns5snM3M3mXQ8X1o/e5158bccc8005e156588e2c3263bbe7b/Pinterest2024-ESG-Report-7.9.24-v1_en-GB.pdf) (PDF) have published their global impact reports."
                        }
                    ],
                    "resources": [
                        {
                            "2020 Impact Reports That Impacted Us": "https://unitofimpact.com/2020-impact-reports-that-impacted-us/",
                            "CDP (Global Disclosure System)": "https://www.cdp.net/en",
                            "EU Corporate Sustainability Reporting Directive": "https://www.sidley.com/en/insights/newsupdates/2022/08/eu-corporate-sustainability-reporting-directive-what-do-uk-us-headquartered-companies-need-to-know",
                            "European Digital Rights and Principles": "https://digital-strategy.ec.europa.eu/en/policies/digital-principles",
                            "Global Reporting Initiative": "https://www.globalreporting.org/",
                            "Google Sustainability Report Case Study": "https://sustainability.google/reports/",
                            "Green digital sector": "https://digital-strategy.ec.europa.eu/en/policies/green-digital",
                            "Greenhouse Gas Protocol": "https://ghgprotocol.org/",
                            "Greenwashing": "https://en.wikipedia.org/wiki/Greenwashing",
                            "How to Write a Sustainability Report": "https://esgthereport.com/what-is-esg/the-g-in-esg/how-to-write-a-sustainability-report/",
                            "Impact Reporting": "https://www.sopact.com/guides/impact-reporting",
                            "More than values: The value-based sustainability reporting that investors want": "https://www.mckinsey.com/capabilities/sustainability/our-insights/more-than-values-the-value-based-sustainability-reporting-that-investors-want",
                            "Our Digital Greenwashing Guide": "https://www.mightybytes.com/blog/digital-greenwashing-guide/",
                            "Sustainability Accounting Standards Board": "https://sasb.ifrs.org/",
                            "Sustainability Reporting tips (PDF)": "https://www.pwc.com/gx/en/audit-services/corporate-reporting/sustainability-reporting/assets/pwc-sustainability-reporting-tips-private-sector.pdf",
                            "Task Force on Climate-related Financial Disclosures": "https://www.fsb-tcfd.org/",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators",
                            "Web Accessibility Laws & Policies": "https://www.w3.org/WAI/policies/",
                            "What is Greenwashing? How to Spot It and Stop it": "https://medium.com/disruptive-design/what-is-greenwashing-how-to-spot-it-and-stop-it-c44f3d130d5"
                        }
                    ],
                    "tags": ["Content", "Reporting", "KPIs"]
                },
                {
                    "id": "10",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#create-one-or-more-impact-business-models",
                    "guideline": "Create One or More Impact Business Models",
                    "description": "An Impact Business Model enables an organization to incorporate specific impact initiatives into one or more business models for generating revenue, often making them \"green by default\" and folding impact initiatives into the organization's operating system. Moreover, being able to calculate the return on investment in terms of sustainability your product or service will bring is important to identifying whether it poses a net-positive or net-negative effect on the environment.",
                    "criteria": [
                        {
                            "title": "Theory Of Change",
                            "testable": "Human Testable",
                            "description": "The organization has completed (and operationalized) a Theory of Change process with requisite documentation to identify the impact it hopes to create, how it will generate revenue, shared, or added value from these activities, how it will measure results based on desired outcomes; or in the case of launched projects, is generating revenue, actively tracking and measuring progress against any desired outcomes."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Business models based on advertisement, sponsorship, or the selling of products can be contradictory to some guidelines as they tend to increase the time spent using a product or service. Taking decisions not only based on financial indicators but on benefiting the visitor and the wider ecosystem can help prevent this and reduce overall emissions.",
                            "Social Equity": "Adding social indicators (such as the shared value within digital services) can prevent negative social impacts such as impoverishment or exploitation.",
                            "Economic": "Organizations that implement these practices create positive social and environmental impacts with every sale of a product or service. These practices also make it easier for the organization to track and measure progress over time. Understanding and incorporating shared value into a digital product or service can also improve trust, which often leads to improved financial considerations."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "Mightybytes published a [Theory for Change](https://docs.google.com/document/d/1d4E0zVepDQcWjnMZWWGtasg166oHoUvAvFr2_edREnc/edit) template."
                        }
                    ],
                    "resources": [
                        {
                            "5 Steps to Calculating Your Sustainability ROI": "https://www.eco-coach.com/blog/2019/11/9/5-steps-to-calculating-your-sustainability-roi",
                            "Five Ways to Create Shared Value": "https://www.mightybytes.com/blog/how-to-create-shared-value/",
                            "[GR491] 1-3004 - Financial Added Value": "https://gr491.isit-europe.org/en/crit.php?id=1-3004-uxui-responsible-digital--can-be-considered-as",
                            "How to Design an Impact Business Model": "https://www.mightybytes.com/blog/how-to-design-an-impact-business-model/",
                            "Models of Impact": "https://www.modelsofimpact.co/",
                            "Profits with purpose": "https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/Sustainability/Our%20Insights/Profits%20with%20purpose/Profits%20with%20Purpose.ashx",
                            "Sustainability innovations and firm competitiveness": "https://www.sciencedirect.com/science/article/pii/S0959652620347594",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "United Nations Theory of Change (PDF)": "https://unsdg.un.org/sites/default/files/UNDG-UNDAF-Companion-Pieces-7-Theory-of-Change.pdf"
                        }
                    ],
                    "tags": ["Content", "Ideation", "Research", "Strategy"]
                },
                {
                    "id": "11",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#follow-a-product-management-and-maintenance-strategy",
                    "guideline": "Follow a Product Management and Maintenance Strategy",
                    "description": "The organization has clearly defined governance policies around how it manages and maintains digital products and services over time.",
                    "criteria": [
                        {
                            "title": "Management And Maintenance",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM11-1)",
                            "description": "The organization has documented policies outlining how it approaches product management and maintenance."
                        },
                        {
                            "title": "Planning Strategy",
                            "testable": "Human Testable",
                            "description": "The organization has maintenance / security plans in place for all the digital products and services it manages."
                        },
                        {
                            "title": "Resourcing Products",
                            "testable": "Human Testable",
                            "description": "The organization appropriately resources products over time via staffing and budgeting to support refactoring code, addressing technical debt, new product features, ongoing testing, and product or service maintenance plans to continue supporting its customers, visitors, and other stakeholders."
                        },
                        {
                            "title": "Resource Measurement",
                            "testable": "Human Testable",
                            "description": "The organization incorporates carbon and resource measurement into maintenance programs and can show measurable improvement over time."
                        },
                        {
                            "title": "Failure Indicators",
                            "testable": "Human Testable",
                            "description": "The organization has both identified and documented Key Failure Indicators (KFIs) and implements resolutions to prevent non-acceptable sustainability impacts from occurring."
                        }
                    ],
                    "impact": "High",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "This provides another opportunity to manage and reduce emissions over time.",
                            "Performance": "Products at these organizations also have better security, reduced technical debt, and improved data privacy, and customer retention.",
                            "Economic": "Organizations with clear product maintenance and management practices tend to be more resilient in the face of digital disruption."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "An example of a website maintenance [checklist](https://www.process.st/templates/website-maintenance-checklist/)."
                        }
                    ],
                    "resources": [
                        {
                            "21 Product Management Frameworks": "https://productfolio.com/21-product-management-frameworks/",
                            "Code Refactoring: Meaning, Benefits and Best Practices": "https://maddevs.io/blog/code-refactoring/",
                            "Complete Website Maintenance Checklist": "https://www.dreamhost.com/blog/complete-website-maintenance-checklist/",
                            "Consequence Scanning": "https://doteveryone.org.uk/project/consequence-scanning/",
                            "Developing Killer Website Maintenance Plans": "https://www.thundertech.com/blog-news/september-2021/developing-website-maintenance-plans",
                            "Digitalization for sustainable maintenance services": "https://www.sciencedirect.com/science/article/pii/S2666954421000107",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.6 - Specifications (Design Review) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.7 - Specifications (Maintainence & Decomissioning) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.4 - Architecture (Supplied Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Green software: Refactoring approach": "https://www.sciencedirect.com/science/article/pii/S1319157820305164",
                            "Hacksplaning": "https://www.hacksplaining.com/lessons",
                            "How efficient code increases sustainability in the enterprise": "https://venturebeat.com/programming-development/how-efficient-code-increases-sustainability-in-the-enterprise/",
                            "OWASP Web Application Security Testing Checklist": "https://github.com/0xRadi/OWASP-Web-Checklist",
                            "Product Strategy: What It Is, How To Build One, and Examples": "https://blog.hubspot.com/sales/product-strategy",
                            "Technical Debt, Agile, and Sustainability": "https://www.mightybytes.com/blog/technical-debt-agile-and-sustainability/",
                            "The High-Risk Refactoring": "https://webup.org/blog/the-high-risk-refactoring/",
                            "The Key Sustainability Priorities for Technology Product Managers": "https://www.gartner.com/en/articles/sustainability-priorities-for-technology-product-managers",
                            "The Ultimate Guide to Product Management": "https://www.productplan.com/learn/what-is-product-management/",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "Web security": "https://developer.mozilla.org/en-US/docs/Web/Security",
                            "When Should You Actually Worry About Tech Debt?": "https://www.trevorlasn.com/blog/when-should-you-actually-worry-about-tech-debt"
                        }
                    ],
                    "tags": ["Compatibility", "Strategy"]
                },
                {
                    "id": "12",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#implement-continuous-improvement-procedures",
                    "guideline": "Implement Continuous Improvement Procedures",
                    "description": "The organization has policies and practices in place to embrace experimentation, foster a growth mindset, support organizational agility, and provide continuous improvement. Product creators should iterate, regularly, though never at the cost of getting things done (such as working on larger, long-term features).",
                    "criteria": [
                        {
                            "title": "Continuous Improvement",
                            "testable": "Human Testable",
                            "description": "The organization has created policies and practices to enable continuous improvement and has resourced the organization appropriately to support these efforts over time."
                        },
                        {
                            "title": "Agile Reviews",
                            "testable": "Human Testable",
                            "description": "Agile sprints and update frequency have gone through a review process to ensure project teams have enough time to conduct user-research, identify technical debt, and produce quality output."
                        },
                        {
                            "title": "Iterative Consideration",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM12-3)",
                            "description": "A track record of continuous improvement (iteration) usage to analyze your website or application while also addressing the by-products and potential consequences of ongoing experimentation, such as technical debt, product performance, emissions, and related issues is clearly visible. Analytics are limited to only necessary features to aid with decision-making, encouraging visitor feedback, and comparing performance against business goals and visitor needs."
                        },
                        {
                            "title": "Functionality Decisions",
                            "testable": "Human Testable",
                            "description": "The retention of existing features, the creation of new functionality, and the decommission or elimination of unused functionality, and unvisited pages through the product's life cycle have been justified and prioritized on a case by case basis."
                        },
                        {
                            "title": "Security Updates",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM12-5)",
                            "description": "Corrective security and policy updates during the product or service lifecycle are provided, while such improvements are distinguished from more extensive evolutionary updates."
                        },
                        {
                            "title": "Skills And Maintenance",
                            "testable": "Human Testable",
                            "description": "Sustainable product and data strategies have been developed with appropriate training techniques. These should help your team (managers, colleagues, etc) build capacity and learn new skills to manage and maintain products and services over time."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "Focusing on continuous improvement reduces waste and energy use by iteratively identifying opportunities to improve the product or service.",
                            "Operations": "A culture of experimentation fosters more innovation. This supports team-building and improves overall organizational resilience and efficiency.",
                            "Security": "Products or services that are maintained and updated over time reduce risk and improve security.",
                            "Privacy": "Having a high-quality, regularly kept up-to-date product or service will reduce the chances of a data breach, which will in turn increase the privacy potential of the website or application.",
                            "Accessibility": "Iteration is important for inclusive design as different visitors will have different needs, and no two individuals are alike. As such, being agile and adaptable will benefit authors in expanding their accessibility.",
                            "Performance": "Technical debt is reduced if review processes exist. Focusing on continuous improvement rather than large single-scale releases, bottlenecks in a website or application's speed can be resolved quickly as they become apparent. This is especially useful as new releases of Web browsers can alter the performance of products and services.",
                            "Economic": "Agility and continuous improvement help an organization be more resilient in the face of disruption and a changing climate. Long-term, these practices save the organization time, money, and resources. They also provide security benefits that decrease risk and can potentially reduce emissions.",
                            "Conversion": "If a website or application renders correctly, it will naturally encourage more trust with its visitors, and thereby have the potential for repeat custom."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "A [showcase](https://jgthms.com/web-design-in-4-minutes/) of how a website layers content, structure, and style. The [Sustainable Web Design toolkit](https://miro.com/miroverse/the-sustainable-ux-design-toolkit/) provides you with information relating to optimizing your product or service for the environment. The [continuous improvement](https://citoolkit.com/category/templates/) toolkit also has numerous business templates to work from."
                        }
                    ],
                    "resources": [
                        {
                            "6 stages of continuous improvement and why it is important": "https://www.betterup.com/blog/continuous-improvement",
                            "An Introduction to Growth Driven Design (PDF)": "https://cdn2.hubspot.net/hubfs/124445/docs/ebook-growth.pdf?t=1488562926580",
                            "Best Practices for Material Updates to Your Privacy Policy": "https://www.termsfeed.com/blog/best-practices-material-updates-privacy-policy/",
                            "Climate Product Management Playbook": "https://climateproductleaders.myflodesk.com/",
                            "Cradle to Cradle": "https://sustainabilityguide.eu/methods/cradle-to-cradle/",
                            "Demystifying digital dark matter": "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/demystifying-digital-dark-matter-a-new-standard-to-tame-technical-debt",
                            "The Design Process": "https://sustainabilityguide.eu/methods/the-design-process/",
                            "[GPFEDS] 1.4 - Strategy (Regular Reviews) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.6 - Specifications (Design Review) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.1 - Architecture (Impact Reduction) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.4 - Architecture (Supplied Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.5 - Architecture (Patch Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.6 - Architecture (Incremental Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-3006 - Planned Sustainability Improvements": "https://gr491.isit-europe.org/en/crit.php?id=1-3006-uxui-the-aim-of-continual-improvement-allows-to",
                            "[GR491] 2-3012 - Iterative Validation Process": "https://gr491.isit-europe.org/en/crit.php?id=2-3012-uxui-the-sustainable-it-approach-is-iterative-and",
                            "[GR491] 5-3031 - Decision Making": "https://gr491.isit-europe.org/en/crit.php?id=5-3031-uxui-monitoring-of-uses-allows-to-validate-the",
                            "[GR491] 5-3032 - Functionality Use Policy": "https://gr491.isit-europe.org/en/crit.php?id=5-3032-uxui-the-deletions-of-elements-on-interfaces-may",
                            "[GR491] 5-3036 - Necessary Analytics": "https://gr491.isit-europe.org/en/crit.php?id=5-3036-uxui-the-analytics-data-collect-is-installed-in",
                            "[GR491] 7-3049 - Behavior and Feedback": "https://gr491.isit-europe.org/en/crit.php?id=7-3049-uxui-the-project-is-implemented-for-users-taking",
                            "[GR491] 7-3053 - Continuous Improvement": "https://gr491.isit-europe.org/en/crit.php?id=7-3053-uxui-over-time-the-organization-will-increase-its",
                            "GreenIT (French) 4001 - Limiter les outils d'analytics et les données collectées": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4001_fr.md",
                            "GreenIT (French) 4036 - Entretenir son site régulièrement": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4036_fr.md",
                            "Growth Driven Design": "https://www.growthdrivendesign.com/",
                            "How B Corp Certification Guides Rituals on a Journey of Continuous Improvement": "https://bthechange.com/how-b-corp-certification-helped-rituals-embark-on-a-journey-of-continuous-improvement-87fe8fbfd8d9",
                            "How to Design a Sustainable Data Strategy": "https://www.mightybytes.com/blog/design-a-sustainable-data-strategy/",
                            "How to Manage Your Website's Technical Debt": "https://speckyboy.com/manage-website-technical-debt/",
                            "The Impact Of Agile Methodologies On Code Quality": "https://www.smashingmagazine.com/2023/05/impact-agile-methodologies-code-quality/",
                            "Measuring Web Performance": "https://www.keycdn.com/blog/measuring-web-performance",
                            "Measuring Web Performance in 2024: The Definitive Guide": "https://requestmetrics.com/web-performance/measure-web-performance/",
                            "On Long Term Software Development": "https://berthub.eu/articles/posts/on-long-term-software-development/",
                            "Sustainability debt: A metaphor to support Sustainability design decisions": "https://www.researchgate.net/publication/282889658_Sustainability_debt_A_metaphor_to_support_Sustainability_design_decisions",
                            "SCRUM Guide": "https://scrumguides.org/scrum-guide.html",
                            "Sprint length in Scrum": "https://www.knowledgehut.com/blog/agile/5-reasons-to-have-fixed-length-sprints",
                            "Technical Debt, Agile, and Sustainability": "https://www.mightybytes.com/blog/technical-debt-agile-and-sustainability/",
                            "The overlooked environmental footprint of increasing Internet use": "https://www.sciencedirect.com/science/article/abs/pii/S0921344920307072",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "Using UX Design to Build a Sustainable Future": "https://uxmag.com/articles/using-ux-design-to-build-a-sustainable-future",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "What Is Continuous Improvement? The Complete Guide": "https://businessmap.io/lean-management/improvement/what-is-continuous-improvement",
                            "What is Technical Debt and how can you manage it?": "https://www.imaginarycloud.com/blog/what-is-technical-debt/"
                        }
                    ],
                    "tags": ["UI", "Compatibility", "Performance", "Security", "Strategy", "KPIs"]
                },
                {
                    "id": "13",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#document-future-updates-and-evolutions",
                    "guideline": "Document Future Updates and Evolutions",
                    "description": "Products or services are updated regularly. Ensure that additions, changes, deprecations, removals, fixes, or security patches are documented in an easy-to-perceive document with details that showcase how such changes affect the visitor (or how they can take advantage of new features).",
                    "criteria": [
                        {
                            "title": "Feature Changes",
                            "testable": "Human Testable",
                            "description": "Adding, updating, or removing features are considered where appropriate to the user-experience of the product or service."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "Maintaining an intuitive, lightweight user-experience while adding new features or updating software reduces frustration, churn, and the energy visitors expend when the interface doesn't perform in ways visitors expect.",
                            "Security": "Websites and applications that maintain an evergreen status often have fewer issues due to a strong release cycle which not only makes necessary changes but also keeps visitors informed, maintaining transparency.",
                            "Performance": "Maintaining an optimized user-experience that is regularly kept current using best practices also implies that pages and assets load quickly in ways visitors expect.",
                            "Economic": "Products and services which are left to become outdated may have higher costs to restart the project from scratch and resurrect; whereas small regular updates have a lesser overhead in terms of time commitments from development scheduling and the impact on potential lost consumers."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "code": "# Changelog - Website\r\n\r\n## [Unreleased]\r\n- N\/A\r\n\r\n## 1.0.0 - YYYY-MM-DD\r\n### Added\r\n- Content.\r\n\r\n## [Guide]\r\n- Added: New features.\r\n- Changed: Altered functionality.\r\n- Deprecated: Disappearing features.\r\n- Removed: Eliminated features.\r\n- Fixed: Bugs patched.\r\n- Security: Solved vulnerabilities.",
                            "content": "[Keep A Changelog](https://keepachangelog.com/en/1.1.0/)."
                        }
                    ],
                    "resources": [
                        {
                            "Common Changelog": "https://common-changelog.org/",
                            "[GPFEDS] 3.5 - Architecture (Patch Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.6 - Architecture (Incremental Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 6-3040 - Changing Features": "https://gr491.isit-europe.org/en/crit.php?id=6-3040-uxui-a-digital-service-has-a-lifespan-that",
                            "Semantic Versioning": "https://semver.org/",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators"
                        }
                    ],
                    "tags": ["Content", "Education", "Usability", "Compatibility"]
                },
                {
                    "id": "14",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#establish-if-a-digital-product-or-service-is-necessary",
                    "guideline": "Establish if a Digital Product or Service Is Necessary",
                    "description": "Ensure that the product or service you are creating offers value to visitors and doesn't duplicate existing functionality (without bringing something new to the table) as this redundancy wastes digital and physical resources.",
                    "criteria": [
                        {
                            "title": "Sustainable Development Goals",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM14-1)",
                            "description": "The product or service identifies within a sustainability statement where it aligns with one of the U.N. (SDGs) and its appropriate targets."
                        },
                        {
                            "title": "Creation Evaluation",
                            "testable": "Human Testable",
                            "description": "The product or service has been determined as necessary based upon desirability, feasibility, and viability factors."
                        },
                        {
                            "title": "Avoid Duplication",
                            "testable": "Human Testable",
                            "description": "No existing digital product or service offers the same value. An analysis has been conducted if necessary to understand the market for this requirement."
                        },
                        {
                            "title": "Obstacle Consideration",
                            "testable": "Human Testable",
                            "description": "Any obstacles to using a product or service, such as accessibility, equality, technical, or territorial have been overcome."
                        }
                    ],
                    "impact": "High",
                    "effort": "Low",
                    "benefits": [
                        {
                            "Environmental": "By determining that a digital product or service is not necessary, you avoid potential environmental impacts associated with its creation and use.",
                            "Operations": "Organizations don't waste time or resources creating unnecessary tools that then require ongoing maintenance.",
                            "Social Equity": "Organizations avoid increasing the digital divide by creating only digital products and services that are meaningful and necessary.",
                            "Accessibility": "As long as an accessible replacement is available, avoiding an unnecessary digital product or service can improve access to existing information.",
                            "Economic": "Organizations cut costs by not investing in unnecessary products or services."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "Competitor analysis [template](https://www.atlassian.com/software/confluence/templates/competitive-analysis) to determine the viability of a project."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.1.5 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Competitor Analysis: What It Is and How to Conduct One": "https://mailchimp.com/resources/what-is-competitor-analysis/",
                            "Digital divide": "https://en.wikipedia.org/wiki/Digital_divide",
                            "[GR491] 3-2017 - Technological Obstacles": "https://gr491.isit-europe.org/en/crit.php?id=3-3017-uxui-in-order-to-be-responsible-digital-technology",
                            "Society Centered Design": "https://societycentered.design/",
                            "Sustainability Innovation Framework": "https://www.figma.com/community/file/1198811753322710709/sustainability-innovation-framework-climatesprint",
                            "Sustainable Development Goals (SDGs)": "https://en.wikipedia.org/wiki/Sustainable_Development_Goals",
                            "Sustainable Development Goals": "https://sdgs.un.org/goals",
                            "Sustainable UX is more than reducing your website's footprint": "https://uxdesign.cc/sustainable-ux-and-ui-design-is-more-than-reducing-your-website-s-footprint-a99c336c151f",
                            "What's a Competitive Analysis & How Do You Conduct One?": "https://blog.hubspot.com/marketing/competitive-analysis-kit"
                        }
                    ],
                    "tags": ["Ideation", "Software", "E-Waste", "Reporting"]
                },
                {
                    "id": "15",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#determine-the-functional-unit",
                    "guideline": "Determine the Functional Unit",
                    "description": "The functional unit of a product is a quantified description of the performance requirements that the product fulfills. Ensure you identify the requirements of your product before development.",
                    "criteria": [
                        {
                            "title": "Life-cycle Assessment",
                            "testable": "Human Testable",
                            "description": "A life-cycle Assessment (LCA) has been conducted to define the requirements of your product's function throughout its lifecycle."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "The functional unit enables the comparison of non-equivalent products or services in the assessment of environmental impacts.",
                            "Performance": "Focusing on a functional unit drives performance-based choices for a better, more efficient, and faster user-experience.",
                            "Economic": "Focusing on the functional unit supports a robust product or service without unnecessary, potentially costly features."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Recycled Bicycles](https://consequential-lca.org/clca/the-functional-unit/define-the-functional-unit/example-functional-unit-recycled-bicycles/) functional unit (can be adapted for the Web)."
                        }
                    ],
                    "resources": [
                        {
                            "Defining Functional Units For LCA and TEA (PDF)": "https://www.energy.gov/sites/default/files/2022-06/2022-05-03%20-%20Functional%20Unit%20PDF_compliant.pdf",
                            "Defining the functional unit": "https://consequential-lca.org/clca/the-functional-unit/define-the-functional-unit/",
                            "[GPFEDS] 1.5 - Strategy (Impact Goals) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.3 - UX and UI (Optimized Clickstream) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "Life-cycle Assessment": "https://en.wikipedia.org/wiki/Life-cycle_assessment",
                            "Life Cycle Assessment": "https://sustainabilityguide.eu/methods/life-cycle-assessment/",
                            "Life Cycle Assessment (LCA)": "https://ecochain.com/blog/life-cycle-assessment-lca-guide/",
                            "Understanding Digital life-cycle Assessments": "https://www.mightybytes.com/blog/digital-life-cycle-assessment/"
                        }
                    ],
                    "tags": ["Ideation", "Research", "Reporting"]
                },
                {
                    "id": "16",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#create-a-supplier-standards-of-practice",
                    "guideline": "Create a Supplier Standards of Practice",
                    "description": "The organization collaborates with suppliers, authors, clients, and other partners on initiatives that are both mutually beneficial and create positive social and environmental outcomes.",
                    "criteria": [
                        {
                            "title": "Vetting Potential Partners",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM16-1)",
                            "description": "The organization has created specific policies to vet potential partners in its supply chain based on PPP principles."
                        },
                        {
                            "title": "Collaborative Measurement",
                            "testable": "Human Testable",
                            "description": "The organization has partnered with suppliers to create, track, and measure collective impact on issues that impact their stakeholders."
                        },
                        {
                            "title": "Informative Partner Promotion",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM16-3)",
                            "description": "The organization has promoted its partnerships in a publicly available place, along with information on how the partnership creates a collective impact."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "Vetting suppliers and partners can help an organization define, track, and reduce its Scope 3 emissions.",
                            "Operations": "This can increase diversity within the technology sector.",
                            "Economic": "This will also help an organization better align its business ecosystem with its mission, vision, and values; whilst improving its relationship with stakeholders."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "How one business goes through a [project selection](https://element84.com/company/how-azavea-selects-projects/) process."
                        }
                    ],
                    "resources": [
                        {
                            "Client, Partner, and Supplier Screening Tools for Positive Impact Supply Chains": "https://bthechange.com/client-partner-and-supplier-screening-tools-for-positive-impact-supply-chains-6edf0eb156fc",
                            "[GPFEDS] 2.8 - Specifications (Suppliers Strategy) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How to vet suppliers": "https://supplychaindigital.com/procurement/how-vet-suppliers",
                            "Stakeholder Mapping: A Guide for Purpose-Driven Organizations": "https://www.mightybytes.com/blog/stakeholder-mapping/",
                            "Stakeholder Mapping: The Complete Guide to Stakeholder Maps": "https://www.interaction-design.org/literature/article/map-the-stakeholders",
                            "Sustainability Methods": "https://sustainabilitymethods.org/index.php/Main_Page",
                            "Sustainable Marketing: Key Principles and How to Leverage It": "https://blog.hubspot.com/marketing/sustainable-marketing",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 5 (Gender Equality)": "https://sdgs.un.org/goals/goal5#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "Your Supply Chain Needs a Sustainability Strategy": "https://www.bcg.com/publications/2020/supply-chain-needs-sustainability-strategy"
                        }
                    ],
                    "tags": ["Social Equity", "Content", "Ideation", "Hardware", "Governance"]
                },
                {
                    "id": "17",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#share-economic-benefits",
                    "guideline": "Share Economic Benefits",
                    "description": "The organization shares the economic benefits of its digital products, services, policies, and programs.",
                    "criteria": [
                        {
                            "title": "Living Wage",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM17-1)",
                            "description": "The organization is publicly committed to paying employees, contractors, and other stakeholders a living wage."
                        },
                        {
                            "title": "Incentivisation",
                            "testable": "Human Testable",
                            "description": "The organization has policies and practices in place to incentivize stakeholders, such as workers and contractors, to meet its impact goals."
                        },
                        {
                            "title": "Employee Benefits",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM17-3)",
                            "description": "The organization provides benefits to employees in accordance with its resources, including, where relevant, healthcare, retirement planning, flex time, profit sharing, and so on."
                        },
                        {
                            "title": "Legislation Advocation",
                            "testable": "Human Testable",
                            "description": "The organization advocates for responsible legislation that supports employment rights, transparency, and accountability related to sharing economic benefits."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Social Equity": "Organizations that pay a living wage and offer good benefits often have higher employee retention rates.",
                            "Economic": "Organizations that collaborate with stakeholders to coordinate mutually beneficial economic incentives benefit from stronger relationships."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "This article contains 50 different [employee perks](https://startups.co.uk/people/management/employee-benefits-perks-retention/) a business could offer to cultivate a better working environment."
                        }
                    ],
                    "resources": [
                        {
                            "5 Business Management Strategies We Learned as a B Corp": "https://bthechange.com/5-business-management-strategies-we-learned-as-a-b-corp-42e91639c6ae",
                            "7 Strategies to Motivate Lasting Sustainability Practices": "https://bthechange.com/7-strategies-to-motivate-lasting-sustainability-practices-2098a5fb72f2",
                            "Bridging Digital and Environmental Goals (PDF)": "https://www3.weforum.org/docs/WEF_Bridging_Digital_and_Environmental_Goals_2021.pdf",
                            "Employee Benefits In 2023: The Ultimate Guide": "https://www.forbes.com/advisor/business/employee-benefits/",
                            "[GR491] 2-8019 - Employee Salary Conditions": "https://gr491.isit-europe.org/en/crit.php?id=2-8019-hosting-the-24/7-supervision-needs-of-data-centers",
                            "How effective is sustainability advocacy?": "https://trellis.net/article/whats-best-way-incentivize-supplier-sustainability/",
                            "How to Ensure a Living Wage for All Employees, Globally and Regionally": "https://unglobalcompact.org/academy/how-to-ensure-a-living-wage-for-all-employees",
                            "How to Make Employee Benefits More Sustainable": "https://www.corporatewellnessmagazine.com/article/how-to-make-employee-benefits-more-sustainable",
                            "How to Motivate People Toward Sustainability": "https://nbs.net/how-to-motivate-people-toward-sustainability/",
                            "Living Wage Network": "https://www.livingwagenetwork.org/",
                            "Sustainability innovations and firm competitiveness": "https://www.sciencedirect.com/science/article/pii/S0959652620347594",
                            "The Real Living Wage Is A Core Part Of Any ESG Agenda": "https://livingwage.org.uk/news/real-living-wage-core-part-any-esg-agenda",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 5 (Gender Equality)": "https://sdgs.un.org/goals/goal5#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "What is an Accessibility Advocate?": "https://medium.com/@a11ycompass/what-is-an-accessibility-advocate-8cbbac0d6c6c",
                            "What's the best way to incentivize supplier sustainability?": "https://trellis.net/article/whats-best-way-incentivize-supplier-sustainability/"
                        }
                    ],
                    "tags": ["Social Equity", "Governance"]
                },
                {
                    "id": "18",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#share-decision-making-power-with-appropriate-stakeholders",
                    "guideline": "Share Decision-Making Power With Appropriate Stakeholders",
                    "description": "Ensuring that everyone has a seat at the table is important to promoting voices who may not otherwise have their voices heard, and potentially getting useful ideas from fresh sources.",
                    "criteria": [
                        {
                            "title": "Decision-Making",
                            "testable": "Human Testable",
                            "description": "The project team's goals are aligned with key business objectives, and project stakeholders (for example, project managers) have the power and autonomy to make key decisions on the organization's behalf."
                        }
                    ],
                    "impact": "Low",
                    "effort": "High",
                    "benefits": [
                        {
                            "Operations": "If project teams are incentivized with key sustainability goals and have the authority to make decisions based on such criteria, they can measurably improve a range of metrics within the business, design, development, and infrastructure categories. In doing so, emissions can be reduced through group action and commitment changes at an organizational level."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "[Proposal software](https://wise.com/us/business-templates/business-proposal/software-proposal) can help authors, clients, and co-workers validate \"baked-in\" components."
                        }
                    ],
                    "resources": [
                        {
                            "Give the planet a seat at the table": "https://www.methods.co.uk/blog/give-the-planet-a-seat-at-the-table/",
                            "Giving nature a seat on the board is a powerful way to make sure businesses protect our environment": "https://greenallianceblog.org.uk/2022/09/22/giving-nature-a-seat-on-the-board-is-a-powerful-way-to-make-sure-businesses-protect-our-environment/",
                            "[GR491] 1-3007 - Management Alignment": "https://gr491.isit-europe.org/en/crit.php?id=1-3007-uxui-for-the-sustainable-it-issue-to-be",
                            "United Nations [SDGS] Goal 5 (Gender Equality)": "https://sdgs.un.org/goals/goal5#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Strategy"]
                },
                {
                    "id": "19",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-justice-equity-diversity-inclusion-jedi-practices",
                    "guideline": "Use Justice, Equity, Diversity, Inclusion (JEDI) Practices",
                    "description": "The organization has public policies and practices supporting racial justice, inclusion, equity, and diversity in hiring and operations.",
                    "criteria": [
                        {
                            "title": "JEDI Practices",
                            "testable": "Human Testable",
                            "description": "The organization has documented its commitment to JEDI practices with clear policies on how it prioritizes marginalized or otherwise underserved communities, including Black, Indigenous, People of Color, LGBTQIA+, Women, Disabled, Veterans, Seniors, and so on."
                        },
                        {
                            "title": "Accessibility Policy",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM19-2)",
                            "description": "The organization has an accessibility policy for digital products and services and can show this via a verified accessible website, application, product, or service."
                        },
                        {
                            "title": "JEDI Training",
                            "testable": "Human Testable",
                            "description": "The organization has JEDI-related training materials and schedules ongoing workshops related to how this topic manifests itself in digital products and services (algorithmic bias, digital divide, gig economy work, mis / disinformation, etc)."
                        },
                        {
                            "title": "JEDI Improvements",
                            "testable": "Human Testable",
                            "description": "The organization can show measurable JEDI improvement over time in its hiring, leadership, and operations."
                        },
                        {
                            "title": "JEDI Legislation",
                            "testable": "Human Testable",
                            "description": "The organization advocates for responsible legislation relating to JEDI practices, especially as related to digital products and services."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Accessibility": "Organizations that incorporate more diverse stakeholder perspectives enact more inclusive policies and often create better products, services, and programs. JEDI practices strengthen an organization's resilience and ability to collaborate. Additionally, this improves diversity in the tech sector and the overall accessibility of the Internet.",
                            "Economic": "Organizations with clear JEDI policies and practices have reduced risks of potential legal issues, lawsuits, etc."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "These websites have some good examples of [accessibility statements](https://mangrove-web.com/accessibility-statement/), [equality and inclusion](https://mangrove-web.com/diversity-equity-inclusion/), [diversity](https://www.navapbc.com/dei/2022), and, [general accessibility](https://civicactions.com/accessibility-statement)."
                        }
                    ],
                    "resources": [
                        {
                            "4 Powerful Ways Business Leaders Can Advocate for Women, Minority, and LGBTQ Workers": "https://www.inc.com/marcel-schwantes/4-powerful-ways-business-leaders-can-advocate-for-women-minority-lgbtq-workers.html",
                            "Designing web services for people living in data poverty": "https://www.wholegraindigital.com/blog/designing-web-services-for-people-living-in-data-poverty/",
                            "Developing an Accessibility Statement": "https://www.w3.org/WAI/planning/statements/",
                            "Employers, Here Are 4 Ways You Can Advocate For Your Underrepresented Employees": "https://www.forbes.com/sites/heidilynnekurter/2020/09/16/employers-here-are-4-ways-you-can-advocate-for-your-underrepresented-employees/",
                            "Equal Rights Advocates": "https://www.equalrights.org/issue/economic-workplace-equality/equal-pay-today/",
                            "How to Write an Accessibility Statement: Everything You Need to Know": "https://blog.hubspot.com/website/accessibility-statements",
                            "JEDI Collaborative": "https://jedicollaborative.com/",
                            "JEDI Investing Toolkit": "https://www.jediinvesting.com/",
                            "Managers, Here's How to Advocate for Pay Equity": "https://hbr.org/2021/11/managers-heres-how-to-advocate-for-pay-equity",
                            "Racism and inequity are products of design. They can be redesigned.": "https://medium.com/@equityXdesign/racism-and-inequity-are-products-of-design-they-can-be-redesigned-12188363cc6a",
                            "Sample accessibility statement": "https://www.gov.uk/government/publications/sample-accessibility-statement",
                            "The Importance of Advocacy for Accessibility within the workplace": "https://www.linkedin.com/pulse/importance-advocacy-accessibility-within-workplace/",
                            "The Performance Inequality Gap": "https://infrequently.org/series/performance-inequality/",
                            "Understanding Social Digital Responsibility": "https://www.mightybytes.com/blog/social-digital-responsibility/",
                            "Unequal America: Ten insights on the state of economic opportunity": "https://www.mckinsey.com/featured-insights/sustainable-inclusive-growth/unequal-america-ten-insights-on-the-state-of-economic-opportunity",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 5 (Gender Equality)": "https://sdgs.un.org/goals/goal5#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators",
                            "Web Content Accessibility Guidelines": "https://www.w3.org/TR/WCAG22/",
                            "WebHint": "https://webhint.io/"
                        }
                    ],
                    "tags": ["Social Equity", "Accessibility", "Ideation", "Strategy"]
                },
                {
                    "id": "20",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#promote-responsible-data-practices",
                    "guideline": "Promote Responsible Data Practices",
                    "description": "The organization commits to responsible data practices, prioritizing data privacy, security, and ethical use. This includes data minimization, purpose limitation, accuracy, storage limitation, integrity, confidentiality, and accountability. Publicly accessible documentation, such as Privacy Policies and Terms and Conditions, follows best practices for clarity and accessibility, avoiding technical jargon and complex legal language to ensure inclusivity for diverse users.",
                    "criteria": [
                        {
                            "title": "Privacy Policy",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM20-1)",
                            "description": "The organization maintains a publicly accessible Privacy Policy, Terms and Conditions, or any other documents required by local law, that adhere to the most restrictive data protection regulations, especially when providing services outside the organization's country. These documents are available in accessible formats and use clear, user-friendly language to ensure comprehension by all visitors, avoiding jargon, technical language, and legalese. The organization also supports emerging legislation and implements best practices related to data privacy, sustainability, and responsible data management."
                        },
                        {
                            "title": "Data Ownership",
                            "testable": "Human Testable",
                            "description": "The organization can show measurable progress over time in respecting data privacy and ownership. This will include how the organization handles data disposal and a visitor's \"right to be forgotten\", along with ownership rights and providing the ability to download / export data they have contributed into a non-proprietary format."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Economic": "Organizations that prioritize data privacy and other responsible data practices benefit from reduced risk and costs, increased resilience, and, often, better relationships with customers and other stakeholders."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "The Airbnb [Privacy Policy](https://www.airbnb.ca/help/article/3175) includes compliance with [emerging legislation](https://www.airbnb.ca/help/article/2855/), [data ownership](https://www.airbnb.ca/help/article/2273), and measurable progress through [previous versions](https://www.airbnb.ca/help/article/2859/). The Telegram [Privacy Policy](https://telegram.org/privacy) includes detailed data practices, references to local legislation, and shows change over time. The [Slack Trust](https://slack.com/intl/en-gb/trust) section is inclusive of [privacy](https://slack.com/intl/en-gb/trust/data-management/privacy-principles), security, compliance, ownership, and more; including a description of how data informs [search, Machine Language, and Artificial Intelligence](https://slack.com/intl/en-gb/trust/data-management/privacy-principles). Finally, CodePen has a beautifully structured [terms of service](https://blog.codepen.io/legal/terms-of-service/) agreement, written in plain English, and is easy to understand."
                        }
                    ],
                    "resources": [
                        {
                            "10 CCPA Compliance Tips For Web Developers": "https://dataoverhaulers.medium.com/10-ccpa-compliance-tips-for-web-developers-1ce8382c7286",
                            "17 Countries with GDPR-like Data Privacy Laws": "https://insights.comforte.com/countries-with-gdpr-like-data-privacy-laws",
                            "A privacy-friendly Do Not Track (DNT) Policy": "https://www.eff.org/dnt-policy",
                            "Beyond GDPR: Data Protection Around The World": "https://www.thalesgroup.com/en/markets/digital-identity-and-security/government/magazine/beyond-gdpr-data-protection-around-world",
                            "California Consumer Privacy Act (CCPA)": "https://oag.ca.gov/privacy/ccpa",
                            "Developer's Guide To GDPR": "https://fusionauth.io/articles/ciam/developers-guide-to-gdpr",
                            "GDPR Checklist": "https://gdprchecklist.io/",
                            "General Data Protection Regulation (GDPR)": "https://gdpr.eu/",
                            "[GPFEDS] 1.6 - Strategy (Data Collection) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.2 - Back-End (Data Retention) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.8 - Hosting (Hot / Cold Data) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How To Protect Your Users With The Privacy By Design Framework": "https://www.smashingmagazine.com/2017/07/privacy-by-design-framework/",
                            "Is GDPR Good for the Environment?": "https://www.mightybytes.com/blog/is-gdpr-good-for-the-environment/",
                            "Learn How To Write a Privacy Policy in a Few Easy Steps": "https://dataprot.net/guides/how-to-write-a-privacy-policy/",
                            "Learn Privacy": "https://web.dev/blog/introducing-learn-privacy?hl=en",
                            "Privacy by design": "https://en.wikipedia.org/wiki/Privacy_by_design",
                            "State Of GDPR Part 1": "https://www.smashingmagazine.com/2021/02/state-gdpr-2021-key-updates/",
                            "State Of GDPR Part 2": "https://www.smashingmagazine.com/2021/03/state-gdpr-2021-cookie-consent-designers-developers/",
                            "The environmental benefits of privacy-focussed web design": "https://rootwebdesign.studio/articles/the-environmental-benefits-of-privacy-focussed-web-design/",
                            "Understanding Data Inequality": "https://www.mightybytes.com/blog/data-inequality/",
                            "Ultimate CCPA Compliance Checklist": "https://securiti.ai/blog/ccpa-compliance-checklist/",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators",
                            "What is Your Data Disposal Strategy?": "https://www.mightybytes.com/blog/what-is-your-data-disposal-strategy/"
                        }
                    ],
                    "tags": ["Social Equity", "Content", "Privacy", "Governance"]
                },
                {
                    "id": "21",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#implement-appropriate-data-management-procedures",
                    "guideline": "Implement Appropriate Data Management Procedures",
                    "description": "Expired or unused data has a cost, takes up space, and requires maintenance. As such, the ability for customers to manage their own data and for service providers to manage older website material which no longer applies but might still have use will be a carbon benefit.",
                    "criteria": [
                        {
                            "title": "Outdated Content",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM21-1)",
                            "description": "Outdated or otherwise expired product content and data are archived and deleted via automated expiration dates and scheduled product audits. An archiving schedule with a lighter version of the old searchable content is made available."
                        },
                        {
                            "title": "Data Controllers",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM21-2)",
                            "description": "Users can control, manage, and delete their data, subscriptions, and accounts."
                        }
                    ],
                    "impact": "Low",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "By storing less data, you inherently require less computing power to maintain a service, and this will require less energy within the Internet's infrastructure. This will help to reduce your emissions.",
                            "Privacy": "Good data management supports better data protection practices.",
                            "Performance": "Putting older information that is less relevant onto a smaller scaled-down version of your website will reduce your bandwidth usage, and it's likely not going to impact visitors as archived information will have significantly fewer visitors.",
                            "Economic": "Requiring less data has a potential financial benefit in that the lower storage requirements mean that you can scale down your hosting package or, if on a pay-as-you-go scheme, simply be charged less for your infrastructure costs."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "Ensuring data is [archived](https://web.archive.org/) can prove useful if it's later deleted."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.2.4 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "EU Cyber Resilience Act": "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act",
                            "Evergreen Content is More Sustainable": "https://www.mightybytes.com/blog/content-governance-evergreen-content/",
                            "[GPFEDS] 1.6 - Strategy (Data Collection) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 5.8 - Content (Archive And Delete) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.2 - Back-End (Data Retention) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 8.8 - Hosting (Hot / Cold Data) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-7006 - Obsolete Data": "https://gr491.isit-europe.org/en/crit.php?id=1-7006-backend-the-regulations-require-control-of-the-data",
                            "[GR491] 1-7016 - Expiration Dates": "https://gr491.isit-europe.org/en/crit.php?id=1-7016-backend-the-specifications-reveal-data-collections-of-asynchronous",
                            "[GR491] 5-3035 - Archiving and Management": "https://gr491.isit-europe.org/en/crit.php?id=5-3035-uxui-often-a-significant-amount-of-files-often",
                            "GreenIT (French) 085 - Mettre en place un plan de fin de vie du site": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_085_fr.md",
                            "GreenIT (French) 4012 - Mettre en place une politique d'expiration et suppression des données": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4012_fr.md",
                            "GreenIT (French) 4031 - Avoir une stratégie de fin de vie des contenus": "https://github.com/cnumr/best-practices/blob/main/chapters/BP_4031_fr.md",
                            "How to Build a Low-tech Website?": "https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/",
                            "How To Manage Your Old & Outdated Content": "https://searchengineland.com/manage-old-outdated-content-226195",
                            "How To Protect Your Users With The Privacy By Design Framework": "https://www.smashingmagazine.com/2017/07/privacy-by-design-framework/",
                            "Learn Privacy": "https://web.dev/blog/introducing-learn-privacy?hl=en",
                            "My solar-powered and self-hosted website": "https://dri.es/my-solar-powered-and-self-hosted-website",
                            "OpQuast 19 - Accounts and subscriptions opened online can be closed online by the same method.": "https://checklists.opquast.com/en/web-quality-assurance/accounts-and-subscriptions-opened-online-can-be-closed-online",
                            "Privacy UX: Privacy-Aware Design Framework": "https://www.smashingmagazine.com/2019/04/privacy-ux-aware-design-framework/",
                            "Should You Update, Rewrite or Delete Outdated Content?": "https://www.greenmellenmedia.com/should-you-update-rewrite-or-delete-outdated-content/",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "Your right to get your data deleted": "https://ico.org.uk/for-the-public/your-right-to-get-your-data-deleted/"
                        }
                    ],
                    "tags": ["Social Equity", "Security", "Privacy", "Strategy"]
                },
                {
                    "id": "22",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#promote-responsible-emerging-technology-practices",
                    "guideline": "Promote and Implement Responsible Emerging Technology Practices",
                    "description": "The organization has devised and implemented responsible policies related to artificial intelligence, the Internet of Things (IoT), Web3 (Decentralized Web, blockchain, etc), and related emerging technologies.",
                    "criteria": [
                        {
                            "title": "Emerging Technologies",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM22-1)",
                            "description": "The organization has public-facing policies in place for emerging technologies, and all such technologies are ethically sourced, screened, validated, and implemented in a non-discriminatory, responsible manner."
                        },
                        {
                            "title": "Disruptive Technology",
                            "testable": "Human Testable",
                            "description": "The organization shows how it up-skills workers as new technologies and practices potentially disrupt its business model."
                        },
                        {
                            "title": "Technology Legislation",
                            "testable": "Human Testable",
                            "description": "The organization supports and complies with responsible legislation related to automation and emerging technologies (such as the EU AI Act)."
                        },
                        {
                            "title": "Environmental Responsibilities",
                            "testable": "Human Testable",
                            "description": "Organizations must consider, audit, and account for any environmental considerations that may derive from the use of emerging technologies they wish to either promote or implement within a chosen setting. Also note that this should include third-party choices, the \"expense\" (in terms of waste or emissions) of the utilization of the technology to create a desired result and consequential issues to the environment that may arise from its deployment."
                        },
                        {
                            "title": "Automated Tooling",
                            "testable": "Human Testable",
                            "description": "Automated tooling, scrapers, spiders, bots, Artificial Intelligence, and other forms of machine-assisted data gathering must abide by requests to opt out at the host, server, or website level. Providers must declare themselves as non-human when requesting within the user-agent / HTTP header. Providers must also publish impact reports relating to their gathering activities."
                        },
                        {
                            "title": "Quantum Resilience",
                            "testable": "Human Testable",
                            "description": "Don't roll out post-quantum encryption for high-traffic services that don't need resilience against harvest now, decrypt later."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Operations": "Organizations that prioritize ongoing learning and continuous improvement build stronger teams that can adapt more quickly.",
                            "Economic": "Organizations with clear policies related to digital disruption are more resilient and can pivot more quickly than those without, and organizations with clear emerging technology policies are at less risk of any number of potential threats, including legal action."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "How one business [encourages innovation](https://element84.com/company/azaveas-10-time-program-how-we-encourage-innovation-internally/) by setting aside 10% of time for learning."
                        }
                    ],
                    "resources": [
                        {
                            "3rd Global CryptoAsset Benchmarking Study (PDF)": "https://www.jbs.cam.ac.uk/wp-content/uploads/2021/01/2021-ccaf-3rd-global-cryptoasset-benchmarking-study.pdf",
                            "63% of Websites Receive AI Traffic": "https://ahrefs.com/blog/ai-traffic-study/",
                            "A Computer Scientist Breaks Down Generative AI's Hefty Carbon Footprint": "https://www.scientificamerican.com/article/a-computer-scientist-breaks-down-generative-ais-hefty-carbon-footprint/",
                            "A sustainable internet: Missing pieces to a healthy future": "https://www.orfonline.org/expert-speak/sustainable-internet-missing-pieces-healthy-future/",
                            "AI Act is Here": "https://alvaromontoro.com/blog/68057/ai-act-is-here",
                            "AI and crypto mining are driving up data centers' energy use": "https://www.theverge.com/2024/1/24/24049047/data-center-ai-crypto-bitcoin-mining-electricity-report-iea",
                            "AI Environmental Equity": "https://themarkup.org/hello-world/2023/07/08/ai-environmental-equity-its-not-easy-being-green",
                            "AI has an environmental problem": "https://www.unep.org/news-and-stories/story/ai-has-environmental-problem-heres-what-world-can-do-about",
                            "AI Regulation Around The World": "https://www.taylorwessing.com/en/interface/2023/ai---are-we-getting-the-balance-between-regulation-and-innovation-right/ai-regulation-around-the-world",
                            "AI transparency framework": "https://uxdesign.cc/ai-transparency-framework-cf89fa61dc1b",
                            "AI Will Spew Gas Fumes for Years Before the Nuclear Revolution Takes Off": "https://gizmodo.com/ai-will-spew-gas-fumes-for-years-before-the-nuclear-revolution-takes-off-2000550092",
                            "AI's Climate Impact Goes beyond Its Emissions": "https://www.scientificamerican.com/article/ais-climate-impact-goes-beyond-its-emissions/",
                            "Are harvest now, decrypt later cyberattacks actually happening?": "https://www.techmonitor.ai/hardware/quantum/harvest-now-decrypt-later-cyberattack-quantum-computer",
                            "Bitcoin Energy Consumption Index": "https://digiconomist.net/bitcoin-energy-consumption",
                            "Block the Bots that Feed “AI” Models by Scraping Your Website": "https://neil-clarke.com/block-the-bots-that-feed-ai-models-by-scraping-your-website/",
                            "Blockin bots": "https://ethanmarcotte.com/wrote/blockin-bots/",
                            "Blocking AI Bots": "https://frontendmasters.com/blog/blocking-ai-bots/",
                            "Carbon Emissions from AI and Crypto Are Surging and Tax Policy Can Help": "https://www.imf.org/en/Blogs/Articles/2024/08/15/carbon-emissions-from-ai-and-crypto-are-surging-and-tax-policy-can-help",
                            "Carbontracker: Tracking and Predicting the Carbon Footprint of Training Deep Learning Models": "https://arxiv.org/abs/2007.03051",
                            "ChatGPT was tasked with designing a website. The result was as manipulative as you'd expect": "https://www.fastcompany.com/91233844/chatgpt-was-tasked-with-designing-a-website-the-result-was-as-manipulative-as-youd-expect",
                            "Crypto and blockchain must accept they have a problem, then lead in sustainability": "",
                            "Cryptocurrency's Dirty Secret: Energy Consumption": "https://techcrunch.com/2021/05/16/crypto-and-blockchain-must-accept-they-have-a-problem-then-lead-in-sustainability/",
                            "Datacenters to emit 3x more carbon dioxide because of generative AI": "https://www.theregister.com/2024/09/06/datacenters_set_to_emit_3x/",
                            "Designing sustainable AI": "https://cloud.google.com/blog/topics/sustainability/tpus-improved-carbon-efficiency-of-ai-workloads-by-3x",
                            "Digital aspects and the environment": "https://dig.watch/trends/digital-and-environment",
                            "Digital education: The unique learning ecosystem TechUcation": "https://www.ottogroup.com/en/stories/story/story-techucation.php",
                            "Dismantling the Quantum Threat": "https://www.researchgate.net/publication/367205680_Dismantling_the_Quantum_Threat",
                            "Do you need an AI ethicist?": "https://www.computerworld.com/article/3601491/do-you-need-an-ai-ethicist.html",
                            "Ecological Awareness for the Decentralized Web": "https://blog.archive.org/2021/09/20/ecological-awareness-for-the-decentralized-web/",
                            "The Environmental Impact of ChatGPT": "https://earth.org/environmental-impact-chatgpt/",
                            "EU Artificial Intelligence Act": "https://artificialintelligenceact.eu/the-act/",
                            "Frugal AI": "https://greentechinnovation.fr/frugal-ai/",
                            "Frugal AI Challenge": "https://frugalaichallenge.org/",
                            "Frugal Machine Learning": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5012869",
                            "Generating AI Images Uses as Much Energy as Charging Your Phone, Study Finds": "https://gizmodo.com/ai-images-as-much-energy-as-charging-phone-hugging-face-1851065091",
                            "Generative AI is a climate disaster": "https://www.disconnect.blog/p/generative-ai-is-a-climate-disaster",
                            "Generative AI's environmental costs are soaring — and mostly secret": "https://www.nature.com/articles/d41586-024-00478-x",
                            "Go ahead and block AI web crawlers": "https://www.coryd.dev/posts/2024/go-ahead-and-block-ai-web-crawlers/",
                            "[GPFEDS] 1.7 - Strategy (Encryption) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.4 - Back-End (Consensus Mechanism) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 9.1-7 - Algorithms (Complete Chapter) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "The human-centered AI manifesto": "The human-centered AI manifesto",
                            "How off-grid solar microgrids can power the AI race": "https://www.offgridai.us/",
                            "In battle against climate crisis, don't overlook the blockchain": "https://www.unep.org/news-and-stories/story/battle-against-climate-crisis-dont-overlook-blockchain",
                            "Let's talk about AI and end-to-end encryption": "https://blog.cryptographyengineering.com/2025/01/17/lets-talk-about-ai-and-end-to-end-encryption/",
                            "New Method Forecasts Computation, Energy Costs for Sustainable AI Models": "https://news.ncsu.edu/2025/01/13/forecasting-for-sustainable-ai/",
                            "No bots allowed?": "https://www.wholegraindigital.com/blog/no-bots-allowed/",
                            "Sustainability of Bitcoin and its Impact on the Environment": "https://grc.studentorg.berkeley.edu/the-sustainability-of-bitcoin-and-its-impact-on-the-environment/",
                            "Sustainable Ux in VR (PPT)": "https://docs.google.com/presentation/d/1OTXaz3RuV0HWgM754PRMUC7d2KYVHH974s5hnAt53wk/edit",
                            "The carbon emissions of writing and illustrating are lower for AI than for humans": "https://www.nature.com/articles/s41598-024-54271-x",
                            "The cyber-consciousness of environmental assessment": "https://iopscience.iop.org/article/10.1088/1748-9326/ac413b",
                            "The Environmental Impacts of AI": "https://huggingface.co/blog/sasha/ai-environment-primer",
                            "The growing energy footprint of artificial intelligence": "https://www.cell.com/joule/abstract/S2542-4351(23)00365-3)",
                            "The role of artificial intelligence in achieving the Sustainable Development Goals": "https://www.nature.com/articles/s41467-019-14108-y",
                            "The Wholegrain guide to ethical use of AI": "https://www.wholegraindigital.com/blog/ethical-ai-guidelines/",
                            "Thinking about using AI?": "https://www.thegreenwebfoundation.org/publications/report-ai-environmental-impact/",
                            "Thousands of creatives join forces to combat AI data scraping": "https://siliconangle.com/2024/10/22/thousands-creatives-join-forces-combat-ai-data-scraping/",
                            "Turn off AI features by default (to reduce their climate impact)": "https://hidde.blog/please-make-ai-opt-in/",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators",
                            "Web3 and Sustainability": "https://www.lcx.com/web3-and-sustainability/",
                            "Web3 and sustainability: Benefits and risks": "https://www.techtarget.com/sustainability/feature/Web3-and-sustainability-Benefits-and-risks",
                            "What is the environmental impact of Web3?": "https://venturebeat.com/business/what-is-the-environmental-impact-of-web3/",
                            "What Is the Future of Quantum-Proof Encryption?": "https://spectrum.ieee.org/post-quantum-cryptography-nist",
                            "Why Blockchain, NFTs, And Web3 Have A Sustainability Problem": "https://www.forbes.com/sites/bernardmarr/2023/01/13/why-blockchain-nfts-and-web3-have-a-sustainability-problem/",
                            "Why We Need To Be UpSkilling The Current Workforce For The Green Economy": "https://social.hays.com/2022/09/29/why-we-need-to-be-upskilling-the-current-workforce-for-the-green-economy/"
                        }
                    ],
                    "tags": ["Social Equity", "Content", "Governance"]
                },
                {
                    "id": "23",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#include-responsible-financial-policies",
                    "guideline": "Include Responsible Financial Policies",
                    "description": "The organization implements responsible finance strategies, including divesting from fossil fuels and appropriately resourcing digital products and services to account for long-term care and maintenance.",
                    "criteria": [
                        {
                            "title": "Fuel Divestment",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM23-1)",
                            "description": "The organization has divested from fossil fuels and moved its banking, sponsorship, and other affiliations to more responsible partners."
                        },
                        {
                            "title": "Responsible Finance",
                            "testable": "Human Testable",
                            "description": "The organization engages in flexible financing and responsible budgeting for its digital products and services to accommodate long-term care and maintenance."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Environmental": "Divesting from fossil fuels moves us more quickly to an economy that is powered by renewable energy, which can reduce the catastrophic impacts of climate change.",
                            "Economic": "Responsibly financing digital products and services improves their resilience and saves the organization time, money, and resources eventually."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "A tool that can help you identify a [green bank](https://bank.green/) worldwide."
                        }
                    ],
                    "resources": [
                        {
                            "A beginner's guide to fossil fuel divestment": "https://www.theguardian.com/environment/2015/jun/23/a-beginners-guide-to-fossil-fuel-divestment",
                            "Case For Fossil Fuel Divestment": "https://www.forbes.com/sites/davidcarlin/2021/02/20/the-case-for-fossil-fuel-divestment/",
                            "Environmental impact assessment of online advertising": "https://www.sciencedirect.com/science/article/pii/S0195925517303505",
                            "Fossil fuel divestment": "https://en.wikipedia.org/wiki/Fossil_fuel_divestment",
                            "How Fossil Fuel Divestment Falls Short": "https://hbr.org/2022/11/how-fossil-fuel-divestment-falls-short",
                            "How to Improve Your Digital Resilience": "https://www.mightybytes.com/blog/digital-resilience/",
                            "Resilience for sustainable, inclusive growth": "https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/resilience-for-sustainable-inclusive-growth",
                            "The Digital Resilience Guide": "https://www.splunk.com/en_us/blog/learn/digital-resilience.html",
                            "Top Tips For A Sustainable Sponsorship": "https://www.sponsorship-awards.co.uk/top-tips-sustainable-sponsorship",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 10 (Inequality)": "https://sdgs.un.org/goals/goal10#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "What Is Fossil Fuel Divestment": "https://gofossilfree.org/divestment/what-is-fossil-fuel-divestment/"
                        }
                    ],
                    "tags": ["Social Equity", "Ideation", "Governance"]
                },
                {
                    "id": "24",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#include-organizational-philanthropy-policies",
                    "guideline": "Include Organizational Philanthropy Policies",
                    "description": "For-profit organizations have clear philanthropy policies and practices in place to help non-profit organizations build digital capacity and acumen while also engaging their own teams in meaningful work that promotes shared learning and stretch goals.",
                    "criteria": [
                        {
                            "title": "Philanthropy Policy",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM24-1)",
                            "description": "The organization has a clear corporate giving policy and creates philanthropic partnerships with strategically aligned organizations."
                        },
                        {
                            "title": "Voluntary Work",
                            "testable": "Human Testable",
                            "description": "The organization engages in free or volunteer projects, which help its team learn new tools and tactics, while also helping charities and non-profit organizations build capacity."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Operations": "Organizations with clear philanthropy strategies that include volunteer or free projects with team stretch goals can have higher employee engagement and retention.",
                            "Economic": "Organizations with clear philanthropic strategies often have a system of checks and balances in place that support better overall financial practices."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "The [corporate philanthropy practices](https://www.mightybytes.com/blog/corporate-philanthropy-practices/) of Mightybytes."
                        }
                    ],
                    "resources": [
                        {
                            "1% For The Planet": "https://www.onepercentfortheplanet.org/",
                            "7 business benefits of employee volunteering": "https://www.sage.com/en-gb/blog/benefits-volunteer-days-employee-engagement/",
                            "Side Project Programs Can Have Major Benefits for Employers": "https://builtin.com/software-engineering-perspectives/20-percent-time",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators",
                            "What is Chicago Cause?": "https://www.orbitmedia.com/about/chicago-cause/"
                        }
                    ],
                    "tags": ["Social Equity", "Content", "Governance"]
                },
                {
                    "id": "25",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#plan-for-a-digital-product-or-service-s-care-and-end-of-life",
                    "guideline": "Plan for a Digital Product or Service's Care and End-of-Life",
                    "description": "Everything ends at some point, planning for if and when a product or service is finalized makes good ethical sense to ensure customers can be transitioned toward a replacement rather than losing access to their data.",
                    "criteria": [
                        {
                            "title": "End-of-life Care",
                            "testable": "Human Testable",
                            "description": "Clear, documented end-of-life guidelines exist that include data disposal, archiving, file deletion, etc guidance."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Many products or services keep unnecessary data and functionalities alive while they are not used or useful anymore. Planning for end-of-life reduces their long-term environmental impact by eliminating waste and allowing the freed-up resources to be utilized for other information.",
                            "Security": "Regular maintenance, updates, and care on outdated software and data can significantly reduce security risks.",
                            "Privacy": "Incorporating clear end-of-life policies that include a visitor's right to be forgotten will benefit the visitor by explaining how you enforce data protection and comply with legislation.",
                            "Performance": "Removing unnecessary features, functions, and data of a service improves performance and resilience as the resources which were utilizing data will be better spent on more popular functionality, and the gains made from their elimination will be felt in terms of emissions through saved development time.",
                            "Economic": "Removing redundancy in the product or service can generate savings in hosting, security costs, and other third-party subscriptions."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "This is a [checklist](https://www.productplan.com/learn/how-to-end-of-life-product/) for product end-of-life care."
                        }
                    ],
                    "resources": [
                        {
                            "[AFNOR] Spec 5.2.6 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "End of life": "https://sustainabilityguide.eu/ecodesign/end-of-life/",
                            "[GPFEDS] 1.6 - Strategy (Data Collection) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.7 - Specifications (Maintainence & Decomissioning) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 7.2 - Back-End (Data Retention) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How can we keep domains working long after our death?": "https://cagrimmett.com/2023/11/04/domain-longevity/",
                            "What Does End-of-life (EOL) Mean For Your Website Platform?": "https://fruition.net/blog/what-does-eol-mean-for-your-website",
                            "What is Your Data Disposal Strategy?": "https://www.mightybytes.com/blog/what-is-your-data-disposal-strategy/"
                        }
                    ],
                    "tags": ["Social Equity", "Research", "Compatibility", "Software", "E-Waste", "Strategy"]
                },
                {
                    "id": "26",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#include-e-waste-right-to-repair-and-recycling-policies",
                    "guideline": "Include E-Waste, Right-To-Repair, and Recycling Policies",
                    "description": "The organization addresses e-waste, right-to-repair, recycling, and related practices in its operations.",
                    "criteria": [
                        {
                            "title": "E-Waste Policy",
                            "testable": "Human Testable",
                            "description": "The organization has specific policies in place to recycle e-waste and repair owned technology products whenever possible."
                        },
                        {
                            "title": "Recycling And Repairing",
                            "testable": "Human Testable",
                            "description": "The organization has formed relationships with local partners for e-waste recycling and repair."
                        },
                        {
                            "title": "Refurbishment Strategy",
                            "testable": "Human Testable",
                            "description": "The organization buys refurbished equipment whenever possible."
                        },
                        {
                            "title": "Right-to-Repair",
                            "testable": "Human Testable",
                            "description": "The organization allows consumers to repair (to the best of their ability) the consumables they purchase, offering (if possible at cost) replacement components and provides clear instructions to resolve faults that occur."
                        }
                    ],
                    "impact": "High",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "Organizations with clear e-waste and recycling policies reduce environmental impact and promote circularity, while also extending the shelf-life of technology hardware. When coupled with clear philanthropic policies, donated hardware can also support resource-constrained charities.",
                            "Economic": "Extending the shelf-life of hardware and clear e-waste / recycling policies reduces costs."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "High",
                            "energy": "High",
                            "water": "High",
                            "emissions": "High"
                        }
                    ],
                    "example": [
                        {
                            "content": "The [e-waste Policy Toolkit](https://www.itu.int/en/ITU-D/Environment/Pages/Toolbox/WEEE-Africa-Toolkit.aspx)."
                        }
                    ],
                    "resources": [
                        {
                            "Carbon Emission Implications of ICT Re-use at the University of Edinburgh (PDF)": "https://www.societybyte.swiss/en/2020/04/09/digitization-and-the-environment-opportunities-risks-and-the-need-for-action/",
                            "Digitization and the Environment": "https://www.societybyte.swiss/en/2020/04/09/digitization-and-the-environment-opportunities-risks-and-the-need-for-action/",
                            "Electronic waste": "https://en.wikipedia.org/wiki/Electronic_waste",
                            "Future trends of Green All Optical Networks and ICT Infrastructure in a large context": "https://www.researchgate.net/publication/368690756_Future_trends_of_Green_All_Optical_Networks_and_ICT_Infrastructure_in_a_large_context_-_trends_to_2050",
                            "[GPFEDS] 2.7 - Specifications (Maintainence & Decomissioning) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "How Companies Are Addressing The e-waste Problem": "https://www.forbes.com/sites/serenitygibbons/2021/10/21/how-companies-are-addressing-the-e-waste-problem/",
                            "How To Effectively Use Second-Hand Products In Your Business": "https://menofvalue.com/2021/03/12/how-to-effectively-use-second-hand-products-in-your-business/",
                            "How to write an environmental policy": "https://www.infoentrepreneurs.org/en/guides/how-to-write-an-environmental-policy/",
                            "How to write an environmental policy (PDF)": "https://www.sustainablebusinesstoolkit.com/wp-content/uploads/2012/12/How-to-write-an-environmental-policy-Sustainable-Business-Toolkit.pdf",
                            "How Your Business Can Unpack and Prioritize Sustainability Through Recycling": "https://www.entrepreneur.com/green-entrepreneur/how-your-business-can-unpack-the-importance-of-recycling/438815",
                            "Materials & Parts": "https://sustainabilityguide.eu/ecodesign/materials-parts/",
                            "Reduce, reuse, recycle": "https://www.green.earth/blog/reduce-reuse-recycle-7-ways-for-businesses-to-reduce-waste",
                            "Sources and Streams of Electronic Waste": "https://www.cell.com/one-earth/fulltext/S2590-3322(20)30307-9",
                            "To Green the Internet, We Need RIPE": "https://labs.ripe.net/author/michael_oghia/to-green-the-internet-we-need-ripe/",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "United Nations [SDGS] Goal 11 (Human Habitats)": "https://sdgs.un.org/goals/goal11#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 13 (Climate Change)": "https://sdgs.un.org/goals/goal13#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "Content", "Ideation", "Hardware", "E-Waste", "Governance"]
                },
                {
                    "id": "27",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#define-performance-and-environmental-budgets",
                    "guideline": "Define Performance and Environmental Budgets",
                    "description": "Setting targets and limits regarding your product or service is important for keeping a sustainable mindset. Using budgets, you can declare the remits of which you will work within to ensure your emissions do not fall outside (and monitor your progress through development).",
                    "criteria": [
                        {
                            "title": "Environmental Budget",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM27-1)",
                            "description": "The product team has defined, baselined, and documented clear sustainability and environmental budget criteria that cover the page, user-journey, and digital service levels and metrics (such as a CO2.js score) that are approved by relevant product stakeholders."
                        },
                        {
                            "title": "Performance Budget",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM27-2)",
                            "description": "Tools such as a performance budget exist to determine the maximum size (goals) your app or website can weigh to reduce the data transfer and HTTP request impact (using metrics like Google Lighthouse)."
                        },
                        {
                            "title": "Human Budget",
                            "testable": "Human Testable",
                            "description": "KPIs are defined around engineering hours, development time, or sprints keeping the health and wellbeing of your workers paramount. Consideration has been taken around optimizing your workflow sustainably to allow all tasks to be performed with care."
                        },
                        {
                            "title": "Measurable Improvements",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM27-4)",
                            "description": "The product team can measurably show how much the budgeting process improved performance and reduced emissions."
                        },
                        {
                            "title": "Capacity And Maintenance",
                            "testable": "Human Testable",
                            "description": "The product team invests in resources to build capacity and maintain the budgets over time."
                        }
                    ],
                    "impact": "Medium",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Environmental": "A strict sustainability or performance budget will reduce the chance of your website getting too large (and causing pollution transfers), which in turn will ensure it has a minimal impact on a visitor's device. This will have a direct impact on emissions reduction by forcing businesses to choose where to make reductions and efficiency savings.",
                            "Performance": "Keeping realistic goals regarding delivery size will push developers to optimize resource-heavy projects and reconsider using large tooling in place of lightweight alternatives. Moreover, A lower set target budget for a product or service will decrease the amount of time a browser spends transferring and rendering data.",
                            "Economic": "Customers will not have to keep upgrading devices to match the needs of a website that grows (unchecked) over time.",
                            "Conversion": "Reduced churn and page abandonment will occur due to the application or website becoming more performant. Potentially, your search engine ranking may perform better due to performance being a key indicator in PageRank algorithms."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "code": "[\r\n{\r\n\t\"resourceSizes\": [],\r\n\t\"timings\": [\r\n\t{\r\n\t\t\"metric\": \"largest-contentful-paint\",\r\n\t\t\"budget\": 2500\r\n\t},\r\n\t{\r\n\t\t\"metric\": \"max-potential-fid\",\r\n\t\t\"budget\": 100\r\n\t},\r\n\t{\r\n\t\t\"metric\": \"cumulative-layout-shift\",\r\n\t\t\"budget\": 0.1\r\n\t}\r\n\t]\r\n}\r\n]",
                            "content": "[Performance Budget](https://www.performancebudget.io/)."
                        }
                    ],
                    "resources": [
                        {
                            "A Complete Guide to Performance Budgets": "https://www.speedcurve.com/blog/performance-budgets/",
                            "[AFNOR] Spec 5.1.4 (French)": "https://www.boutique.afnor.org/en-gb/standard/afnor-spec-2201//fa203506/323315",
                            "Are there limits to growth in data traffic? (PDF)": "https://www.researchgate.net/publication/303748253_Are_there_limits_to_growth_in_data_traffic_on_time_use_data_generation_and_speed",
                            "Audits d'écoconception - conclusion (French)": "https://ldevernay.github.io/green/2020/07/05/audits-conclusion.html",
                            "Browser Rendering Optimization": "https://www.udacity.com/course/browser-rendering-optimization--ud860",
                            "Can You Afford It?: Real-world Web Performance Budgets": "https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/",
                            "CO2.js": "https://www.thegreenwebfoundation.org/co2-js/",
                            "Core Web Vitals For SEOs & Developers": "https://ahrefs.com/blog/core-web-vitals/",
                            "Fast Load Times: Set performance budgets": "https://web.dev/explore/fast?hl=en#set-performance-budgets",
                            "Find Out How You Stack Up to New Industry Benchmarks for Mobile Page Speed (PDF)": "https://think.storage.googleapis.com/docs/mobile-page-speed-new-industry-benchmarks.pdf",
                            "Front-End Performance 2021: Setting Realistic Goals": "https://www.smashingmagazine.com/2021/01/front-end-performance-setting-realistic-goals/",
                            "[GPFEDS] 1.5 - Strategy (Impact Goals) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 4.9 - UX and UI (Server Requests) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 6.1 - Front-End (Download Limits) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 1-3009 - Sustainability Budgets": "https://gr491.isit-europe.org/en/crit.php?id=1-3009-uxui-depending-on-the-organizations-level-of-maturity",
                            "How Performance Budgets Improve Websites": "https://www.mightybytes.com/blog/performance-budget/",
                            "How to set a Page Weight Budget for a greener, faster website": "https://www.wholegraindigital.com/blog/how-to-page-weight-budget/",
                            "Modern web bloat means some pages load 21MB of data": "https://www.tomshardware.com/tech-industry/modern-web-bloat-means-some-entry-level-phones-cant-run-simple-web-pages-and-load-times-are-high-for-pcs-some-sites-run-worse-than-pubg",
                            "Page Speed": "https://moz.com/learn/seo/page-speed",
                            "Performance Budget": "https://www.performancebudget.io/",
                            "Performance Budget Calculator": "https://perf-budget-calculator.firebaseapp.com/",
                            "Performance budget visualizer": "https://codepen.io/bradfrost/pen/EPQVBp/",
                            "Performance budgets": "https://developer.mozilla.org/en-US/docs/Web/Performance/Performance_budgets",
                            "Performance budgets 101": "https://web.dev/articles/performance-budgets-101?hl=en",
                            "Performance Budgets: The Easiest Way to a Faster Site": "https://calibreapp.com/blog/performance-budgets",
                            "Reduce Your Website's Environmental Impact With a Carbon Budget": "https://css-tricks.com/reduce-your-websites-environmental-impact-with-a-carbon-budget/",
                            "Situer le numérique (French)": "https://situer-le-numerique.netlify.app/#les-tendances-de-d%C3%A9veloppement-du-num%C3%A9rique",
                            "SpeedCurve": "https://www.speedcurve.com/",
                            "Sustainable Practices": "https://www.the-public-good.com/web-development/sustainable-practices",
                            "Sustainable Web Design": "https://alistapart.com/article/sustainable-web-design/",
                            "The overlooked environmental footprint of increasing Internet use": "https://www.sciencedirect.com/science/article/abs/pii/S0921344920307072",
                            "United Nations [SDGS] Goal 7 (Sustainable Energy)": "https://sdgs.un.org/goals/goal7#targets_and_indicators",
                            "Use Lighthouse for performance budgets": "https://web.dev/articles/use-lighthouse-for-performance-budgets?hl=en",
                            "Web Almanac: Sustainability": "https://almanac.httparchive.org/en/2022/sustainability",
                            "Why Your Website Should Be Under 14KB In Size": "https://endtimes.dev/why-your-website-should-be-under-14kb-in-size/"
                        }
                    ],
                    "tags": ["Accessibility", "Ideation", "Research", "Usability", "Performance", "KPIs"]
                },
                {
                    "id": "28",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#use-open-source-tools",
                    "guideline": "Use Open Source Tools",
                    "description": "The organization has clear policies about using open source tools, including how it gives back to the community and responsibly manages code repositories to reduce waste.",
                    "criteria": [
                        {
                            "title": "Open Source Policy",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM28-1)",
                            "description": "The organization has a clear open source policy in place that outlines how it uses open source tools and the practices it supports surrounding open source development."
                        },
                        {
                            "title": "Collaboration",
                            "testable": "Human Testable",
                            "description": "The organization has a track record of collaboration and community-building around open source principles."
                        },
                        {
                            "title": "Contribution",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM28-3)",
                            "description": "The organization regularly contributes to open source community-based projects."
                        }
                    ],
                    "impact": "High",
                    "effort": "High",
                    "benefits": [
                        {
                            "Operations": "Collaboration and community-building around open source practices engender trust and help to reduce inequalities.",
                            "Economic": "If managed properly, open source tools can significantly reduce development time."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Medium",
                            "energy": "Medium",
                            "water": "Medium",
                            "emissions": "Medium"
                        }
                    ],
                    "example": [
                        {
                            "content": "GitLab discloses its [open source](https://handbook.gitlab.com/handbook/engineering/open-source/) policy publicly."
                        }
                    ],
                    "resources": [
                        {
                            "Can OSSPledge Fix Open Source Sustainability?": "https://www.trevorlasn.com/blog/can-open-source-pledge-fix-open-source-sustainability",
                            "Choose an open source license": "https://choosealicense.com/",
                            "Creative Commons License": "https://chooser-beta.creativecommons.org/",
                            "FreeCodeCamp: How to Contribute to Open Source": "https://github.com/freeCodeCamp/how-to-contribute-to-open-source",
                            "[GPFEDS] 1.8 - Strategy (Open Source) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.9 - Specifications (Off-The-Shelf Components) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 2.10 - Specifications (Third-Party Services) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-7034 - Open Source Availability": "https://gr491.isit-europe.org/en/crit.php?id=2-7034-backend-an-open-source-solution-is-not-a",
                            "[GR491] 3-5018 - Open Source API": "https://gr491.isit-europe.org/en/crit.php?id=3-5018-frontend-the-opacity-of-some-service-providers-does",
                            "[GR491] 3-5022 - Open Source Alternative": "https://gr491.isit-europe.org/en/crit.php?id=3-5022-frontend-an-open-source-solution-is-not-a",
                            "How to Contribute to an Open Source Project": "https://css-tricks.com/how-to-contribute-to-an-open-source-project/",
                            "How to Contribute to Open Source": "https://opensource.guide/how-to-contribute/",
                            "How to Contribute to Open Source Projects: A Beginner's Guide": "https://www.freecodecamp.org/news/how-to-contribute-to-open-source-projects-beginners-guide/",
                            "Open Source Employee Handbook": "https://handbook.gitlab.com/",
                            "Open Source Pledge": "https://opensourcepledge.com/",
                            "The open source way": "https://opensource.com/open-source-way",
                            "Todo: Open Source Community": "https://todogroup.org/",
                            "United Nations [SDGS] Goal 4 (Education)": "https://sdgs.un.org/goals/goal4#targets_and_indicators",
                            "United Nations [SDGS] Goal 8 (Economics & Work)": "https://sdgs.un.org/goals/goal8#targets_and_indicators",
                            "United Nations [SDGS] Goal 9 (Infrastructure)": "https://sdgs.un.org/goals/goal9#targets_and_indicators",
                            "United Nations [SDGS] Goal 12 (Consumption & Production)": "https://sdgs.un.org/goals/goal12#targets_and_indicators",
                            "United Nations [SDGS] Goal 17 (Global Partnership)": "https://sdgs.un.org/goals/goal17#targets_and_indicators"
                        }
                    ],
                    "tags": ["Social Equity", "UI", "Ideation", "Assets", "Software"]
                },
                {
                    "id": "29",
                    "url": "https://w3c.github.io/sustainableweb-wsg/#create-a-business-continuity-and-disaster-recovery-plan",
                    "guideline": "Create a Business Continuity and Disaster Recovery Plan",
                    "description": "Resilience of the product or service in case of a disaster or emergency should be ensured to restore and maintain operations in case of disruptions.",
                    "criteria": [
                        {
                            "title": "Plan of Action",
                            "testable": "Human Testable",
                            "description": "The organization has created a plan of action that is regularly reviewed and occasionally tested to determine readiness in case of an incident and has procedures to quickly recover from such issues."
                        },
                        {
                            "title": "Audience Awareness",
                            "testable": "[Machine Testable](https://w3c.github.io/sustainableweb-wsg/star.html#BSPM29-2)",
                            "description": "The organization regularly maintains transparent communication with its audience regarding issues that may affect service delivery or user data."
                        }
                    ],
                    "impact": "Low",
                    "effort": "Medium",
                    "benefits": [
                        {
                            "Operations": "Transparency around digital resilience procedures will encourage trust that a product or service can be depended upon for critical use.",
                            "Economic": "This will ensure limiting the extent of the disruption to the website or application.",
                            "Social": "Users will have access to potentially vital online services in case of a disaster or emergency."
                        }
                    ],
                    "GRI": [
                        {
                            "materials": "Low",
                            "energy": "Low",
                            "water": "Low",
                            "emissions": "Low"
                        }
                    ],
                    "example": [
                        {
                            "content": "IBM provides some great examples of [disaster recovery planning](https://www.ibm.com/docs/en/i/7.5?topic=system-example-disaster-recovery-plan) for a range of different situations."
                        }
                    ],
                    "resources": [
                        {
                            "[GPFEDS] 2.7 - Specifications (Maintainence & Decomissioning) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GPFEDS] 3.4 - Architecture (Supplied Updates) (PDF)": "https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf",
                            "[GR491] 2-6010 - SLA and QoS": "https://gr491.isit-europe.org/en/crit.php?id=2-6010-architecture-the-state-of-the-art-technology-tends",
                            "How to Improve Your Digital Resilience": "https://www.mightybytes.com/blog/digital-resilience/",
                            "ISO 22301:2019 - Security and resilience": "https://www.iso.org/standard/75106.html",
                            "Resilience for sustainable, inclusive growth": "https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/resilience-for-sustainable-inclusive-growth",
                            "Sustainability and business continuity share a common goal": "https://www.techtarget.com/searchdisasterrecovery/tip/Sustainability-and-business-continuity-share-a-common-goal",
                            "The Digital Resilience Guide": "https://www.splunk.com/en_us/blog/learn/digital-resilience.html",
                            "United Nations [SDGS] Goal 1 (Poverty)": "https://sdgs.un.org/goals/goal1#targets_and_indicators",
                            "United Nations [SDGS] Goal 3 (Health & Well-being)": "https://sdgs.un.org/goals/goal3#targets_and_indicators",
                            "United Nations [SDGS] Goal 16 (Sustainable Society)": "https://sdgs.un.org/goals/goal16#targets_and_indicators"
                        }
                    ],
                    "tags": ["Security", "Governance", "Strategy"]
                }
            ]
        }
    ]
}