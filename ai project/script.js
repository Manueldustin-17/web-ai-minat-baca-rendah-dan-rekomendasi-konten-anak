// script.js - SOLUSI SIMPLE: THUMBNAIL KE YOUTUBE

// ========== DATABASE VIDEO REKOMENDASI YANG BERFUNGSI ==========
const videoDatabase = {
    "hewan": [
        {
            id: "v1",
            title: "Lagu Anak - Burung Kakatua",
            youtubeUrl: "https://www.youtube.com/watch?v=KGiUc9seQjw&list=RDKGiUc9seQjw&start_radio=1",
            description: "Lagu anak tradisional Indonesia tentang burung kakatua",
            category: "hewan",
            ageRange: [1, 6],
            duration: "2:15"
        },
        {
            id: "v2",
            title: "Belajar Mengenal Hewan",
            youtubeUrl: "https://www.youtube.com/watch?v=NpAmLQnPkCc&t=24s",
            description: "Video edukasi mengenal nama dan suara hewan untuk anak-anak",
            category: "hewan",
            ageRange: [1, 6],
            duration: "4:20"
        }
    ],
    "petualangan": [
        {
            id: "v3",
            title: "Petualangan Dora The Explorer",
            youtubeUrl: "https://www.youtube.com/watch?v=L8A4XbM5sXA",
            description: "Petualangan seru Dora menjelajahi hutan dan menyelesaikan teka-teki",
            category: "petualangan",
            ageRange: [3, 8],
            duration: "22:30"
        },
        {
            id: "v4",
            title: "Eksplorasi Laut Dalam",
            youtubeUrl: "https://www.youtube.com/watch?v=X2TF93CFtH4",
            description: "Petualangan menjelajahi keindahan laut dalam dan kehidupan marin",
            category: "petualangan",
            ageRange: [5, 12],
            duration: "6:45"
        }
    ],
    "fantasi": [
        {
            id: "v5",
            title: "Dongeng Putri Salju",
            youtubeUrl: "https://www.youtube.com/watch?v=gTzwMnJovi0&t=1043s",
            description: "Cerita dongeng klasik Putri Salju dan 7 kurcaci",
            category: "fantasi",
            ageRange: [4, 9],
            duration: "12:45"
        },
        {
            id: "v6",
            title: "Kisah Aladin dan Lampu Ajaib",
            youtubeUrl: "https://www.youtube.com/watch?v=RJ3kW3ebFBI",
            description: "Petualangan fantasi Aladin dengan lampu ajaibnya",
            category: "fantasi", 
            ageRange: [6, 12],
            duration: "15:20"
        }
    ],
    "edukasi": [
        {
            id: "v7",
            title: "Belajar Huruf ABC",
            youtubeUrl: "https://www.youtube.com/watch?v=ND1QoJQAmyM&t=5s",
            description: "Video interaktif belajar membaca dan mengenal huruf untuk anak",
            category: "edukasi",
            ageRange: [3, 7],
            duration: "18:22"
        },
        {
            id: "v8",
            title: "Belajar Berhitung 1-10",
            youtubeUrl: "https://www.youtube.com/watch?v=vzlruT2IEr8&list=RDvzlruT2IEr8&start_radio=1",
            description: "Belajar matematika dasar dengan cara yang menyenangkan",
            category: "edukasi",
            ageRange: [4, 8],
            duration: "14:36"
        }
    ],
    "komik": [
        {
            id: "v9",
            title: "Cara Menggambar Kartun Sederhana",
            youtubeUrl: "https://www.youtube.com/watch?v=khMNta3HUio",
            description: "Tutorial mudah menggambar karakter kartun untuk anak",
            category: "komik",
            ageRange: [7, 12],
            duration: "6:52"
        },
        {
            id: "v10",
            title: "Membuat Komik Strip Sederhana",
            youtubeUrl: "https://www.youtube.com/watch?v=q6E9Xo6Kj_w",
            description: "Belajar membuat komik strip dengan cerita sederhana",
            category: "komik",
            ageRange: [8, 12],
            duration: "11:24"
        }
    ],
    "sains": [
        {
            id: "v11",
            title: "Eksperimen Sains Sederhana",
            youtubeUrl: "https://www.youtube.com/watch?v=og_LUhKZzyk",
            description: "5 eksperimen sains mudah dan aman yang bisa dilakukan di rumah",
            category: "sains",
            ageRange: [6, 12],
            duration: "7:33"
        },
        {
            id: "v12",
            title: "Mengenal Planet di Tata Surya",
            youtubeUrl: "https://www.youtube.com/watch?v=2EgP_zSOKN4",
            description: "Belajar tentang planet-planet di tata surya dengan animasi menarik",
            category: "sains",
            ageRange: [7, 12],
            duration: "10:45"
        }
    ]
};

