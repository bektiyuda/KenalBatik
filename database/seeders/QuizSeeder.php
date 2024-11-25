<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quiezzes = [
            // Easy questions
            ['question' => "Dari mana asal motif Batik Parang?", 'answer' => "A", 'optionA' => "Jawa Tengah", 'optionB' => "Bali", 'optionC' => "Sumatra", 'optionD' => "Kalimantan", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Warna apa yang paling umum ditemukan dalam Batik tradisional?", 'answer' => "B", 'optionA' => "Hijau", 'optionB' => "Cokelat", 'optionC' => "Ungu", 'optionD' => "Merah Muda", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Hewan apa yang sering digambarkan dalam Batik Megamendung?", 'answer' => "D", 'optionA' => "Singa", 'optionB' => "Harimau", 'optionC' => "Rusa", 'optionD' => "Awan", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Alat apa yang digunakan untuk menerapkan lilin dalam proses Batik?", 'answer' => "A", 'optionA' => "Canting", 'optionB' => "Alat Tenun", 'optionC' => "Kuasa", 'optionD' => "Gunting", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Batik Tulis adalah jenis Batik yang dibuat dengan?", 'answer' => "B", 'optionA' => "Mencap", 'optionB' => "Menggambar dengan tangan", 'optionC' => "Mesin", 'optionD' => "Menenun", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Motif Batik apa yang biasa dikenakan oleh keluarga kerajaan Indonesia?", 'answer' => "C", 'optionA' => "Kawung", 'optionB' => "Lasem", 'optionC' => "Parang", 'optionD' => "Sekar Jagad", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Motif Batik dengan bentuk geometris sering disebut?", 'answer' => "D", 'optionA' => "Floral", 'optionB' => "Burung", 'optionC' => "Awan", 'optionD' => "Kawung", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Pulau mana yang menjadi asal Batik Lasem?", 'answer' => "A", 'optionA' => "Jawa", 'optionB' => "Sumatra", 'optionC' => "Kalimantan", 'optionD' => "Sulawesi", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Warna berikut yang BUKAN merupakan warna tradisional Batik adalah?", 'answer' => "C", 'optionA' => "Indigo", 'optionB' => "Sogan", 'optionC' => "Hijau Neon", 'optionD' => "Merah", 'difficulty' => "easy", 'imageLink' => ""],
            ['question' => "Batik diakui oleh UNESCO sebagai warisan?", 'answer' => "B", 'optionA' => "Lukisan Tradisional", 'optionB' => "Warisan Budaya Takbenda", 'optionC' => "Sastra", 'optionD' => "Arsitektur", 'difficulty' => "easy", 'imageLink' => ""],

            // Medium questions
            ['question' => "Motif Batik apa yang melambangkan kesuburan dan pertumbuhan, sering menggambarkan bunga dan tanaman?", 'answer' => "A", 'optionA' => "Sekar Jagad", 'optionB' => "Parang", 'optionC' => "Kawung", 'optionD' => "Lasem", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Apa perbedaan utama antara Batik Tulis dan Batik Cap?", 'answer' => "B", 'optionA' => "Batik Tulis menggunakan lilin, sedangkan Batik Cap menggunakan pewarna", 'optionB' => "Batik Tulis digambar dengan tangan, sedangkan Batik Cap dicap", 'optionC' => "Batik Tulis menggunakan kuas, sedangkan Batik Cap menggunakan alat canting", 'optionD' => "Tidak ada perbedaan", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Motif Batik 'Garuda' terinspirasi oleh tokoh mitologi apa?", 'answer' => "C", 'optionA' => "Harimau", 'optionB' => "Elang", 'optionC' => "Garuda", 'optionD' => "Naga", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Daerah mana yang terkenal dengan Batik yang menggunakan warna-warna cerah dan non-tradisional?", 'answer' => "D", 'optionA' => "Jawa Tengah", 'optionB' => "Bali", 'optionC' => "Sumatra Barat", 'optionD' => "Pekalongan", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Teknik Batik apa yang melibatkan pewarnaan kain beberapa kali untuk mendapatkan warna berbeda?", 'answer' => "A", 'optionA' => "Pewarnaan Resist", 'optionB' => "Mencap", 'optionC' => "Batik Tenun", 'optionD' => "Sablon", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Motif Batik apa yang dilarang dikenakan oleh rakyat jelata pada zaman dahulu?", 'answer' => "B", 'optionA' => "Batik Pekalongan", 'optionB' => "Batik Larangan", 'optionC' => "Batik Pesisir", 'optionD' => "Batik Palembang", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Simbolisme apa yang ada di balik motif Batik Ceplok?", 'answer' => "C", 'optionA' => "Kekuasaan dan Keagungan", 'optionB' => "Harmoni dan Keseimbangan", 'optionC' => "Keteraturan dan Struktur", 'optionD' => "Kekayaan dan Kemakmuran", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Di daerah mana warna cokelat 'Sogan' sering digunakan dalam Batik?", 'answer' => "D", 'optionA' => "Bali", 'optionB' => "Sumatra", 'optionC' => "Pekalongan", 'optionD' => "Yogyakarta", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Motif Batik yang menggambarkan lautan dan ombak dikenal sebagai?", 'answer' => "A", 'optionA' => "Megamendung", 'optionB' => "Parang", 'optionC' => "Garuda", 'optionD' => "Cendrawasih", 'difficulty' => "medium", 'imageLink' => ""],
            ['question' => "Motif Batik 'Kawung' diyakini melambangkan apa?", 'answer' => "B", 'optionA' => "Perlindungan", 'optionB' => "Kemurnian dan Keadilan", 'optionC' => "Kekuatan", 'optionD' => "Kekayaan", 'difficulty' => "medium", 'imageLink' => ""],

            // Hard questions
            ['question' => "Apa yang dilambangkan motif Batik 'Sawunggaling' yang menggambarkan ayam jantan?", 'answer' => "D", 'optionA' => "Kemenangan", 'optionB' => "Keagungan", 'optionC' => "Cinta", 'optionD' => "Kekuatan dan Keberanian", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Teknik Batik apa yang menggunakan cap tembaga yang dikombinasikan dengan elemen gambar tangan?", 'answer' => "A", 'optionA' => "Batik Kombinasi", 'optionB' => "Batik Tulis", 'optionC' => "Batik Cap", 'optionD' => "Batik Printing", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Motif Batik 'Ceplok' sering dikaitkan dengan konsep kosmologi apa dalam budaya Jawa?", 'answer' => "C", 'optionA' => "Keseimbangan hidup", 'optionB' => "Siklus reinkarnasi", 'optionC' => "Alam semesta dan keabadian", 'optionD' => "Perjalanan jiwa", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Batik Lasem unik karena menggunakan warna apa yang jarang ditemukan dalam tradisi Batik lainnya?", 'answer' => "B", 'optionA' => "Cokelat Sogan", 'optionB' => "Merah Tua", 'optionC' => "Biru Indigo", 'optionD' => "Kuning Pucat", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Motif 'Parang Rusak' dulu dilarang dikenakan oleh siapa?", 'answer' => "C", 'optionA' => "Kaum Bangsawan", 'optionB' => "Para Pendeta", 'optionC' => "Rakyat Jelata", 'optionD' => "Para Pedagang", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Peristiwa sejarah apa yang menyebabkan perkembangan besar dalam pola Batik, terutama di daerah pesisir seperti Cirebon dan Lasem?", 'answer' => "A", 'optionA' => "Penjajahan Belanda", 'optionB' => "Munculnya Kerajaan Mataram", 'optionC' => "Migrasi Tiongkok", 'optionD' => "Masuknya Islam", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Batik Madura dikenal dengan pola dan warna-warna berani. Faktor lingkungan apa yang mempengaruhi ciri khas ini?", 'answer' => "D", 'optionA' => "Komposisi tanah", 'optionB' => "Dekat dengan laut", 'optionC' => "Daerah pegunungan", 'optionD' => "Iklim kering dan gersang", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Motif Batik mana yang diyakini memiliki kekuatan magis untuk melindungi pemakainya?", 'answer' => "C", 'optionA' => "Batik Lasem", 'optionB' => "Batik Garuda", 'optionC' => "Batik Parang", 'optionD' => "Batik Kawung", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Motif Batik mana yang menjadi simbol perlawanan melawan penjajahan kolonial di Indonesia?", 'answer' => "B", 'optionA' => "Batik Megamendung", 'optionB' => "Batik Parang", 'optionC' => "Batik Kawung", 'optionD' => "Batik Lasem", 'difficulty' => "hard", 'imageLink' => ""],
            ['question' => "Motif apa yang banyak digunakan dalam Batik Keraton dan sering mengandung makna filosofis yang dalam?", 'answer' => "A", 'optionA' => "Batik Parang", 'optionB' => "Batik Sekar Jagad", 'optionC' => "Batik Megamendung", 'optionD' => "Batik Garuda", 'difficulty' => "hard", 'imageLink' => ""],
        ];

        Quiz::insert($quiezzes);
    }
}
