<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Quiz</title>
    <style>
        .form-container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .form-header h1 {
            margin: 0;
        }
        .back-button {
            padding: 10px 20px;
            font-size: 14px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .form-group button {
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <div class="form-header">
            <h1>Tambah Quiz</h1>
            <a href="{{ route('quiz.manage') }}" class="back-button">Kembali ke Daftar Quiz</a>
        </div>

        <form action="{{ route('quiz.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="question">Pertanyaan</label>
                <textarea id="question" name="question" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="optionA">Opsi A</label>
                <input type="text" id="optionA" name="optionA" required>
            </div>
            <div class="form-group">
                <label for="optionB">Opsi B</label>
                <input type="text" id="optionB" name="optionB" required>
            </div>
            <div class="form-group">
                <label for="optionC">Opsi C</label>
                <input type="text" id="optionC" name="optionC" required>
            </div>
            <div class="form-group">
                <label for="optionD">Opsi D</label>
                <input type="text" id="optionD" name="optionD" required>
            </div>            
            <div class="form-group">
                <label for="answer">Jawaban Benar</label>
                <select id="answer" name="answer" required>
                    <option value="A">Opsi A</option>
                    <option value="B">Opsi B</option>
                    <option value="C">Opsi C</option>
                    <option value="D">Opsi D</option>
                </select>
            </div>
            <div class="form-group">
                <label for="difficulty">Tingkat Kesulitan</label>
                <select id="difficulty" name="difficulty" required>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit">Simpan</button>
            </div>
        </form>
    </div>
</body>
</html>
