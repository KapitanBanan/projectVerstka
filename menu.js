window.onscroll = function() {
    if (window.pageYOffset > 50) {
      document.getElementById("navbar").classList.add('solid');
    } else {
      document.getElementById("navbar").classList.remove('solid');
    }
  }