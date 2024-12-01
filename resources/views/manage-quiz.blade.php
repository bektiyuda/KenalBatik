<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Quiz</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .filter-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .filter-container select {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
        }
        .add-button {
            padding: 10px 20px;
            font-size: 14px;
            color: #fff;
            background-color: #e74c3c;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <!-- Header dengan filter dan tombol tambah -->
    <div class="header">
        <h1>Kelola Quiz</h1>
        <div class="filter-container">
            <label for="filterDifficulty">Filter by Difficulty:</label>
            <select id="filterDifficulty" name="filterDifficulty" onchange="filterQuizzes(this.value)">
                <option value="">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
        <a href="{{ route('quiz.create') }}" class="add-button">Tambah Quiz</a>
    </div>

    <!-- Tabel Quiz -->
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Pertanyaan</th>
                <th>Opsi A</th>
                <th>Opsi B</th>
                <th>Opsi C</th>
                <th>Opsi D</th>
                <th>Jawaban</th>
                <th>Tingkat Kesulitan</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody id="quizTableBody">
            @foreach ($quizzes as $index => $quiz)
                <tr class="quiz-row" data-difficulty="{{ $quiz->difficulty }}">
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $quiz->question }}</td>
                    <td>{{ $quiz->option_a }}</td>
                    <td>{{ $quiz->option_b }}</td>
                    <td>{{ $quiz->option_c }}</td>
                    <td>{{ $quiz->option_d }}</td>
                    <td>{{ $quiz->answer }}</td>
                    <td>{{ $quiz->difficulty }}</td>
                    <td>
                        <a href="{{ route('quiz.edit', $quiz->id) }}">Edit</a> |
                        <a href="{{ route('quiz.delete', $quiz->id) }}" onclick="return confirm('Apakah Anda yakin ingin menghapus quiz ini?')">Hapus</a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <script>
        // Filter quiz berdasarkan tingkat kesulitan
        function filterQuizzes(difficulty) {
            const rows = document.querySelectorAll('.quiz-row');
            rows.forEach(row => {
                if (difficulty === '' || row.dataset.difficulty === difficulty) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    </script>
</body>
</html>
