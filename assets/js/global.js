'use strict'
window.onload = function () {
    // tbd
}
// 'activate' menu item based on url
let url = window.location.href
if (url.includes('challenges')) { resetMenuBar(); activateMenuItem('.menu-challenges') }
else if (url.includes('agenda')) { resetMenuBar(); activateMenuItem('.menu-agenda') }
else if (url.includes('resources')) { resetMenuBar(); activateMenuItem('.menu-resources') }
else if (url.includes('press')) { resetMenuBar(); activateMenuItem('.menu-press') }
else if (url.includes('team')) { resetMenuBar(); activateMenuItem('.menu-team') }
else if (url.includes('faq')) { resetMenuBar(); activateMenuItem('.menu-faq') }
else { resetMenuBar(); activateMenuItem('.menu-hackathon') }

// mobile menu
function openNav() {
    document.getElementById('mobileNav').style.display = 'flex';
    document.getElementById('navbar-desktop').style.display = 'none';
    document.body.style.overflowY = 'hidden';
}

function closeNav() {
    document.getElementById('mobileNav').style.display = 'none';
    document.getElementById('navbar-desktop').style.display = 'block';
    document.body.style.overflowY = 'scroll';
}

function resetMenuBar() {
    console.log('resetMenuBar() called')
    var menuItems = document.querySelectorAll('.menu-item')

    menuItems.forEach(function (item) {
        item.classList.remove('current-menu')
    });
}

function activateMenuItem(menuItem) {
    console.log('activateMenuItem() called')
    let menuItems = document.querySelectorAll(menuItem);
    // var menuItemsArray = Array.prototype.slice.call(menuItems);
    console.log(menuItems)

    menuItems.forEach(function (item) {
        item.classList.add('current-menu')
    });
}