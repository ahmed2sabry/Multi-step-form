//aside
const aside = document.querySelector(".aside");
const steps = document.querySelectorAll(".aside__step");
const contents = document.querySelectorAll(".content");
const pagination = document.querySelector(".pagination");

const checkBtn = document.querySelector(".check__input");
const priceOffer = document.querySelectorAll(".plan__free");
const planPrices = document.querySelectorAll(".plan__price");
const addonPrices = document.querySelectorAll(".addon__price");
const checkLabel = document.querySelector(".check__label");
const finishContainer = document.querySelector(".finish");
const formInputs = document.querySelectorAll(".form__input");
const form = document.querySelector(".main");

let curPage = 1;

console.log(curPage);
// console.log(planPrices);

let isValidateActive = false;

formInputs.forEach((inp) =>
  inp.addEventListener("input", function () {
    if (isValidateActive) validateForm();
  })
);

function validateForm() {
  let isValidate = true;
  const nameInput = document.querySelector('.form__input[id="name"]');
  const emailInput = document.querySelector('.form__input[id="email"]');
  const numberInput = document.querySelector('.form__input[id="number"]');

  const isNameValid = validateName(
    nameInput,
    "Minimum 3 characters required",
    3
  );
  const isEmailValid = validateEmail(emailInput, "Invalid mail address");
  const isNumberValid = validateNumber(
    numberInput,
    "Invalid character in phone number"
  );
  isValidate = isNameValid && isEmailValid && isNumberValid;
  return isValidate;
}

function validateName(input, errorMessage, minLength) {
  const message = input.closest(".form__row").querySelector(".form__error");
  if (input.value.trim() === "") {
    message.style.visibility = "visible";
    input.classList.add("invalid");
    return false;
  }
  if (input.value.length < minLength) {
    message.textContent = errorMessage;
    message.style.visibility = "visible";
    input.classList.add("invalid");
    return false;
  } else {
    message.style.visibility = "hidden";
    input.classList.remove("invalid");
    return true;
  }
}

function validateEmail(input, errorMessage) {
  const message = input.closest(".form__row").querySelector(".form__error");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value.trim() === "") {
    message.style.visibility = "visible";
    input.classList.add("invalid");
    return false;
  }
  if (!emailPattern.test(input.value.trim())) {
    message.textContent = errorMessage;
    message.style.visibility = "visible";
    input.classList.add("invalid");
    return false;
  } else {
    message.style.visibility = "hidden";
    input.classList.remove("invalid");
    return true;
  }
}

function validateNumber(input, errorMessage) {
  const message = input.closest(".form__row").querySelector(".form__error");
  if (input.value.trim() === "") {
    message.style.visibility = "visible";
    input.classList.add("invalid");
    return false;
  }
  if (isNaN(input.value) || input.value <= 0) {
    message.textContent = errorMessage;
    message.style.visibility = "visible";
    input.classList.add("invalid");
    return false;
  } else {
    message.style.visibility = "hidden";
    input.classList.remove("invalid");
    return true;
  }
}

const finishing = function () {
  let liPrice = 0;
  const planRadio = Array.from(document.querySelectorAll(".plan__input"));
  const selectedPlan = planRadio.find((el) => el.checked);
  // console.log(selectedPlan.id);
  const selectedLabel = document.querySelector(
    `.plan__label[for="${selectedPlan.id}"]`
  );

  const planText = selectedLabel.querySelector(".plan__text").textContent;
  const planPrice = selectedLabel.querySelector(".plan__price").textContent;
  console.log(planText, planPrice);

  //add

  const addBtns = Array.from(document.querySelectorAll(".addon__input"));
  const selectedAdd = addBtns.filter((add) => add.checked);
  // console.log(selectedAdd);

  const addLabels = selectedAdd.map((add) =>
    document.querySelector(`.addon__label[for="${add.id}"]`)
  );

  const totalContainer = document.querySelector(".total");

  // console.log(addLabels);

  finishContainer.innerHTML = "";
  totalContainer.innerHTML = "";

  const addList = function (li) {
    const addText = li.querySelector(".addon__heading").textContent;
    const addPrice = li.querySelector(".addon__price").textContent;
    liPrice += Number.parseInt(addPrice.slice(2));

    return ` <li class="list__item">
    <p class="list__text">${addText}</p>
    <p class="list__price">${addPrice}</p>
  </li>`;
  };

  const html = `
              <div class="finish__monthly">
                <div class="finish__details">
                  <p class="finish__text">${planText} (${
    checkBtn.checked ? "Yearly" : "Monthly"
  })</p>
                  <button class="finish__btn">change</button>
                </div>
                <p class="finish__price">${planPrice}</p>
              </div>

              <ul class="list">
              ${addLabels.map(addList).join("")}
              </ul>
           `;

  const priceHtml = ` <p class="total__text">Total (per ${
    checkBtn.check ? "year" : "month"
  })</p>
              <p class="total__price">$${
                liPrice + Number.parseInt(planPrice.slice(1))
              }/${checkBtn.checked ? "yr" : "mo"}</p>`;

  finishContainer.insertAdjacentHTML("beforeend", html);
  totalContainer.insertAdjacentHTML("beforeend", priceHtml);
  console.log(planPrice);
};

