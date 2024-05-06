document.addEventListener('DOMContentLoaded', function () {
    const sessionPlanList = document.getElementById('session-plan-list');

    // Variables
    let workouts = [];

    // Adding & Saving Workouts
    function addWorkout() {
        const fileInput = document.getElementById('workout-file');
        const workoutNameInput = document.getElementById('workout-name');
        const file = fileInput.files[0];
        const url = URL.createObjectURL(file);
        const workoutName = workoutNameInput.value;

        const workout = {
            name: workoutName,
            file: file,
            url: url
        };

        workouts.push(workout);

        const li = document.createElement('li');
        li.textContent = workoutName;

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = url;
            li.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            li.appendChild(video);
        }

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            const index = workouts.indexOf(workout);
            if (index !== -1) {
                workouts.splice(index, 1);
            }
            sessionPlanList.removeChild(li);
        });

        li.appendChild(deleteBtn);

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', function() {
            const newName = prompt('Enter a new name for the workout:');
            if (newName) {
                workout.name = newName;
                const newText = document.createTextNode(newName);
                li.replaceChild(newText, li.childNodes[0]);
            }
        });

        li.appendChild(editBtn);
        sessionPlanList.appendChild(li);
    }

    // Event Listeners for buttons
    document.getElementById('add-workout').addEventListener('click', addWorkout);
    document.getElementById('save-workout').addEventListener('click', saveWorkout);
});