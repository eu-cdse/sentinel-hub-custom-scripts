const addCopyEventHandler = (buttonId, textId) => {
  const button = document.getElementById(buttonId);
  if (!button) {
    return;
  }
  const codeElement = document.getElementById(textId);
  if (!codeElement) {
    return;
  }
  const text = codeElement
    .querySelector(".highlight")
    .innerText.replaceAll("\n\n", "\n");
  if (button) {
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(text).then(
        () => {},
        (reason) => {
          console.warn("Couldn't add to clipboard!");
          console.warn(reason);
        },
      );
    });
  }
};
document.addEventListener("DOMContentLoaded", () => {
  addCopyEventHandler("copy-script", "script");
  addCopyEventHandler("copy-url", "script-url");

  const buttons = document.querySelectorAll(".tab-button");
  const tabs = document.querySelectorAll(".tab");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const button_id = button.id;
      const tab_id = button_id + "-content";
      buttons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      tabs.forEach((tab) => tab.classList.remove("selected"));
      document.getElementById(tab_id).classList.add("selected");
    });
  });
});