finishing();

const createPagination = function (page) {
  pagination.innerHTML = "";
  let html;
  if (page == 1) {
    html = `<button type="button" class="pagination__btn pagination__btn--next pagination__btn--1">
              Next Step
            </button>`;
  }
  if (page > 1 && page < 4) {
    html = `<button
              type="button"
              class="pagination__btn pagination__btn--previous"
            >
              Go Back
            </button>
            <button type="button" class="pagination__btn pagination__btn--next">
              Next Step
            </button>`;
  }
  if (page == 4) {
    html = `<button
            type="button"
            class="pagination__btn pagination__btn--previous">
            Go Back
          </button>
    
    <button
              type="submit"
              class="pagination__btn pagination__btn--confirm"
            >
              Confirm
            </button>`;
  }
  pagination.insertAdjacentHTML("beforeend", html);
};
createPagination(curPage);
// goToPage(curPage);

const goToPage = function (page) {
  contents.forEach((cont) => {
    cont.classList.remove("content--active");
    if (cont.classList.contains(`content--${page}`))
      cont.classList.add("content--active");
  });
};

aside.addEventListener("click", function (e) {
  const clickedStep = e.target.closest(".aside__step");
  if (!clickedStep) return;
  curPage = clickedStep.dataset.tab;
  // console.log(curPage);
  steps.forEach((s) => {
    s.classList.remove("aside__step--acitve");
  });
  clickedStep.classList.add("aside__step--acitve");
  createPagination(curPage);
  goToPage(curPage);
  finishing();
  console.log(curPage);
});

pagination.addEventListener("click", function (e) {
  console.log(e.target);
  if (
    e.target.classList.contains("pagination__btn--next") &&
    curPage < steps.length &&
    !e.target.classList.contains("pagination__btn--1")
  ) {
    curPage++;
    console.log(curPage);

    steps.forEach((s) => {
      s.classList.remove("aside__step--acitve");
      if (s.dataset.tab == curPage) s.classList.add("aside__step--acitve");
    });
    createPagination(curPage);
    goToPage(curPage);
    finishing();
  }
  if (e.target.classList.contains("pagination__btn--1")) {
    isValidateActive = true;
    const validation = validateForm();
    if (validation) {
      if (
        e.target.classList.contains("pagination__btn--1") &&
        curPage < steps.length
      ) {
        isValidateActive = true;
        if (validateForm()) {
          curPage++;
          console.log(curPage);

          steps.forEach((s) => {
            s.classList.remove("aside__step--acitve");
            if (s.dataset.tab == curPage)
              s.classList.add("aside__step--acitve");
          });
          createPagination(curPage);
          goToPage(curPage);
          finishing();
        }
      }
    }
  }
  if (e.target.classList.contains("pagination__btn--confirm")) {
    isValidateActive = true;
    const validation = validateForm();
    if (!validation) {
      createPagination(1);
      goToPage(1);
      finishing();
      steps.forEach((s) => {
        s.classList.remove("aside__step--acitve");
        if (s.dataset.tab == 1) s.classList.add("aside__step--acitve");
      });
    }
  }

  if (e.target.classList.contains("pagination__btn--previous") && curPage > 1) {
    curPage--;
    steps.forEach((s) => {
      s.classList.remove("aside__step--acitve");
      if (s.dataset.tab == curPage) s.classList.add("aside__step--acitve");
    });
    console.log(curPage);
    createPagination(curPage);
    goToPage(curPage);
    finishing();
  }
});

checkLabel.addEventListener("click", function (e) {
  if (!checkBtn.checked) {
    priceOffer.forEach((p) => (p.style.display = "inline-block"));
    planPrices.forEach(
      (p) =>
        (p.textContent = `$${Number.parseInt(p.textContent.slice(1)) * 10}/yr`)
    );

    addonPrices.forEach(
      (p) =>
        (p.textContent = `+$${Number.parseInt(p.textContent.slice(2)) * 10}/yr`)
    );
  }
  if (checkBtn.checked) {
    priceOffer.forEach((p) => (p.style.display = "none"));
    planPrices.forEach(
      (p) =>
        (p.textContent = `$${Number.parseInt(p.textContent.slice(1)) / 10}/mo`)
    );

    addonPrices.forEach(
      (p) =>
        (p.textContent = `+$${Number.parseInt(p.textContent.slice(2)) / 10}/mo`)
    );
  }
});

finishContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("finish__btn")) {
    createPagination(2);
    goToPage(2);
    finishing();
    steps.forEach((s) => {
      s.classList.remove("aside__step--acitve");
      if (s.dataset.tab == 2) s.classList.add("aside__step--acitve");
    });
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const html = `<div class="message">
          <img
            src="../multi-step-form-main/assets/images/icon-thank-you.svg"
            alt="thanks for confirming"
            class="message__icon"
          />
          <h4 class="message__heading">Thank you!</h4>
          <p class="message__text">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@aymen&cholbob.com.
          </p>
        </div>`;
  form.innerHTML = "";
  form.insertAdjacentHTML("beforeend", html);
});
