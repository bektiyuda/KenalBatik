<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinceController;

Route::get('/', function () {
    return view('welcome');
});

// PROVINCE
// Route untuk menampilkan semua data dan form create
Route::get('/provinces', [ProvinceController::class, 'index'])->name('provinces.index');
// Route untuk menyimpan data baru
Route::post('/provinces', [ProvinceController::class, 'store'])->name('provinces.store');
// Route untuk mengupdate data
Route::put('/provinces/{id}', [ProvinceController::class, 'update'])->name('provinces.update');
// Route untuk menghapus data
Route::delete('/provinces/{id}', [ProvinceController::class, 'destroy'])->name('provinces.destroy');
