const imagesContainer = document.body.querySelector(".images-container");
const largeImage = document.body.querySelector(".large-image img");
const filters = document.body.querySelector(".filters-container");
let selectedFilter = filters.querySelector(".original"); //default value
let selectedColor = "#b7af8e"; //default value

selectedFilter.style.backgroundColor = selectedColor; //to highlight the original button by default.
imagesContainer.addEventListener("click", (event) => {
  //to display the chosen image in the big container.
  if (event.target.tagName === "IMG") {
    const childImage = event.target;
    largeImage.src = childImage.src;
    largeImage.style.filter = "none";
    resetButtons();
    selectedFilter = filters.querySelector(".original");
    selectedFilter.style.backgroundColor = selectedColor;
  }
});

function resetButtons() {
  // to only highlight the chosen button(we reset the bg colors of all buttons then later change the bg color of the chosen filter button)
  const buttons = filters.querySelectorAll("button");
  for (const button of buttons) {
    button.style.backgroundColor = "var(--filters-bgcolor)";
  }
}
filters.addEventListener("click", (event) => {
  /*  to apply the chosen filter on the large image. Based on the clicked filter.
      to be honest I copy pasted the last two filters because I have no idea how to manipulate image colors.
  */
  switch (event.target.classList[0]) {
    case "original":
      largeImage.style.filter = "none";
      break;
    case "dark":
      largeImage.style.filter = "brightness(0.5)";
      break;
    case "hot":
      largeImage.style.filter =
        "contrast(120%) brightness(110%) sepia(60%) saturate(200%) hue-rotate(-10deg)";
      break;
    case "cold":
      largeImage.style.filter =
        "sepia(80%) contrast(90%) saturate(80%) brightness(80%)";
  }
  resetButtons();
  selectedFilter = event.target;
  selectedFilter.style.backgroundColor = selectedColor; // to set the bg-color of the selected filter button.
});

// to make the image as large as the screen to view it better.
largeImage.addEventListener("click", () => {
  fullscreenImage(largeImage);
});

function fullscreenImage(currentImage) {
  // the container of the image
  const fullscreen = document.createElement("div");
  fullscreen.style.width = "100vw";
  fullscreen.style.height = "100vh";
  fullscreen.style.position = "fixed";
  fullscreen.style.top = "0";
  fullscreen.style.backgroundColor = "rgb(0,0,0,0.85)";
  fullscreen.style.zIndex = "98";

  // the full-screen image.
  const image = document.createElement("img");
  image.src = currentImage.src;
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.objectFit = "contain";
  image.style.top = "0";
  image.style.zIndex = "99";

  // a button to close the image and go back to the page.
  const exitButton = document.createElement("button");
  exitButton.style.backgroundColor = "transparent";
  exitButton.textContent = "X";
  exitButton.style.color = "white";
  exitButton.style.position = "fixed";
  exitButton.style.top = "25px";
  exitButton.style.right = "20px";
  exitButton.style.border = "none";
  exitButton.style.font = "25px/0 sans-serif";
  exitButton.style.zIndex = "100";
  exitButton.style.padding = "6px";

  document.body.style.overflow = "hidden"; // to stop scrolling when viewing the image.
  fullscreen.appendChild(exitButton);
  fullscreen.appendChild(image);
  document.body.appendChild(fullscreen);

  // to close the full-screen image and go back to the page.
  exitButton.addEventListener("click", () => {
    document.body.removeChild(fullscreen);
    document.body.style.overflow = "unset"; // to allow scrolling (we stopped it before).
  });
}

// to be able to change the page theme colors
const themeButton = document.body.querySelector(".theme button");
const themeContainer = themeButton.parentNode;
function darkTheme() {
  // first we changed the theme icon to the current theme(The moon for dark theme. The sun for light theme)
  themeButton.style.backgroundImage = "url(images/icons/night-mode.png)";
  themeButton.style.backgroundPosition = "center";
  themeButton.style.backgroundSize = "24px 24px";
  themeButton.style.backgroundRepeat = "no-repeat";

  // here we are setting the colors of the page
  document.documentElement.style.setProperty("--primary-bgcolor", "#1b1d1c");
  document.documentElement.style.setProperty(
    "--mini-images-bgcolor",
    "#232828"
  );
  document.documentElement.style.setProperty("--filters-bgcolor", "#3d3d3d");
  document.documentElement.style.setProperty(
    "--theme-button-color",
    "#ffffff2b"
  );
  document.documentElement.style.setProperty(
    "--borders-color",
    " rgb(46, 46, 46)"
  );
  document.documentElement.style.setProperty(
    "--theme-color",
    "rgb(155 ,220 ,255)"
  );
  selectedColor = "rgb(67 79 86)";
  selectedFilter.style.backgroundColor = selectedColor; // to change the background color of the currently selected filter button.
}

function lightTheme() {
  // first we changed the theme icon to the current theme(The moon for dark theme. The sun for light theme).
  themeButton.style.backgroundImage = "url(images/icons/light-mode.png)";
  themeButton.style.backgroundPosition = "center";
  themeButton.style.backgroundSize = "24px 24px";
  themeButton.style.backgroundRepeat = "no-repeat";

  // here we are setting the colors of the page.
  document.documentElement.style.setProperty("--primary-bgcolor", "#504b38");
  document.documentElement.style.setProperty(
    "--mini-images-bgcolor",
    "#948e6f"
  );

  document.documentElement.style.setProperty("--filters-bgcolor", "#7c7557");
  document.documentElement.style.setProperty(
    "--theme-button-color",
    "#0000002b"
  );
  document.documentElement.style.setProperty(
    "--borders-color",
    "rgb(44, 44, 44)"
  );
  document.documentElement.style.setProperty(
    "--theme-color",
    "rgb(255 ,229 ,155)"
  );

  selectedColor = "#b7af8e";
  selectedFilter.style.backgroundColor = selectedColor; // to change the background color of the currently selected filter button.
}

// if the theme button is pressed then change theme (from current theme to the opposite theme light : dark).
let theme = "light";
themeButton.addEventListener("click", changeTheme);
function changeTheme() {
  if (theme === "light") {
    theme = "dark";
    darkTheme();
  } else if (theme === "dark") {
    theme = "light";
    lightTheme();
  }
}
