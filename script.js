document.addEventListener("DOMContentLoaded", () => {
  const wishButton = document.getElementById("wishButton");
  const wishMessage = document.getElementById("wishMessage");
  const popupOverlay = document.getElementById("popupOverlay");
  const closePopup = document.getElementById("closePopup");
  const giftButton = document.getElementById("giftButton");
  const giftStatus = document.getElementById("giftStatus");
  const notReadyOverlay = document.getElementById("notReadyOverlay");
  const closeNotReady = document.getElementById("closeNotReady");

  // Countdown ke 14 Mei 2026 jam 00:00
  const targetDate = new Date("2026-05-14T00:00:00").getTime();

  function formatTime(value) {
    return String(Math.max(0, value)).padStart(2, "0");
  }

  function updateGiftStatus(distance) {
    if (!giftButton || !giftStatus) return;

    if (distance <= 0) {
      giftButton.disabled = false;
      giftButton.classList.add("ready");
      giftButton.textContent = "Kirim Pesan ke Aku";

      giftStatus.textContent =
        "Saatnya! Tekan tombol untuk kirim pesan cinta langsung ke aku.";

      return;
    }

    giftButton.disabled = true;
    giftButton.classList.remove("ready");
    giftButton.textContent = "Kirim Pesan ke Aku";

    giftStatus.textContent =
      "Momen spesial sedang mendekat. Tunggu sebentar lagi... ✨";
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Hitung waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    // Update tampilan countdown
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) {
      daysElement.textContent = formatTime(days);
    }

    if (hoursElement) {
      hoursElement.textContent = formatTime(hours);
    }

    if (minutesElement) {
      minutesElement.textContent = formatTime(minutes);
    }

    if (secondsElement) {
      secondsElement.textContent = formatTime(seconds);
    }

    // Jika countdown selesai
    if (distance <= 0) {
      clearInterval(countdownInterval);

      if (daysElement) daysElement.textContent = "00";
      if (hoursElement) hoursElement.textContent = "00";
      if (minutesElement) minutesElement.textContent = "00";
      if (secondsElement) secondsElement.textContent = "00";

      if (wishMessage) {
        wishMessage.textContent =
          "Selamat ulang tahun! Semua cinta sudah siap untuk kamu nikmati 💜";
      }

      updateGiftStatus(0);

      return;
    }

    updateGiftStatus(distance);
  }

  // Fungsi kirim WhatsApp
  function handleGiftClick() {
    if (!giftButton || !giftStatus) return;

    if (giftButton.disabled) {
      giftStatus.textContent =
        "Sabar ya sayang, sebentar lagi kok! 💖";

      return;
    }

    const nomorWA = "6288237077652";

    const pesan = encodeURIComponent(
      "Halo Sayang! Aku sudah lihat kejutan ulang tahunnya. Terima kasih banyak ya! 💜✨"
    );

    const waUrl = `https://wa.me/${nomorWA}?text=${pesan}`;

    window.open(waUrl, "_blank");

    giftButton.textContent = "Pesan Dikirim!";
    giftButton.disabled = true;

    giftStatus.textContent =
      "Pesan berhasil diteruskan ke WhatsApp. Semoga harimu indah!";

    if (wishMessage) {
      wishMessage.textContent =
        "Kejutan dan cinta sudah terkirim. Selamat ulang tahun, bahagia selalu!";
    }
  }

  // Tombol kejutan
  if (wishButton) {
    wishButton.addEventListener("click", () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        if (popupOverlay) {
          popupOverlay.classList.add("active");
        }

        if (wishMessage) {
          wishMessage.textContent =
            "Lihat kejutan romantis yang sedang disiapkan untukmu 💫";
        }
      } else {
        if (notReadyOverlay) {
          notReadyOverlay.classList.add("active");
        }
      }
    });
  }

  // Tutup popup utama
  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popupOverlay?.classList.remove("active");
    });
  }

  // Tutup popup belum siap
  if (closeNotReady) {
    closeNotReady.addEventListener("click", () => {
      notReadyOverlay?.classList.remove("active");
    });
  }

  // Klik area luar popup
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (event) => {
      if (event.target === popupOverlay) {
        popupOverlay.classList.remove("active");
      }
    });
  }

  if (notReadyOverlay) {
    notReadyOverlay.addEventListener("click", (event) => {
      if (event.target === notReadyOverlay) {
        notReadyOverlay.classList.remove("active");
      }
    });
  }

  // Tombol kirim hadiah
  if (giftButton) {
    giftButton.addEventListener("click", handleGiftClick);
  }

  // Jalankan countdown pertama kali
  updateCountdown();

  // Update tiap 1 detik
  const countdownInterval = setInterval(updateCountdown, 1000);
});