import { categories, primeTags, subTags, diagnoses } from "./data.js";

document.addEventListener('DOMContentLoaded', function() {
    renderDisclaimer();
});

// This will render the disclaimer for my app and give scrutiny to the information being provided. 
function renderDisclaimer() 
{
    const content = document.getElementById("content");
    content.innerHTML = ` 
        <h3 class="text-center py-2"><strong>Disclaimer</strong> "This application is intended solely for entertainment purposes and should not be relied upon for professional advice. Thank you."</h3>
        <div class="m-2 py-4 text-center">
            <button class="btn btn-warning btn-lg w-50 h-100 border-dark border-2" data-action="understand">I Understand</button>
        </div>
        <h5 class="text-center py-2">This app focuses exclusively on unvented and vented plumbing appliances and piping. It does not provide information on heating systems such as boilers, water heaters, heat pumps, underfloor heating, or other less common systems.</h5>
    `;
    
    const understandButton = content.querySelector("[data-action='understand']");
    understandButton.addEventListener("click", renderMainMenu);
}

// The main menu is there to narrow down the symptoms to a single appliance
function renderMainMenu() 
{
    const home = document.getElementById("home");

    home.innerHTML = "";
    localStorage.clear();

    const content = document.getElementById("content");
    content.innerHTML = "";
    const h3 = document.createElement("h3");
    const div = document.createElement("div");

    h3.className = "text-center py-2";
    h3.innerHTML = "What appliance is having an issue?"
    content.appendChild(h3);

    div.className = "mb-3";
    content.appendChild(div);

    for (let i = 0; i < categories.length; i += 2) {
        const buttons = `
            <div class="row text-center">
            <div class="col m-3 p-2"><button class="btn btn-secondary btn-lg w-100 h-100 border border-dark border-2" data-category="${categories[i].category}">${categories[i].title}</button></div>
                ${
                    categories[i + 1] 
                    ? `<div class="col m-3 p-2"><button class="btn btn-secondary btn-lg w-100 h-100 border border-dark border-2" data-category="${categories[i + 1].category}">${categories[i + 1].title}</button></div>`
                    : ''
                }
            </div>
        `;

        div.innerHTML += buttons;
    };        

    const buttons = content.querySelectorAll("[data-category]");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const category = button.getAttribute("data-category");
            localStorage.setItem("category", JSON.stringify(category));
            renderTagOptions(category, "category", primeTags);
        });
    });
}

// Tags are given in a checkbox form for multiple selections. These are combined with a category selected in the main menu. 
function renderTagOptions(search, filterKey, data) 
{

    if (filterKey != "category" && filterKey != "rootTag"){ return console.log("filterKey is not known"); }
    if (data != primeTags && data != subTags){ return console.log("data is not known"); }
    if (data.length > 0) {
        // Populate the html page with the checkbox form and appropriate tags
        const form = renderCheckBoxForm(filterKey);

        // Listen for form submission, add tags to localstorage
        form.addEventListener("submit", function(submission) {
            submission.preventDefault();

            let symptoms = [];
            if (localStorage.tags != null)
            {
                symptoms = JSON.parse(localStorage.tags);
            }

            const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');

            checkboxes.forEach(function(checkbox) {
                symptoms.push(checkbox.value);
            });

            localStorage.setItem("tags", JSON.stringify(symptoms));

            // Call checkForSubTags() if using primeTags or subTags if not
            if (data === primeTags)
            {
                checkForSubTags();
            }
            else
            {
                renderSubTagMenu();
            }
        });
    }

    // This renders the checkbox's for the tag menu.
    function renderCheckBoxForm(filterKey) {
        const content = document.getElementById('content');
        const form = document.createElement("form");
        const div = document.createElement("div");

        form.appendChild(div);
        div.className = "text-center m-2 py-4";
        form.className = "text-center";
        form.id = "checkBox";

        data.forEach((symptom, index) => {
            if (symptom[filterKey] === search) {
                const id = `btncheck${index + 1}`;

                const checkboxElements = `
                    <input type="checkbox" class="btn-check" id="${id}" name="symptom" value="${symptom.tag}" autocomplete="off">
                    <label class="btn btn-outline-secondary btn-lg m-3 border border-dark border-2" for="${id}">${symptom.tag}</label>`;

                div.innerHTML += checkboxElements;
            }
        });
        form.innerHTML += `<input type="submit" value="Submit" class="btn btn-warning btn-lg w-50 h-100 m-4 border border-dark border-2">`;

        if (data == primeTags)
        {
            content.innerHTML = `<h3 class="text-center py-2">What symptoms does the appliance have?</h3>`;
        }
        else
        {
            content.innerHTML = `<h3 class="text-center py-2">Could you describe <strong>${search}</strong> in more detail?</h3>`;
        }
        
        content.appendChild(form);
        renderHomeButton();
        return form;
    }
}

