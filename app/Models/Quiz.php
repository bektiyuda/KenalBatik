<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $table = 'quizzes';
    protected $fillable = ['question', 'answer', 'optionA', 'optionB', 'optionC', 'optionD', 'difficulty', 'imageLink'];
}
