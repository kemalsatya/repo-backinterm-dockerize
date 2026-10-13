# repo-backinterm-dockerize

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/server.ts
```

To build and Run:
```
docker compose up
```

This repo run in default port 8500, to check endpoint:
```
GET localhost:8500/health
```

### API Documentation (Scalar & OpenAPI)
Buka dokumentasi interaktif Scalar di browser:
* **Scalar UI**: `http://localhost:8500/docs` (atau `http://localhost:8500/reference`)
* **OpenAPI Spec**: `http://localhost:8500/openapi.json`

### Pengujian Persistensi Data

Setelah container dijalankan, database belum memiliki data awal. Untuk mempermudah pengujian persistensi data pada volume MongoDB Docker (`mongo_data`), telah disediakan script seeder dengan predefined ID.

#### 1. Menjalankan Seeder
Jalankan salah satu perintah berikut:
* **Jika menggunakan Docker Compose**:
  ```bash
  docker compose exec backend bun run seed
  ```
* **Jika dijalankan lokal**:
  ```bash
  bun run seed
  ```

#### 2. Predefined ID untuk Testing
| Entitas | Name / Title | ID MongoDB |
|---|---|---|
| **User 1** | Alice Developer | `660000000000000000000001` |
| **User 2** | Bob Manager | `660000000000000000000002` |
| **User 3** | Charlie Tester | `660000000000000000000003` |
| **Project 1** | Backend Dockerization Project | `660000000000000000000011` |
| **Project 2** | Frontend Web Dashboard | `660000000000000000000012` |
| **Task 1** | Test MongoDB Volume Persistence | `660000000000000000000021` |
| **Task 2** | Setup OpenAPI & Scalar UI | `660000000000000000000022` |

#### 3. Langkah Pengujian Persistensi Docker Volume
1. **Jalankan container**:
   ```bash
   docker compose up -d
   ```
2. **Isi database awal**:
   ```bash
   docker compose exec backend bun run seed
   ```
3. **Verifikasi data**:
   Akses `GET http://localhost:8500/api/tasks` atau cek lewat Scalar UI di `http://localhost:8500/docs`. Seluruh informasi endpoin task, project, dan user akan muncul.
4. **Hentikan dan hapus container** (tanpa menghapus volume):
   ```bash
   docker compose down
   ```
5. **Nyalakan kembali container**:
   ```bash
   docker compose up -d
   ```
6. **Verifikasi ulang**:
   Akses kembali `GET http://localhost:8500/api/tasks`. **Data tetap utuh dan tersimpan di MongoDB**, membuktikan konfigurasi volume `mongo_data:/data/db` berhasil mempertahankan persistensi data.

This project was created using `bun init` in bun v1.4.2. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
