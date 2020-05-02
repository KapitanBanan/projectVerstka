const tabs = document.querySelectorAll(".tab")
for (const tab of tabs) {
    tab.addEventListener('click', function(event) {
        const dataID =  event.target.getAttribute('data-id');

        event.target.parentElement.querySelector('.tab.active').classList.remove('active');
        event.target.classList.add('active');
        document.querySelector('.tab-info.active').classList.remove('active');
        document.querySelector(`.tab-info[data-id="${dataID}"]`).classList.add('active');
  })
}