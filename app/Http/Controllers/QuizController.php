<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\User;
use App\Models\UserAnswer;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function getQuiz()
{
    $tier = Auth::user()->tier;

    // Ambil data berdasarkan tier pengguna
    switch ($tier) {
        case 'BatikPemula':
            $quizzes = Quiz::where('difficulty', 'easy')->inRandomOrder()->limit(5)->get();
            break;
        case 'BatikPenjelajah':
            $quizzes = Quiz::whereIn('difficulty', ['easy', 'medium'])->inRandomOrder()->limit(5)->get();
            break;
        case 'BatikSatria':
            $quizzes = Quiz::where('difficulty', 'medium')->inRandomOrder()->limit(5)->get();
            break;
        case 'BatikJawara':
            $quizzes = Quiz::whereIn('difficulty', ['medium', 'hard'])->inRandomOrder()->limit(5)->get();
            break;
        case 'BatikLegenda':
            $quizzes = Quiz::where('difficulty', 'hard')->inRandomOrder()->limit(5)->get();
            break;
        default:
            $quizzes = [];
    }

    // Kembalikan data ke Inertia
    return Inertia::render('Kuis', [
        'quizzes' => $quizzes ?? [],
    ]);
}


    public function checkAnswer(Request $request)
    {
        $quizId = $request->QuizID;
        $answer = $request->UserAnswer;

        $user = User::find(Auth::user()->id);

        $correctAnswer = 0;

        for ($i = 0; $i < count($quizId); $i++) {
            $quiz = Quiz::find($quizId[$i]);
            if ($quiz->answer == $answer[$i]) {
                $correctAnswer++;

                if($user->experience < 100) {
                switch ($quiz->difficulty) {
                    case 'Easy':
                        $user->experience += 3;
                        break;
                    case 'Medium':
                        $user->experience += 5;
                        break;
                    case 'Hard':
                        $user->experience += 7;
                        if($user->experience > 100) {
                            $user->experience = 100;
                        }
                        break;
                        }
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

        for ($i = 0; $i < count($userProfile); $i++) {
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

        $uji = "NGETES AJA";

        return response()->json($response);
    }

    public function createDashboard()
    {
        return view('create-quiz');
    }

    public function create(Request $request, SupabaseService $supabaseService)
    {
        $validatedData = $request->validate([
            'question' => 'required|string',
            'optionA' => 'required|string',
            'optionB' => 'required|string',
            'optionC' => 'required|string',
            'optionD' => 'required|string',
            'answer' => 'required|string',
            'difficulty' => 'required|in:Easy,Medium,Hard',
            'image' => 'file|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->getPathname();
            $imageName = $request->file('image')->getClientOriginalName();
            $imageUrl = $supabaseService->uploadFile($imagePath, $imageName);
        } else {
            $imageUrl = null;
        }

        Quiz::create([
            'question' => $validatedData['question'],
            'optionA' => $validatedData['optionA'],
            'optionB' => $validatedData['optionB'],
            'optionC' => $validatedData['optionC'],
            'optionD' => $validatedData['optionD'],
            'answer' => $validatedData['answer'],
            'difficulty' => $validatedData['difficulty'],
            'imageLink' => $imageUrl,
        ]);

        return redirect()->route('quiz.manage');
    }

    public function delete($id)
    {
        $quiz = Quiz::find($id);
        $quiz->delete();

        return redirect()->route('quiz.manage')->with('success', 'Quiz deleted successfully!');
    }

    public function edit($id)
    {
        $quiz = Quiz::findOrFail($id);
        return view('edit-quiz', ['quiz' => $quiz]);
    }

    public function update(Request $request, SupabaseService $supabaseService, $id)
    {
        $validatedData = $request->validate([
            'question' => 'required|string',
            'optionA' => 'required|string',
            'optionB' => 'required|string',
            'optionC' => 'required|string',
            'optionD' => 'required|string',
            'answer' => 'required|string',
            'difficulty' => 'required|in:Easy,Medium,Hard',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ]);

        $quiz = Quiz::findOrFail($id);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->getPathname();
            $imageName = $request->file('image')->getClientOriginalName();
            $imageUrl = $supabaseService->uploadFile($imagePath, $imageName);

            $quiz->imageLink = $imageUrl;
        }

        $quiz->question = $validatedData['question'];
        $quiz->optionA = $validatedData['optionA'];
        $quiz->optionB = $validatedData['optionB'];
        $quiz->optionC = $validatedData['optionC'];
        $quiz->optionD = $validatedData['optionD'];
        $quiz->answer = $validatedData['answer'];
        $quiz->difficulty = $validatedData['difficulty'];
        $quiz->save();

        return redirect()->route('quiz.manage');
    }

    public function index()
    {
        $quizzes = Quiz::all();

        return view('manage-quiz', ['quizzes' => $quizzes]);
    }
}
