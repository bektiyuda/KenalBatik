<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            ['name' => 'Aceh', 'islandId' => 2],                
            ['name' => 'Sumatera Utara', 'islandId' => 2],      
            ['name' => 'Sumatera Barat', 'islandId' => 2],      
            ['name' => 'Riau', 'islandId' => 2],                
            ['name' => 'Kepulauan Riau', 'islandId' => 2],      
            ['name' => 'Jambi', 'islandId' => 2],               
            ['name' => 'Sumatera Selatan', 'islandId' => 2],    
            ['name' => 'Bangka Belitung', 'islandId' => 2],     
            ['name' => 'Bengkulu', 'islandId' => 2],            
            ['name' => 'Lampung', 'islandId' => 2],             
            ['name' => 'DKI Jakarta', 'islandId' => 1],         
            ['name' => 'Jawa Barat', 'islandId' => 1],          
            ['name' => 'Banten', 'islandId' => 1],              
            ['name' => 'Jawa Tengah', 'islandId' => 1],         
            ['name' => 'DI Yogyakarta', 'islandId' => 1],       
            ['name' => 'Jawa Timur', 'islandId' => 1],          
            ['name' => 'Bali', 'islandId' => 9],                
            ['name' => 'Nusa Tenggara Barat', 'islandId' => 7], 
            ['name' => 'Nusa Tenggara Timur', 'islandId' => 8], 
            ['name' => 'Kalimantan Barat', 'islandId' => 3],    
            ['name' => 'Kalimantan Tengah', 'islandId' => 3],   
            ['name' => 'Kalimantan Selatan', 'islandId' => 3],  
            ['name' => 'Kalimantan Timur', 'islandId' => 3],    
            ['name' => 'Kalimantan Utara', 'islandId' => 3],    
            ['name' => 'Sulawesi Utara', 'islandId' => 4],      
            ['name' => 'Gorontalo', 'islandId' => 4],           
            ['name' => 'Sulawesi Tengah', 'islandId' => 4],     
            ['name' => 'Sulawesi Barat', 'islandId' => 4],      
            ['name' => 'Sulawesi Selatan', 'islandId' => 4],    
            ['name' => 'Sulawesi Tenggara', 'islandId' => 4],   
            ['name' => 'Maluku', 'islandId' => 6],              
            ['name' => 'Maluku Utara', 'islandId' => 6],        
            ['name' => 'Papua', 'islandId' => 5],               
            ['name' => 'Papua Barat', 'islandId' => 5],         
            ['name' => 'Papua Tengah', 'islandId' => 5],        
            ['name' => 'Papua Pegunungan', 'islandId' => 5],    
            ['name' => 'Papua Selatan', 'islandId' => 5],       
            ['name' => 'Papua Barat Daya', 'islandId' => 5],    
        ];


        Province::insert($provinces);
    }
}
