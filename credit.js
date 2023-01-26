const target = document.querySelectorAll('#credit-box > a');

var current_observer = null
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.contentRect.width >= 180){
        entry.target.querySelector("p").classList.remove("hide");
        entry.target.querySelector("p").classList.add("show");
    }
    else {
        entry.target.querySelector("p").classList.remove("show");
        entry.target.querySelector("p").classList.add("hide");
    }
  });
});

target.forEach((e) => {
    observer.observe(e);
});
