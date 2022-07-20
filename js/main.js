// Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
	renderTask(task);
});

checkEmptyList();

// добавление задачи
form.addEventListener('submit', addTask);
// удаление задачи
tasksList.addEventListener('click', deleteTask);
// отмечаем задачу, как завершенную
tasksList.addEventListener('click', doneTask);



// функции
function addTask(event) {
	// Отменяем отправку формы
	event.preventDefault();

	// Достаем текст задачи из поля ввода
	const taskText = taskInput.value;

	//создание новых объектов для работы с массивом tasks
	const newTask = {
		id: Date.now(), // идентификация задачи по времени поступления
		text: taskText,
		done: false,
	};

	//добавляем задачу в массив с задачами
	tasks.push(newTask);

	// сохраняем список задач в хранилище браузера
	saveToLocalStorage();

	renderTask(newTask);

	//очищвем поле ввода и возвращаем фокус на него
	taskInput.value = ""
	taskInput.focus()

	/* скрываем запись "Список дел пуст" на уровне РАЗМЕТКИ (добавляем класс NONE) если появляются задачи
	if (tasksList.children.length > 1) {
		emptyList.classList.add('none');
	}*/

	checkEmptyList();
}

function deleteTask(event) {
	// проверяем, что клик был НЕ по кнопке "удалить"
	if (event.target.dataset.action !== 'delete') return;

	// проверяем, что клик был по кнопке "удалить"
	const parenNode = event.target.closest('.list-group-item');

	//определяем ID задачи
	const id = Number(parenNode.id);

	// находим индекс задачи в массиве и удаляем её из масиива
	/*const index = tasks.findIndex((task) => task.id === id);
	tasks.splice(index, 1);*/

	tasks = tasks.filter((task) => task.id !== id)// удаление задачи через фильтрацию массива:

	//сохраняем изменения задачи в хранилище браузера
	saveToLocalStorage();

	parenNode.remove();// удаляем задачу из разметки

	/*Открываем запись "Список дел пуст" на уровне РАЗМЕТКИ (убирае класс NONE) если все задачи удаляются
	if (tasksList.children.length === 1) {
		emptyList.classList.remove('none')
	}*/
	checkEmptyList();
}

function doneTask(event) {
	// проверяем, что клик был НЕ по кнопке "выполнено"
	if (event.target.dataset.action !== "done") return;

	// проверяем, что клик был НЕ по кнопке "выполнено"
	const parentNode = event.target.closest('.list-group-item');

	// определяем ID задачи
	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);

	task.done = !task.done //изменение состояния задачи на уолвне данных

	//сохраняем список задач в хранилище браузера
	saveToLocalStorage();

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}

// отображение блока "Список дел ПУСТ" с учётом данных массива дел
function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		<div class="empty-list__title">Список дел пуст</div>
		</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}

// сохранение массива в ЛокалСторедж
function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	// формируем CSS класс задачи
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

	//формируем разметку для новой задачи
	const taskHTML = `
		<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
			<span class="${cssClass}">${task.text}</span>
			<div class="task-item__buttons">
				<button type="button" data-action="done" class="btn-action">
					<img src="./img/tick.svg" alt="Done" width="18" height="18">
				</button>
				<button type="button" data-action="delete" class="btn-action">
					<img src="./img/cross.svg" alt="Done" width="18" height="18">
				</button>
			</div>
		</li>`;

	//добавить задачу на чтраницу
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}





/*


let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderTask(task));
}

checkEmptyList();



// Функции
function addTask(event) {
	// Отменяем отправку формы
	event.preventDefault();

	// Достаем текст задачи из поля ввода

	// Описываем задачу в виде объекта
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	// Добавляем задачу в массив с задачами
	tasks.push(newTask);

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	// Рендерим задачу на странице
	renderTask(newTask);

	// Очищаем поле ввода и возвращаем на него фокус
	taskInput.value = '';
	taskInput.focus();

	checkEmptyList();
}

function deleteTask(event) {
	// Проверяем если клик был НЕ по кнопке "удалить задачу"
	if (event.target.dataset.action !== 'delete') return;

	const parenNode = event.target.closest('.list-group-item');

	// Определяем ID задачи
	const id = Number(parenNode.id);

	// Удаляем задча через фильтрацию массива
	tasks = tasks.filter((task) => task.id !== id);

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	// Удаляем задачу из разметки
	parenNode.remove();

	checkEmptyList();
}

function doneTask(event) {
	// Проверяем что клик был НЕ по кнопке "задача выполнена"
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('.list-group-item');

	// Определяем ID задачи
	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);
	task.done = !task.done;

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `< li id = "emptyList" class="list-group-item empty-list" >
			<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
				<div class="empty-list__title">Список дел пуст</div>
			</>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	// Формируем CSS класс
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

	// Формируем разметку для новой задачи
	const taskHTML = `
				< li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item" >
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</ > `;

	// Добавляем задачу на страницу
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
*/