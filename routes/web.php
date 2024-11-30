<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\BatikController;
use Illuminate\Http\Request;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthenticationAdmin;
use App\Http\Middleware\AuthenticationUser;
use Illuminate\Routing\Controllers\Middleware;

Route::get('/', function () {
    return Inertia::render('Homepage');
});

Route::get('/healt-check', function() {
    return view('check');
});

Route::get('/prequiz', function () {
    return Inertia::render('PreQuiz');
});

// Route::get('/overview/{id}', function ($id) {
//     return Inertia::render('Overview', ['id' => $id]);
// });

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
Route::post('/check-answer', [QuizController::class, 'checkAnswer'])->name('checkanswer');
//Crud Quiz
Route::get('/adminQuiz', [QuizController::class, 'index'])->name('adminQuiz');
Route::post('/quiz/create', [QuizController::class, 'create'])->name('quiz.create');
Route::post('/quiz/update/{id}', [QuizController::class, 'update'])->name('quiz.update');
Route::delete('/quiz/delete/{id}', [QuizController::class, 'delete'])->name('quiz.delete');

//Profile
Route::get('/profile', [UserController::class, 'profile'])->middleware(AuthenticationUser::class)->name('profile');

//Batik
Route::post('/create', [BatikController::class, 'create'])->middleware(AuthenticationAdmin::class)->name('batik.create');
Route::delete('/delete/{id}', [BatikController::class, 'delete'])->middleware(AuthenticationAdmin::class)->name('batik.delete');
Route::put('/update/{id}', [BatikController::class, 'update'])->middleware(AuthenticationAdmin::class)->name('batik.update');

Route::get('/healt-check', function() {
    return view('check');
});
