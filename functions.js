// Dynamic login modal loading
document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
  
    if (loginModal) {
      loginModal.addEventListener("show.bs.modal", function () {
        const modalContent = document.getElementById("loginModalContent");
        if (modalContent) {
          fetch("log_SignIn.html")
            .then(response => response.text())
            .then(html => {
              modalContent.innerHTML = html;
            })
            .catch(error => {
              modalContent.innerHTML = "<div class='p-3 text-danger'>Error al cargar el formulario.</div>";
              console.error("Error cargando login_form.html:", error);
            });
        }
      });
    }
  });

// Newsletter subscription + email control
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim().toLowerCase();

      if (!email) return;

      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

      if (subscribers.includes(email)) {
        const duplicateModal = new bootstrap.Modal(document.getElementById("duplicateModal"));
        duplicateModal.show();
      } else {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        const subscriptionModal = new bootstrap.Modal(document.getElementById("subscriptionModal"));
        subscriptionModal.show();
        emailInput.value = "";
      }
    });
  });

// Verification simulation: upload file + return results
$(document).ready(function () {
  let uploadedImageDataURL = null;

  $('#urlInput').on('click', function () {
    $('#fileInput').trigger('click');
  });

  $('#fileInput').on('change', function () {
    const file = this.files[0];
    if (!file) return;

    $('#urlInput').val(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadedImageDataURL = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      uploadedImageDataURL = null; 
    }
  });

  $('#upload-form').on('submit', function (e) {
    e.preventDefault();
    const fileName = $('#urlInput').val() || 'uploaded-document.pdf';
    const userName = 'JohnDoe';
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    const imageSrc = uploadedImageDataURL || 'Imags/ben-o-bro-wpU4veNGnHg-unsplash.jpg';
    const randomScore = Math.floor(Math.random() * 20) + 80; // Random value 80–99

    const resultHtml = `
    <section class="analysis-result">
      <div class="top-section">
        <div class="result-thumbnail">
          <img src="${imageSrc}" alt="Document Thumbnail" />
        </div>
        <div class="top-info">
          <h2 class="result-title">${fileName}</h2>
          <p class="result-meta">Uploaded by Jonathan Castillo · ${dateString} · ${timeString}</p>
          <div class="fakeability-score">
            <span class="score-label">Fakeability Score:</span>
            <span class="score-value">${randomScore}%</span>
          </div>
        </div>
      </div>
        <div class="indicators-placeholder">
          <div class="indicators">
            <strong>Disinformation:</strong>&nbsp;Some statements are not supported by credible evidence.
          </div>
          <div class="indicators">
            <strong>Source Authority:</strong>&nbsp;The source has low to moderate reliability.
          </div>
          <div class="indicators">
            <strong>Sensationalism:</strong>&nbsp;The language used is emotionally charged.
          </div>
          <div class="indicators">
            <strong>Context:</strong>&nbsp;Some quotes or data are taken out of context.
          </div>
        </div>
      </div>
    </section>
    `;

    $('#analysis-output').html(resultHtml);

    $('html, body').animate({
      scrollTop: $('#analysis-output').offset().top - 50
    }, 500);
  });
});

// Community Engagement Elements 
document.addEventListener('DOMContentLoaded', function () {
  const posts = document.querySelectorAll('.card'); 

  posts.forEach(post => {
    let likeCount = 0;
    let shareCount = 0; 
    let liked = false;
    let sharedExternally = false;

    const sharedMethods = new Set();
    const likeBtn = post.querySelector('.like-btn');
    const likeDisplay = post.querySelector('.like-count');
    const shareBtn = post.querySelector('.share-btn');
    const sharePopup = post.querySelector('.share-popup');
    const shareDisplay = post.querySelector('.share-count');

    // Like button
    likeBtn.addEventListener('click', () => {
      liked = !liked;
      if (liked) {
        likeCount++;
        likeBtn.classList.remove('btn-outline-primary');
        likeBtn.classList.add('btn-primary');
      } else {
        likeCount--;
        likeBtn.classList.remove('btn-primary');
        likeBtn.classList.add('btn-outline-primary');
      }
      likeDisplay.textContent = `${likeCount}`;
    });

    // Share button
    shareBtn.addEventListener('click', (e) => {
      sharedExternally = !sharedExternally;
      if (sharedExternally) {
        shareBtn.classList.remove('btn-outline-success');
        shareBtn.classList.add('btn-success');
        sharePopup.style.display = 'block';
      } else {
        shareBtn.classList.remove('btn-success');
        shareBtn.classList.add('btn-outline-success');
        sharePopup.style.display = 'none';
      }
    });

    // Close share popup if clicking outside
    document.addEventListener('click', function (e) {
      if (!post.contains(e.target) && !shareBtn.contains(e.target) && !sharePopup.contains(e.target)) {
        sharePopup.style.display = 'none';
        shareBtn.classList.remove('btn-success');
        shareBtn.classList.add('btn-outline-success');
        sharedExternally = false;
      }
    });

    // Social media links
    post.querySelectorAll('.share-popup a').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const url = link.href;
        let method = '';

        if (url.includes('facebook.com')) method = 'facebook';
        else if (url.includes('twitter.com')) method = 'twitter';
        else if (url.includes('outlook.live.com')) method = 'outlook';
        else method = url; // fallback: usa el propio href como identificador único

        if (!sharedMethods.has(method)) {
          shareCount++;
          shareDisplay.textContent = `${shareCount}`;
          sharedMethods.add(method);
        }

        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });

    // Handle copy link click
    const copyLink = post.querySelector('.copy-link');
    copyLink.addEventListener('click', function(e) {
      e.preventDefault();

      if (!sharedMethods.has('copy')) {
        shareCount++;
        shareDisplay.textContent = `${shareCount}`;
        sharedMethods.add('copy');
      }

      navigator.clipboard.writeText(window.location.href).then(() => {
        const toast = post.querySelector('.copy-toast');
        toast.style.display = 'block';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 3000);
      });
    });
  });
});

  // Comments

  document.addEventListener('DOMContentLoaded', function () {
    const posts = document.querySelectorAll('.card');

    posts.forEach(post => {
      const commentInput = post.querySelector('.comment-input');
      const commentsContainer = post.querySelector('.comments');
      const commentDisplay = post.querySelector('.comment-count');
      let commentCount = 0;

      if (commentInput && commentsContainer && commentDisplay) {
        commentInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && commentInput.value.trim() !== '') {
            e.preventDefault();

            const commentText = commentInput.value.trim();
            const username = 'Anon' + Math.floor(100 + Math.random() * 900);
            const timestamp = new Date().toLocaleString();

            const commentWrapper = document.createElement('div');
            commentWrapper.classList.add('comment', 'bg-light', 'rounded', 'p-2', 'mb-2', 'position-relative');

            commentWrapper.innerHTML = `
              <strong>${username}</strong> <small class="text-muted">${timestamp}</small>
              <button class="btn-close position-absolute top-0 end-0 mt-1 me-1" aria-label="Delete"></button>
              <p class="mb-0 mt-1">${commentText}</p>
            `;

            // Remove comment
            commentWrapper.querySelector('.btn-close').addEventListener('click', () => {
              commentWrapper.remove();
              commentCount = Math.max(0, commentCount - 1);
              commentDisplay.textContent = `${commentCount}`;
            });

            // Add comment
            commentsContainer.appendChild(commentWrapper);
            commentInput.value = '';
            commentCount++;
            commentDisplay.textContent = `${commentCount}`;
          }
        });
      }
    });
  });
