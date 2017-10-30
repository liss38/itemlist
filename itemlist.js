var listForm = document.querySelector('#list-form');
var listFormItemTitle = listForm.querySelector('#list-form-item-title');
var listFormItemDetails = listForm.querySelector('#list-form-item-details');
var listFormSubmit = listForm.querySelector('#list-form-submit');

var list = document.querySelector('#list');
var listItems = list.querySelectorAll('.list__item');


var listStorage = {
	listKey: 'itemlist',
	listData: [],

	addItem: function (item) {
		item.id = +new Date();
		var listData = JSON.parse(localStorage.getItem(this.listKey));
		listData.push(item);
		this.listData = listData;
		localStorage.setItem(this.listKey, JSON.stringify(listData));
	},

	getItem: function (itemId) {},
	
	removeItem: function () {},
	
	render: function (dataRaw) {
		var html = '';

		dataRaw.forEach(function (item) {
			html += `<div id="list-item-${item.id}" class="list__item">
						<strong>${item.title}</strong>
						<div>${item.details}</div>
					</div>`;
		});

		return html;
	},
	
	reset: function () {
		localStorage.setItem(this.listKey, JSON.stringify([]));
	},

	init: function () {
		if(!localStorage.getItem(this.listKey)) {
			localStorage.setItem(this.listKey, JSON.stringify([]));
		}

		var listData = JSON.parse(localStorage.getItem(this.listKey));
		list.innerHTML = this.render(listData);
		return this.render(listData);
	}
};

listStorage.init();


var addNewItem = function (title, details) {
	if(title === '') {
		return false;
	}

	var newItem = document.createElement('div');
	newItem.className = 'list__item';
	newItem.innerHTML = `<strong>${title}</strong><div>${details}</div>`;
	list.append(newItem);

	return true;
};


// добавление
listForm.addEventListener('submit', function (event) {	
	event.preventDefault();

	var title = listFormItemTitle.value;
	var details = listFormItemDetails.value;
	console.log(title, details);

	if(addNewItem(title, details)) {
		listFormItemTitle.value = '';
		listFormItemDetails.value = '';
		listFormItemTitle.classList.remove('hlp-field-error');

		listStorage.addItem({title: title, details: details});
	} else {
		// notice help
		listFormItemTitle.classList.add('hlp-field-error');
	}
});
