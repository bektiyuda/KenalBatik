<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function getQuiz()
    {
        $tier = Auth::user()->tier;

        switch ($tier) {
            case 'BatikPemula':
                $quizzes = Quiz::where('difficulty', 'Easy')->inRandomOrder()->limit(5)->get();
                break;
            case 'BatikPenjelajah':
                $quizzes = Quiz::where('difficulty', 'Easy')->orWhere('difficulty', 'Medium')->inRandomOrder()->limit(5)->get();
                break;
            case 'BatikSatria':
                $quizzes = Quiz::where('difficulty', 'Medium')->inRandomOrder()->limit(5)->get();
                break;
            case 'BatikJawara':
                $quizzes = Quiz::where('difficulty', 'Medium')->orWhere('difficulty', 'Hard')->inRandomOrder()->limit(5)->get();
                break;
            case 'BatikLegenda':
                $quizzes = Quiz::where('difficulty', 'Hard')->inRandomOrder()->limit(5)->get();
                break;
        }

        return Inertia::render('quiz', [
            'quizzes' => $quizzes,
        ]);
    }
}
