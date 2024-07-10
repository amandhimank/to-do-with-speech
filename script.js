var taskInput = document.querySelector("#inputTask");
var taskList = document.querySelector(".task-list");
var addBtn = document.querySelector("#addTask");
var deleteBtn = document.querySelector("#delete");
var voiceAdd = document.querySelector("#voiceAdd");

voiceAdd.addEventListener("click", () => {
    if('SpeechRecognition' in window || 'webkitSpeechRecognition' in window){
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);
        recognition.start();
        recognition.onresult  = (event) => {
            var translate = event.results[0][0].transcript;
            taskInput.value = translate;
        }
    }else{
        alert("Your browers doesnot support speech recognition!");
    }
})

function addTasks(){
    var taskText = taskInput.value.trim();
    if (taskText != "") {
        var li = document.createElement("li");

        li.textContent = taskText;

        //delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="ri-delete-bin-2-fill"></i>';
       
        //Append the delete button to the list item;
        li.appendChild(deleteButton);

        //Append the list item to the task list
        taskList.appendChild(li);

        //Clear the input field
        taskInput.value = "";
        saveData();
    } else {
        alert("You have not written any task!");
    }
}

taskList.addEventListener("click", (e) => {
    // console.log(e.target.tagName)
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
    }   
    else if(e.target.tagName == "BUTTON"){
        e.target.parentElement.remove();
    }
    else if(e.target.tagName == "I"){
        let parent = e.target.parentElement;
        parent.parentElement.remove();
    }
    saveData()
})

function saveData(){
    localStorage.setItem("data", taskList.innerHTML);
}
function showTask(){
    taskList.innerHTML = localStorage.getItem("data");
}
showTask();