// ========== FUNGSI VIDEO REKOMENDASI SEDERHANA ==========
function getRecommendedVideos(bookCategories, age) {
    let recommendedVideos = [];
    
    bookCategories.forEach(category => {
        if (videoDatabase[category]) {
            const categoryVideos = videoDatabase[category].filter(video => 
                age >= video.ageRange[0] && age <= video.ageRange[1]
            );
            recommendedVideos = [...recommendedVideos, ...categoryVideos];
        }
    });
    
    // Hapus duplikat dan batasi maksimal 4 video
    return [...new Map(recommendedVideos.map(item => [item.id, item])).values()]
        .slice(0, 4)
        .sort(() => Math.random() - 0.5);
}

function displayRecommendedVideos(videos) {
    const videoList = document.getElementById('videoList');
    
    if (videos.length === 0) {
        videoList.innerHTML = `
            <div class="video-card" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h4>📹 Tidak ada video rekomendasi</h4>
                <p>Video rekomendasi akan ditambahkan segera.</p>
            </div>
        `;
        return;
    }
    
    videoList.innerHTML = videos.map(video => `
        <div class="video-card">
            <div class="video-thumbnail" onclick="window.open('${video.youtubeUrl}', '_blank')">
                <img src="https://img.youtube.com/vi/${getYouTubeId(video.youtubeUrl)}/hqdefault.jpg" 
                     alt="${video.title}"
                     class="thumbnail-image">
                <div class="play-overlay">
                    <div class="play-button">▶</div>
                </div>
                <div class="video-duration-badge">${video.duration}</div>
            </div>
            <div class="video-content">
                <div class="video-title">${video.title}</div>
                <div class="video-meta">
                    <span class="video-age">${video.ageRange[0]}-${video.ageRange[1]} tahun</span>
                </div>
                <div class="video-description">${video.description}</div>
                <button class="youtube-btn" onclick="window.open('${video.youtubeUrl}', '_blank')">
                    🎬 Tonton di YouTube
                </button>
            </div>
        </div>
    `).join('');
}

// Fungsi helper untuk mendapatkan YouTube ID
function getYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
}