// Check if any tag requires a sub tag definition and create a list
function checkForSubTags()
{
    if (localStorage.tags && localStorage.tags.length != 0)
    {
        const selectedTags = JSON.parse(localStorage.tags);  
        let checkList = [];

        selectedTags.forEach((selectedTag) => {
            subTags.forEach((subRootTag) => {
                if (selectedTag.toLowerCase() === subRootTag.rootTag.toLowerCase() && !checkList.includes(selectedTag))
                {
                    checkList.push(selectedTag);
                }
            });
        });

        localStorage.setItem("subchecklist", JSON.stringify(checkList));

        renderSubTagMenu();
    }
}

// Retrieve subtag data if needed
function renderSubTagMenu()
{
    if (localStorage.subchecklist && localStorage.subchecklist !== "[]")
    {
        const subSymptoms = JSON.parse(localStorage.subchecklist);  
        const selectedTag = subSymptoms[0];

        subSymptoms.shift();
        localStorage.setItem("subchecklist", JSON.stringify(subSymptoms));

        renderTagOptions(selectedTag, "rootTag", subTags);
    }
    else
    {
        createDiagnosesList();
    }
}

// Filter through all diagnoses in data using specified categories and tags
function createDiagnosesList() {
    let tempList = [];

    // Filter using category selection plus "all" into tempList
    const selectedCategory = JSON.parse(localStorage.category);
    diagnoses.forEach((diagnosis) => {
        if (diagnosis.categories.includes("all") || diagnosis.categories.includes(selectedCategory)) {
            tempList.push(diagnosis);
        }
    });

    const selectedTags = JSON.parse(localStorage.tags);
    let filteredDiagnoses = [];

    // Filter through tempList using tags (at least one tag must apply)
    tempList.forEach((filteredDiagnosis) => {
        const tagCount = selectedTags.filter((tag) => filteredDiagnosis.tags.includes(tag)).length;
        if (tagCount > 0) {
            filteredDiagnoses.push({ ...filteredDiagnosis, tagCount });
        }
    });

    // Sort diagnoses by the tagCount so the first diagnosis displayed has the most tags
    filteredDiagnoses.sort((a, b) => b.tagCount - a.tagCount);

    renderDiagnosesList(filteredDiagnoses);
}

// Retrieve diagnosis list and rank order display to content
function renderDiagnosesList(filteredDiagnoses)
{
    const content = document.getElementById('content');
    content.innerHTML = ""; 

    if (filteredDiagnoses.length < 1){ return content.innerHTML = `<p class="text-center"><h3>No Results</h3></p>`; }

    let isFirst = true;

    const divContainer = document.createElement("div");
    divContainer.className = "carousel carousel-dark slide";
    divContainer.id = "carouselExampleIndicators";
    divContainer.setAttribute("data-bs-ride", "carousel");

    const divInner = document.createElement("div");
    divInner.className = "carousel-inner";

    filteredDiagnoses.forEach((diagnosis) => {
        const divItem = document.createElement("div");

        // Ensures the first slide will be the active slide 
        divItem.className = isFirst ? "carousel-item active" : "carousel-item";
        isFirst = false;

        divItem.innerHTML = `
            <div class="card border-dark mb-3 border-2">
                <div class="card-header bg-warning text-center"><h3><strong>
                ${
                    // Checks if the diagnosis is the first and adds a tick
                    filteredDiagnoses[0].diagnosis == diagnosis.diagnosis
                    ? `
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    `
                    : ''
                }
                ${diagnosis.diagnosis}</strong></h3></div>
                <img src="${diagnosis.image}" class="d-block w-100" alt="${diagnosis.diagnosis}">
                <div class="card-body">
                    <h5 class="card-title">${diagnosis.diagnosis}</h5>
                    <p class="card-text py-2">${diagnosis.description}</p>
                </div>
            </div>
        `;

        divInner.appendChild(divItem); 
    });

    // Adds the buttons
    const buttons = `
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="dark" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
        </svg>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="dark" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </svg>
            <span class="visually-hidden">Next</span>
        </button>
    `;

    divContainer.appendChild(divInner); 
    
    // Remove buttons if there is only one slide
    if (filteredDiagnoses.length > 1)
    {
        divContainer.innerHTML += buttons; 
    }

    content.appendChild(divContainer);
}

function renderHomeButton() 
{
    const home = document.getElementById("home");

    home.innerHTML = `
        <button class="btn btn-warning btn-lg rounded mx-auto shadow-lg border border-dark border-2" data-home="home">  
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0-1-1V2a1 1 0 0 0-1-1z"/>
            </svg>
        </button>
    `;

    const homeButton = home.querySelector("[data-home='home']");
    homeButton.addEventListener("click", renderMainMenu);
}
