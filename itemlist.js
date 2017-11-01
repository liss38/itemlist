var listForm = document.querySelector('#list-form');
var listFormItemTitle = listForm.querySelector('#list-form-item-title');
var listFormItemQuantity = listForm.querySelector('#list-form-item-quantity');
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
			var quantity = !item.quantity ? `` : `<span>${item.quantity}</span>`;

			html += `<div id="list-item-${item.id}" class="list__item">
						<strong>${item.title}</strong>
						${quantity}
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


var addNewItem = function (title, quantity, details) {
	if(title === '') {
		return false;
	}

	var quantity = !quantity ? `` : `<span>${quantity}</span>`;

	var newItem = document.createElement('div');
	newItem.className = 'list__item';
	newItem.innerHTML = `<strong>${title}</strong>${quantity}<div>${details}</div>`;
	list.append(newItem);

	return true;
};


// добавление
listForm.addEventListener('submit', function (event) {	
	event.preventDefault();

	var title = listFormItemTitle.value;
	var quantity = listFormItemQuantity.value;
	var details = listFormItemDetails.value;
	console.log(title, details);

	if(addNewItem(title, quantity, details)) {
		listFormItemTitle.value = '';
		listFormItemQuantity.value = '';
		listFormItemDetails.value = '';
		listFormItemTitle.classList.remove('form__field--error');

		listStorage.addItem({title: title, quantity: quantity, details: details});
	} else {
		// notice help
		listFormItemTitle.classList.add('form__field--error');
	}
});
