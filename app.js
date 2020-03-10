const form = document.querySelector('form');
const list = document.querySelector('ul');
const emptyErrorParent = document.querySelector('.emptyError');
const btnClearAllTask = document.querySelector('.btn-warning');
let error = false;
let enterInputalert;
const filterTask = document.getElementById('filterTask');
let tasks = [];


// Event on submit to add task to the list
form.addEventListener('submit', (e) => {
    const emptyErrorChild = document.querySelector('.emptyErrorChild');
    const input = document.querySelector('#taskInput');
    let inputValue = input.value;
    // Checking for empty input field
    if (inputValue === "") {
        // Checking if the errorMsg already exists or not
        if (emptyErrorChild === null) {
            error = true;
            // creating element with empty error alert
            enterInputalert = document.createElement('div');
            enterInputalert.className = 'alert alert-danger text-center emptyErrorChild';
            enterInputalert.textContent = 'Kindly enter a task! ';
            // apeeding the element into its parent node
            emptyErrorParent.appendChild(enterInputalert);
            //console.log('inside the empty');
        }
    } else {
        // removing the errorMsg before adding the new task
        if (error) {
            document.querySelector('.emptyErrorChild').remove();
            error = false;
        }
        // Creating a new li element to hold the task
        let newLi = document.createElement('li');
        newLi.className = 'card-body li-class';
        newLi.textContent = inputValue;

        // Creating child nodes for the newli created "li" element
        let childNode = document.createElement('a');
        childNode.setAttribute('href', 'javascript:void(0)');
        childNode.innerHTML = '<i class="fas close fa-times-circle"></i>';

        // Appedning the childNode to the Newly created li element
        newLi.appendChild(childNode);

        // Finally appedning the newly creaeted li to the list(ul), so that it can be add up to the list
        list.appendChild(newLi);

        // Store the data in localStorage
        storeTaskinLocalStorage(inputValue);

    }
    //console.log(newLi);
    e.preventDefault();
})


// Using event delegation on list (ul), and then finding clicked element to delete
list.addEventListener('click', (e0) => {
    if (e0.target.className == 'fas close fa-times-circle') {
        let clickedElement = e0.target;
        clickedElement.parentElement.parentElement.remove();

        // Remove from localStorage
        removeFromLocalStorage(clickedElement.parentElement.parentElement);
    }
});


// Click event on clear all button to clear all the saved tasks
btnClearAllTask.addEventListener('click', (e) => {
    //console.log(list.children);
    let listItems001 = Array.from(list.children);
    //console.log(listItems001);
    listItems001.forEach((x) => {
        x.remove();
    })

    // Clear from localStorage
    clearAllFromLocalStorage();
});


// keyup event on filter input box for filter through the already existing tasks
filterTask.addEventListener('keyup', (e) => {
    let enteredText = e.target.value.toLowerCase();
    let liArray = Array.from(list.children);

    liArray.forEach((x) => {
        if ((x.textContent).toLowerCase().indexOf(enteredText) == '-1') {
            x.style.display = 'none';
            //console.log('condition matched!');
        } else {
            x.style.display = 'block';
            //console.log('condition not matched!');
        }
    });

});


// Storing input task, in localStorage
function storeTaskinLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Creating event DOMContentLoaded to load the localStorage data, while document is loaded
document.addEventListener('DOMContentLoaded', () => {

    // checking whether there is anything in localStorage or not
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //looping through 'tasks' task array and then adding the content in listItem by creating them

    tasks.forEach((x) => {
        // Creating a new li element to hold the task
        let newLi = document.createElement('li');
        newLi.className = 'card-body li-class';
        newLi.textContent = x;

        // Creating child nodes for the newli created "li" element
        let childNode = document.createElement('a');
        childNode.setAttribute('href', 'javascript:void(0)');
        childNode.innerHTML = '<i class="fas close fa-times-circle"></i>';

        // Appedning the childNode to the Newly created li element
        newLi.appendChild(childNode);

        // Finally appedning the newly creaeted li to the list(ul), so that it can be add up to the list
        list.appendChild(newLi);
    });

})


// Remove indicidual item from localStorage
function removeFromLocalStorage(taskItem) {

    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((x, index) => {
        if (taskItem.textContent == x) {
            tasks.splice(index, 1);
            //x.remove(); | Won't work 2 reasons, remove() method works on document elements only, 'x' is array item 
            // 2nd reason, even if it would work [won't work in 1st place], would remove all the array items
            //console.log(x);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear all tasks from localStorage on clearAll button click
function clearAllFromLocalStorage() {
    localStorage.clear();
}