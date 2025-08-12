const Task = require("../models/Task");

// @desc      Get all tasks (Admin: all, User: only assigned tasks)
// @route     GET /api/tasks/
// @access    Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
        filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
        tasks = await Task.find(filter).populate(
            "assignedTo",
            "name email profileImageUrl"
    );
    } else {
        tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
    }

    // Add completed todoChecklist count to each task
    tasks = await Promise.all(
    tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
        (item) => item.completed
        ).length;

        return { ...task._doc, completedTodoCount: completedCount };
    })
    );

    // Status summary counts
    const allTasks = await Task.countDocuments(
    req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
    ...filter,
    status: "Pending",
    ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
    ...filter,
    status: "In Progress",
    ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
    ...filter,
    status: "Completed",
    ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.json({
        tasks,
        statusSummary: {
            all: allTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
        },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Get task by ID
// @route     GET /api/tasks/:id
// @access    Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email profileImageUrl"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Create a new task (Admin only)
// @route     POST /api/tasks/
// @access    Private (Admin)
const createTask = async (req, res) => {
  try {
    const {
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    attachments,
    todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
    return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    createdBy: req.user._id,
    todoChecklist,
    attachments
  });
  res.status(201).json({ message: "Task created successfully", task });

  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Update task details
// @route     PUT /api/tasks/:id
// @access    Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
    if (!Array.isArray(req.body.assignedTo)) {
        return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }
    task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Delete a task (Admin only)
// @route     DELETE /api/tasks/:id
// @access    Private (Admin)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Update task status
// @route     PUT /api/tasks/:id/status
// @access    Private
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = Array.isArray(task.assignedTo) && 
    task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
    }

    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
    task.todoChecklist.forEach((item) => (item.completed = true));
    task.progress = 100;
    }

    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Update task checklist
// @route     PUT /api/tasks/:id/todo
// @access    Private
const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist = [] } = req.body || {};
    const taskId = req.params.id;

    // 1. Find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 2. Authorization check
    let assignedToArray = Array.isArray(task.assignedTo)
      ? task.assignedTo.map(id => id.toString())
      : task.assignedTo
      ? [task.assignedTo.toString()]
      : [];

    if (
      !assignedToArray.includes(req.user._id.toString()) &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    // 3. Input validation
    if (!Array.isArray(todoChecklist)) {
      return res.status(400).json({ message: "todoChecklist must be an array" });
    }

    // 4. Create a new checklist based on the request
    const newChecklist = todoChecklist.map(item => {
      // For existing items, update their properties
      if (item._id) {
        const existingItem = task.todoChecklist.find(
          (oldItem) => oldItem._id?.toString() === item._id
        );
        if (existingItem) {
          existingItem.text = item.text;
          existingItem.completed = item.completed;
          return existingItem;
        }
      }
      // For new items (without an _id), create a new subdocument
      return {
        ...item,
        _id: item._id || new mongoose.Types.ObjectId(), // Generate a new ID if not provided
      };
    });

    // 5. Replace the entire checklist with the new, updated one
    // This is the most reliable way to handle adds, updates, and deletes
    task.todoChecklist = newChecklist;

    // 6. Recalculate progress and status
    const completedCount = task.todoChecklist.filter(item => item.completed).length;
    const totalItems = task.todoChecklist.length;
    task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "In Progress";
    } else {
      task.status = "Pending";
    }

    // 7. Save the changes
    await task.save();

    // 8. Fetch and return the updated task
    const updatedTask = await Task.findById(taskId).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    res.json({ message: "Task checklist updated", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Dashboard Data (Admin only)
// @route     GET /api/tasks/dashboard-data
// @access    Private
const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc      Dashboard Data (User-specific)
// @route     GET /api/tasks/user-dashboard-data
// @access    Private
const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};