// Knowledge Base - Database Buku (tetap sama)
const bookDatabase = [
    // Usia 1-3 tahun
    {
        id: 1,
        title: "Bobo dan Kawan-Kawan",
        author: "Tim Bobo",
        ageRange: [1, 3],
        readingLevel: "pemula",
        categories: ["hewan", "edukasi"],
        description: "Buku bergambar dengan karakter Bobo yang lucu, mengajak anak mengenal hewan dan lingkungan",
        pages: 12,
        image: "🐰",
        color: "#FF6B6B",
        rating: 4.7,
        publisher: "Kompas Gramedia",
        sinopsis: "Bobo si kelinci yang ceria mengajak anak-anak berpetualang mengenal teman-teman barunya di hutan. Setiap halaman penuh dengan warna-warna cerah dan gambar menarik yang cocok untuk balita.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/bobo-dan-kawan-kawan" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=buku%20bobo%20dan%20kawan%20kawan" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=buku%20bobo%20dan%20kawan%20kawan" }
        ]
    },
    {
        id: 2,
        title: "Ayo Belajar dengan Si Kumbang",
        author: "Dian Kristiani",
        ageRange: [1, 3],
        readingLevel: "pemula",
        categories: ["edukasi", "hewan"],
        description: "Buku edukatif dengan karakter serangga lucu untuk belajar warna dan bentuk",
        pages: 10,
        image: "🐞",
        color: "#48CAE4",
        rating: 4.3,
        publisher: "Bentang Kids",
        sinopsis: "Si Kumbang yang bersemangat mengajak anak-anak belajar mengenal warna dasar, bentuk geometri, dan angka melalui petualangan seru di taman bunga. Buku dengan tekstur yang aman untuk balita.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/ayo-belajar-dengan-si-kumbang" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=ayo%20belajar%20dengan%20si%20kumbang" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=ayo%20belajar%20dengan%20si%20kumbang" }
        ]
    },
    {
        id: 3,
        title: "Lagu Anak Indonesia Populer",
        author: "A.T. Mahmud",
        ageRange: [1, 3],
        readingLevel: "pemula",
        categories: ["edukasi"],
        description: "Kumpulan lagu anak klasik Indonesia dengan notasi dan gambar berwarna",
        pages: 16,
        image: "🎵",
        color: "#FFD166",
        rating: 4.8,
        publisher: "Gramedia Pustaka Utama",
        sinopsis: "Kumpulan 15 lagu anak Indonesia terpopuler seperti 'Pelangi', 'Balonku', dan 'Naik Kereta Api' dilengkapi notasi musik dan ilustrasi berwarna-warni. Cocok untuk bernyanyi bersama orang tua.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/lagu-anak-indonesia-populer" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=lagu%20anak%20indonesia%20populer%20at%20mahmud" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=lagu%20anak%20indonesia%20populer%20at%20mahmud" }
        ]
    },

    // Usia 4-6 tahun
    {
        id: 4,
        title: "Kancil dan Buaya",
        author: "H.C. Andersen",
        ageRange: [4, 6],
        readingLevel: "pemula",
        categories: ["hewan", "petualangan"],
        description: "Cerita rakyat Indonesia tentang kecerdikan si Kancil melawan buaya",
        pages: 24,
        image: "🦌",
        color: "#06D6A0",
        rating: 4.9,
        publisher: "Bhuana Ilmu Populer",
        sinopsis: "Kisah klasik tentang Si Kancil yang cerdik yang berhasil menyeberangi sungai dengan mengelabui buaya-buaya yang lapar. Cerita yang mengajarkan nilai kecerdikan dan keberanian.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/kancil-dan-buaya" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=buku%20cerita%20kancil%20dan%20buaya" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=buku%20cerita%20kancil%20dan%20buaya" }
        ]
    },
    {
        id: 5,
        title: "Petualangan Si Keledai",
        author: "Murti Bunanta",
        ageRange: [4, 6],
        readingLevel: "menengah",
        categories: ["hewan", "petualangan"],
        description: "Kisah keledai kecil yang berpetualang mencari teman baru",
        pages: 28,
        image: "🐴",
        color: "#FF9E00",
        rating: 4.5,
        publisher: "Kelas Literasi",
        sinopsis: "Keledo si keledai kecil merasa kesepian hingga memutuskan berpetualang mencari teman. Dalam perjalanannya, dia bertemu berbagai hewan dan belajar tentang persahabatan sejati.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/petualangan-si-keledai" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=petualangan%20si%20keledai%20murti%20bunanta" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=petualangan%20si%20keledai%20murti%20bunanta" }
        ]
    },
    {
        id: 6,
        title: "Dunia Binatang Indonesia",
        author: "Tim Taman Safari",
        ageRange: [4, 6],
        readingLevel: "pemula",
        categories: ["hewan", "sains"],
        description: "Mengenal hewan-hewan asli Indonesia dengan gambar menarik",
        pages: 32,
        image: "🐘",
        color: "#9D4EDD",
        rating: 4.6,
        publisher: "Penerbit Safari",
        sinopsis: "Buku ensiklopedia mini yang memperkenalkan 20 hewan asli Indonesia seperti orangutan, komodo, dan harimau sumatera. Dilengkapi fakta menarik dan foto-foto berkualitas.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/dunia-binatang-indonesia" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=dunia%20binatang%20indonesia%20taman%20safari" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=dunia%20binatang%20indonesia%20taman%20safari" }
        ]
    },

    // Usia 7-9 tahun
    {
        id: 7,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        ageRange: [7, 9],
        readingLevel: "menengah",
        categories: ["petualangan", "edukasi"],
        description: "Kisah inspiratif anak-anak Belitong yang bersekolah dengan penuh semangat",
        pages: 529,
        image: "🌈",
        color: "#FF6B6B",
        rating: 4.9,
        publisher: "Bentang Pustaka",
        sinopsis: "Kisah 10 anak dari keluarga miskin di Belitong yang bersekolah di SD Muhammadiyah yang hampir roboh. Meski banyak keterbatasan, mereka punya semangat belajar yang luar biasa dan mimpi yang besar.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/laskar-pelangi" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=laskar%20pelangi%20andrea%20hirata" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=laskar%20pelangi%20andrea%20hirata" },
            { name: "BukuKita", url: "https://www.bukukita.com/katalog/title/laskar-pelangi" }
        ]
    },
    {
        id: 8,
        title: "Seri Komik Nusantara: Timun Mas",
        author: "Rini Kurniasih",
        ageRange: [7, 9],
        readingLevel: "menengah",
        categories: ["komik", "fantasi"],
        description: "Cerita rakyat Jawa dalam format komik yang menarik dan edukatif",
        pages: 48,
        image: "📖",
        color: "#48CAE4",
        rating: 4.7,
        publisher: "Elex Media Komputindo",
        sinopsis: "Adaptasi komik dari cerita rakyat Jawa tentang Timun Mas, gadis pemberani yang harus melawan raksasa jahat. Dengan bantuan ibu dan benda-benda ajaib, dia berhasil mengalahkan raksasa.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/seri-komik-nusantara-timun-mas" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=komik%20timun%20mas%20elex%20media" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=komik%20timun%20mas%20elex%20media" }
        ]
    },
    {
        id: 9,
        title: "Petualangan di Hutan Kalimantan",
        author: "Tere Liye",
        ageRange: [7, 9],
        readingLevel: "menengah",
        categories: ["petualangan", "hewan"],
        description: "Kisah petualangan anak-anak menyelamatkan hutan Kalimantan",
        pages: 120,
        image: "🌴",
        color: "#06D6A0",
        rating: 4.8,
        publisher: "Gramedia Pustaka Utama",
        sinopsis: "Tiga sahabat: Bimo, Sari, dan Joni, berpetualang ke hutan Kalimantan untuk menyelamatkan orangutan dari pemburu liar. Petualangan seru yang mengajarkan cinta lingkungan.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/petualangan-di-hutan-kalimantan" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=petualangan%20di%20hutan%20kalimantan%20tere%20liye" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=petualangan%20di%20hutan%20kalimantan%20tere%20liye" }
        ]
    },
    {
        id: 10,
        title: "Sains untuk Anak: Mengapa Langit Biru?",
        author: "Dr. Indriyatno",
        ageRange: [7, 9],
        readingLevel: "menengah",
        categories: ["sains", "edukasi"],
        description: "Buku sains dasar dengan eksperimen sederhana untuk anak",
        pages: 64,
        image: "🔬",
        color: "#FF9E00",
        rating: 4.4,
        publisher: "Penerbit Sains Anak",
        sinopsis: "Buku yang menjawab pertanyaan-pertanyaan sains populer anak-anak seperti mengapa langit berwarna biru, bagaimana pelangi terbentuk, dan mengapa daun berwarna hijau. Dilengkapi eksperimen sederhana.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/sains-untuk-anak-mengapa-langit-biru" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=sains%20untuk%20anak%20mengapa%20langit%20biru" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=sains%20untuk%20anak%20mengapa%20langit%20biru" }
        ]
    },

    // Usia 10-12 tahun
    {
        id: 11,
        title: "Bumi",
        author: "Tere Liye",
        ageRange: [10, 12],
        readingLevel: "mahir",
        categories: ["fantasi", "petualangan"],
        description: "Petualangan fantasi tentang dunia paralel dan kekuatan persahabatan",
        pages: 440,
        image: "🌍",
        color: "#9D4EDD",
        rating: 4.9,
        publisher: "Gramedia Pustaka Utama",
        sinopsis: "Raib, seorang gadis 15 tahun dengan kemampuan menghilang, bersama dua sahabatnya Seli dan Ali, terlibat dalam petualangan luar biasa melintasi dunia paralel untuk menyelamatkan Bumi dari kehancuran.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/bumi-serial-keluarga-mamak" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=bumi%20tere%20liye" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=bumi%20tere%20liye" },
            { name: "BukuKita", url: "https://www.bukukita.com/katalog/title/bumi-2" }
        ]
    },
    {
        id: 12,
        title: "Seri Detektif Cilik: Misteri Museum",
        author: "Chris Steven",
        ageRange: [10, 12],
        readingLevel: "mahir",
        categories: ["petualangan", "komik"],
        description: "Kisah detektif cilik memecahkan misteri pencurian di museum",
        pages: 156,
        image: "🕵️",
        color: "#FF6B6B",
        rating: 4.6,
        publisher: "DAR! Mizan",
        sinopsis: "Kiko dan tim detektif ciliknya harus memecahkan misteri pencurian patung kuno di museum. Dengan petunjuk-petunjuk tersembunyi dan logika tajam, mereka mengungkap konspirasi besar.",
        links: [
            { name: "Mizan Store", url: "https://mizanstore.com/seri_detektif_cilik_misteri_museum" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=seri%20detektif%20cilik%20misteri%20museum" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=seri%20detektif%20cilik%20misteri%20museum" }
        ]
    },
    {
        id: 13,
        title: "Ensiklopedia Junior: Indonesia",
        author: "Tim Redaksi",
        ageRange: [10, 12],
        readingLevel: "mahir",
        categories: ["edukasi", "sains"],
        description: "Ensiklopedia lengkap tentang Indonesia untuk anak-anak",
        pages: 200,
        image: "📚",
        color: "#48CAE4",
        rating: 4.7,
        publisher: "Penerbit Anak Bangsa",
        sinopsis: "Ensiklopedia komprehensif yang membahas segala hal tentang Indonesia mulai dari geografi, sejarah, budaya, flora-fauna, hingga prestasi bangsa. Dilengkapi foto dan ilustrasi menarik.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/ensiklopedia-junior-indonesia" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=ensiklopedia%20junior%20indonesia" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=ensiklopedia%20junior%20indonesia" }
        ]
    },
    {
        id: 14,
        title: "Kisah 1001 Malam untuk Anak",
        author: "Nadia Shafiana",
        ageRange: [10, 12],
        readingLevel: "mahir",
        categories: ["fantasi", "petualangan"],
        description: "Adaptasi cerita 1001 malam yang cocok untuk anak-anak",
        pages: 180,
        image: "🧞",
        color: "#FF9E00",
        rating: 4.5,
        publisher: "Bhuana Ilmu Populer",
        sinopsis: "Kumpulan cerita dari 1001 Malam yang sudah disesuaikan untuk anak-anak, termasuk kisah Aladin dan Lampu Ajaib, Ali Baba dan 40 Pencuri, serta Sinbad sang Pelaut.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/kisah-1001-malam-untuk-anak" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=kisah%201001%20malam%20untuk%20anak" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=kisah%201001%20malam%20untuk%20anak" }
        ]
    },
    {
        id: 15,
        title: "Petualangan ke Planet Biru",
        author: "Arleen A.",
        ageRange: [10, 12],
        readingLevel: "mahir",
        categories: ["sains", "fantasi"],
        description: "Kisah fiksi ilmiah tentang petualangan antar planet",
        pages: 224,
        image: "🚀",
        color: "#06D6A0",
        rating: 4.8,
        publisher: "Kepustakaan Populer Gramedia",
        sinopsis: "Astra dan krunya melakukan perjalanan luar angkasa menuju Planet Biru yang misterius. Di sana mereka menemukan peradaban alien dan harus memecahkan teka-teki untuk kembali ke Bumi.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/petualangan-ke-planet-biru" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=petualangan%20ke%20planet%20biru%20arleen" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=petualangan%20ke%20planet%20biru%20arleen" }
        ]
    },
    {
        id: 16,
        title: "Komik Si Juki",
        author: "Faza Meonk",
        ageRange: [10, 12],
        readingLevel: "mahir",
        categories: ["komik", "humor"],
        description: "Komik humor populer Indonesia dengan karakter Si Juki yang lucu",
        pages: 128,
        image: "😄",
        color: "#9D4EDD",
        rating: 4.9,
        publisher: "Bukune",
        sinopsis: "Kumpulan komik humor tentang kehidupan sehari-hari Si Juki dan teman-temannya. Dengan karakter yang relatable dan humor yang segar, komik ini sangat disukai anak-anak.",
        links: [
            { name: "Gramedia", url: "https://www.gramedia.com/products/komik-si-juki" },
            { name: "Tokopedia", url: "https://www.tokopedia.com/search?q=komik%20si%20juki%20faza%20meonk" },
            { name: "Shopee", url: "https://shopee.co.id/search?keyword=komik%20si%20juki%20faza%20meonk" },
            { name: "Official Store", url: "https://sijuki.net/official-store/" }
        ]
    }
];

