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
    // console.log('resetMenuBar() called')
    var menuItems = document.querySelectorAll('.menu-item')

    menuItems.forEach(function (item) {
        item.classList.remove('current-menu')
    });
}

function activateMenuItem(menuItem) {
    // console.log('activateMenuItem() called')
    let menuItems = document.querySelectorAll(menuItem);
    // var menuItemsArray = Array.prototype.slice.call(menuItems);
    // console.log(menuItems)

    menuItems.forEach(function (item) {
        item.classList.add('current-menu')
    });

}

document.getElementsByClassName('challenge-content')[0]
        .addEventListener('click', function (event) {
            // do something
        });
// challenges: show selected
function changeChallenge(element) {
    // add filter to all images that are in div class <category-image>
    for (let item of document.getElementsByClassName('category')) {
        item.classList.add('not-selected')
        item.getElementsByTagName('img')[0].classList.add('img-greyed')
        item.getElementsByTagName('img')[0].classList.remove('img-selected')
        
    }
    element.classList.remove('not-selected')
    element.getElementsByTagName('img')[0].classList.remove('img-greyed')
    element.getElementsByTagName('img')[0].classList.add('img-selected')
        
    // to all sections with class <challenge-content> add d-none
    for (let item of document.getElementsByClassName('challenge-content')) {
        item.classList.add('d-none')
    }
    // remove d-none of element with id in attribute data-target-id
    console.log('element', element)
    let target_id = element.getAttribute('data-target-id')
    console.log('target_id', target_id)
    document.getElementById(target_id).classList.remove('d-none')
}