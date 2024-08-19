// const button = document.querySelector("#input-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
});

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0]["url"])
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads=[];
    ulEl.textContent = "";
});

function render(leads) {
    let listItems = ""
    for (let i=0; i < myLeads.length; i++) {
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
        </li>
        `
        console.log(listItems)
    };
    
    ulEl.innerHTML = listItems;
}









// alt way of creating HTML content via DOM
// const li = document.createElement("li")
// li.textContent = myLeads[i]
// ulEl.append(li)