// Inference Engine - Sistem Pakar (Tetap sama)
class ExpertSystem {
    constructor(books) {
        this.books = books;
    }

    getRecommendations(age, readingLevel, interests) {
        let filteredBooks = this.books.filter(book => {
            const ageMatch = age >= book.ageRange[0] && age <= book.ageRange[1];
            const levelMatch = this.checkReadingLevel(readingLevel, book.readingLevel);
            const interestMatch = interests.length === 0 || 
                book.categories.some(category => interests.includes(category));
            
            return ageMatch && levelMatch && interestMatch;
        });

        if (filteredBooks.length === 0) {
            filteredBooks = this.books.filter(book => 
                age >= book.ageRange[0] && age <= book.ageRange[1]
            );
        }

        return this.sortByRelevance(filteredBooks, age, interests);
    }

    checkReadingLevel(userLevel, bookLevel) {
        const levelHierarchy = {
            'pemula': 1,
            'menengah': 2,
            'mahir': 3
        };
        
        return levelHierarchy[userLevel] >= levelHierarchy[bookLevel];
    }

    sortByRelevance(books, age, interests) {
        return books.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;

            const ageMidA = (a.ageRange[0] + a.ageRange[1]) / 2;
            const ageMidB = (b.ageRange[0] + b.ageRange[1]) / 2;
            scoreA -= Math.abs(ageMidA - age);
            scoreB -= Math.abs(ageMidB - age);

            const matchingInterestsA = a.categories.filter(cat => interests.includes(cat)).length;
            const matchingInterestsB = b.categories.filter(cat => interests.includes(cat)).length;
            scoreA += matchingInterestsA * 2;
            scoreB += matchingInterestsB * 2;

            scoreA += a.rating || 0;
            scoreB += b.rating || 0;

            return scoreB - scoreA;
        });
    }

    getBooksByAge(age) {
        return this.books.filter(book => 
            age >= book.ageRange[0] && age <= book.ageRange[1]
        ).sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    getAllBooks() {
        return this.books.sort((a, b) => a.ageRange[0] - b.ageRange[0]);
    }

    getBooksByAgeRange(ageRange) {
        const rangeMap = {
            '1-3': [1, 3],
            '4-6': [4, 6],
            '7-9': [7, 9],
            '10-12': [10, 12]
        };
        
        const [minAge, maxAge] = rangeMap[ageRange] || [1, 12];
        return this.books.filter(book => 
            book.ageRange[0] >= minAge && book.ageRange[1] <= maxAge
        );
    }
}

