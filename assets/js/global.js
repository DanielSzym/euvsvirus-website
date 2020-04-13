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


const CHALLENGE_DOMAINS = ['health', 'business', 'social', 'remote', 'finance', 'other']


// challenges: show selected
function changeChallenge(element) {
  // receives the menu element (div) with id <challenges-menu-xyz>
  let hits = ['1–8', '9–15', '16–22', '23–29', '30–36', 'the last']
  // no element passed -> get hash of url
  if (!element) {
    let currentDomain = 'health'  // fallback
    if (CHALLENGE_DOMAINS.indexOf(location.hash.substr(1, location.hash.length)) > 1) {
      currentDomain = location.hash.substr(1, location.hash.length)
    }
    element = document.getElementById('challenges-menu-'+currentDomain)
  }
  // add filter to all images that are in div class <category-image>
  // IE workaround
  let html_categories = document.getElementsByClassName('category');
  for (var i = 0; i < html_categories.length; i++) {
    html_categories[i].classList.add('not-selected');
    html_categories[i].getElementsByTagName('img')[0].classList.add('img-greyed');
    html_categories[i].getElementsByTagName('img')[0].classList.remove('img-selected');
  }
  element.classList.remove('not-selected');

  element.getElementsByTagName('img')[0].classList.remove('img-greyed');
  element.getElementsByTagName('img')[0].classList.add('img-selected');

  // to all sections with class <challenge-content> add d-none
  // IE workaround
  let html_challenge_content = document.getElementsByClassName('challenge-content');
  for (var i = 0; i < html_challenge_content.length; i++) {
    html_challenge_content[i].classList.add('d-none');
  }
  // remove d-none of element with id in attribute data-target-id
  let target_id = element.getAttribute('data-target-id')
  document.getElementById(target_id).classList.remove('d-none')
  window.history.pushState('object or string', 'Title', '#' + target_id);

  document.getElementById('challenges-navigation-counter').innerHTML = hits[CHALLENGE_DOMAINS.indexOf(target_id)]
  window.scrollTo(0, 0);
}


(function () {
  // 'activate' menu item based on url
  let url = window.location.href
  if (url.indexOf('challenges') > -1) {
    resetMenuBar();
    activateMenuItem('.menu-challenges');
    if (url.indexOf('#health') > -1) { changeChallenge(document.getElementById('challenges-menu-health')) }
    else if (url.indexOf('#business') > -1) { changeChallenge(document.getElementById('challenges-menu-business')) }
    else if (url.indexOf('#social') > -1) { changeChallenge(document.getElementById('challenges-menu-social')) }
    else if (url.indexOf('#remote') > -1) { changeChallenge(document.getElementById('challenges-menu-education')) }
    else if (url.indexOf('#finance') > -1) { changeChallenge(document.getElementById('challenges-menu-finance')) }
    else if (url.indexOf('#other') > -1) { changeChallenge(document.getElementById('challenges-menu-other')) }

    // dont jump to anchor on challenges page
    if (location.hash) {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 1);
    }

    // claculate position of horizontal scroll for domains: slected_challenge.x - scroller_container.x - 20 (margin)
    let selected_challenge = document.getElementsByClassName('img-selected')[0]
    let scroller = document.getElementById('challenges-menu-scroller')
    scroller.scrollLeft = selected_challenge.x - scroller.offsetLeft - 20;
  }
  else if (url.indexOf('agenda') > -1) { resetMenuBar(); activateMenuItem('.menu-agenda') }
  else if (url.indexOf('resources') > -1) { resetMenuBar(); activateMenuItem('.menu-resources') }
  else if (url.indexOf('press') > -1) { resetMenuBar(); activateMenuItem('.menu-press') }
  else if (url.indexOf('team') > -1) { resetMenuBar(); activateMenuItem('.menu-team') }
  else if (url.indexOf('faq') > -1) { resetMenuBar(); activateMenuItem('.menu-faq') }
  else if (url.indexOf('terms') > -1) { resetMenuBar(); }
  else if (url.indexOf('privacy') > -1) { resetMenuBar(); }
  else if (url.indexOf('terms') > -1) { resetMenuBar(); }
  else if (url.indexOf('imprint') > -1) { resetMenuBar(); }
  else { resetMenuBar(); activateMenuItem('.menu-hackathon'); }

  // add event listener
  if (url.indexOf('challenges') > -1) {
    document.getElementsByClassName('challenge-content')[0]
      .addEventListener('click', function (event) {
        // do something
      });
  }
})();

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

function navigateChallenges(element) {
  // all domains
  let next_domain_index = 0  // default: first domain
  let next = false
  if (element.id.indexOf('next') > 1) next = true

  // get selected image and extract current select domain 
  let selected_domain_image = document.getElementsByClassName('img-selected')[0]
  //  iterate over domain names and find current domain name and index in list
  for (var i = 0; i < CHALLENGE_DOMAINS.length; i++) {
    if (selected_domain_image.id.indexOf(CHALLENGE_DOMAINS[i]) > -1) {
      let current_domain_name = CHALLENGE_DOMAINS[i]
      let current_domain_index = CHALLENGE_DOMAINS.indexOf(current_domain_name)
      // get previous or next domain
      if (next && current_domain_index < CHALLENGE_DOMAINS.length - 1) {
        next_domain_index = current_domain_index + 1
      }
      else if (!next && current_domain_index > 0) {
        next_domain_index = current_domain_index - 1
      }
      else if (!next && current_domain_index == 0) {
        next_domain_index = CHALLENGE_DOMAINS.length - 1
      }
      let next_domain_name = CHALLENGE_DOMAINS[next_domain_index]
      let next_domain_wrapper = document.getElementById('challenges-menu-' + next_domain_name)
      if (next_domain_wrapper) changeChallenge(next_domain_wrapper)
    }
  }
}

function resetMenuBar() {
  var menuItems = document.querySelectorAll('.menu-item')

  // IE workaround
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove('current-menu');
  }

}

function activateMenuItem(menuItem) {
  let menuItems = document.querySelectorAll(menuItem);

  // IE workaround
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add('current-menu');
  }
}

