document.addEventListener("DOMContentLoaded", () => {
  'use strict'

  // Fetch all the forms
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})

const deletebtn = document.querySelectorAll(".nesteddiv");
deletebtn.forEach(dbtn => {
  const dotBtn = dbtn.querySelector(".dotbtn");
  const delBtn = dbtn.querySelector(".delbtn"); 

  dotBtn.addEventListener("click", function(event) {
    // event.stopPropagation(); 
    if (delBtn.style.display === "none") {
      delBtn.style.display = "inline-block";
    } else {
      delBtn.style.display = "none";
    }
  });
});

