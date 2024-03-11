document.addEventListener('DOMContentLoaded', function () {
    const workoutList = document.getElementById('workout-list');
    const workoutForm = document.getElementById('workout-form');
    const sessionPlanList = document.getElementById('session-plan-list');

    // Variables
    let workouts = [];
    let selectedWorkoutIndex = -1;

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
    
    // Adding Workouts
    function addWorkout() {
        const nameInput = workoutForm.querySelector('#workout-name').value;
        const fileInput = workoutForm.querySelector('#workout-file').files[0];

        if (nameInput && fileInput) {
            workouts.push({ name: nameInput, file: fileInput });
            displayWorkouts();
            selectedWorkoutIndex = workouts.length - 1;
            selectWorkout(selectedWorkoutIndex);
        } else {
            alert('Please provide both a name and a file for the workout.');
        }
    }

    // Saving Workouts
    function saveWorkout() {
        if (workouts.length > 0) {
            // Iterating over workouts and adding them to session plan
            workouts.forEach((workout) => {
                const li = document.createElement('li');
                const fileDisplay = workout.file ? ` (File: ${workout.file.name})` : '';
                li.textContent = `${workout.name}${fileDisplay}`;
                sessionPlanList.appendChild(li);
            });
    
            // Clear the workouts array and update the display
            workouts = [];
            displayWorkouts();
            workoutForm.reset();
        }
    }

    // Deleting Workouts
    function deleteWorkout() {
        if (selectedWorkoutIndex !== -1) {
            workouts.splice(selectedWorkoutIndex, 1);
            displayWorkouts();
            selectedWorkoutIndex = -1;
            workoutForm.reset();
        }
    }

    // Event Listeners for buttons
    document.getElementById('add-workout').addEventListener('click', addWorkout);
    document.getElementById('save-workout').addEventListener('click', saveWorkout);
    document.getElementById('delete-workout').addEventListener('click', deleteWorkout);
});
