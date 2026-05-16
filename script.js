fetch("https://portfolio-backend-8hsl.onrender.com/api/profile")
.then(response => response.json())

.then(data => {

    console.log(data);

    // SKILLS

    const skillsContainer =
    document.querySelector(".skills-grid");

    data.skills.forEach(skill => {

        skillsContainer.innerHTML += `
        
        <div class="skill-card">

            <h3>${skill}</h3>

            <p>Loaded from Backend API</p>

        </div>
        `;
    });

    // PROJECTS

    const projectsContainer =
    document.querySelector(".projects-grid");

    data.projects.forEach(project => {

        projectsContainer.innerHTML += `
        
        <div class="project-card">

            <div class="project-content">

                <h3>${project.name}</h3>

                <p>${project.description}</p>

            </div>

        </div>
        `;
    });

})

.catch(error => {

    console.log(error);

});