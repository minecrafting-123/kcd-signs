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