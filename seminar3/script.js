const apiKey = "5z244NzBtSf7PYt_PVicoNGZyJcEjmoPP07ePVJpjHo";

async function getRandomPhoto() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    const photo = await response.json();
    return photo;
  } catch (error) {
    console.log("Сбой при загрузке фотографии:", error);
    return [];
  }
}

async function renderPhoto() {
  const photo = await getRandomPhoto();
  if (photo) {
    const imageBlock = document.querySelector(".image-block");
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description;
    img.classList.add("post-img");
    imageBlock.appendChild(img);
    const authorName = document.querySelector(".author-name");
    authorName.innerHTML = photo.user.name;
    const likeCounter = document.querySelector(".like-counter");
    likeCounter.innerHTML = photo.likes;
  }
}

const likeBtn = document.querySelector("i");
likeBtn.addEventListener("click", () => {
  if (likeBtn.classList.contains("active")) {
    likeBtn.classList.remove("active");
    decreaseCounter();
  } else {
    likeBtn.classList.add("active");
    increaseCounter();
  }
});

function increaseCounter() {
  const likeCounter = document.querySelector(".like-counter");
  const currentCounter = parseInt(likeCounter.textContent);
  likeCounter.textContent = currentCounter + 1;
}

function decreaseCounter() {
  const likeCounter = document.querySelector(".like-counter");
  const currentCounter = parseInt(likeCounter.textContent);
  likeCounter.textContent = currentCounter - 1;
}

window.addEventListener("load", renderPhoto());
