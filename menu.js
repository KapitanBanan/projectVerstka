const offsetNavbarTransparent = 50;

window.onscroll = function() {
    if (window.pageYOffset > offsetNavbarTransparent) {
      document.getElementById("navbar").classList.add('solid');
    } else {
      document.getElementById("navbar").classList.remove('solid');
    }
  }

document.querySelector('.menu__burger').addEventListener('click', function(e) {
  e.currentTarget.parentElement.classList.toggle('opened');
  const isOpening = e.currentTarget.parentElement.classList.contains('opened');
  var navbar = document.getElementById("navbar");

  if (isOpening) {
    navbar.classList.add('solid');
  }

  if (!isOpening && window.pageYOffset < offsetNavbarTransparent) {
    navbar.classList.remove('solid');
  }
})
