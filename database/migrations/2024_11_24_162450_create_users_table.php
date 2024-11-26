<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('experience')->default(0);
            $table->enum('tier', ['BatikPemula','BatikPenjelajah','BatikSatria','BatikJawara','BatikLegenda'])->default('BatikPemula');
            $table->boolean('isAdmin')->default(false);
            $table->string('forgotPasswordToken')->default('');
            $table->time('forgotPasswordTokenExpired')->default('00:00:00');
            $table->foreign('tier')->references('name')->on('tiers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
