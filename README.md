# Task Management Backend API (Dockerized)

Backend Aplikasi RESTful API untuk manajemen User, Project, dan Task yang dibangun menggunakan **Hono** framework di atas runtime **Bun**, database **MongoDB** (Mongoose ODM), dilengkapi dokumentasi interaktif **Scalar (OpenAPI)** serta kontainerisasi **Docker**.

---

## Prasyarat Sistem 

Sebelum menjalankan aplikasi ini, pastikan sistem/perangkat Anda telah terpasang perangkat lunak berikut:

### Opsi 1: Menjalankan dengan Docker (Direkomendasikan)
Jika menggunakan Docker, Anda **tidak perlu menginstal Bun atau MongoDB secara lokal**:
* **Git**: untuk melakukan clone repository.
* **Docker Engine** (v20.10+) & **Docker Compose** (v2.0+) atau **Docker Desktop**.

### Opsi 2: Menjalankan secara Lokal (Local Development)
Jika Anda ingin menjalankan langsung di sistem lokal tanpa Docker:
* **Git**
* **Bun Runtime**: versi `1.2.0` ke atas (direkomendasikan `1.4.2+`). Cek instalasi: `bun --version`.
* **MongoDB**: versi `6.0` atau `7.0` (berjalan secara lokal di port `27017` atau menggunakan connection string **MongoDB Atlas**).

---

## Panduan Memulai

### 1. Clone Repository
```bash
git clone <URL_REPOSITORY_INI>
cd repo-backinterm-dockerize
```

### 2. Konfigurasi Environment Variables (`.env`)
Salin file template `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Buka file `.env` dan sesuaikan nilainya:
```env
PORT=8500
NODE_ENV=development
MONGO_DB=task-management-db
MONGO_URI=mongodb://localhost:27017/task-management-db
```

> [!NOTE]
> * **Jika menggunakan Docker Compose**: Nilai `MONGO_URI` di dalam container otomatis diarahkan ke container database (`mongodb://mongo:27017/${MONGO_DB}`), namun variabel `MONGO_DB` di `.env` tetap dibaca untuk menentukan nama database.
> * **Jika menggunakan MongoDB Atlas**: Ganti `MONGO_URI` dengan connection string Atlas Anda (contoh: `mongodb+srv://<username>:<password>@cluster.mongodb.net/?...`).

---

## Cara Menjalankan Aplikasi

Pilih salah satu metode berikut:

### Metode A: Menggunakan Docker Compose (Direkomendasikan)
Metode ini otomatis menyiapkan service **Backend API** dan database **MongoDB 7** dengan volume persistensi data:

```bash
# Build dan jalankan seluruh container di background
docker compose up -d --build

# Melihat log container
docker compose logs -f

# Menghentikan container
docker compose down
```
Setelah berjalan, aplikasi dapat diakses di `http://localhost:8500`.

---

### Metode B: Menjalankan Secara Lokal (Menggunakan Bun)
Pastikan MongoDB lokal atau MongoDB Atlas Anda sudah aktif dan terhubung di `.env`.

1. **Install dependensi**:
   ```bash
   bun install
   ```

2. **Jalankan aplikasi (Development mode dengan auto-reload)**:
   ```bash
   bun dev
   ```
   *Atau mode production:*
   ```bash
   bun start
   ```

Aplikasi akan berjalan pada port yang telah dikonfigurasi (default: `http://localhost:8500`).

---

## 🔍 Verifikasi & Dokumentasi API (Scalar & OpenAPI)

Setelah server berjalan, Anda dapat memverifikasi status dan mencoba seluruh endpoint:

1. **Health Check Endpoint**:
   ```bash
   curl http://localhost:8500/health
   ```
   Respons: `{"success": true, "message": "endpoint berhasil diakses"}`

2. **Scalar Interactive API Documentation**:
   Buka di browser:
   * **UI Dokumentasi Interaktif**: [http://localhost:8500/docs](http://localhost:8500/docs) (atau `/reference`)
   * **OpenAPI 3.1 Spec (Raw JSON)**: [http://localhost:8500/openapi.json](http://localhost:8500/openapi.json)

---

## Data Seeding & Pengujian Persistensi Data

Database pada awal inisialisasi masih dalam keadaan kosong. Telah disediakan skrip seeder dengan predefined ID untuk mempermudah testing dan verifikasi persistensi Docker volume.

### 1. Menjalankan Seeder
* **Jika menggunakan Docker Compose**:
  ```bash
  docker compose exec backend bun run seed
  ```
* **Jika dijalankan lokal**:
  ```bash
  bun run seed
  ```

### 2. Predefined MongoDB ID untuk Testing
| Entitas | Nama / Judul | Predefined MongoDB `_id` |
|---|---|---|
| **User 1** | Alice Developer | `660000000000000000000001` |
| **User 2** | Bob Manager | `660000000000000000000002` |
| **User 3** | Charlie Tester | `660000000000000000000003` |
| **Project 1** | Backend Dockerization Project | `660000000000000000000011` |
| **Project 2** | Frontend Web Dashboard | `660000000000000000000012` |
| **Task 1** | Test MongoDB Volume Persistence | `660000000000000000000021` |
| **Task 2** | Setup OpenAPI & Scalar UI | `660000000000000000000022` |

### 3. Langkah Pengujian Persistensi Volume Docker
Untuk membuktikan bahwa volume Docker (`mongo_data`) mempertahankan data saat container dimatikan:

1. **Nyalakan container**:
   ```bash
   docker compose up -d
   ```
2. **Isi database awal**:
   ```bash
   docker compose exec backend bun run seed
   ```
3. **Verifikasi data awal**:
   Akses `GET http://localhost:8500/api/tasks` atau cek lewat Scalar UI di `http://localhost:8500/docs`. Seluruh data endpoint task, project, dan user akan muncul.
4. **Hentikan dan hapus container** *(tanpa flag `-v`)*:
   ```bash
   docker compose down
   ```
5. **Nyalakan kembali container**:
   ```bash
   docker compose up -d
   ```
6. **Verifikasi ulang data**:
   Akses kembali `GET http://localhost:8500/api/tasks` untuk verifikasi data yang ada.

## Referensi dan Bantuan
Dalam repo ini, digunakan beberapa sumber untuk membantu pengerjaan kode, seperti npm untuk package yang digunakan, bun, hono, docker dan mongoose. Adapun dalam pengerjaan repo ini, AI digunakan untuk generate dan implement openapi, seed data dan membuat readme.