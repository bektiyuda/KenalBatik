<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\BatikController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthenticationAdmin;
use App\Http\Middleware\AuthenticationUser;
use Illuminate\Routing\Controllers\Middleware;

Route::get('/', function () {
    return inertia('Homepage');
});

// PROVINCE
Route::get('/provinces', [ProvinceController::class, 'index'])->name('provinces.index');
Route::post('/provinces', [ProvinceController::class, 'store'])->name('provinces.store');
Route::put('/provinces/{id}', [ProvinceController::class, 'update'])->name('provinces.update');
Route::delete('/provinces/{id}', [ProvinceController::class, 'destroy'])->name('provinces.destroy');

// HOMEPAGE
Route::get('/homepage', [BatikController::class, 'index'])->name('homepage');

//Katalog
Route::get('/catalog', [BatikController::class, 'catalog'])->name('catalog');

//Overview
Route::get('/batik/{id}', [BatikController::class, 'overview'])->name('overview');

//Register
Route::get('/register', [UserController::class, 'registerForm'])->name('register.form');
Route::post('/register', [UserController::class, 'register'])->name('register');

//Login
Route::post('/login', [UserController::class, 'authenticate'])->name('login');
Route::get('login', function() {
    return view('login');
})->name('login');

//Quiz
Route::get('/quiz', [QuizController::class, 'getQuiz'])->middleware(AuthenticationUser::class)->name('quiz');

Route::get('/healt-check', function() {
    return view('check');
});
