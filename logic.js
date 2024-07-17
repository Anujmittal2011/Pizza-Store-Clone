// window.addEventListener("DOMContentLoaded", getData);
      function openDialog() {
        const dialog = document.querySelector(".dialog");
        dialog.classList.toggle("active");
      }

      function openCart() {
        const orderList = document.querySelector(".orderList");
        orderList.classList.toggle("active");
      }

      function openMyAccount() {
        const navItems = document.querySelector(".nav-items");
        navItems.classList.toggle("active");
      }
