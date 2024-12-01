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
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px;
            background-color: #f4f4f9; /* Warna background */
            border-bottom: 1px solid #ddd;
        }
        .navbar .logo {
            font-family: 'Georgia', serif;
            font-size: 24px;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
        }
        .navbar .nav-links {
            display: flex;
            gap: 20px;
        }
        .navbar .nav-links a {
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
            color: #000;
            transition: color 0.3s ease;
        }
        .navbar .nav-links a:hover {
            color: #007bff;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 40px; /* Memberi jarak dari tepi layar */
        }
        .filter-container {
            flex: 1;
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
            width: calc(100% - 80px); /* Memberi jarak pada tabel dari tepi layar */
            margin: 0 auto; /* Tengah */
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
    <div class="navbar">
        <div class="logo">Kenal Batik</div>
        <div class="nav-links">
            <a href="{{ route('batik.manage') }}">Batik</a>
            <a href="{{ route('quiz.manage') }}">Quiz</a>
            <a href="{{ url('/') }}">Homepage</a>
        </div>
    </div>

    <div class="header">
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

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Pertanyaan</th>
                <th>Tingkat Kesulitan</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody id="quizTableBody">
            @foreach ($quizzes as $index => $quiz)
                <tr class="quiz-row" data-difficulty="{{ $quiz->difficulty }}">
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $quiz->question }}</td>
                    <td>{{ $quiz->difficulty }}</td>
                    <td>
                        <a href="{{ route('quiz.edit', $quiz->id) }}">Edit</a> |
                        <form action="{{ route('quiz.delete', $quiz->id) }}" method="POST" style="display: inline-block;" onsubmit="return confirm('Apakah Anda yakin ingin menghapus quiz ini?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" style="border: none; background: none; color: red; cursor: pointer;">Hapus</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <script>
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
