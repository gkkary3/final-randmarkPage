const toggleBtn = document.querySelector('.ham');
const nav = document.querySelector('.nav-nav');
const navin = document.querySelector('.nav-in');
toggleBtn.addEventListener('click',()=>{
    nav.classList.toggle('active');
    navin.classList.toggle('active');
});

$(function () {
    $(document).scroll(function () {
      var $nav = $("#mainNavbar1");
      var $login = $(".login-btn");
      var $signUp = $(".signUp-btn");
      var $menu = $(".nav-menu");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
      $login.toggleClass("color", $(this).scrollTop() > $nav.height());
      $signUp.toggleClass("color", $(this).scrollTop() > $nav.height());
      $menu.toggleClass("white", $(this).scrollTop() > $nav.height());
    });
  });