// Inisialisasi Sistem Pakar
const expertSystem = new ExpertSystem(bookDatabase);

// ========== FUNGSI UTAMA YANG SUDAH DIMODIFIKASI ==========
function displayRecommendations(books, title = 'Rekomendasi Bacaan', age = null, interests = []) {
    const bookList = document.getElementById('bookList');
    const resultSection = document.getElementById('recommendationResult');
    const resultTitle = document.getElementById('resultTitle');
    
    resultTitle.textContent = title;
    
    if (books.length === 0) {
        bookList.innerHTML = `
            <div class="book-card" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>📚 Tidak ada rekomendasi yang ditemukan</h3>
                <p>Silakan coba dengan kriteria yang berbeda.</p>
            </div>
        `;
    } else {
        bookList.innerHTML = books.map(book => `
            <div class="book-card">
                <div class="book-image" style="background: ${book.color}">
                    <span style="font-size: 3em">${book.image}</span>
                </div>
                <div class="book-content">
                    <h3>${book.title}</h3>
                    <p class="book-meta"><strong>Penulis:</strong> ${book.author}</p>
                    <p class="book-meta"><strong>Usia:</strong> ${book.ageRange[0]} - ${book.ageRange[1]} tahun</p>
                    <p class="book-meta"><strong>Level:</strong> ${book.readingLevel}</p>
                    <p class="book-meta"><strong>Penerbit:</strong> ${book.publisher}</p>
                    <p class="book-meta"><strong>Halaman:</strong> ${book.pages} halaman</p>
                    <div class="book-rating">
                        ⭐ ${book.rating}/5
                    </div>
                    <p class="book-description">${book.description}</p>
                    <div class="book-sinopsis">
                        <strong>Sinopsis:</strong> ${book.sinopsis}
                    </div>
                    <div class="book-links">
                        <strong>Beli di:</strong>
                        ${book.links.map(link => 
                            `<a href="${link.url}" target="_blank" class="store-link">${link.name}</a>`
                        ).join('')}
                    </div>
                    <div class="book-categories">
                        ${book.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        // ========== TAMBAHAN BARU: TAMPILKAN VIDEO REKOMENDASI ==========
        if (books.length > 0 && age) {
            const allCategories = [...new Set(books.flatMap(book => book.categories))];
            const recommendedVideos = getRecommendedVideos(allCategories, age);
            displayRecommendedVideos(recommendedVideos);
        }
    }
    
    hideMainSections();
    resultSection.classList.remove('hidden');
}

// ========== FUNGSI LAINNYA YANG SUDAH ADA ==========
function getAgeText(age) {
    if (age <= 3) return 'Usia 1-3 Tahun';
    if (age <= 6) return 'Usia 4-6 Tahun';
    if (age <= 9) return 'Usia 7-9 Tahun';
    return 'Usia 10-12 Tahun';
}

function displayAllBooks(books = null) {
    const booksToShow = books || expertSystem.getAllBooks();
    const booksGrid = document.getElementById('allBooksList');
    
    booksGrid.innerHTML = booksToShow.map(book => `
        <div class="book-card">
            <div class="book-image" style="background: ${book.color}">
                <span style="font-size: 3em">${book.image}</span>
            </div>
            <div class="book-content">
                <h3>${book.title}</h3>
                <p class="book-meta"><strong>Penulis:</strong> ${book.author}</p>
                <p class="book-meta"><strong>Usia:</strong> ${book.ageRange[0]} - ${book.ageRange[1]} tahun</p>
                <p class="book-meta"><strong>Level:</strong> ${book.readingLevel}</p>
                <p class="book-meta"><strong>Penerbit:</strong> ${book.publisher}</p>
                <div class="book-rating">
                    ⭐ ${book.rating}/5
                </div>
                <p class="book-description">${book.description}</p>
                <div class="book-sinopsis">
                    <strong>Sinopsis:</strong> ${book.sinopsis}
                </div>
                <div class="book-links">
                    <strong>Beli di:</strong>
                    ${book.links.map(link => 
                        `<a href="${link.url}" target="_blank" class="store-link">${link.name}</a>`
                    ).join('')}
                </div>
                <div class="book-categories">
                    ${book.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function hideMainSections() {
    document.querySelector('.form-section').classList.add('hidden');
    document.querySelector('.all-books-section').classList.add('hidden');
    document.querySelector('.quick-recommendations').classList.add('hidden');
}

function showMainSections() {
    document.querySelector('.form-section').classList.remove('hidden');
    document.querySelector('.all-books-section').classList.remove('hidden');
    document.querySelector('.quick-recommendations').classList.remove('hidden');
}

// ========== AI THINKING FUNCTIONS (YANG SUDAH ADA) ==========
function showAIThinking(childName, age, interests) {
    const aiContainer = document.getElementById('aiThinking');
    const aiStatus = document.getElementById('aiStatus');
    const typingText = document.getElementById('typingText');
    
    aiContainer.classList.add('active');
    
    const messages = [
        `Halo! Saya AI Pembaca Buku 👋`,
        `Menganalisis data untuk ${childName}...`,
        `Usia: ${age} tahun - Memproses...`,
        `Minat: ${interests.join(', ')}...`,
        `Mencocokkan dengan database buku...`,
        `Mencari video rekomendasi...`,
        `Hampir selesai...`,
        `Menemukan rekomendasi terbaik! 🎉`
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let currentMessage = '';
    
    function typeWriter() {
        if (messageIndex < messages.length) {
            if (charIndex < messages[messageIndex].length) {
                currentMessage += messages[messageIndex].charAt(charIndex);
                typingText.textContent = currentMessage;
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    messageIndex++;
                    charIndex = 0;
                    currentMessage = '';
                    if (messageIndex < messages.length) {
                        typeWriter();
                    } else {
                        setTimeout(() => {
                            hideAIThinking();
                        }, 1000);
                    }
                }, 1000);
            }
        }
    }
    
    const statuses = [
        "Menganalisis profil anak...",
        "Memproses preferensi membaca...", 
        "Mencari di database...",
        "Menghitung kecocokan...",
        "Mencari video terkait...",
        "Menyusun rekomendasi..."
    ];
    
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
        aiStatus.textContent = statuses[statusIndex];
        statusIndex = (statusIndex + 1) % statuses.length;
    }, 800);
    
    aiContainer.statusInterval = statusInterval;
    typeWriter();
}

function hideAIThinking() {
    const aiContainer = document.getElementById('aiThinking');
    const typingText = document.getElementById('typingText');
    
    if (aiContainer.statusInterval) {
        clearInterval(aiContainer.statusInterval);
    }
    
    typingText.textContent = '';
    aiContainer.classList.remove('active');
}

// ========== DOM HANDLING (YANG SUDAH ADA) ==========
document.addEventListener('DOMContentLoaded', function() {
    displayAllBooks();
    
    // Quick recommendations dengan video
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const age = parseInt(this.dataset.age);
            
            showAIThinking('Anak', age, ['Rekomendasi Umum']);
            
            setTimeout(() => {
                const recommendations = expertSystem.getBooksByAge(age);
                const ageText = getAgeText(age);
                displayRecommendations(recommendations, `🎯 Rekomendasi AI untuk ${ageText}`, age);
            }, 6000);
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            let booksToShow;
            
            if (filter === 'all') {
                booksToShow = expertSystem.getAllBooks();
            } else {
                booksToShow = expertSystem.getBooksByAgeRange(filter);
            }
            
            displayAllBooks(booksToShow);
        });
    });

    // Form submission dengan video
    document.getElementById('childForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const childName = document.getElementById('childName').value;
        const age = parseInt(document.getElementById('age').value);
        const readingLevel = document.getElementById('readingLevel').value;
        const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
        const interests = Array.from(interestCheckboxes).map(cb => cb.value);
        
        showAIThinking(childName, age, interests);
        
        setTimeout(() => {
            const recommendations = expertSystem.getRecommendations(age, readingLevel, interests);
            const title = `🎯 Rekomendasi AI untuk ${childName} (${age} tahun)`;
            displayRecommendations(recommendations, title, age, interests);
        }, 6000);
    });

    document.getElementById('backButton').addEventListener('click', function() {
        showMainSections();
        document.getElementById('recommendationResult').classList.add('hidden');
    });
});