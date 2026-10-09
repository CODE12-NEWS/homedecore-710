const roomOptions = {
  kitchen: {
    image: "assest/image-2.png",
    alt: "Smart kitchen design with a garden and robotic assistant",
    label: "THE KITCHEN",
    count: "01 / 03",
  },
  studio: {
    image: "assest/image.png",
    alt: "Creative home studio with an interactive work surface",
    label: "THE STUDIO",
    count: "02 / 03",
  },
  living: {
    image: "assest/image_1.png",
    alt: "Futuristic home designed for families and pets",
    label: "HOME & PETS",
    count: "03 / 03",
  },
};

const previewImage = document.querySelector("#preview-image");
const previewRoom = document.querySelector("#preview-room");
const previewCount = document.querySelector("#preview-count");
const previewStyle = document.querySelector("#preview-style");
const demoStatus = document.querySelector("#demo-status");
const choiceButtons = [...document.querySelectorAll(".choice-button")];
const styleButtons = [...document.querySelectorAll(".style-button")];
let selectedRoom = "kitchen";
let selectedStyle = "Futuristic";

function selectRoom(roomName) {
  const room = roomOptions[roomName];
  if (!room) return;

  selectedRoom = roomName;
  choiceButtons.forEach((button) => {
    const isSelected = button.dataset.room === roomName;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  previewImage.style.opacity = "0";
  window.setTimeout(() => {
    previewImage.src = room.image;
    previewImage.alt = room.alt;
    previewImage.style.opacity = "1";
  }, 150);
  previewRoom.textContent = room.label;
  previewCount.textContent = room.count;
  demoStatus.textContent = `${room.label} selected. Choose a style to continue.`;
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => selectRoom(button.dataset.room));
});

document.querySelectorAll("[data-gallery-room]").forEach((item) => {
  item.addEventListener("click", () => {
    const roomName = item.dataset.galleryRoom;
    const room = roomOptions[roomName];
    if (room) {
      selectedRoom = roomName;
      previewImage.src = room.image;
      previewImage.alt = room.alt;
      previewRoom.textContent = room.label;
      previewCount.textContent = room.count;
      choiceButtons.forEach((button) => {
        const isSelected = button.dataset.room === roomName;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });
    }
  });
});

styleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedStyle = button.dataset.style;
    styleButtons.forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-pressed", String(isSelected));
    });
    previewStyle.textContent = selectedStyle.toLocaleUpperCase("en");
  });
});

document.querySelector("#generate-button").addEventListener("click", () => {
  const room = roomOptions[selectedRoom];
  demoStatus.textContent = `${selectedStyle} ${room.label.toLowerCase()} concept is ready to explore.`;
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mainNav.classList.remove("is-open");
  });
});