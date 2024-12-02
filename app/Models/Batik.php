<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Batik extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'islandId',
        'city',
        'tag',
        'provinceId',
        'linkImage',
    ];
}
