// let inputBtn = document.getElementById("input-btn")

// inputBtn.addEventListener("click", function(){
//     console.log("buttton clicked by add event listner")
// })

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const Deletebtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsfromlocalstorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsfromlocalstorage) {
    myLeads = leadsfromlocalstorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tab.query({ active: true, currentWindow: true }, function (tab) {
        myLeads.push(tab[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItem = " "
    for (let i = 0; i < leads.length; i++) {
        // listItem += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItem += `
        <li>
            <a target='_blank' href='${leads[i]}'> ${leads[i]} 
            </a>
        </li>
        `
    }
    ulEL.innerHTML = listItem
}

Deletebtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

