<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\BatikController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Homepage');
});

Route::get('/healt-check', function() {
    return view('check');
});

Route::get('/prequiz', function () {
    return Inertia::render('PreQuiz');
});

Route::get('/overview/{id}', function ($id) {
    return Inertia::render('Overview', ['id' => $id]);
});

Route::get('/catalog', function (Request $request) {
    $pulau = $request->query('pulau');
    return Inertia::render('Catalog', ['pulau' => $pulau]);
});

Route::get('/cerita', function () {
    return Inertia::render('Cerita');
});

Route::get('/tentangkita', function () {
    return Inertia::render('TentangKita');
});
// PROVINCE
Route::get('/provinces', [ProvinceController::class, 'index'])->name('provinces.index');
Route::post('/provinces', [ProvinceController::class, 'store'])->name('provinces.store');
Route::put('/provinces/{id}', [ProvinceController::class, 'update'])->name('provinces.update');
Route::delete('/provinces/{id}', [ProvinceController::class, 'destroy'])->name('provinces.destroy');

// HOMEPAGE
Route::get('/homepage', [BatikController::class, 'index'])->name('homepage');

Route::get('/healt-check', function() {
    return view('check');
});
