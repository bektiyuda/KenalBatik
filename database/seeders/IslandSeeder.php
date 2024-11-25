<?php

namespace Database\Seeders;

use App\Models\Island;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IslandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $islands = [
            ['name' => 'Jawa'],
            ['name' => 'Sumatra'],
            ['name' => 'Kalimantan'],
            ['name' => 'Sulawesi'],
            ['name' => 'Papua'],
            ['name' => 'Maluku'],
            ['name' => 'Nusa Tenggara Barat'],
            ['name' => 'Nusa Tenggara Timur'],
            ['name' => 'Bali'],
        ];

        Island::insert($islands);
    }
}
