const setButton = document.getElementById('clicker')
const titleInput = document.getElementById('title')
const replacedText = document.getElementById('replace')
setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
})
setButton.addEventListener('click', async () => {
  const result = await window.addressAPI.calculateRoutes()
  console.log(result)
  console.log('aaaaa')
  replacedText.innerHTML = result;
});

//ok now i need to 1. get COOKIE and 2. make this easy to copy-paste
//oh and do the regression line thing with api