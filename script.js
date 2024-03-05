document.addEventListener('DOMContentLoaded', function () {
    const workoutList = document.getElementById('workout-list');
    const workoutForm = document.getElementById('workout-form');
    const sessionPlanList = document.getElementById('session-plan-list');

    // Variables
    let workouts = [];
    let selectedWorkoutIndex = -1;
    let dayCount = 1;

    // Workout Display
    function displayWorkouts() {
        workoutList.innerHTML = workouts.map((workout, index) => {
            const fileDisplay = workout.file ? ` (File: ${workout.file.name})` : '';
            return `<li>
                        <span onclick="selectWorkout(${index})">${workout.name}${fileDisplay}</span>
                        <button class="edit-btn" onclick="editWorkout(${index})">Edit</button>
                    </li>`;
        }).join('');
    }

    // Workout Selection
    function selectWorkout(index) {
        selectedWorkoutIndex = index;
        console.log('Selected Workout:', workouts[selectedWorkoutIndex]);
    }

    // Event Listeners for buttons
    document.getElementById('add-workout').addEventListener('click', addWorkout);
    document.getElementById('save-workout').addEventListener('click', saveWorkout);
    document.getElementById('delete-workout').addEventListener('click', deleteWorkout);
});
