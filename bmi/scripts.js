function calculateBMI() {
    const height = document.getElementById('height').value / 100; // convert to meters
    const weight = document.getElementById('weight').value;
    const bmi = (weight / (height * height)).toFixed(2);

    document.getElementById('bmiResult').textContent = `Your BMI is ${bmi}`;
    displayRecommendations(bmi);
    drawBMIChart(bmi);
}

function displayRecommendations(bmi) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';

    if (bmi < 18.5) {
        recommendations.innerHTML = `<p>You are underweight. Consider increasing your calorie intake and incorporating strength training.</p>`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        recommendations.innerHTML = `<p>Your BMI is normal. Maintain a balanced diet and regular exercise.</p>`;
    } else if (bmi >= 25 && bmi < 29.9) {
        recommendations.innerHTML = `<p>You are overweight. A mix of cardio and a calorie deficit diet is recommended.</p>`;
    } else {
        recommendations.innerHTML = `<p>You are in the obese category. It's important to consult with a healthcare provider for personalized advice.</p>`;
    }
}

function drawBMIChart(bmi) {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    const data = {
        labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
        datasets: [{
            data: [18.5, 24.9, 29.9, bmi],
            backgroundColor: ['#74b9ff', '#55efc4', '#ffeaa7', '#ff7675'],
            label: 'BMI'
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data
    });
}

function openNewPostModal() {
    document.getElementById('newPostModal').style.display = 'flex';
}

function closeNewPostModal() {
    document.getElementById('newPostModal').style.display = 'none';
}

function addPost() {
    const postContent = document.getElementById('newPostContent').value;
    if (postContent) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('post-card');
        
        postContainer.innerHTML = `
            <div class="post-header">
                <img src="avatar2.png" alt="Avatar" class="avatar">
                <div class="post-info">
                    <span class="post-author">You</span>
                    <span class="post-time">Just now</span>
                </div>
            </div>
            <p>${postContent}</p>
            <div class="post-reactions">
                <button class="reaction-btn" onclick="reactToPost(this, '👍')">👍</button>
                <button class="reaction-btn" onclick="reactToPost(this, '❤️')">❤️</button>
                <button class="reaction-btn" onclick="reactToPost(this, '😆')">😆</button>
                <span class="reaction-count">0 Reactions</span>
            </div>
            <div class="comment-section">
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <button class="comment-btn" onclick="addComment(this)">Comment</button>
            </div>
            <div class="comments-list"></div>
        `;

        document.getElementById('communityPosts').appendChild(postContainer);
        closeNewPostModal();
    }
}

function addComment(commentButton) {
    const commentInput = commentButton.previousElementSibling;
    const commentText = commentInput.value;
    const commentsList = commentButton.parentElement.nextElementSibling;

    if (commentText) {
        const newComment = document.createElement('p');
        newComment.textContent = `You: ${commentText}`;
        commentsList.appendChild(newComment);

        commentInput.value = '';
    }
}

function reactToPost(button, reaction) {
    button.textContent = reaction;
    const reactionCount = button.nextElementSibling.nextElementSibling;
    let count = parseInt(reactionCount.textContent);
    count++;
    reactionCount.textContent = `${count} Reactions`;
}
