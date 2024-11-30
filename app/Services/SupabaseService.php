<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SupabaseService
{
    protected $url;
    protected $apiKey;
    protected $bucket;

    public function __construct()
    {
        $this->url = env('SUPABASE_URL');
        $this->apiKey = env('SUPABASE_API_KEY');
        $this->bucket = env('SUPABASE_BUCKET');
    }

    public function uploadFile($filePath, $fileName)
    {
        $timestamp = time();
        $extension = pathinfo($fileName, PATHINFO_EXTENSION);
        $baseName = pathinfo($fileName, PATHINFO_FILENAME);
        $uniqueFileName = $baseName . '_' . $timestamp . '.' . $extension;
        
        $response = Http::withHeaders([
            'apikey' => $this->apiKey,
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->attach('file', file_get_contents($filePath), $uniqueFileName)
            ->post("{$this->url}/storage/v1/object/{$this->bucket}/{$uniqueFileName}");

        if ($response->failed()) {
            Log::error("Failed to upload file to Supabase", [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new \Exception("Failed to upload file to Supabase.");
        }

        return "{$this->url}/storage/v1/object/public/{$this->bucket}/{$uniqueFileName}";
    }
}
