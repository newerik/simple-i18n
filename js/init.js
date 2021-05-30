// https://youtube.com/playlist?list=PL4cUxeGkcC9jx2TTZk3IGWKSbtugYdrlu
Promise.all([
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch("/locales/en.json")
    .then((response) => response.json())
    .then((data) => i18n.addLocale("en", data)),
  fetch("/locales/hu.json")
    .then((response) => response.json())
    .then((data) => i18n.addLocale("hu", data)),
]).then(() => i18n.init());

const langChanger = document.getElementById("lang-changer");

langChanger.addEventListener("click", () => {
  const lang = i18n.getLangCode();
  if (lang == "hu") i18n.setLang("en");
  else i18n.setLang("hu");
});
