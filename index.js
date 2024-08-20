// const button = document.querySelector("#input-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const exportBtn = document.getElementById("export-btn")
const tbodyEl = document.getElementById("leads-tbl")
const tableEl = document.getElementById("export-tbl")

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
    tableEl.textContent = "";
});

exportBtn.addEventListener("click", function() {
    const wb = XLSX.utils.table_to_book(tableEl, { sheet: 'sheet-1' });
    XLSX.writeFile(wb, 'MyTable.xlsx');    
})

function render(leads) {
    let listItems = ""
    for (let i=0; i < myLeads.length; i++) {
        listItems += `
        <tr>
            <td>${i + 1}</td>
            <td><a href='${leads[i]}' target='_blank'>${leads[i]}</a></td>
        </tr>
        `
        console.log(listItems)
    };
    tbodyEl.innerHTML = listItems;
}



// alt way of creating HTML content via DOM
// const li = document.createElement("li")
// li.textContent = myLeads[i]
// ulEl.append(li)