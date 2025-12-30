import { createTreeLayout } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const trunk = document.getElementById("trunk");
const trunkDot = document.getElementById("trunk-dot");
const body = document.body;

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";

      if (event.data.state) {
        // Target started → always show trunk dot
        trunkDot.classList.add("animate");
      } else {
        // UI completely hidden → reset trunk + dot
        trunk.setAttribute("height", "0");
        trunk.classList.remove("animate");
        trunkDot.classList.remove("animate");
      }
      return;
    }

    case "leftTarget": {
      // DO NOT hide trunk-dot here anymore
      trunk.setAttribute("height", "0");
      trunk.classList.remove("animate");
      return;
    }

    case "setTarget": {
      // Do not touch trunk-dot
      // Only show options
      const allOptions = [];

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            if (!data.hide) {
              allOptions.push({
                type: type,
                data: data,
                id: id + 1,
                zoneId: undefined
              });
            }
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            if (!data.hide) {
              allOptions.push({
                type: "zones",
                data: data,
                id: id + 1,
                zoneId: i + 1
              });
            }
          });
        }
      }

      createTreeLayout(allOptions);
      return;
    }
  }
});
