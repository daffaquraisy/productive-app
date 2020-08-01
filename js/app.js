// select the element

const clear = document.querySelector(".clear"); // to select the button with class clear

const dateElement = document.getElementById("date"); // to select the date id

const list = document.getElementById("list"); // to select the list id

const input = document.getElementById("input"); // to select the input id

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// init var
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list in the user interface
} else {
    // if data isnt empty
    LIST = [];
    id = 0;
}

// load items
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear localstorage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// show todays date
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("id-ID", options);

// add to do
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `

    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>

    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user when enter the key
document.addEventListener("keyup", function (even) {
    if (event.keyCode == 13) {

        const toDo = input.value;

        // if the input isnt empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage (this code should be added where the LIST array is update)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// targer the items created dyanmically

list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to localstorage (this code should be added where the LIST array is update)
    localStorage.setItem("TODO", JSON.stringify(LIST));

});