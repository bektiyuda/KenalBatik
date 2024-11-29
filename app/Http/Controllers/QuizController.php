<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\User;
use App\Models\UserAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        return Inertia::render('Quiz', ['quizzes' => $quizzes]);
    }

    public function checkAnswer(Request $request)
    {
        $quizId = $request->QuizID;
        $answer = $request->UserAnswer;

        $user = User::find(Auth::user()->id);

        $correctAnswer = 0;

        for($i = 0; $i < count($quizId); $i++) {
            $quiz = Quiz::find($quizId[$i]);
            if($quiz->answer == $answer[$i]) {
                $correctAnswer++;
                switch ($quiz->difficulty) {
                    case 'Easy':
                        $user->experience += 3;
                        break;
                    case 'Medium':
                        $user->experience += 5;
                        break;
                    case 'Hard':
                        $user->experience += 7;
                        break;
                }
            }
        }

        UserAnswer::create([
            'userId' => $user->id,
            'quizId' => json_encode($quizId),
            'userAnswer' => json_encode($answer),
            'totalCorrectAnswer' => $correctAnswer
        ]);

        if ($user->experience >= 100) {
            $user->tier = 'BatikLegenda';
        } elseif ($user->experience >= 75) {
            $user->tier = 'BatikJawara';
        } elseif ($user->experience >= 50) {
            $user->tier = 'BatikSatria';
        } elseif ($user->experience >= 25) {
            $user->tier = 'BatikPenjelajah';
        } else {
            $user->tier = 'BatikPemula';
        }

        $user->save();

        $userProfile = DB::table('users')
        ->leftJoin('tiers', 'users.tier', '=', 'tiers.name')
        ->leftJoin('user_answers', 'users.id', '=', 'user_answers.userId')
        ->select(
            'users.id as user_id',
            'users.username',
            'users.email',
            'users.experience',
            'users.tier as user_tier',
            'tiers.imageLink as tier_image_link',
            'user_answers.quizId',
            'user_answers.userAnswer',
            'user_answers.totalCorrectAnswer',
            'user_answers.created_at as answer_created_at'
        )
        ->where('users.id', $user->id)
        ->get();


        switch ($user->tier) {
            case 'BatikPemula':
                $expToNextTier = 25;
                break;
            case 'BatikPenjelajah':
                $expToNextTier = 50;
                break;
            case 'BatikSatria':
                $expToNextTier = 75;
                break;
            case 'BatikJawara':
                $expToNextTier = 100;
                break;
            case 'BatikLegenda':
                $expToNextTier = 100;
                break;
        }

        $totalCorrectAnswer = 0;

        for($i = 0; $i < count($userProfile); $i++) {
            $totalCorrectAnswer += $userProfile[$i]->totalCorrectAnswer;
        }

        $response = [
            'username' => $userProfile[0]->username,
            'user_experience' => $userProfile[0]->experience,
            'user_tier' => $userProfile[0]->user_tier,
            'tier_photo_link' => $userProfile[0]->tier_image_link,
            'exp_to_next_tier' => $expToNextTier,
            'current_correct_answer' => $correctAnswer,
            'total_quiz' => count($userProfile) * 5,
            'total_correct_answer' => $totalCorrectAnswer,
        ];

        return Inertia::render('Result', ['response' => $response]);
    }
}
