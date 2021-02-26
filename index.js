let n = 0;
let touchstartY = 0;
let touchendY = 0;
let scrolled = false;
const root = document.documentElement;
const home = document.querySelector("#home");
const about1 = document.querySelector("#about-1");
const about2 = document.querySelector("#about-2");
const about3 = document.querySelector("#about-3");
const about4 = document.querySelector("#about-4");
const contact = document.querySelector("#contact");
const menuHome = document.querySelector("#menu-home");
const menuAbout = document.querySelector("#menu-about");
const menuContact = document.querySelector("#menu-contact");
const navHome = document.querySelector("#nav-home");
const navAbout = document.querySelector("#nav-about");
const navContact = document.querySelector("#nav-contact");
const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".menu");
const homeBullet = document.querySelector("#home-bullet");
const aboutBullet = document.querySelector("#about-bullet");
const contactBullet = document.querySelector("#contact-bullet");
const greeting = document.querySelector(".greeting");
const scrollHandler = (event) => {
  if (scrolled) {
  } else {
    if (typeof event === "number") {
      n = event;
    } else {
      if (event.deltaY > 10 || event.deltaY < -10) {
        scrolled = true;
        window.removeEventListener("wheel", scrollHandler);
        if (event.deltaY < 0) {
          if (n > 0) {
            n -= 1;
          }
        } else if (event.deltaY > 0) {
          if (n < 5) {
            n += 1;
          }
        }
      } else {
        return;
      }
    }
    home.checked = false;
    about1.checked = false;
    about2.checked = false;
    about3.checked = false;
    about4.checked = false;
    contact.checked = false;
    homeBullet.classList.remove("active");
    aboutBullet.classList.remove("active");
    contactBullet.classList.remove("active");
    let block1, block2;
    switch (n) {
      case 0: {
        home.checked = true;
        block1 = document.querySelector(".img-home");
        block2 = document.querySelector(".txt-home");
        homeBullet.classList.add("active");
        break;
      }
      case 1: {
        about1.checked = true;
        block1 = document.querySelector(".img-about-1");
        block2 = document.querySelector(".txt-about-1");
        aboutBullet.classList.add("active");
        break;
      }
      case 2: {
        about2.checked = true;
        block1 = document.querySelector(".img-about-2");
        block2 = document.querySelector(".txt-about-2");
        aboutBullet.classList.add("active");
        break;
      }
      case 3: {
        about3.checked = true;
        block1 = document.querySelector(".img-about-3");
        block2 = document.querySelector(".txt-about-3");
        aboutBullet.classList.add("active");
        break;
      }
      case 4: {
        about4.checked = true;
        block1 = document.querySelector(".img-about-4");
        block2 = document.querySelector(".txt-about-4");
        aboutBullet.classList.add("active");
        break;
      }
      case 5: {
        contact.checked = true;
        block1 = document.querySelector(".img-contact");
        block2 = document.querySelector(".txt-contact");
        contactBullet.classList.add("active");
        break;
      }
      default: {
        home.checked = true;
        block1 = document.querySelector(".img-home");
        block2 = document.querySelector(".txt-home");
        break;
      }
    }
    if (block1 && block2) {
      const mainColor = getComputedStyle(block2).backgroundColor;
      const navItemsColor = getComputedStyle(block1).backgroundColor;
      document.documentElement.style.setProperty("--main-color", mainColor);
      document.documentElement.style.setProperty(
        "--nav-items-color",
        navItemsColor
      );
    }
    setTimeout(() => {
      scrolled = false;
      window.addEventListener("wheel", scrollHandler);
    }, 1000);
  }
};

const toggleMenu = () => {
  document.querySelector(".menu").classList.toggle("expanded");
};

const getGreetingQuotes = () => {
  let today = new Date();
  let hour = today.getHours();
  if (hour < 12) {
    return [
      "Good Morning!",
      "शुभ प्रभात।",
      "Bonjour!",
      "Buenos Días!",
      "Guten Morgen!",
      "Bom Dia!",
    ];
  } else if (hour < 18) {
    return [
      "Good Afternoon!",
      "नमस्ते।",
      "Bon Après-midi!",
      "Buenas Tardes!",
      "Guten Tag!",
      "Boa Tarde!",
    ];
  } else {
    return [
      "Good Evening!",
      "नमस्ते।",
      "Bonsoir!",
      "Buenas Noches!",
      "Guten Abend!",
      "Boa Noite!",
    ];
  }
};

class Greeting {
  constructor(el, quotes, period) {
    this.quotes = quotes;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    const i = this.loopNum % this.quotes.length;
    const fullTxt = this.quotes[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    const that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

const getTouches = (event) => event.touches || event.originalEvent.touches;

handleTouchStart = (event) => {
  const firstTouch = getTouches(event)[0];
  touchstartY = firstTouch.clientY;
};

handleTouchMove = (event) => {
  if (touchstartY === 0) {
    return;
  }
  touchendY = event.touches[0].clientY;
  const deltaY = touchstartY - touchendY;
  scrollHandler({ deltaY: deltaY > 0 ? 11 : deltaY < 0 ? -11 : 0 });
  touchstartY = 0;
  touchendY = 0;
};

window.onload = () => {
  document.addEventListener("wheel", scrollHandler);
  if ("ontouchstart" in window) {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
  }
  navHome.addEventListener("click", () => scrollHandler(0));
  navAbout.addEventListener("click", () => scrollHandler(1));
  navContact.addEventListener("click", () => scrollHandler(5));
  menuHome.addEventListener("click", () => {
    toggleMenu();
    scrollHandler(0);
  });
  menuAbout.addEventListener("click", () => {
    toggleMenu();
    scrollHandler(1);
  });
  menuContact.addEventListener("click", () => {
    toggleMenu();
    scrollHandler(5);
  });
  menuIcon.addEventListener("click", () => toggleMenu());
  menu.addEventListener("click", (e) => {
    if (
      e.target !== menuHome &&
      e.target !== menuAbout &&
      e.target !== menuContact
    ) {
      toggleMenu();
    }
  });
  const greetingQuotes = getGreetingQuotes();
  const period = 2000;
  if (greetingQuotes) {
    new Greeting(greeting, greetingQuotes, period);
  }
};
