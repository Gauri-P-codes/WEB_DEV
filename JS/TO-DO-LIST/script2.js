document.addEventListener("DOMContentLoaded", () => {
  const input_task = document.getElementById("input-text");
  const add_task_btn = document.getElementById("add-task-btn");
  const list = document.getElementById("to-do-list");

  // means that you need to get old items from local storage before every page load, when you add a new item,
  // the page loads again and the old task gets overwritten if we dont get item from local storage like this first. 
  let tasks =  JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => { renderTasks(task)});

  add_task_btn.addEventListener("click", () => {
    const val = input_task.value.trim();
    if (val === "") return;

    let newTask = {
      id: Date.now(),
      content: val,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    input_task.value = "";
    console.log(tasks);
    
  });

  function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }

  function renderTasks(task){
    const li=document.createElement("li");
    li.setAttribute("data-id",task.id);
    li.innerHTML=`
    <span>${task.content}</span>
    <button>delete</button>`
    list.appendChild(li);
    if(task.completed){
        li.classList.add("completed");
    }

    li.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON"){
            return;
        }
        task.completed=(!task.completed)
        li.classList.toggle("completed")
    })

    li.querySelector("button").addEventListener("click",(e)=>{
        e.stopPropagation()
        tasks=tasks.filter((t)=> t.id!==task.id)
        saveTasks()
        li.remove()
    })
  }
});
