function deleteItem(event){
  let parent = $(event.currentTarget).parent().parent();
  let id = $(parent.children()[0]).text();
  console.log(id);
  parent.remove()
}
