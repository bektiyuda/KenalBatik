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
        Schema::create('batiks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('city');
            $table->string('tag')->nullable();
            $table->foreignId('provinceId');
            $table->foreignId('islandId');
            $table->string('linkImage');
            $table->foreign('provinceId')->references('id')->on('provinces');
            $table->foreign('islandId')->references('id')->on('islands');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batiks');
    }
};
