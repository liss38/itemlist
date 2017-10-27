var listForm = document.querySelector('#list-form');
var listFormItemTitle = listForm.querySelector('#list-form-item-title');
var listFormItemDetails = listForm.querySelector('#list-form-item-details');
var listFormSubmit = listForm.querySelector('#list-form-submit');
var list = document.querySelector('#list');
var listItems = list.querySelectorAll('.list__item');

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
	} else {
		// notice help
	}
});
