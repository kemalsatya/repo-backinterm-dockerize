import mongoose from "mongoose";
import { connectMongoDB } from "./mongoose";
import { userModel } from "@/modules/users/users.model";
import { projectModel } from "@/modules/projects/project.model";
import { taskModel } from "@/modules/tasks/task.model";

export const SEED_IDS = {
  users: {
    alice: "660000000000000000000001",
    bob: "660000000000000000000002",
    charlie: "660000000000000000000003",
  },
  projects: {
    backendDocker: "660000000000000000000011",
    frontendWeb: "660000000000000000000012",
  },
  tasks: {
    subTaskDockerTest: "660000000000000000000021",
    setupScalar: "660000000000000000000022",
    dockerizeMongo: "660000000000000000000023",
    createLandingPage: "660000000000000000000024",
  },
} as const;

export async function runSeed() {
  try {
    console.log("[SEED] Menghubungkan ke MongoDB...");
    await connectMongoDB();

    console.log("[SEED] Membersihkan data lama...");
    await Promise.all([
      userModel.deleteMany({}),
      projectModel.deleteMany({}),
      taskModel.deleteMany({}),
    ]);

    console.log("[SEED] Memasukkan data User...");
    const users = await userModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.users.alice),
        name: "Alice Developer",
        email: "alice@example.com",
      },
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.users.bob),
        name: "Bob Manager",
        email: "bob@example.com",
      },
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.users.charlie),
        name: "Charlie Tester",
        email: "charlie@example.com",
      },
    ]);

    console.log("[SEED] Memasukkan data Project...");
    const projects = await projectModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.projects.backendDocker),
        name: "Backend Dockerization Project",
        description: "Modernisasi backend dengan Docker dan dokumentasi Scalar",
        createdBy: new mongoose.Types.ObjectId(SEED_IDS.users.alice),
      },
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.projects.frontendWeb),
        name: "Frontend Web Dashboard",
        description: "Dashboard klien untuk memonitor task dan proyek",
        createdBy: new mongoose.Types.ObjectId(SEED_IDS.users.bob),
      },
    ]);

    console.log("[SEED] Memasukkan data Task...");
    await taskModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.tasks.subTaskDockerTest),
        projectId: new mongoose.Types.ObjectId(SEED_IDS.projects.backendDocker),
        title: "Test MongoDB Volume Persistence",
        status: "in progress",
        assignedTo: new mongoose.Types.ObjectId(SEED_IDS.users.charlie),
        description: "Uji apakah volume data MongoDB tetap bertahan setelah container di-recreate",
        priority: "high",
        tags: "docker, persistence, test",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.tasks.setupScalar),
        projectId: new mongoose.Types.ObjectId(SEED_IDS.projects.backendDocker),
        title: "Setup OpenAPI & Scalar UI",
        status: "completed",
        assignedTo: new mongoose.Types.ObjectId(SEED_IDS.users.alice),
        description: "Implementasikan dokumentasi API interaktif menggunakan Scalar",
        priority: "medium",
        tags: "api, scalar, docs",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.tasks.dockerizeMongo),
        projectId: new mongoose.Types.ObjectId(SEED_IDS.projects.backendDocker),
        title: "Konfigurasi Docker Compose Healthcheck",
        status: "completed",
        assignedTo: new mongoose.Types.ObjectId(SEED_IDS.users.alice),
        subTask: [new mongoose.Types.ObjectId(SEED_IDS.tasks.subTaskDockerTest)],
        description: "Konfigurasikan service mongo dan backend di docker-compose",
        priority: "high",
        tags: "docker, healthcheck",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new mongoose.Types.ObjectId(SEED_IDS.tasks.createLandingPage),
        projectId: new mongoose.Types.ObjectId(SEED_IDS.projects.frontendWeb),
        title: "Desain UI Mockup Dashboard",
        status: "todo",
        assignedTo: new mongoose.Types.ObjectId(SEED_IDS.users.bob),
        description: "Buat wireframe dan mockup awal untuk dashboard",
        priority: "low",
        tags: "design, ui",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log(`[SEED] Berhasil seed: ${users.length} Users, ${projects.length} Projects, 4 Tasks.`);
  } catch (error) {
    console.error("[SEED] Error saat seeding data:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("[SEED] Koneksi database ditutup.");
  }
}

// Jalankan jika file dieksekusi langsung
if (import.meta.main) {
  runSeed();
}
