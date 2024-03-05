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

    // Edit Workouts
    function editWorkout(index) { 
        const targetWorkout = workouts[index];
        const newName = prompt('Please enter the updated name for the workout:', targetWorkout.name);
        
        if (newName !== null) {
            targetWorkout.name = newName;
    
            const shouldUpdateFile = confirm('Do you wish to update the workout file?');
            
            if (shouldUpdateFile) {
                const newFile = workoutForm.querySelector('#workout-file').files[0];
                targetWorkout.file = newFile;
            }
            
            displayWorkouts();
            selectWorkout(index);
        }
    }

    // Adding Workouts
    function addWorkout() {
        const nameInput = workoutForm.querySelector('#workout-name').value;
        const fileInput = workoutForm.querySelector('#workout-file').files[0];

        if (nameInput && fileInput) {
            const workoutName = `Workout ${dayCount}`;
            dayCount++;
            
            workouts.push({ name: workoutName, file: fileInput });
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
            // Create a new ul element for each day
            const dayList = document.createElement('ul');

            // Iterating over workouts and adding them to the day's list
            workouts.forEach((workout) => {
                const li = document.createElement('li');
                const fileDisplay = workout.file ? ` (File: ${workout.file.name})` : '';
                li.textContent = `${workout.name}${fileDisplay}`;
                dayList.appendChild(li);
            });

            // Add the day's list to the session plan
            sessionPlanList.appendChild(dayList);

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
