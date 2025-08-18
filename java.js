// Koordinat pusat wilayah (Serui, Kepulauan Yapen)
const centerLat = -1.8703;
const centerLng = 136.2318;

// Radius (km) meliputi semua pulau kecil di Kepulauan Yapen
const maxRadius = 1;

// Fungsi hitung jarak
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Cek lokasi
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const distance = getDistanceFromLatLonInKm(centerLat, centerLng, userLat, userLng);

        if (distance > maxRadius) {
            document.getElementById('location-alert-overlay').style.display = 'flex';
        }
    }, error => {
        console.log("Tidak bisa mendapatkan lokasi:", error);
    });
};

// Deteksi WebView Android
const isAndroidWebView = /wv|Android.*Version\/[\d.]+/.test(navigator.userAgent);

// Deteksi WebView iOS
const isIOSWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);

window.addEventListener("DOMContentLoaded", function () {
  const floatingContainer = document.getElementById("floatingContainer");
  if (!floatingContainer) return; // kalau ID tidak ditemukan, skip

  if (isAndroidWebView || isIOSWebView) {
    // Jika WebView → sembunyikan tombol
    floatingContainer.style.display = "none";
  } else {
    // Jika browser biasa → tampilkan
    floatingContainer.style.display = "block";
  }
});
