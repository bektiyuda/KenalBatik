<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Quiz</title>
</head>

<body>
    <h1>Daftar Quiz</h1>

    <!-- Flash Message -->
    @if (session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <!-- Form untuk membuat data quiz baru -->
    <h2>Tambah Quiz Baru</h2>
    <form action="{{ route('quiz.create') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div>
            <label for="question">Pertanyaan:</label>
            <input type="text" id="question" name="question" required>
        </div>
        <div>
            <label for="optionA">Pilihan A:</label>
            <input type="text" id="optionA" name="optionA" required>
        </div>
        <div>
            <label for="optionB">Pilihan B:</label>
            <input type="text" id="optionB" name="optionB" required>
        </div>
        <div>
            <label for="optionC">Pilihan C:</label>
            <input type="text" id="optionC" name="optionC" required>
        </div>
        <div>
            <label for="optionD">Pilihan D:</label>
            <input type="text" id="optionD" name="optionD" required>
        </div>
        <div>
            <label for="answer">Jawaban:</label>
            <input type="text" id="answer" name="answer" required>
        </div>
        <div>
            <label for="difficulty">Kesulitan:</label>
            <select id="difficulty" name="difficulty" required>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
        <div>
            <label for="image">Gambar:</label>
            <input type="file" id="image" name="image" accept="image/*" required>
        </div>
        <button type="submit">Tambah Quiz</button>
    </form>

    <hr>

    <!-- Daftar Quiz -->
    <h2>Daftar Quiz</h2>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Pertanyaan</th>
                <th>Pilihan A</th>
                <th>Pilihan B</th>
                <th>Pilihan C</th>
                <th>Pilihan D</th>
                <th>Jawaban</th>
                <th>Kesulitan</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($quizzes as $quiz)
            <tr>
                <td>{{ $quiz->id }}</td>
                <td>{{ $quiz->question }}</td>
                <td>{{ $quiz->optionA }}</td>
                <td>{{ $quiz->optionB }}</td>
                <td>{{ $quiz->optionC }}</td>
                <td>{{ $quiz->optionD }}</td>
                <td>{{ $quiz->answer }}</td>
                <td>{{ $quiz->difficulty }}</td>
                <td>
                    <!-- Form untuk update data quiz -->
                    <form action="{{ route('quiz.update', $quiz->id) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('POST')
                        <input type="text" name="question" value="{{ $quiz->question }}" required>
                        <input type="text" name="optionA" value="{{ $quiz->optionA }}" required>
                        <input type="text" name="optionB" value="{{ $quiz->optionB }}" required>
                        <input type="text" name="optionC" value="{{ $quiz->optionC }}" required>
                        <input type="text" name="optionD" value="{{ $quiz->optionD }}" required>
                        <input type="text" name="answer" value="{{ $quiz->answer }}" required>
                        <select name="difficulty" required>
                            <option value="Easy" {{ $quiz->difficulty === 'Easy' ? 'selected' : '' }}>Easy</option>
                            <option value="Medium" {{ $quiz->difficulty === 'Medium' ? 'selected' : '' }}>Medium</option>
                            <option value="Hard" {{ $quiz->difficulty === 'Hard' ? 'selected' : '' }}>Hard</option>
                        </select>
                        <button type="submit">Update</button>
                    </form>

                    <!-- Form untuk delete data quiz -->
                    <form action="{{ route('quiz.delete', $quiz->id) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Yakin ingin menghapus data ini?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
