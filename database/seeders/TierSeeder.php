<?php

namespace Database\Seeders;

use App\Models\Tier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiers = [
            [
                'name' => 'BatikPemula',
                'imageLink' => 'https://jjittozptnoaoseyrvcz.supabase.co/storage/v1/object/public/hology/Tier/BATIK%20PEMULA.svg?t=2024-10-15T15%3A41%3A04.408Z',
            ],
            [
                'name' => 'BatikPenjelajah',
                'imageLink' => 'https://jjittozptnoaoseyrvcz.supabase.co/storage/v1/object/public/hology/Tier/BATIK%20PENJELAJAH.svg?t=2024-10-15T15%3A41%3A14.083Z',
            ],
            [
                'name' => 'BatikSatria',
                'imageLink' => 'https://jjittozptnoaoseyrvcz.supabase.co/storage/v1/object/public/hology/Tier/BATIK%20SATRIA.svg?t=2024-10-15T15%3A41%3A21.448Z',
            ],
            [
                'name' => 'BatikJawara',
                'imageLink' => 'https://jjittozptnoaoseyrvcz.supabase.co/storage/v1/object/public/hology/Tier/BATIK%20JAWARA.svg?t=2024-10-15T15%3A41%3A36.069Z',
            ],
            [
                'name' => 'BatikLegenda',
                'imageLink' => 'https://jjittozptnoaoseyrvcz.supabase.co/storage/v1/object/public/hology/Tier/BATIK%20LEGENDA.svg',
            ],
        ];

        Tier::insert($tiers);
    }
}
