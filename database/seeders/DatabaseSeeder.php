<?php

namespace Database\Seeders;

use App\Models\Batik;
use App\Models\Quiz;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            IslandSeeder::class,
            ProvinceSeeder::class,
            TierSeeder::class,
            QuizSeeder::class,
            BatikSeeder::class,
        ]);
    }
}
