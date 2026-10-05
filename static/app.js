// ========================================
// BOOK CARD RENDERING
// ========================================

function createBookCard(book) {

  const card = document.createElement("article");

  card.className = "book-card";

  // Image path
  const cover =
    book.cover && book.cover.trim() !== ""
      ? book.cover
      : "assets/images/default-book.png";

  card.innerHTML = `
    
    <!-- BOOK IMAGE -->
    <div class="book-cover-box">
      <img
        class="book-cover"
        src="${cover}"
        alt="${book.title}"
        loading="lazy"
        onerror="
          this.onerror=null;
          this.src='assets/images/default-book.png';
        "
      >
    </div>

    <!-- BOOK INFORMATION -->
    <div class="book-info">

      <div class="book-badges">

        <span class="book-category">
          ${book.subcategory || book.category}
        </span>

        ${
          book.demo
            ? `<span class="book-demo">DEMO</span>`
            : ""
        }

      </div>

      <h3 class="book-title">
        ${book.title}
      </h3>

      <p class="book-author">
        ${book.author}
      </p>

      <div class="book-rating">
        ${book.rating || "★★★★★"}
      </div>

      <p class="book-description">
        ${book.description || ""}
      </p>

      <p class="book-audience">
        <strong>কার জন্য:</strong>
        ${book.audience || "সকল পাঠক"}
      </p>

      <div class="book-actions">

        <button
          type="button"
          class="book-read-btn"
          onclick="showBookDetails(${book.id})"
        >
          কেন পড়বেন?
        </button>

        <a
          href="${book.affiliate_url || "#"}"
          class="book-buy-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          রকমারিতে দেখুন ↗
        </a>

      </div>

    </div>
  `;

  return card;
}


// ========================================
// RENDER ALL BOOKS
// ========================================

function renderBooks(books = BOOKS) {

  const container = document.getElementById("featuredBooks");

  if (!container) {
    console.error("❌ #featuredBooks পাওয়া যায়নি");
    return;
  }

  container.innerHTML = "";

  books.forEach(book => {

    const card = createBookCard(book);

    container.appendChild(card);

  });
}


// ========================================
// BOOK DETAILS
// ========================================

function showBookDetails(id) {

  const book = BOOKS.find(item => item.id === id);

  if (!book) return;

  alert(
    `${book.title}\n\n` +
    `লেখক: ${book.author}\n\n` +
    `${book.description}`
  );
}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  renderBooks(BOOKS);

});
