const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener(" click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
function listen(e, pause) {
  const bookCard = e.target.parentElement;
  const bookDescription = bookCard.children[2].innerText;
  const bookName = bookCard.children[0].innerText;
  const authorName = bookCard.children[1].innerText;

  const message = `The name of the book is ${bookName}  . It is written ${authorName} .  ${bookDescription}`;

  let synth = speechSynthesis;
  synth.cancel();
  if (pause) {
    synth.pause();
  }
  setTimeout(() => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    synth.speak(speech);
  }, 1000);
}

let currPage =1;

function search(e) {
  e.preventDefault();
  let search = document.getElementById("input").value;
  setTimeout(function() {$('#pagination-wrapper').removeClass('hidden');}, 2000);
  if (search.trim() === "") return;
  document.activeElement.blur(); // this removes focus on the input bar after search
  initiateApi(currPage,search);
}

function nextPage() {
  let search = document.getElementById("input").value;
  currPage++;
  initiateApi(currPage,search);
}


function prevPage() {
  let search = document.getElementById("input").value;
  currPage--;
  initiateApi(currPage,search);
}


  function initiateApi(curr,search){
    console.log(`https://www.googleapis.com/books/v1/volumes?q="${search}"&maxResults=5&startIndex=`+(curr-1)*5);

  $.ajax({
    url: `https://www.googleapis.com/books/v1/volumes?q="${search}"&maxResults=5&startIndex=`+(curr-1)*5
    ,
    dataType: "json",
    beforeSend: function () {
      $(".whirly-loader").show();
    },
    complete: function () {
      $(".whirly-loader").hide();
    },

    success: function (res) {
      const resultsContainer = document.getElementById("results");
      while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
      }

      let bookNotFound = res.totalItems === 0;

      if (bookNotFound) {        
        location.replace("404.html");
      } 
      else {
        for (let i = 0; i < res.items.length; i++) {
          // DIV
          console.log(res.items[i]);
          const bookCard = document.createElement("div");

          // Image
          if (res.items[i].volumeInfo.imageLinks) {
            var bookImageContainer = document.createElement("div");
            bookImageContainer.classList.add("col-md-2", "offset-md-2");

            const bookImage = document.createElement("img");
            bookImage.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;
            bookImage.classList.add("w-100");

            bookImageContainer.appendChild(bookImage);
          }

          // Title
          const bookInfo = document.createElement("div");
          bookInfo.classList.add("col-md-8");

          const bookTitle = document.createElement("h1");
          bookTitle.textContent = res.items[i].volumeInfo.title;

          //Author
          if (res.items[i].volumeInfo.authors) {
            var bookAuthor = document.createElement("h6");
            bookAuthor.textContent = `by ${
              res.items[i].volumeInfo.authors[0]
                ? res.items[i].volumeInfo.authors[0]
                : "No title"
            }`;
          }

          //Published Date
          const published = document.createElement("h5");
          published.textContent = `Publisher: ${res.items[i].volumeInfo.publisher ? res.items[i].volumeInfo.publisher : "Not Available"}`;

          
          //Genre
          const genre = document.createElement("h6");
          genre.textContent = `Genre: ${res.items[i].volumeInfo.categories}`;
 
          // Average Rating
          const rating = document.createElement("h6");
          rating.textContent = `Average Rating: ${res.items[i].volumeInfo.averageRating} 🌟`

          // Description
          const bookDescription = document.createElement("p");
          bookDescription.classList.add("description");
          const desc = res.items[i].volumeInfo.description
            ? res.items[i].volumeInfo.description
            : "No description";

          const shortPar = document.createElement("span");
          shortPar.classList.add("short-description");
          const shortDesc = document.createTextNode(desc.substring(0, 100));
          shortPar.appendChild(shortDesc);

          const remainingPar = document.createElement("span");
          remainingPar.classList.add("remaining-description");
          const remainingDesc = document.createTextNode(desc.substring(100));
          remainingPar.appendChild(remainingDesc);

          const readMoreBtn = document.createElement("span");
          readMoreBtn.classList.add("read-more-btn");
          const readMoreBtnText = document.createTextNode(" ...Read More");
          readMoreBtn.appendChild(readMoreBtnText);
          readMoreBtn.addEventListener("click", (e) => {
            const remainingDescription = e.target.parentNode.querySelector(
              ".remaining-description"
            );
            remainingDescription.classList.toggle(
              "remaining-description--show"
            );

            e.target.textContent = e.target.textContent.includes(
              " ...Read More"
            )
              ? " ...Read Less"
              : " ...Read More";
          });

          bookDescription.appendChild(shortPar);
          bookDescription.appendChild(remainingPar);
          if (desc !== "No description") {
            bookDescription.appendChild(readMoreBtn);
          }

          // Button
          const bookPreviewLink = document.createElement("a");
          bookPreviewLink.innerHTML = "READ";
          bookPreviewLink.href = res.items[i].volumeInfo.previewLink;
          bookPreviewLink.target = "blank";

          const speechButton = document.createElement("button");
          speechButton.classList.add("listen", "btn", "btn-outline-secondary");
          speechButton.textContent = "LISTEN";

          bookPreviewLink.classList.add("btn", "btn-outline-secondary");
          bookCard.classList.add("result", "row");
          bookCard.setAttribute("data-aos", "fade-up");

          bookInfo.append(
            bookTitle,
            bookAuthor,
            published,
            genre,
            rating,
            bookDescription,
            bookPreviewLink,
            speechButton
          );

          bookCard.append(bookInfo, bookImageContainer);
          document.getElementById("results").appendChild(bookCard);
          document.getElementById("results").scrollIntoView();
        }
        const speechButtons = document.querySelectorAll(".listen");
        for (const speechButton of speechButtons) {
          let isOn = false;
          speechButton.addEventListener("click", (e) => {
            console.log(e);
            console.log(speechButton.textContent);
            if (speechButton.textContent == "LISTEN") {
              speechButton.textContent = "STOP";
            } else {
              speechButton.textContent = "LISTEN";
            }
            isOn = !isOn;
            if (isOn) {
              listen(e, false);
            } else {
              listen(e, true);
            }
          });
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

document.querySelector(".search-form").addEventListener("submit", search);

const scroll = document.getElementById("return-to-top");
window.onscroll = () => scrollFunction();
function scrollFunction() {
  if (document.body.scrollTop || document.documentElement.scrollTop > 20) {
    scroll.classList.remove("scroll-container");
  } else {
    scroll.classList.add("scroll-container");
  }
}

var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
    localStorage.setItem("theme", "dark");
  } else {
    icon.src = "img/moon.png";
    localStorage.setItem("theme", "light");
  }
};

const initIcon = () => {
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
  } else {
    icon.src = "img/moon.png";
  }
};
window.onload = initIcon();




