<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Batik</title>
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
        <!-- Tombol kembali ke daftar batik -->
        <div class="form-header">
            <h1>Edit Batik</h1>
            <a href="{{ route('batik.manage') }}" class="back-button">Kembali ke Dashboard</a>
        </div>

        <!-- Form untuk mengedit batik -->
        <form action="{{ route('batik.update', $batik->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT') <!-- Gunakan method PUT untuk update -->

            <div class="form-group">
                <label for="name">Nama Batik</label>
                <input type="text" id="name" name="name" value="{{ $batik->name }}" required>
            </div>
            <div class="form-group">
                <label for="description">Deskripsi</label>
                <textarea id="description" name="description" rows="4" required>{{ $batik->description }}</textarea>
            </div>
            <div class="form-group">
                <label for="city">Kota</label>
                <input type="text" id="city" name="city" value="{{ $batik->city }}" required>
            </div>
            <div class="form-group">
                <label for="tag">Tag</label>
                <input type="text" id="tag" name="tag" value="{{ $batik->tag }}">
            </div>
            <div class="form-group">
                <label for="provinceId">Provinsi</label>
                <select id="provinceId" name="provinceId" required>
                    <option value="">Pilih Provinsi</option>
                    @foreach ($provinces as $province)
                        <option value="{{ $province->id }}" {{ $batik->provinceId == $province->id ? 'selected' : '' }}>
                            {{ $province->name }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="islandId">Pulau</label>
                <select id="islandId" name="islandId" required>
                    <option value="">Pilih Pulau</option>
                    @foreach ($islands as $island)
                        <option value="{{ $island->id }}" {{ $batik->islandId == $island->id ? 'selected' : '' }}>
                            {{ $island->name }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="image">Gambar (opsional)</label>
                <input type="file" id="image" name="image" accept="image/*">
                <p>Gambar saat ini: <a href="{{ $batik->linkImage }}" target="_blank">Lihat Gambar</a></p>
            </div>
            <div class="form-group">
                <button type="submit">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</body>
</html>
