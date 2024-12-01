<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f4f4f9;
        }
        .container {
            width: 100%;
            max-width: 600px;
            text-align: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
        }
        .button-container {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        .button {
            padding: 15px 25px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Dashboard</h1>
        <p>Selamat datang di halaman admin. Pilih menu di bawah untuk mengelola data Batik atau Kuis.</p>
        
        <div class="button-container">
            <!-- CRUD Batik -->
            <a href="{{ route('batik.manage') }}" class="button">Kelola Batik</a>
            <!-- CRUD Quiz -->
            <a href="{{ route('quiz.index') }}" class="button">Kelola Quiz</a>
        </div>
    </div>
</body>
</html>
