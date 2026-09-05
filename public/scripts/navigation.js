const menu = document.querySelector(".menu-button");
const navigation = document.getElementById("primary-navigation");
function setOpen(open) {
  menu?.setAttribute("aria-expanded", String(open));
  if (navigation) navigation.dataset.open = String(open);
}
menu?.addEventListener("click", () => setOpen(menu.getAttribute("aria-expanded") !== "true"));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.getAttribute("aria-expanded") === "true") {
    setOpen(false);
    if (menu instanceof HTMLElement) menu.focus();
  }
});
