document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Auto Suggestion Section
  var countryInput = document.getElementById("country-input");
  var suggestionsList = document.getElementById("country-suggestions");
  var countries = ["India", "USA", "Canada", "Australia", "Germany"];
  var activeIndex = -1;

  function closeSuggestions() {
    suggestionsList.classList.remove("visible");
    suggestionsList.innerHTML = "";
    activeIndex = -1;
  }

  function buildSuggestions(filterValue) {
    var value = filterValue.trim().toLowerCase();
    suggestionsList.innerHTML = "";
    activeIndex = -1;

    if (!value) {
      closeSuggestions();
      return;
    }

    var matches = countries.filter(function (country) {
      return country.toLowerCase().indexOf(value) !== -1;
    });

    if (!matches.length) {
      closeSuggestions();
      return;
    }

    matches.forEach(function (country, index) {
      var li = document.createElement("li");
      li.textContent = country;
      li.setAttribute("data-value", country);
      li.addEventListener("mousedown", function (e) {
        e.preventDefault();
        countryInput.value = country;
        closeSuggestions();
      });
      suggestionsList.appendChild(li);
    });

    suggestionsList.classList.add("visible");
  }

  if (countryInput && suggestionsList) {
    countryInput.addEventListener("input", function (e) {
      buildSuggestions(e.target.value);
    });

    countryInput.addEventListener("keydown", function (e) {
      var items = suggestionsList.querySelectorAll("li");
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
      } else if (e.key === "Enter") {
        if (activeIndex >= 0 && activeIndex < items.length) {
          e.preventDefault();
          var selected = items[activeIndex];
          countryInput.value = selected.getAttribute("data-value");
          closeSuggestions();
        }
      } else if (e.key === "Escape") {
        closeSuggestions();
        return;
      } else {
        return;
      }

      items.forEach(function (item, index) {
        if (index === activeIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (!suggestionsList.contains(e.target) && e.target !== countryInput) {
        closeSuggestions();
      }
    });
  }

  // Alert Section
  var alertBtn = document.getElementById("alertbtn");
  var confirmBtn = document.getElementById("confirmbtn");
  var nameInput = document.getElementById("name");

  if (alertBtn && nameInput) {
    alertBtn.addEventListener("click", function () {
      var name = nameInput.value || "User";
      window.alert("Hello " + name);
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      window.confirm("Are you sure?");
    });
  }

  // Open Window Section
  var openWindowBtn = document.getElementById("open-window-btn");
  if (openWindowBtn) {
    openWindowBtn.addEventListener("click", function () {
      window.open("https://example.com", "ExampleWindow", "width=800,height=600");
    });
  }

  // Back to top button
  var backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Show / Hide Section
  var hideTextBtn = document.getElementById("hide-text-btn");
  var showTextBtn = document.getElementById("show-text-btn");
  var displayedText = document.getElementById("displayed-text");

  if (hideTextBtn && displayedText) {
    hideTextBtn.addEventListener("click", function () {
      displayedText.style.display = "none";
    });
  }

  if (showTextBtn && displayedText) {
    showTextBtn.addEventListener("click", function () {
      displayedText.style.display = "block";
    });
  }

  // Mouse Hover Section
  var hoverMenu = document.getElementById("hover-menu");
  if (hoverMenu) {
    hoverMenu.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.matches("button[data-action]")) {
        var action = target.getAttribute("data-action");
        if (action === "reload") {
          window.location.reload();
        } else if (action === "scroll-top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  }

  // Additional Controls Section
  var volumeSlider = document.getElementById("volume-slider");
  var volumeValue = document.getElementById("volume-value");
  var fileUpload = document.getElementById("file-upload");
  var fileUploadInfo = document.getElementById("file-upload-info");
  var controlsSubmitBtn = document.getElementById("controls-submit-btn");
  var datePicker = document.getElementById("date-picker");

  if (volumeSlider && volumeValue) {
    volumeSlider.addEventListener("input", function (e) {
      volumeValue.textContent = e.target.value;
    });
  }

  if (fileUpload && fileUploadInfo) {
    fileUpload.addEventListener("change", function (e) {
      var files = e.target.files;
      if (files && files.length > 0) {
        fileUploadInfo.textContent = files[0].name;
      } else {
        fileUploadInfo.textContent = "No file chosen.";
      }
    });
  }

  if (controlsSubmitBtn) {
    controlsSubmitBtn.addEventListener("click", function () {
      var messageParts = [];
      if (volumeSlider) {
        messageParts.push("Volume: " + volumeSlider.value);
      }
      if (datePicker && datePicker.value) {
        messageParts.push("Date: " + datePicker.value);
      }
      if (fileUpload && fileUpload.files && fileUpload.files[0]) {
        messageParts.push("File: " + fileUpload.files[0].name);
      }

      var summary = messageParts.join(", ");
      window.alert(summary || "No values selected.");
    });
  }
});

