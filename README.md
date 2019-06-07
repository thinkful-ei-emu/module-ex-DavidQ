## Shopping List- a More complex Store

#User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked

checkBox.onClick()=>{
 store.item.check =!store.item.check;
  call render()
}

#User can type in a search term and the displayed list will be filtered by item names only containing that search term
onSubmit(()=>{
  items.filter(if item.name.includes(userinput))
});

#User can edit the title of an item

onClick => item.name = prompt(), call render