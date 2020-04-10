'use strict'
// Cookies
const Cookie = {
    initialiseCookieconsent: function () {
      window.cookieconsent.initialise({
        "palette": {
          "popup": {
            "background": "#003399"
          },
          "button": {
            "background": "#ffcc00",
            "text": "#222121"
          }
        },
        "position": "bottom-right",
        "type": "opt-out",
        "content": {
          "message": "This website uses cookies to increase reach of the hackathon (analytics purposes).",
          "dismiss": "Allow cookies",
          "deny": "Decline",
          "href": "./privacy/#cookies"
        },
        onInitialise: function (status) {
          var type = this.options.type;
          var didConsent = this.hasConsented();

          if (type === 'opt-in' && didConsent) {
            // enable cookies
          }

          if (type === 'opt-in' && !didConsent) {
            // disable cookies
            document.__defineGetter__("cookie", function () { return ''; });
            document.__defineSetter__("cookie", function () { });
            $('.video-container-wrapper').html('<div style="border: 1px solid #cecece; border-radius: 10px; padding: 10px;"><p style="color: grey">Das Video findest du auf Youtube:<br> https://www.youtube.com/watch?v=vUQLwaRBj8Y</p><p style="color: grey"><em>Hinweis: Wir binden keine Youtube Videos ein, da du der Nutzung von Cookies widersprochen hast</em></p></div>')
          }
        },
        onStatusChange: function (status, chosenBefore) {
          location.reload()
        }
      });
      Cookie.registerOptInServices()
    },
    registerOptInServices: function () {
      if (Cookie.getCookieConsent('cookieconsent_status')) {
        console.log('allow');
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-163274606-1';
        head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-163274606-1');
      }
    },
    getCookieConsent: function (cookieName) {
      if (Cookie.getCookie(cookieName) == 'allow') return true;
      else return false
    },

    // get cookie
    getCookie: function (cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
}

window.onload = function () {
    Cookie.initialiseCookieconsent()
}


// 'activate' menu item based on url
let url = window.location.href
if (url.includes('challenges')) { 
    resetMenuBar(); 
    activateMenuItem('.menu-challenges');
    if(url.includes('#health')) { changeChallenge(document.getElementById('challenges-menu-health'))}
    else if(url.includes('#business')) { changeChallenge(document.getElementById('challenges-menu-business'))}
    else if(url.includes('#social')) { changeChallenge(document.getElementById('challenges-menu-social'))}
    else if(url.includes('#remote')) { changeChallenge(document.getElementById('challenges-menu-education'))}
    else if(url.includes('#finance')) { changeChallenge(document.getElementById('challenges-menu-finance'))}
    else if(url.includes('#other')) { changeChallenge(document.getElementById('challenges-menu-other'))}

    // dont jump to anchor on challenges page
    if (location.hash) {
        setTimeout(function() {
          window.scrollTo(0, 0);
        }, 1);
      }
}
else if (url.includes('agenda')) { resetMenuBar(); activateMenuItem('.menu-agenda') }
else if (url.includes('resources')) { resetMenuBar(); activateMenuItem('.menu-resources') }
else if (url.includes('press')) { resetMenuBar(); activateMenuItem('.menu-press') }
else if (url.includes('team')) { resetMenuBar(); activateMenuItem('.menu-team') }
else if (url.includes('faq')) { resetMenuBar(); activateMenuItem('.menu-faq') }
else if (url.includes('terms')) { resetMenuBar(); }
else if (url.includes('privacy')) { resetMenuBar(); }
else if (url.includes('terms')) { resetMenuBar(); }
else if (url.includes('imprint')) { resetMenuBar(); }
else { resetMenuBar(); activateMenuItem('.menu-hackathon'); }

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
    console.log(element)
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
        console.log(item)
        item.classList.add('d-none')
    }
    // remove d-none of element with id in attribute data-target-id
    console.log('element', element)
    let target_id = element.getAttribute('data-target-id')
    console.log('target_id', target_id)
    document.getElementById(target_id).classList.remove('d-none')
    window.history.pushState("object or string", "Title", "#" + target_id);
}


