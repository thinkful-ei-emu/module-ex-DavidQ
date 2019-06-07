/* eslint-disable no-console */
'use strict';
/**eslint-env jquery */
// a template class for items
/**
 *  @param {string,bool} name and if it is checked, checked is otional
 *  
 * */
class item{
  constructor(Name, Checked = false){
    this.id = cuid();
    this.createdDate = Date.now();
    this.name = Name;
    this.checked = Checked;
  }
}
const STORE = {
  items:[
    new item('apples'),
    new item('oranges'),
    new item('milk',true)
  ],
  hide:false,

};


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => {
    if(STORE.hide){
      if(item.checked){
        console.log(`checked item ${item.name} found ${item.checked}`);
        return '';
      }else{
        return generateItemElement(item);
      }
    }else{
      return generateItemElement(item);
    }
  
  });
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}


function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click','.js-item-delete',e=>{
    let itemToRemove = STORE.items.find(x=>x.id === getItemIdFromElement(e.currentTarget));
    STORE.items.splice(STORE.items.indexOf(itemToRemove),1);
    renderShoppingList();

  });
  console.log('`handleDeleteItemClicked` ran');
}
//// MY NEW CODE
function handleHideCheckedTogg(){
  //add events for the hide check change

  $('#js-checkBox').change((e)=>{
    STORE.hide = !STORE.hide;  
    renderShoppingList();
  });

  //todo call render
}





//// end my code

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCheckedTogg();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);