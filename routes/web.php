<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinceController;

Route::get('/', function () {
    return inertia('Homepage');
});

// PROVINCE
Route::get('/provinces', [ProvinceController::class, 'index'])->name('provinces.index');
Route::post('/provinces', [ProvinceController::class, 'store'])->name('provinces.store');
Route::put('/provinces/{id}', [ProvinceController::class, 'update'])->name('provinces.update');
Route::delete('/provinces/{id}', [ProvinceController::class, 'destroy'])->name('provinces.destroy');

Route::get('/healt-check', function() {
    return view('check');
});
