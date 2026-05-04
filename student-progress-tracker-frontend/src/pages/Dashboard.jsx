import React, { useEffect, useMemo, useState } from "react";
import TaskChart from "../components/tasks/TaskChart";
import { useTasks } from "../context/TaskContext";

const Dashboard = () => {
  const { user, tasks, suggestion } = useTasks();

  // =========================
  // BASIC STATS
  // =========================

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;

  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.status === "COMPLETED").length /
            tasks.length) *
            100,
        );

  // =========================
  // TODAY TASKS 📅
  // =========================

 const todayTasks = useMemo(() => {
  const today = new Date().toDateString();

  return tasks.filter(
    (t) => new Date(t.createdAt).toDateString() === today
  );
}, [tasks]);

  // =========================
  // OVERDUE TASKS 📅
  //(pending tasks only)
  // =========================

  const overdueTasks = tasks.filter(
    (t) =>
      t.status === "PENDING" && 
    t.dueDate && 
    new Date(t.dueDate).getTime() < now.getTime(),
  );

  // =========================
  // STREAK SYSTEM
  //counts consecutive days with completed tasks
  // =========================

  const calculateStreak = () => {
    let streak = 0;

    const dates = tasks
      .filter((t) => t.status === "COMPLETED")
      .map((t) => new Date(t.updatedAt).toDateString());

    const uniqueDates = [...new Set(dates)];

    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();

      checkDate.setDate(today.getDate() - i);

      if (uniqueDates.includes(checkDate.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();

  // =========================
  // UI SAFE CHECK
  // =========================

  if (!user || !user.id) {
    return <p className="text-center mt-10">User not logged in ❌</p>;
  }

  // =========================
  // UI COLORS
  // =========================

  const barColor =
    completionRate < 40
      ? "bg-red-500"
      : completionRate < 70
        ? "bg-yellow-400"
        : "bg-green-500";

  return (
    <div className="p-6 space-y-6">
      {/* =========================
          HEADER STATS CARDS
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Completion Rate */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">📊 Completion Rate</h2>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>

        {/* Total Tasks */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">📝 Total Tasks</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        {/* Streak */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">🔥 Streak</h2>
          <p className="text-2xl font-bold">{streak} days</p>
        </div>

        {/* Overdue */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">⚠ Pending</h2>
          <p className="text-2xl font-bold">{overdueTasks.length}</p>
        </div>
      </div>

      {/* =========================
          PROGRESS BAR
      ========================= */}

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Progress Overview
        </h2>
        <p className="text-gray-600 mb-2">
          {completed} of {total} tasks completed
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className={`${barColor} h-4 rounded-full `}
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1 font-medium text-gray-700">
          {completionRate}%
        </p>
      </div>

      {/* =========================
          SMART SUGGESTION BOX 🧠
      ========================= */}

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
        <h2 className="font-semibold text-blue-700">🧠 Smart Suggestion</h2>
        <p className="text-blue-600">{suggestion}</p>
      </div>

      {/* =========================
          TODAY TASKS 📅
      ========================= */}

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold">📅 Today’s Tasks</h2>

        {todayTasks.length === 0 ? (
          <p className="text-gray-500">No tasks for today 🎉</p>
        ) : (
          todayTasks.map((t) => <p key={t.id}>• {t.title}</p>)
        )}
      </div>

      {/* =========================
          OVERDUE TASKS ⚠
      ========================= */}

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-red-500">⚠ Pending Tasks</h2>

        {overdueTasks.length === 0 ? (
          <p className="text-gray-500">All caught up 😎</p>
        ) : (
          overdueTasks.map((t) => (
            <p key={t.id} className="text-red-400">
              • {t.title}
            </p>
          ))
        )}
      </div>

      {/* =========================
          CHART 📊
      ========================= */}

      <div>
        <TaskChart tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;
