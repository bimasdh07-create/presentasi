// (3) Variabel yang jelas fungsinya
const daftarHarga = {
    "BM-1 Standard": 1500000,
    "BM-2 Power": 2000000,
    "BM-3 Medium": 2500000,
    "BM-4 Industrial": 3000000,
    "BM-5 Pro-Max": 3500000
};

const KODE_VALID = "COOPERHEMAT";
let diskon = 0; // Menyimpan nilai diskon (0 atau 0.1)

document.addEventListener('DOMContentLoaded', () => {
    const selectMesin = document.getElementById('tipeMesin');
    const inputJumlah = document.getElementById('jumlah');
    const inputPromo = document.getElementById('promo');
    const btnPromo = document.getElementById('btn-promo');
    const promoMsg = document.getElementById('promo-msg');
    const displayTotal = document.getElementById('total-harga');
    const displayDetail = document.getElementById('detail-pesanan');

    // --- LOGIKA 1: KALKULATOR HARGA (Poin 2, 4, 5) ---
    function hitungOtomatis() {
        const tipe = selectMesin.value;
        const qty = parseInt(inputJumlah.value) || 0;

        if (daftarHarga[tipe]) {
            let hargaDasar = daftarHarga[tipe] * qty;
            let potongan = hargaDasar * diskon; // Hitung potongan jika ada
            let totalAkhir = hargaDasar - potongan;
            
            displayDetail.innerHTML = `Unit: <strong>${qty}x ${tipe}</strong> ${diskon > 0 ? '<br><span style="color:green;">Diskon 10% Aktif!</span>' : ''}`;
            displayTotal.textContent = totalAkhir.toLocaleString('id-ID');
        } else {
            displayDetail.textContent = "Silakan pilih unit mesin...";
            displayTotal.textContent = "0";
        }
    }

    // --- LOGIKA 2: VALIDASI KODE PROMO (Poin 4 & 5) ---
    if (btnPromo) {
        btnPromo.addEventListener('click', () => {
            const kodeInput = inputPromo.value.trim().toUpperCase();

            // (4) Percabangan IF...ELSE untuk cek kode
            if (kodeInput === KODE_VALID) {
                diskon = 0.1; // Diskon 10%
                promoMsg.textContent = "Kode Berhasil Digunakan!";
                promoMsg.style.color = "green";
                btnPromo.style.background = "#22c55e";
                btnPromo.style.color = "white";
            } else {
                diskon = 0;
                promoMsg.textContent = "Kode Tidak Valid / Salah.";
                promoMsg.style.color = "red";
                btnPromo.style.background = "#e2e8f0";
                btnPromo.style.color = "black";
            }
            hitungOtomatis(); // Update harga setelah cek promo
        });
    }

    // Event Listener untuk perubahan input
    if (selectMesin) selectMesin.addEventListener('change', hitungOtomatis);
    if (inputJumlah) inputJumlah.addEventListener('input', hitungOtomatis);

    // --- LOGIKA 3: HANDLING SUBMIT FORM (Poin 6) ---
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nama = document.getElementById('nama').value;
            const tipe = selectMesin.value;
            const qty = inputJumlah.value;
            const total = displayTotal.textContent;

            // (6) Tampilkan Alert Respons Sukses
            alert(`Terima kasih ${nama}!\nTotal Bayar: Rp ${total}\n\nKlik OK untuk konfirmasi via WhatsApp.`);
            
            const pesanWA = `Halo Admin Cooper Bojonegoro, saya ${nama} ingin memesan ${qty} unit ${tipe}. Total setelah promo: Rp ${total}.`;
            window.open(`https://wa.me{encodeURIComponent(pesanWA)}`, '_blank');
            
            orderForm.reset();
            diskon = 0; // Reset diskon
            promoMsg.textContent = "";
            hitungOtomatis();
        });
    }
});
