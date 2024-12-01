<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Batik</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f8f6;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .search-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .search-bar input {
            padding: 10px;
            font-size: 16px;
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .add-button {
            padding: 10px 20px;
            background-color: #ff6961;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            transition: background-color 0.3s ease;
        }
        .add-button:hover {
            background-color: #ff5a52;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 15px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        img {
            max-width: 80px;
            max-height: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="search-bar">
            <!-- Form pencarian -->
            <form action="{{ route('batik.manage') }}" method="GET" style="display: flex; gap: 10px;">
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Cari batik..." 
                    value="{{ request('search') }}"
                    style="padding: 10px; font-size: 16px; width: 300px; border: 1px solid #ccc; border-radius: 4px;"
                >
                <button 
                    type="submit" 
                    style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;"
                >
                    Cari
                </button>
            </form>
        
            <!-- Tombol tambah entri -->
            <a href="{{ route('batik.create') }}" class="add-button">Tambah Entri</a>
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama Batik</th>
                    <th>Deskripsi</th>
                    <th>Kota</th>
                    <th>Provinsi ID</th>
                    <th>Island ID</th>
                    <th>Gambar</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($batiks as $batik)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td><strong>{{ $batik->name }}</strong></td>
                        <td>{{ Str::limit($batik->description, 50) }}</td>
                        <td>{{ $batik->city }}</td>
                        <td>{{ $batik->provinceId }}</td>
                        <td>{{ $batik->islandId }}</td>
                        <td>
                            <img src="{{ $batik->linkImage }}" alt="{{ $batik->name }}">
                        </td>
                        <td>
                            <a href="{{ route('batik.edit', $batik->id) }}" class="btn btn-link">Edit</a>
                            <form action="{{ route('batik.delete', $batik->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus batik ini?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-link text-danger">Hapus</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
