<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Batik</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            display: flex;
            height: 100vh;
        }

        /* Sidebar Styling */
        .sidebar {
            width: 250px;
            background-color: #343a40;
            color: #fff;
            padding: 20px 15px;
            border-right: 1px solid #ddd;
            display: flex;
            flex-direction: column;
            gap: 20px;
            height: 100%;
        }

        .sidebar .logo {
            font-family: 'Georgia', serif;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            text-transform: uppercase;
            margin-bottom: 30px;
            text-align: center;
        }

        .sidebar .nav-links {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .sidebar .nav-links a {
            text-decoration: none;
            font-size: 16px;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .sidebar .nav-links a:hover {
            background-color: #007bff;
            transform: translateX(5px);
        }

        .sidebar .nav-links a .icon {
            width: 20px;
            height: 20px;
            background-color: #007bff;
            border-radius: 50%;
        }

        /* Content Area Styling */
        .content {
            flex: 1;
            padding: 20px 40px;
            overflow-y: auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .search-bar {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .search-bar input {
            padding: 10px;
            font-size: 16px;
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .search-bar button {
            padding: 10px 20px;
            font-size: 14px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .search-bar button:hover {
            background-color: #0056b3;
        }

        .add-button {
            padding: 10px 20px;
            font-size: 14px;
            color: #fff;
            background-color: #28a745;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .add-button:hover {
            background-color: #218838;
        }

        /* Table Styling */
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

        /* Action Buttons Styling */
        .action-buttons {
            display: flex;
            gap: 10px;
        }

        .action-buttons a,
        .action-buttons button {
            padding: 5px 15px;
            font-size: 14px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            color: #fff;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .action-buttons a.edit {
            background-color: #17a2b8;
        }

        .action-buttons a.edit:hover {
            background-color: #138496;
            transform: scale(1.05);
        }

        .action-buttons button.delete {
            background-color: #dc3545;
        }

        .action-buttons button.delete:hover {
            background-color: #bd2130;
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="logo">Kenal Batik</div>
        <div class="nav-links">
            <a href="{{ route('batik.manage') }}">
                <div class="icon"></div> Batik
            </a>
            <a href="{{ route('quiz.manage') }}">
                <div class="icon"></div> Quiz
            </a>
            <a href="{{ url('/') }}">
                <div class="icon"></div> Homepage
            </a>
        </div>
    </div>

    <!-- Content -->
    <div class="content">
        <div class="header">
            <div class="search-bar">
                <form action="{{ route('batik.manage') }}" method="GET">
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder="Cari batik..." 
                        value="{{ request('search') }}"
                    >
                    <button type="submit">Cari</button>
                </form>
            </div>
            <a href="{{ route('batik.create') }}" class="add-button">Tambah Batik</a>
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama Batik</th>
                    <th>Kota</th>
                    <th>Provinsi</th>
                    <th>Pulau</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($batiks as $index => $batik)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $batik->name }}</td>
                        <td>{{ $batik->city }}</td>
                        <td>{{ $batik->province_name }}</td>
                        <td>{{ $batik->island_name }}</td>
                        <td>
                            <div class="action-buttons">
                                <a href="{{ route('batik.edit', $batik->id) }}" class="edit">Edit</a>
                                <form action="{{ route('batik.delete', $batik->id) }}" method="POST" style="display: inline;" onsubmit="return confirm('Apakah Anda yakin ingin menghapus batik ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="delete">Hapus</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
