const toDoForm = document.querySelector('.js-toDoForm'),
toDoInput =toDoForm.querySelector('input'),
toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos'; //TODOS_LocalStorage

const toDos = [];

function saveToDos() { 
	localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //TODOS_LS 를 toDos에 저장
}

function paintToDo(text){
 const li = document.createElement("li");
  const span = document.createElement("span");
 const delBtn = document.createElement("button");

 const newId = toDos.length + 1;
 span.innerText = text; 
 delBtn.innerText = "❌";
 li.appendChild(delBtn);
 li.appendChild(span);
 li.id = newId;
 toDoList.appendChild(li);
 const toDoObj = {
 	text : text,
 	id : newId
 };
 toDos.push(toDoObj);
 saveToDos();

}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = ""; //엔터 쳤을 때 창에 남아있는게 없게. toDoInput변수 ""로 처리
}


function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null) {
	const parsedToDos = JSON.parse(loadedToDos);
	parsedToDos.forEach(
		function(toDo) {
	paintToDo(toDo.text);}
	);

	}
}


function init(){
	loadToDos();
	toDoForm.addEventListener("submit",handleSubmit);
}

init();